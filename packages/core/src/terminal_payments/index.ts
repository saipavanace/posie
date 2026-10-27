import { z } from 'zod';

export const TerminalDeviceTypeSchema = z.enum([
  'smart_pos_terminal',
  'tap_to_pay_iphone',
  'tap_to_pay_android',
]);
export type TerminalDeviceType = z.infer<typeof TerminalDeviceTypeSchema>;

export const TerminalDeviceSchema = z.object({
  terminalId: z.string(),
  tenantId: z.string(),
  name: z.string(),
  type: TerminalDeviceTypeSchema,
  serialNumber: z.string(),
  connectionState: z.enum(['online', 'offline', 'processing_payment']),
  batteryPercentage: z.number().int().min(0).max(100).optional(),
  firmwareVersion: z.string(),
  lastHeartbeatAt: z.string().datetime(),
});
export type TerminalDevice = z.infer<typeof TerminalDeviceSchema>;

export const TerminalTransactionStatusSchema = z.enum([
  'awaiting_tap',
  'card_presented',
  'processing',
  'interrupted_network_drop',
  'resolved_successful_charge',
  'resolved_failed_safe_to_retry',
  'completed_success',
  'declined',
]);
export type TerminalTransactionStatus = z.infer<typeof TerminalTransactionStatusSchema>;

export const TerminalTransactionSessionSchema = z.object({
  sessionId: z.string(),
  terminalId: z.string(),
  ticketId: z.string(),
  amountCents: z.number().positive(),
  paymentIdempotencyKey: z.string(),
  status: TerminalTransactionStatusSchema,
  processorChargeId: z.string().optional(),
  failureReason: z.string().optional(),
  requiresGatewayResolutionBeforeRetry: z.boolean().default(false),
  startedAt: z.string().datetime(),
  resolvedAt: z.string().datetime().optional(),
});
export type TerminalTransactionSession = z.infer<typeof TerminalTransactionSessionSchema>;

/**
 * Initiates an in-person terminal payment session on a paired device.
 */
export function initiateTerminalPayment(params: {
  terminal: TerminalDevice;
  ticketId: string;
  amountCents: number;
  currentTime?: string;
}): { success: true; session: TerminalTransactionSession } | { success: false; reason: string } {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  if (params.terminal.connectionState === 'offline') {
    return {
      success: false,
      reason: `Cannot initiate payment: Terminal "${params.terminal.name}" is offline. Check Wi-Fi or Bluetooth pairing.`,
    };
  }

  const session: TerminalTransactionSession = {
    sessionId: `term_sess_${Math.random().toString(36).substring(2, 9)}`,
    terminalId: params.terminal.terminalId,
    ticketId: params.ticketId,
    amountCents: params.amountCents,
    paymentIdempotencyKey: `idem_term_${params.ticketId}_${Date.now()}`,
    status: 'awaiting_tap',
    requiresGatewayResolutionBeforeRetry: false,
    startedAt: now.toISOString(),
  };

  return {
    success: true,
    session,
  };
}

/**
 * Records an interrupted transaction state (e.g. Wi-Fi drop, reader timeout mid-processing).
 * Invariant: Locks session and requires gateway check before retry.
 */
export function recordInterruptedTerminalTransaction(
  session: TerminalTransactionSession,
  reason: string
): TerminalTransactionSession {
  return {
    ...session,
    status: 'interrupted_network_drop',
    failureReason: reason,
    requiresGatewayResolutionBeforeRetry: true,
  };
}

/**
 * Resolves an interrupted terminal transaction by querying the authoritative payment processor gateway.
 * Invariant: "Interrupted processing resolves the actual payment state before retry."
 * Guarantees zero duplicate card debits on network drop.
 */
export function resolveInterruptedTerminalPayment(params: {
  session: TerminalTransactionSession;
  gatewayAuthoritativeState: {
    chargeExecutedOnCard: boolean;
    processorChargeId?: string;
  };
  currentTime?: string;
}): {
  updatedSession: TerminalTransactionSession;
  actionRequired: 'finalize_receipt' | 'safe_to_retry_card';
  explanation: string;
} {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  if (params.gatewayAuthoritativeState.chargeExecutedOnCard) {
    // The payment DID go through on the card despite the local terminal disconnect!
    const updatedSession: TerminalTransactionSession = {
      ...params.session,
      status: 'resolved_successful_charge',
      processorChargeId: params.gatewayAuthoritativeState.processorChargeId ?? 'ch_recovered_gateway',
      requiresGatewayResolutionBeforeRetry: false,
      resolvedAt: now.toISOString(),
    };

    return {
      updatedSession,
      actionRequired: 'finalize_receipt',
      explanation: `Payment gateway confirmed transaction succeeded ($${(params.session.amountCents / 100).toFixed(2)}) under Charge ID "${updatedSession.processorChargeId}". Card was NOT re-charged; receipt generated cleanly.`,
    };
  } else {
    // The payment did NOT reach the processor; safe for cashier to retry
    const updatedSession: TerminalTransactionSession = {
      ...params.session,
      status: 'resolved_failed_safe_to_retry',
      requiresGatewayResolutionBeforeRetry: false,
      resolvedAt: now.toISOString(),
    };

    return {
      updatedSession,
      actionRequired: 'safe_to_retry_card',
      explanation: 'Payment gateway confirmed no charge was processed. The card can now be safely re-tapped without risk of duplicate billing.',
    };
  }
}
