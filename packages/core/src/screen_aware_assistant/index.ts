/**
 * Posie Core - F147: Screen-Aware Assistant (Assistant that acts in the current screen)
 *
 * Implements an intelligent, screen-aware studio assistant that understands the active
 * visit, client record, or calendar booking currently open in the practitioner's UI.
 * Previews proposed changes with a structured field-by-field diff, checks role-based
 * tool permissions, declines out-of-scope actions, and mandates explicit operator
 * confirmation for consequential financial, medical, or schedule mutations.
 *
 * Compliance: Follows Posie Rule DR03, DR04 & DR06 (Role-aware context and action logs.
 * Unsupported actions are declined and consequential edits require explicit confirmation).
 */

export type ScreenType =
  | 'calendar_day_view'
  | 'client_profile'
  | 'checkout_ticket'
  | 'treatment_chart'
  | 'inventory_detail';

export type UserRole =
  | 'salon_owner'
  | 'studio_manager'
  | 'service_provider'
  | 'front_desk_coordinator';

export interface ScreenContext {
  screenName: ScreenType;
  activeRecordId: string;
  activeRecordType: 'appointment' | 'client' | 'ticket' | 'soap_note' | 'retail_item';
  recordSnapshot: Record<string, any>;
  operatorRole: UserRole;
  operatorStaffId: string;
  operatorName: string;
}

export interface AssistantDiffItem {
  field: string;
  priorValue: any;
  proposedValue: any;
  description: string;
}

export interface AssistantActionPreview {
  previewId: string;
  toolName: string;
  targetRecordId: string;
  isConsequential: boolean;
  requiresExplicitConfirmation: boolean;
  diffItems: AssistantDiffItem[];
  rationale: string;
  status:
    | 'pending_confirmation'
    | 'executed_immediately'
    | 'declined_unauthorized'
    | 'declined_unsupported';
  declineReason?: string;
  proposedSnapshot: Record<string, any>;
}

export interface ActionAuditLog {
  logId: string;
  previewId: string;
  toolName: string;
  targetRecordId: string;
  operatorStaffId: string;
  operatorRole: UserRole;
  executedAt: string;
  diffSummary: string;
  isConsequential: boolean;
}

/**
 * Standard tool catalog with role authorization matrix and consequence classification
 */
const TOOL_DEFINITIONS: Record<
  string,
  {
    allowedRoles: UserRole[];
    isConsequential: boolean;
    validScreens: ScreenType[];
  }
> = {
  apply_discount: {
    allowedRoles: ['salon_owner', 'studio_manager'],
    isConsequential: true,
    validScreens: ['checkout_ticket'],
  },
  reschedule_appointment: {
    allowedRoles: ['salon_owner', 'studio_manager', 'front_desk_coordinator', 'service_provider'],
    isConsequential: true,
    validScreens: ['calendar_day_view', 'client_profile'],
  },
  append_client_preferred_beverage: {
    allowedRoles: ['salon_owner', 'studio_manager', 'service_provider', 'front_desk_coordinator'],
    isConsequential: false,
    validScreens: ['client_profile', 'calendar_day_view'],
  },
  flag_medical_contraindication: {
    allowedRoles: ['salon_owner', 'service_provider', 'studio_manager'],
    isConsequential: true,
    validScreens: ['treatment_chart', 'client_profile'],
  },
  adjust_inventory_count: {
    allowedRoles: ['salon_owner', 'studio_manager'],
    isConsequential: true,
    validScreens: ['inventory_detail'],
  },
};

/**
 * Evaluates a natural language command issued by the operator in the current screen context
 */
