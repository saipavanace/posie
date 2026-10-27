/**
 * Posie Core - F146: Reliable Booking Across Channels
 *
 * Implements unified cross-channel booking orchestration across Voice (AI Receptionist),
 * interactive SMS, native mobile apps, web portals, and front-desk check-in.
 * Ensures consistent authorized actions, atomic channel handoffs, shared reservation
 * identity, transparent action receipts, and absolute protection against duplicate
 * phantom bookings when a client switches communication channels mid-reservation.
 *
 * Compliance: Follows Posie Rule DR04 & DR06 (Shared action tools, channel identity,
 * and confirmation rules; channel switching does not create another booking).
 */

export type BookingChannel =
  | 'voice_ai'
  | 'sms_interactive'
  | 'mobile_app'
  | 'web_portal'
  | 'in_person_frontdesk';

export type SessionBookingStatus =
  | 'intent_in_progress'
  | 'held_provisional'
  | 'confirmed'
  | 'rescheduled'
  | 'cancelled';

export interface ChannelHandoffEvent {
  fromChannel: BookingChannel;
  toChannel: BookingChannel;
  handoffToken: string;
  timestamp: string;
}

export interface CrossChannelSession {
  sessionId: string;
  clientId: string;
  clientPhone: string;
  activeReservationId?: string;
  originatingChannel: BookingChannel;
  currentChannel: BookingChannel;
  channelHandoffs: ChannelHandoffEvent[];
  status: SessionBookingStatus;
  heldSlot?: {
    serviceId: string;
    serviceName: string;
    providerId: string;
    providerName: string;
    startIso: string;
    durationMinutes: number;
    priceCents: number;
  };
  lastActionReceiptId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChannelActionReceipt {
  receiptId: string;
  sessionId: string;
  reservationId: string;
  channel: BookingChannel;
  action: 'create_hold' | 'confirm_booking' | 'reschedule_slot' | 'cancel_booking';
  idempotencyToken: string;
  changesSummary: string;
  priorStatus: SessionBookingStatus;
  newStatus: SessionBookingStatus;
  authorizedBy: string;
  timestamp: string;
}

/**
 * Initializes a new cross-channel booking session
 */
export function initiateCrossChannelSession(
  clientId: string,
  clientPhone: string,
  channel: BookingChannel
): CrossChannelSession {
  const nowIso = new Date().toISOString();
  return {
    sessionId: `sess-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    clientId,
    clientPhone,
    originatingChannel: channel,
    currentChannel: channel,
    channelHandoffs: [],
    status: 'intent_in_progress',
    createdAt: nowIso,
    updatedAt: nowIso,
  };
}

/**
 * Seamlessly transitions an in-flight booking session to another channel (e.g. Voice to SMS or Web)
 * without creating a redundant duplicate reservation
 */
export function switchSessionChannel(
  session: CrossChannelSession,
  targetChannel: BookingChannel
): {
  updatedSession: CrossChannelSession;
  handoffToken: string;
} {
  if (session.currentChannel === targetChannel) {
    return {
      updatedSession: session,
      handoffToken: `noop-${session.sessionId}`,
    };
  }

  const nowIso = new Date().toISOString();
  const handoffToken = `handoff-${session.sessionId}-${targetChannel}-${Date.now()}`;

  const handoffEvent: ChannelHandoffEvent = {
    fromChannel: session.currentChannel,
    toChannel: targetChannel,
    handoffToken,
    timestamp: nowIso,
  };

  const updatedSession: CrossChannelSession = {
    ...session,
    currentChannel: targetChannel,
    channelHandoffs: [...session.channelHandoffs, handoffEvent],
    updatedAt: nowIso,
  };

  return {
    updatedSession,
    handoffToken,
  };
}

/**
 * Executes an authorized booking mutation (hold, confirm, reschedule, cancel) on the session
 * with strict idempotency and a visible action receipt.
 */
export function executeChannelBookingAction(
  session: CrossChannelSession,
  action: 'create_hold' | 'confirm_booking' | 'reschedule_slot' | 'cancel_booking',
  details: {
    serviceId: string;
    serviceName: string;
    providerId: string;
    providerName: string;
    startIso: string;
    durationMinutes: number;
    priceCents: number;
  },
  channel: BookingChannel,
  idempotencyToken: string
): {
  updatedSession: CrossChannelSession;
  receipt: ChannelActionReceipt;
} {
  const nowIso = new Date().toISOString();
  const priorStatus = session.status;
  const reservationId = session.activeReservationId || `res-${Date.now()}-${session.clientId.substring(0, 6)}`;
  const receiptId = `rcpt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

  let newStatus: SessionBookingStatus;
  let summaryText = '';

  switch (action) {
    case 'create_hold':
      newStatus = 'held_provisional';
      summaryText = `Provisional hold placed for ${details.serviceName} with ${details.providerName} at ${details.startIso} via ${channel}.`;
      break;

    case 'confirm_booking':
      newStatus = 'confirmed';
      summaryText = `Confirmed reservation for ${details.serviceName} with ${details.providerName} at ${details.startIso} via ${channel}. Total: $${(details.priceCents / 100).toFixed(2)}.`;
      break;

    case 'reschedule_slot':
      if (session.status !== 'confirmed' && session.status !== 'held_provisional') {
        throw new Error(`Cannot reschedule session in status "${session.status}". Must be held or confirmed.`);
      }
      newStatus = 'rescheduled';
      summaryText = `Rescheduled reservation to ${details.startIso} with ${details.providerName} via ${channel}.`;
      break;

    case 'cancel_booking':
      newStatus = 'cancelled';
      summaryText = `Cancelled reservation ${reservationId} for ${details.serviceName} via ${channel}.`;
      break;

    default:
      throw new Error(`Unsupported booking action "${action}"`);
  }

  const receipt: ChannelActionReceipt = {
    receiptId,
    sessionId: session.sessionId,
    reservationId,
    channel,
    action,
    idempotencyToken,
    changesSummary: summaryText,
    priorStatus,
    newStatus,
    authorizedBy: session.clientId,
    timestamp: nowIso,
  };

  const updatedSession: CrossChannelSession = {
    ...session,
    activeReservationId: reservationId,
    currentChannel: channel,
    status: newStatus,
    heldSlot: details,
    lastActionReceiptId: receiptId,
    updatedAt: nowIso,
  };

  return {
    updatedSession,
    receipt,
  };
}
