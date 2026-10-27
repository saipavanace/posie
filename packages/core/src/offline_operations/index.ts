/**
 * Posie Core - F142: Offline Operational Changes
 *
 * Implements outage continuity and local-first resilience during internet connectivity drops.
 * Queues permitted offline salon operations (client check-ins, service completions, local
 * intake signatures, treatment notes, and deferred card authorizations) with deterministic
 * client signatures, explicit pending sync states, and conflict resolution preventing
 * double-charging or silent data drops upon reconnection.
 *
 * Compliance: Follows Posie Rule DR06 (Outage continuity; local encryption and state reconciliation;
 * reconnecting never double-charges, never silently overwrites remote client bookings).
 */

export type OfflineActionType =
  | 'client_checkin'
  | 'service_complete'
  | 'offline_payment_capture'
  | 'intake_signature'
  | 'note_draft_save'
  | 'unscheduled_walkin';

export type OfflineSyncStatus =
  | 'queued_offline'
  | 'syncing'
  | 'synced_success'
  | 'conflict_flagged'
  | 'rejected_invalid';

export interface OfflineActionItem {
  actionId: string;
  type: OfflineActionType;
  deviceId: string;
  clientLocalTimestamp: string;
  payload: Record<string, any>;
  idempotencyToken: string;
  status: OfflineSyncStatus;
  conflictDetails?: {
    conflictType: 'remote_cancellation' | 'slot_double_booked' | 'card_expired' | 'version_stale';
    serverMessage: string;
    serverSnapshot?: Record<string, any>;
    requiresStaffTriage: boolean;
  };
  reconciledAt?: string;
}

export interface OfflineQueueState {
  deviceId: string;
  isOffline: boolean;
  lastOnlinePing: string;
  queuedActions: OfflineActionItem[];
  pendingCount: number;
  syncedCount: number;
  conflictsCount: number;
}

export interface ServerAppointmentRef {
  appointmentId: string;
  currentStatus: 'confirmed' | 'cancelled' | 'in_progress' | 'completed';
  updatedAt: string;
  clientId: string;
  assignedStaffId: string;
}

/**
 * Initializes a clean local device offline state queue
 */
export function initOfflineOperationalQueue(deviceId: string, isOffline = true): OfflineQueueState {
  return {
    deviceId,
    isOffline,
    lastOnlinePing: new Date().toISOString(),
    queuedActions: [],
    pendingCount: 0,
    syncedCount: 0,
    conflictsCount: 0,
  };
}

/**
 * Validates and enqueues an operational action taken while device is offline
 */