export function evaluateScreenAssistantRequest(
  context: ScreenContext,
  command: string
): AssistantActionPreview {
  const previewId = `asst-prev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const cmd = command.toLowerCase().trim();

  // 1. Match intent to tool
  let toolName = '';
  let diffItems: AssistantDiffItem[] = [];
  let proposedSnapshot = { ...context.recordSnapshot };
  let rationale = '';

  if (cmd.includes('discount') || cmd.includes('percent off') || cmd.includes('$ off')) {
    toolName = 'apply_discount';
    const percentMatch = cmd.match(/(\d+)%/);
    const discountPct = percentMatch ? parseInt(percentMatch[1], 10) : 15;
    const priorTotal = context.recordSnapshot.totalCents || 12000;
    const newTotal = Math.round(priorTotal * (1 - discountPct / 100));

    diffItems = [
      {
        field: 'discountPercentage',
        priorValue: context.recordSnapshot.discountPercentage || 0,
        proposedValue: discountPct,
        description: `Apply ${discountPct}% courtesy studio discount`,
      },
      {
        field: 'totalCents',
        priorValue: priorTotal,
        proposedValue: newTotal,
        description: `Update total charge from $${(priorTotal / 100).toFixed(2)} to $${(newTotal / 100).toFixed(2)}`,
      },
    ];
    proposedSnapshot.discountPercentage = discountPct;
    proposedSnapshot.totalCents = newTotal;
    rationale = `Operator requested ${discountPct}% courtesy discount on active checkout ticket.`;
  } else if (cmd.includes('reschedule') || cmd.includes('move to') || cmd.includes('shift to')) {
    toolName = 'reschedule_appointment';
    const priorTime = context.recordSnapshot.startTime || '10:00 AM';
    const proposedTime = '02:30 PM';

    diffItems = [
      {
        field: 'startTime',
        priorValue: priorTime,
        proposedValue: proposedTime,
        description: `Move appointment start time from ${priorTime} to ${proposedTime}`,
      },
    ];
    proposedSnapshot.startTime = proposedTime;
    rationale = `Reschedule active reservation to ${proposedTime} as requested by client.`;
  } else if (
    cmd.includes('beverage') ||
    cmd.includes('coffee') ||
    cmd.includes('tea') ||
    cmd.includes('likes') ||
    cmd.includes('loves') ||
    cmd.includes('drink') ||
    cmd.includes('matcha') ||
    cmd.includes('latte')
  ) {
    toolName = 'append_client_preferred_beverage';
    const beverage = 'Oat milk matcha latte';
    const priorNotes = context.recordSnapshot.hospitalityNotes || '';
    const newNotes = priorNotes ? `${priorNotes}; Prefers: ${beverage}` : `Prefers: ${beverage}`;

    diffItems = [
      {
        field: 'hospitalityNotes',
        priorValue: priorNotes,
        proposedValue: newNotes,
        description: `Add hospitality note: "${beverage}"`,
      },
    ];
    proposedSnapshot.hospitalityNotes = newNotes;
    rationale = `Recorded hospitality beverage preference for client profile.`;
  } else if (cmd.includes('allergy') || cmd.includes('contraindication') || cmd.includes('retinol') || cmd.includes('latex')) {
    toolName = 'flag_medical_contraindication';
    const allergen = cmd.includes('retinol') ? 'Retinol sensitivity' : 'Latex allergy';
    const priorAllergies = context.recordSnapshot.allergies || [];
    const newAllergies = [...priorAllergies, allergen];

    diffItems = [
      {
        field: 'allergies',
        priorValue: priorAllergies,
        proposedValue: newAllergies,
        description: `Flag medical allergy: ${allergen}`,
      },
    ];
    proposedSnapshot.allergies = newAllergies;
    rationale = `Documented clinical contraindication warning in patient chart.`;
  } else {
    // Unsupported tool command
    return {
      previewId,
      toolName: 'unknown_command',
      targetRecordId: context.activeRecordId,
      isConsequential: false,
      requiresExplicitConfirmation: false,
      diffItems: [],
      rationale: `The command "${command}" is not recognized or supported on this screen.`,
      status: 'declined_unsupported',
      declineReason: `No safe tool matches command "${command}" on ${context.screenName}.`,
      proposedSnapshot: context.recordSnapshot,
    };
  }

  // 2. Role permission and screen validity check
  const toolDef = TOOL_DEFINITIONS[toolName];
  if (!toolDef || !toolDef.validScreens.includes(context.screenName)) {
    return {
      previewId,
      toolName,
      targetRecordId: context.activeRecordId,
      isConsequential: toolDef?.isConsequential || false,
      requiresExplicitConfirmation: false,
      diffItems: [],
      rationale: `Tool ${toolName} cannot be executed from screen ${context.screenName}.`,
      status: 'declined_unsupported',
      declineReason: `Tool ${toolName} is invalid for screen ${context.screenName}.`,
      proposedSnapshot: context.recordSnapshot,
    };
  }

  if (!toolDef.allowedRoles.includes(context.operatorRole)) {
    return {
      previewId,
      toolName,
      targetRecordId: context.activeRecordId,
      isConsequential: toolDef.isConsequential,
      requiresExplicitConfirmation: false,
      diffItems: [],
      rationale: `Role "${context.operatorRole}" does not have authorization to execute "${toolName}".`,
      status: 'declined_unauthorized',
      declineReason: `Unauthorized: role "${context.operatorRole}" lacks permissions for ${toolName}.`,
      proposedSnapshot: context.recordSnapshot,
    };
  }

  // 3. Consequential evaluation: if consequential, require explicit confirmation diff
  const isConsequential = toolDef.isConsequential;
  const status = isConsequential ? 'pending_confirmation' : 'executed_immediately';

  return {
    previewId,
    toolName,
    targetRecordId: context.activeRecordId,
    isConsequential,
    requiresExplicitConfirmation: isConsequential,
    diffItems,
    rationale,
    status,
    proposedSnapshot,
  };
}

/**
 * Confirms or rejects an assistant action preview, applying updates with an immutable audit log
 */
export function confirmAndExecuteAssistantAction(
  preview: AssistantActionPreview,
  context: ScreenContext,
  isConfirmedByOperator: boolean
): {
  updatedRecord: Record<string, any>;
  auditLog?: ActionAuditLog;
  rejectionNotice?: string;
} {
  if (preview.status === 'declined_unauthorized' || preview.status === 'declined_unsupported') {
    throw new Error(`Cannot execute declined action preview: ${preview.declineReason}`);
  }

  if (!isConfirmedByOperator) {
    return {
      updatedRecord: context.recordSnapshot,
      rejectionNotice: `Operator ${context.operatorName} rejected proposed action ${preview.toolName}. No changes were applied.`,
    };
  }

  const nowIso = new Date().toISOString();
  const summary = preview.diffItems.map(d => `${d.field}: ${JSON.stringify(d.priorValue)} → ${JSON.stringify(d.proposedValue)}`).join('; ');

  const auditLog: ActionAuditLog = {
    logId: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    previewId: preview.previewId,
    toolName: preview.toolName,
    targetRecordId: preview.targetRecordId,
    operatorStaffId: context.operatorStaffId,
    operatorRole: context.operatorRole,
    executedAt: nowIso,
    diffSummary: summary,
    isConsequential: preview.isConsequential,
  };

  return {
    updatedRecord: preview.proposedSnapshot,
    auditLog,
  };
}
