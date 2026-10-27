import { z } from 'zod';

export const GroupMemberAgeCategorySchema = z.enum(['adult', 'minor']);
export type GroupMemberAgeCategory = z.infer<typeof GroupMemberAgeCategorySchema>;

export const GroupPartyMemberSchema = z.object({
  memberId: z.string(),
  fullName: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  ageCategory: GroupMemberAgeCategorySchema,
  assignedServiceId: z.string(),
  assignedServiceName: z.string(),
  servicePriceCents: z.number().nonnegative(),
  practitionerId: z.string(),
  practitionerName: z.string(),
  stationResourceId: z.string().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  confidentialIntakeNotes: z.string().optional(), // Sensitive medical/contraindication info
  guardianMemberId: z.string().optional(), // For minors
  intakeSigned: z.boolean().default(false),
});
export type GroupPartyMember = z.infer<typeof GroupPartyMemberSchema>;

export const GroupBookingProposalSchema = z.object({
  groupId: z.string(),
  tenantId: z.string(),
  eventTitle: z.string(), // e.g. "Sophie's Bridal Party Glow Day"
  organizerMemberId: z.string(),
  organizerName: z.string(),
  organizerEmail: z.string(),
  eventDate: z.string(),
  venueType: z.enum(['in_salon', 'on_location']),
  members: z.array(GroupPartyMemberSchema),
  depositRequiredCents: z.number().nonnegative(),
  depositPaidCents: z.number().nonnegative().default(0),
  totalEstimatedCents: z.number().nonnegative(),
  paymentPreference: z.enum(['single_organizer_payer', 'individual_guest_checkout']),
  status: z.enum(['draft', 'organizer_approved', 'confirmed', 'completed', 'cancelled']),
  version: z.number().int().positive().default(1),
  createdAt: z.string().datetime(),
});
export type GroupBookingProposal = z.infer<typeof GroupBookingProposalSchema>;

export const DayOfPartyItineraryItemSchema = z.object({
  memberId: z.string(),
  memberName: z.string(),
  serviceName: z.string(),
  practitionerName: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  stationOrRoom: z.string(),
  intakeStatus: z.enum(['pending', 'completed']),
  // Notice: confidential medical notes are deliberately omitted from shared view!
});
export type DayOfPartyItineraryItem = z.infer<typeof DayOfPartyItineraryItemSchema>;

export const DayOfEventPacketDocSchema = z.object({
  packetId: z.string(),
  groupId: z.string(),
  eventTitle: z.string(),
  eventDate: z.string(),
  organizerName: z.string(),
  scheduleItems: z.array(DayOfPartyItineraryItemSchema),
  commercialSummary: z.object({
    totalServicesCount: z.number(),
    subtotalCents: z.number(),
    depositPaidCents: z.number(),
    balanceRemainingCents: z.number(),
  }),
  privacyNotice: z.string(),
  generatedAt: z.string().datetime(),
});
export type DayOfEventPacketDoc = z.infer<typeof DayOfEventPacketDocSchema>;

/**
 * Creates a structured group booking proposal (Document D22).
 */
