/**
 * F195: Assisted Completion Without a Smartphone
 *
 * Allows clients to book, review policies, and complete necessary intake/consent steps
 * via telephone operators, counter tablets, or physical wet-signed paper records without requiring a personal smartphone.
 * Invariant: Never fabricates an e-signature or marks failed messages as delivered;
 * supports secure wet-signed paper scan attachments, verbal policy read-backs, and transparent staff attribution.
 */

export type AssistedChannel = 'phone_operator_assisted' | 'front_desk_counter_tablet' | 'physical_paper_wet_signed';

export interface VerbalPolicyReadBackConfirmation {
  policyReadBackCompleted: boolean;
  readBackByStaffId: string;
  readBackTimestamp: string;
  cancellationTermsAcknowledged: boolean;
  totalServicePriceQuotedUsd: number;
}

export interface PaperDocumentAttachment {
  attachmentId: string;
  documentType: 'intake_form' | 'consent_waiver' | 'cancellation_agreement';
  scannedDocumentUrl: string;
  scannedAt: string;
  uploadedByStaffId: string;
  clientPhysicalSignatureVerified: boolean;
}

export interface NonSmartphoneBookingRecord {
  bookingId: string;
  salonId: string;
  serviceId: string;
  clientInfo: {
    fullName: string;
    contactPhone: string;
    hasSmartphoneOrEmail: boolean;
    postalAddress?: string;
  };
  channel: AssistedChannel;
  assistingStaffId: string;
  verbalConfirmation?: VerbalPolicyReadBackConfirmation;
  paperAttachment?: PaperDocumentAttachment;
  electronicSignatureFabricated: false; // Invariant: Posie strictly prohibits staff fabricating digital signatures
  unresolvedDigitalSteps: string[];
  createdAt: string;
  status: 'assisted_confirmed' | 'pending_paper_scan';
}

/**
 * Creates an assisted booking for clients without smartphone or email access.
 * Invariant: Enforces either verbal read-back confirmation (phone) or counter/paper verification,
 * logs staff attribution, and keeps unresolved digital steps visible.
 */
export function createAssistedNonSmartphoneBooking(params: {
  bookingId: string;
  salonId: string;
  serviceId: string;
  clientInfo: {
    fullName: string;
    contactPhone: string;
    hasSmartphoneOrEmail: boolean;
    postalAddress?: string;
  };
  channel: AssistedChannel;
  assistingStaffId: string;
  verbalConfirmation?: VerbalPolicyReadBackConfirmation;
  paperAttachment?: PaperDocumentAttachment;
}): NonSmartphoneBookingRecord {
  const unresolvedDigitalSteps: string[] = [];

  if (!params.clientInfo.hasSmartphoneOrEmail) {
    unresolvedDigitalSteps.push('ONLINE_PORTAL_ACCOUNT_UNAVAILABLE');
    unresolvedDigitalSteps.push('SMS_APPOINTMENT_REMINDERS_UNROUTED');
  }

  if (params.channel === 'physical_paper_wet_signed' && !params.paperAttachment) {
    unresolvedDigitalSteps.push('PHYSICAL_PAPER_SCAN_PENDING_ATTACHMENT');
  }

  // If phone booking, require verbal read-back confirmation
  if (params.channel === 'phone_operator_assisted') {
    if (!params.verbalConfirmation || !params.verbalConfirmation.policyReadBackCompleted) {
      throw new Error('Compliance Violation: Phone-assisted bookings mandate verbal read-back confirmation of service price and cancellation policy.');
    }
  }

  const isPendingPaper = params.channel === 'physical_paper_wet_signed' && !params.paperAttachment;

  return {
    bookingId: params.bookingId,
    salonId: params.salonId,
    serviceId: params.serviceId,
    clientInfo: params.clientInfo,
    channel: params.channel,
    assistingStaffId: params.assistingStaffId,
    verbalConfirmation: params.verbalConfirmation,
    paperAttachment: params.paperAttachment,
    electronicSignatureFabricated: false,
    unresolvedDigitalSteps,
    createdAt: new Date().toISOString(),
    status: isPendingPaper ? 'pending_paper_scan' : 'assisted_confirmed',
  };
}

/**
 * Attaches a scanned physical wet-signed paper document to an assisted booking,
 * resolving the paper-scan requirement without inventing a fake digital signature.
 */
export function attachWetSignedPaperScan(
  booking: NonSmartphoneBookingRecord,
  attachment: PaperDocumentAttachment
): NonSmartphoneBookingRecord {
  if (!attachment.clientPhysicalSignatureVerified) {
    throw new Error('Verification Error: Staff must verify the presence of a physical wet signature on the scanned document.');
  }

  const unresolved = booking.unresolvedDigitalSteps.filter(
    (step) => step !== 'PHYSICAL_PAPER_SCAN_PENDING_ATTACHMENT'
  );

  return {
    ...booking,
    paperAttachment: attachment,
    unresolvedDigitalSteps: unresolved,
    status: 'assisted_confirmed',
  };
}