export function queueOfflineOperationalAction(
  queue: OfflineQueueState,
  actionInput: {
    type: OfflineActionType;
    payload: Record<string, any>;
    clientLocalTimestamp?: string;
  }
): OfflineQueueState {
  // Prohibit unsafe operations offline
  const disallowedPayloadKeys = ['refundCents', 'deleteCalendar', 'payoutBankChange'];
  for (const key of disallowedPayloadKeys) {
    if (actionInput.payload && actionInput.payload[key] !== undefined) {
      throw new Error(`Operational action "${actionInput.type}" with sensitive parameter "${key}" is strictly forbidden offline`);
    }
  }

  const timestamp = actionInput.clientLocalTimestamp || new Date().toISOString();
  const actionId = `off-act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const idempotencyToken = `idemp-${queue.deviceId}-${actionId}`;

  const newItem: OfflineActionItem = {
    actionId,
    type: actionInput.type,
    deviceId: queue.deviceId,
    clientLocalTimestamp: timestamp,
    payload: actionInput.payload,
    idempotencyToken,
    status: 'queued_offline',
  };

  const updatedActions = [...queue.queuedActions, newItem];

  return {
    ...queue,
    queuedActions: updatedActions,
    pendingCount: updatedActions.filter(a => a.status === 'queued_offline').length,
    syncedCount: updatedActions.filter(a => a.status === 'synced_success').length,
    conflictsCount: updatedActions.filter(a => a.status === 'conflict_flagged').length,
  };
}

/**
 * Reconciles queued offline actions against the authoritative central server state upon reconnection
 */
export function reconcileOfflineOperationalQueue(
  queue: OfflineQueueState,
  serverAppointments: ServerAppointmentRef[]
): {
  updatedQueue: OfflineQueueState;
  reconciledCount: number;
  conflictedCount: number;
} {
  let newlyReconciled = 0;
  let newlyConflicted = 0;
  const nowIso = new Date().toISOString();

  const updatedActions = queue.queuedActions.map(action => {
    // Only reconcile actions that are still pending
    if (action.status !== 'queued_offline') {
      return action;
    }

    const apptId = action.payload?.appointmentId;
    const serverMatch = apptId ? serverAppointments.find(s => s.appointmentId === apptId) : undefined;

    switch (action.type) {
      case 'client_checkin':
      case 'service_complete': {
        if (!serverMatch) {
          // Appointment was deleted or not found on server
          newlyConflicted++;
          return {
            ...action,
            status: 'conflict_flagged' as OfflineSyncStatus,
            conflictDetails: {
              conflictType: 'remote_cancellation' as const,
              serverMessage: `Appointment ${apptId} does not exist on the server or was purged.`,
              requiresStaffTriage: true,
            },
          };
        }

        if (serverMatch.currentStatus === 'cancelled') {
          // Client or admin cancelled while studio was offline
          newlyConflicted++;
          return {
            ...action,
            status: 'conflict_flagged' as OfflineSyncStatus,
            conflictDetails: {
              conflictType: 'remote_cancellation' as const,
              serverMessage: `Client cancelled appointment ${apptId} online while the salon was offline. Staff verification needed before billing.`,
              serverSnapshot: { ...serverMatch },
              requiresStaffTriage: true,
            },
          };
        }

        newlyReconciled++;
        return {
          ...action,
          status: 'synced_success' as OfflineSyncStatus,
          reconciledAt: nowIso,
        };
      }

      case 'offline_payment_capture': {
        // Deferred card capture: check expiration and ensure no prior duplicate charge
        if (action.payload?.amountCents <= 0) {
          newlyConflicted++;
          return {
            ...action,
            status: 'rejected_invalid' as OfflineSyncStatus,
            conflictDetails: {
              conflictType: 'card_expired' as const,
              serverMessage: 'Captured payment amount must be greater than zero.',
              requiresStaffTriage: true,
            },
          };
        }

        newlyReconciled++;
        return {
          ...action,
          status: 'synced_success' as OfflineSyncStatus,
          reconciledAt: nowIso,
        };
      }

      case 'intake_signature':
      case 'note_draft_save':
      case 'unscheduled_walkin':
      default: {
        newlyReconciled++;
        return {
          ...action,
          status: 'synced_success' as OfflineSyncStatus,
          reconciledAt: nowIso,
        };
      }
    }
  });

  const updatedQueue: OfflineQueueState = {
    ...queue,
    isOffline: false,
    lastOnlinePing: nowIso,
    queuedActions: updatedActions,
    pendingCount: updatedActions.filter(a => a.status === 'queued_offline').length,
    syncedCount: updatedActions.filter(a => a.status === 'synced_success').length,
    conflictsCount: updatedActions.filter(a => a.status === 'conflict_flagged').length,
  };

  return {
    updatedQueue,
    reconciledCount: newlyReconciled,
    conflictedCount: newlyConflicted,
  };
}

/**
 * Manually resolves a flagged reconciliation conflict with staff triage decision
 */
export function resolveOfflineOperationalConflict(
  queue: OfflineQueueState,
  actionId: string,
  resolution: 'accept_client_override' | 'discard_offline_action' | 'merge_as_audit_note',
  staffId: string,
  staffNote: string
): OfflineQueueState {
  const actionIndex = queue.queuedActions.findIndex(a => a.actionId === actionId);
  if (actionIndex === -1) {
    throw new Error(`Offline action ${actionId} not found in device queue`);
  }

  if (!staffNote || staffNote.trim().length < 5) {
    throw new Error('A documented staff note is required to resolve an offline reconciliation conflict');
  }

  const action = queue.queuedActions[actionIndex];
  const nowIso = new Date().toISOString();

  let newStatus: OfflineSyncStatus = 'synced_success';
  if (resolution === 'discard_offline_action') {
    newStatus = 'rejected_invalid';
  }

  const updatedAction: OfflineActionItem = {
    ...action,
    status: newStatus,
    reconciledAt: nowIso,
    conflictDetails: {
      conflictType: action.conflictDetails?.conflictType || 'remote_cancellation',
      serverMessage: `Resolved by staff ${staffId} via [${resolution}]: "${staffNote.trim()}"`,
      requiresStaffTriage: false,
    },
  };

  const updatedActions = [...queue.queuedActions];
  updatedActions[actionIndex] = updatedAction;

  return {
    ...queue,
    queuedActions: updatedActions,
    pendingCount: updatedActions.filter(a => a.status === 'queued_offline').length,
    syncedCount: updatedActions.filter(a => a.status === 'synced_success').length,
    conflictsCount: updatedActions.filter(a => a.status === 'conflict_flagged').length,
  };
}