export function createGroupBookingProposal(params: {
  tenantId: string;
  eventTitle: string;
  organizer: {
    fullName: string;
    email: string;
    phone: string;
  };
  eventDate: string;
  venueType: 'in_salon' | 'on_location';
  members: Array<{
    fullName: string;
    email?: string;
    phone?: string;
    ageCategory: 'adult' | 'minor';
    guardianMemberId?: string;
    assignedServiceId: string;
    assignedServiceName: string;
    servicePriceCents: number;
    practitionerId: string;
    practitionerName: string;
    stationResourceId?: string;
    startTime: string;
    endTime: string;
    confidentialIntakeNotes?: string;
  }>;
  depositPercentage?: number; // default 30%
  paymentPreference?: 'single_organizer_payer' | 'individual_guest_checkout';
  currentTime?: string;
}): GroupBookingProposal {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();
  const groupId = `grp_${Math.random().toString(36).substring(2, 9)}`;
  const organizerMemberId = `mbr_org_${Math.random().toString(36).substring(2, 7)}`;

  const builtMembers: GroupPartyMember[] = params.members.map((m, idx) => ({
    memberId: idx === 0 ? organizerMemberId : `mbr_${idx + 1}_${Math.random().toString(36).substring(2, 7)}`,
    fullName: m.fullName,
    email: m.email,
    phone: m.phone,
    ageCategory: m.ageCategory,
    assignedServiceId: m.assignedServiceId,
    assignedServiceName: m.assignedServiceName,
    servicePriceCents: m.servicePriceCents,
    practitionerId: m.practitionerId,
    practitionerName: m.practitionerName,
    stationResourceId: m.stationResourceId,
    startTime: m.startTime,
    endTime: m.endTime,
    confidentialIntakeNotes: m.confidentialIntakeNotes,
    guardianMemberId: m.guardianMemberId,
    intakeSigned: false,
  }));

  const totalEstimatedCents = builtMembers.reduce((sum, m) => sum + m.servicePriceCents, 0);
  const depositRatio = (params.depositPercentage ?? 30) / 100;
  const depositRequiredCents = Math.round(totalEstimatedCents * depositRatio);

  return {
    groupId,
    tenantId: params.tenantId,
    eventTitle: params.eventTitle,
    organizerMemberId,
    organizerName: params.organizer.fullName,
    organizerEmail: params.organizer.email,
    eventDate: params.eventDate,
    venueType: params.venueType,
    members: builtMembers,
    depositRequiredCents,
    depositPaidCents: 0,
    totalEstimatedCents,
    paymentPreference: params.paymentPreference ?? 'single_organizer_payer',
    status: 'draft',
    version: 1,
    createdAt: now.toISOString(),
  };
}

/**
 * Checks whether a requesting party member has authorization to view confidential medical records of another member.
 * Invariant: "A guardian does not automatically gain access to another adult's private records."
 */
export function canAccessMemberConfidentialRecords(params: {
  requesterMemberId: string;
  targetMember: GroupPartyMember;
}): { authorized: boolean; reason: string } {
  // 1. Target can always view their own confidential record
  if (params.requesterMemberId === params.targetMember.memberId) {
    return {
      authorized: true,
      reason: 'Member accessing their own personal confidential intake record.',
    };
  }

  // 2. If target is a minor, authorized guardian can view
  if (
    params.targetMember.ageCategory === 'minor' &&
    params.targetMember.guardianMemberId === params.requesterMemberId
  ) {
    return {
      authorized: true,
      reason: 'Authorized guardian access to minor family member medical records.',
    };
  }

  // 3. Adults' medical records are strictly firewalled from guardians and organizers!
  if (params.targetMember.ageCategory === 'adult') {
    return {
      authorized: false,
      reason: 'Privacy Firewall: Adult party member intake and medical notes cannot be accessed by other guests or the event organizer.',
    };
  }

  return {
    authorized: false,
    reason: 'Unauthorized access to party member medical record.',
  };
}

/**
 * Generates the Day-of Event Packet (Document D22).
 * Strips all confidential intake notes so the document can be safely printed or shared with the organizer.
 */
export function generateDayOfEventPacket(
  proposal: GroupBookingProposal,
  currentTime?: string
): DayOfEventPacketDoc {
  const now = currentTime ? new Date(currentTime) : new Date();

  const scheduleItems: DayOfPartyItineraryItem[] = proposal.members.map((m) => ({
    memberId: m.memberId,
    memberName: m.fullName,
    serviceName: m.assignedServiceName,
    practitionerName: m.practitionerName,
    startTime: m.startTime,
    endTime: m.endTime,
    stationOrRoom: m.stationResourceId ?? 'Main Styling Floor',
    intakeStatus: m.intakeSigned ? 'completed' : 'pending',
  }));

  const subtotalCents = proposal.totalEstimatedCents;
  const balanceRemainingCents = Math.max(0, subtotalCents - proposal.depositPaidCents);

  return {
    packetId: `pkt_${Math.random().toString(36).substring(2, 9)}`,
    groupId: proposal.groupId,
    eventTitle: proposal.eventTitle,
    eventDate: proposal.eventDate,
    organizerName: proposal.organizerName,
    scheduleItems,
    commercialSummary: {
      totalServicesCount: proposal.members.length,
      subtotalCents,
      depositPaidCents: proposal.depositPaidCents,
      balanceRemainingCents,
    },
    privacyNotice:
      'Confidential Medical Firewall: Individual health disclosures, contraindications, and signed medical consents are maintained separately in each guest\'s clinical file and omitted from this shared event itinerary.',
    generatedAt: now.toISOString(),
  };
}
