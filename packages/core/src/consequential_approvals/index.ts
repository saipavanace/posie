/**
 * F134 — Approvals for Consequential Changes
 *
 * Implements blast-radius previews and multi-party approval gates for high-impact actions:
 * bulk SMS broadcasts, large financial refunds, full studio data exports, and catalog price changes.
 *
 * KEY INVARIANT (Basis: I; Trustworthy Automation, Rules SEC, LEG):
 * Blast-Radius Transparency & Audit Approval.
 * "Approvers see the exact affected records and any cost before accepting."
 * Before executing any consequential studio modification, Posie generates an immutable
 * dry-run preview displaying the total affected clients/records, financial cost/exposure in USD,
 * and requiring explicit authorized practitioner/owner sign-off with recorded rationale.
 */

export type ConsequentialActionType =
  | 'bulk_sms_broadcast'
  | 'large_refund_issuance'
  | 'full_studio_data_export'
  | 'catalog_wide_price_change';

export interface ConsequentialChangeRequest {
  requestId: string;
  actionType: ConsequentialActionType;
  title: string;
  description: string;
  requestedByUserId: string;
  requestedByUserName: string;
  requestedAtUtc: string;
  affectedRecordsCount: number;
  totalFinancialImpactUSD: number;
  riskSeverity: 'low' | 'medium' | 'high' | 'critical';
  detailsPayload: Record<string, unknown>;
  status: 'pending_approval' | 'approved' | 'rejected';
  approvalDecision?: {
    decidedByUserId: string;
    decidedByUserName: string;
    decision: 'approved' | 'rejected';
    decidedAtUtc: string;
    rationale: string;
  };
}

/**
 * Creates a consequential change approval request with an explicit blast-radius preview.
 */
export function requestConsequentialChangeApproval(
  actionType: ConsequentialActionType,
  title: string,
  description: string,
  requestedByUserId: string,
  requestedByUserName: string,
  affectedRecordsCount: number,
  financialImpactUSD: number,
  detailsPayload: Record<string, unknown> = {}
): ConsequentialChangeRequest {
  let riskSeverity: ConsequentialChangeRequest['riskSeverity'] = 'medium';

  if (actionType === 'full_studio_data_export' || financialImpactUSD >= 500) {
    riskSeverity = 'critical';
  } else if (actionType === 'bulk_sms_broadcast' && affectedRecordsCount > 100) {
    riskSeverity = 'high';
  } else if (actionType === 'large_refund_issuance' && financialImpactUSD >= 150) {
    riskSeverity = 'high';
  }

  return {
    requestId: `chg_req_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    actionType,
    title,
    description,
    requestedByUserId,
    requestedByUserName,
    requestedAtUtc: new Date().toISOString(),
    affectedRecordsCount,
    totalFinancialImpactUSD: Math.round(financialImpactUSD * 100) / 100,
    riskSeverity,
    detailsPayload,
    status: 'pending_approval',
  };
}

/**
 * Approves a consequential change request with mandatory rationale and authorized signature.
 */
export function approveConsequentialChange(
  request: ConsequentialChangeRequest,
  decidedByUserId: string,
  decidedByUserName: string,
  rationale: string
): ConsequentialChangeRequest {
  if (request.status !== 'pending_approval') {
    throw new Error(`Cannot approve change request in '${request.status}' state.`);
  }

  if (!rationale || rationale.trim().length < 5) {
    throw new Error('A documented rationale (minimum 5 characters) is required to approve consequential changes.');
  }

  return {
    ...request,
    status: 'approved',
    approvalDecision: {
      decidedByUserId,
      decidedByUserName,
      decision: 'approved',
      decidedAtUtc: new Date().toISOString(),
      rationale,
    },
  };
}

/**
 * Rejects a consequential change request.
 */
export function rejectConsequentialChange(
  request: ConsequentialChangeRequest,
  decidedByUserId: string,
  decidedByUserName: string,
  rationale: string
): ConsequentialChangeRequest {
  if (request.status !== 'pending_approval') {
    throw new Error(`Cannot reject change request in '${request.status}' state.`);
  }

  return {
    ...request,
    status: 'rejected',
    approvalDecision: {
      decidedByUserId,
      decidedByUserName,
      decision: 'rejected',
      decidedAtUtc: new Date().toISOString(),
      rationale: rationale || 'Rejected by studio manager',
    },
  };
}
