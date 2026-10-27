import { z } from 'zod';

/**
 * F072 — Customer Owned Contact Number & Telephony Portability
 *
 * Provides dedicated business phone lines for client calling and two-way texting
 * with full number ownership transparency, LOA port-out support, and A2P 10DLC compliance.
 *
 * Invariants (WB U19, BR09):
 * 1. Zero Hostage Telephony: The salon business owner is the legal registrant of their number.
 *    Porting out to any external carrier (e.g. Twilio, Dialpad, mobile carrier) is guaranteed with zero exit lock-in fees.
 * 2. Letter of Authorization (LOA): Generates standard telecommunication carrier porting documents
 *    with carrier account numbers, PINs, and authorized signature tokens.
 */

export const TelephonyNumberStatusSchema = z.enum([
  'provisioning',
  'active_verified',
  'port_in_pending',
  'port_out_requested',
  'ported_out_and_released',
]);
export type TelephonyNumberStatus = z.infer<typeof TelephonyNumberStatusSchema>;

export const A2pComplianceStatusSchema = z.enum([
  'unregistered',
  'brand_registered',
  'campaign_approved_active',
  'vetting_action_required',
]);
export type A2pComplianceStatus = z.infer<typeof A2pComplianceStatusSchema>;

export const PortingCarrierDocumentSchema = z.object({
  loaId: z.string().uuid(),
  businessLegalName: z.string().min(1),
  authorizedSignerName: z.string().min(1),
  serviceAddress: z.string().min(5),
  currentCarrierName: z.string().default('Posie Communications Partner / Bandwidth'),
  targetCarrierName: z.string().min(1),
  billingTelephoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/),
  accountNumber: z.string().min(4),
  pinPasscode: z.string().min(4),
  generatedAt: z.string().datetime(),
  signatureToken: z.string().min(6),
});
export type PortingCarrierDocument = z.infer<typeof PortingCarrierDocumentSchema>;

export const CustomerOwnedNumberSchema = z.object({
  id: z.string().uuid(),
  businessId: z.string().uuid(),
  e164PhoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/), // E.g. "+15125550199"
  formattedDisplayNumber: z.string().min(10),            // E.g. "(512) 555-0199"
  status: TelephonyNumberStatusSchema,
  a2p10DlcStatus: A2pComplianceStatusSchema,
  monthlyTelephonyFeeCents: z.number().int().nonnegative().default(1500), // $15/mo line fee
  portingOutAllowed: z.literal(true).default(true),      // Invariant: Always allowed

  // Carrier Porting Credentials
  carrierAccountRef: z.string().min(4),
  portingPinPasscode: z.string().min(4),
  lastPortDocument: PortingCarrierDocumentSchema.nullable(),
  registeredAt: z.string().datetime(),
  releasedAt: z.string().datetime().nullable(),
});
export type CustomerOwnedNumber = z.infer<typeof CustomerOwnedNumberSchema>;

/**
 * Provisions a dedicated customer-owned business phone number with transparent ownership terms.
 */
export function provisionCustomerOwnedNumber(params: {
  businessId: string;
  e164PhoneNumber: string;
  formattedDisplayNumber: string;
  isExistingNumberPortIn?: boolean;
}): CustomerOwnedNumber {
  const id = crypto.randomUUID ? crypto.randomUUID() : 'f0720000-0000-4000-8000-000000000001';
  const now = new Date().toISOString();
  const carrierAccountRef = `POSIE-TEL-${params.businessId.slice(0, 8).toUpperCase()}`;
  const portingPinPasscode = Math.floor(1000 + Math.random() * 9000).toString();

  return CustomerOwnedNumberSchema.parse({
    id,
    businessId: params.businessId,
    e164PhoneNumber: params.e164PhoneNumber,
    formattedDisplayNumber: params.formattedDisplayNumber,
    status: params.isExistingNumberPortIn ? 'port_in_pending' : 'active_verified',
    a2p10DlcStatus: 'campaign_approved_active',
    monthlyTelephonyFeeCents: 1500, // $15.00/mo
    portingOutAllowed: true,
    carrierAccountRef,
    portingPinPasscode,
    lastPortDocument: null,
    registeredAt: now,
    releasedAt: null,
  });
}

/**
 * Generates an official Letter of Authorization (LOA) for the owner to port their number out to another carrier.
 *
 * Invariant: Posie guarantees number portability without holding telephone assets hostage.
 */
export function generatePortOutLoaDocument(
  telephony: CustomerOwnedNumber,
  params: {
    businessLegalName: string;
    authorizedSignerName: string;
    serviceAddress: string;
    targetCarrierName: string;
    signatureToken: string;
  }
): { updatedTelephony: CustomerOwnedNumber; loaDocument: PortingCarrierDocument } {
  const loaId = crypto.randomUUID ? crypto.randomUUID() : 'f0720000-0000-4000-8000-000000000002';
  const now = new Date().toISOString();

  const loaDocument: PortingCarrierDocument = {
    loaId,
    businessLegalName: params.businessLegalName,
    authorizedSignerName: params.authorizedSignerName,
    serviceAddress: params.serviceAddress,
    currentCarrierName: 'Posie Communications Partner / Bandwidth',
    targetCarrierName: params.targetCarrierName,
    billingTelephoneNumber: telephony.e164PhoneNumber,
    accountNumber: telephony.carrierAccountRef,
    pinPasscode: telephony.portingPinPasscode,
    generatedAt: now,
    signatureToken: params.signatureToken,
  };

  const updatedTelephony = CustomerOwnedNumberSchema.parse({
    ...telephony,
    status: 'port_out_requested',
    lastPortDocument: loaDocument,
  });

  return { updatedTelephony, loaDocument };
}
