/**
 * F126 — Service Readiness Rules
 *
 * Evaluates multi-factor service prerequisites (completed intake forms, valid patch tests,
 * signed treatment consents, certified staff qualifications, equipment, and unexpired stock)
 * before confirming appointment readiness.
 *
 * KEY INVARIANT (Basis: T; Gingr Pattern, WB F42, F43):
 * Professionally Approved Rules & Clinical Routing.
 * "Missing information routes to review rather than an automated diagnosis."
 * The system never performs automated medical eligibility decisions. Instead, it checks
 * practitioner-defined prerequisites. Missing items route to practitioner review with
 * a mandatory documented override audit trail.
 */

export type ReadinessPrerequisiteType =
  | 'intake_form'
  | 'patch_test'
  | 'consent_document'
  | 'staff_qualification'
  | 'equipment_available'
  | 'product_stock';

export interface ReadinessPrerequisite {
  id: string;
  type: ReadinessPrerequisiteType;
  title: string;
  description: string;
  isSatisfied: boolean;
  details?: string;
  lastCompletedDate?: string;
  expirationDate?: string;
}

export interface ServiceReadinessOverride {
  authorizedByPractitionerId: string;
  practitionerName: string;
  reason: string;
  timestampUtc: string;
}

export interface ServiceReadinessInput {
  appointmentId: string;
  serviceId: string;
  serviceName: string;
  clientId: string;
  clientName: string;
  practitionerId: string;
  prerequisites: ReadinessPrerequisite[];
  override?: ServiceReadinessOverride;
}

export interface ServiceReadinessVerdict {
  appointmentId: string;
  serviceId: string;
  status: 'ready' | 'action_required' | 'blocked_missing_prerequisite' | 'overridden_ready';
  satisfiedCount: number;
  totalCount: number;
  missingPrerequisites: ReadinessPrerequisite[];
  canPractitionerOverride: boolean;
  overrideApplied?: ServiceReadinessOverride;
  guidanceMessage: string;
}

/**
 * Evaluates whether an appointment satisfies all clinical and operational prerequisites.
 */
export function evaluateServiceReadiness(input: ServiceReadinessInput): ServiceReadinessVerdict {
  const missingPrerequisites = input.prerequisites.filter((p) => !p.isSatisfied);
  const totalCount = input.prerequisites.length;
  const satisfiedCount = totalCount - missingPrerequisites.length;

  // 1. Check if an override was already recorded
  if (input.override) {
    if (!input.override.reason || input.override.reason.trim().length < 5) {
      throw new Error('A valid clinical/operational reason (at least 5 characters) is required to override readiness rules.');
    }

    return {
      appointmentId: input.appointmentId,
      serviceId: input.serviceId,
      status: 'overridden_ready',
      satisfiedCount,
      totalCount,
      missingPrerequisites,
      canPractitionerOverride: true,
      overrideApplied: input.override,
      guidanceMessage: `Prerequisites overridden by ${input.override.practitionerName}: "${input.override.reason}". Appointment is cleared for treatment.`,
    };
  }

  // 2. All prerequisites satisfied
  if (missingPrerequisites.length === 0) {
    return {
      appointmentId: input.appointmentId,
      serviceId: input.serviceId,
      status: 'ready',
      satisfiedCount,
      totalCount,
      missingPrerequisites: [],
      canPractitionerOverride: true,
      guidanceMessage: 'All clinical and operational prerequisites verified. Service is ready to proceed.',
    };
  }

  // 3. Evaluate severity of missing prerequisites
  const hasStrictBlocker = missingPrerequisites.some(
    (p) => p.type === 'consent_document' || p.type === 'patch_test' || p.type === 'staff_qualification'
  );

  const status: ServiceReadinessVerdict['status'] = hasStrictBlocker
    ? 'blocked_missing_prerequisite'
    : 'action_required';

  const missingTitles = missingPrerequisites.map((p) => p.title).join(', ');
  const guidanceMessage = hasStrictBlocker
    ? `Service Blocked: Essential clinical safety requirements missing (${missingTitles}). Practitioner review and signed override required.`
    : `Action Required: Administrative prerequisites incomplete (${missingTitles}). Complete before check-in.`;

  return {
    appointmentId: input.appointmentId,
    serviceId: input.serviceId,
    status,
    satisfiedCount,
    totalCount,
    missingPrerequisites,
    canPractitionerOverride: true,
    guidanceMessage,
  };
}
