import { z } from 'zod';

/**
 * F073 — Tenant Identity & Access Control (Document DR07)
 *
 * Implements strict multi-tenant boundary isolation, least-privilege role-based access
 * control (RBAC), and immediate session revocation upon staff departure.
 *
 * Invariants (Foundation, DR07):
 * 1. Multi-Tenant Firewall: Requests with mismatched businessId strictly throw TenantSecurityViolations.
 * 2. Role-Based Least Privilege: Front-desk and marketing staff are firewalled from sensitive clinical SOAP notes.
 * 3. Instant Session Revocation: Deactivating a staff member immediately revokes all active bearer tokens.
 */

export const PosieRoleSchema = z.enum([
  'salon_owner',
  'studio_manager',
  'service_provider',
  'front_desk_coordinator',
  'independent_booth_renter',
  'client_consumer',
]);
export type PosieRole = z.infer<typeof PosieRoleSchema>;

export const SecurityPermissionActionSchema = z.enum([
  'view_financial_bank_payouts',
  'approve_time_cards',
  'view_client_clinical_soap_notes',
  'edit_client_intake_records',
  'checkin_reception_queue',
  'export_full_tenant_database',
]);
export type SecurityPermissionAction = z.infer<typeof SecurityPermissionActionSchema>;

export const ROLE_PERMISSION_MATRIX: Record<PosieRole, SecurityPermissionAction[]> = {
  salon_owner: [
    'view_financial_bank_payouts',
    'approve_time_cards',
    'view_client_clinical_soap_notes',
    'edit_client_intake_records',
    'checkin_reception_queue',
    'export_full_tenant_database',
  ],
  studio_manager: [
    'approve_time_cards',
    'view_client_clinical_soap_notes',
    'edit_client_intake_records',
    'checkin_reception_queue',
  ],
  service_provider: [
    'view_client_clinical_soap_notes',
    'edit_client_intake_records',
    'checkin_reception_queue',
  ],
  front_desk_coordinator: [
    'checkin_reception_queue',
  ],
  independent_booth_renter: [
    'view_client_clinical_soap_notes',
    'edit_client_intake_records',
    'checkin_reception_queue',
  ],
  client_consumer: [],
};

export const StaffUserAccountSchema = z.object({
  userId: z.string().uuid(),
  businessId: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string().min(1),
  role: PosieRoleSchema,
  isActive: z.boolean().default(true),
  activeSessionTokens: z.array(z.string()),
  deactivatedAt: z.string().datetime().nullable(),
  deactivationReason: z.string().nullable(),
});
export type StaffUserAccount = z.infer<typeof StaffUserAccountSchema>;

export class TenantSecurityViolation extends Error {
  constructor(message: string) {
    super(`TenantSecurityViolation: ${message}`);
    this.name = 'TenantSecurityViolation';
  }
}

/**
 * Enforces strict multi-tenant boundary. Verifies that resource belongs to request tenant.
 */
export function assertTenantBoundary(resourceBusinessId: string, requestBusinessId: string): void {
  if (resourceBusinessId !== requestBusinessId) {
    throw new TenantSecurityViolation(
      `Cross-tenant access blocked: Resource businessId ${resourceBusinessId} does not match caller businessId ${requestBusinessId}.`
    );
  }
}

/**
 * Verifies that the staff user has permission for a specific sensitive action (DR07).
 */
export function checkStaffPermission(
  staff: StaffUserAccount,
  action: SecurityPermissionAction
): { allowed: boolean; reason: string } {
  if (!staff.isActive) {
    return {
      allowed: false,
      reason: 'Access denied: Staff account has been deactivated.',
    };
  }

  const allowedActions = ROLE_PERMISSION_MATRIX[staff.role];
  const hasAction = allowedActions.includes(action);

  if (!hasAction) {
    return {
      allowed: false,
      reason: `Access denied: Role "${staff.role}" does not have privilege for action "${action}". (DR07 Recipient Firewall)`,
    };
  }

  return { allowed: true, reason: 'Action authorized.' };
}

/**
 * Deactivates a staff member upon departure and immediately revokes all active sessions.
 *
 * Invariant: Active session tokens are cleared instantly.
 */
export function deactivateStaffMember(
  staff: StaffUserAccount,
  reason: string
): StaffUserAccount {
  return StaffUserAccountSchema.parse({
    ...staff,
    isActive: false,
    activeSessionTokens: [], // Revoke all sessions immediately
    deactivatedAt: new Date().toISOString(),
    deactivationReason: reason,
  });
}
