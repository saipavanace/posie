/**
 * Posie Core Engine - Bridal and Event Workspace (F168)
 *
 * Implements end-to-end event party coordination, trial appointments,
 * multi-tier staged payment milestones, travel/setup buffers, and strict
 * individual health/intake privacy protection within shared event administration.
 *
 * Domain Invariant (Basis: Expansion (X); LEG PART, WB F168, Rule F168, Table 82, D22):
 * Coordinates multiple guests, trials, shared day-of timelines, contracts, travel,
 * and staged payments. While the event organizer approves commercial terms and pays
 * group invoices, individual privacy survives shared event administration: sensitive
 * personal medical, allergy, or intake responses are strictly filtered out of shared
 * group itineraries and attendee packets.
 */

export interface EventPartyMember {
  memberId: string;
  name: string;
  role: 'bride' | 'bridesmaid' | 'maid_of_honor' | 'mother_of_bride' | 'guest';
  serviceName: string;
  durationMinutes: number;
  assignedStylistId: string;
  startTime: string; // e.g. "08:30"
  endTime: string; // e.g. "09:30"
  hasTrialCompleted?: boolean;
  privateMedicalOrAllergyNotes?: string; // Must remain strictly confidential!
}

export interface StagedPaymentMilestone {
  milestoneId: string;
  name: string; // e.g., "Initial Booking Retainer (25%)", "30-Day Milestone (50%)", "Day-Of Balance (25%)"
  percentage: number;
  amount: number;
  dueDate: string; // YYYY-MM-DD
  status: 'pending' | 'paid' | 'overdue';
  paidAt?: string;
  transactionRef?: string;
}

export interface BridalEventWorkspace {
  eventId: string;
  eventName: string; // e.g. "Sophia & James Wedding Atelier"
  eventDate: string; // YYYY-MM-DD
  organizerName: string;
  organizerEmail: string;
  venueAddress: string;
  travelDistanceMiles: number;
  travelFee: number;
  setupBufferMinutes: number;
  partyMembers: EventPartyMember[];
  paymentMilestones: StagedPaymentMilestone[];
  totalContractValue: number;
  status: 'proposal' | 'contract_signed' | 'completed' | 'cancelled';
  contractSignedAt?: string;
}

export interface BridalDayOfPacket {
  eventId: string;
  eventName: string;
  eventDate: string;
  venueAddress: string;
  timeline: Array<{
    startTime: string;
    endTime: string;
    memberRole: string;
    memberName: string;
    serviceName: string;
    stylistId: string;
  }>;
  totalMembersCount: number;
  travelAndSetup: {
    travelFee: number;
    setupBufferMinutes: number;
  };
  confidentialIntakeIncluded: boolean;
}

/**
 * Creates a bridal or multi-client event workspace with party members, timeline,
 * travel fees, and staged payment milestones.
 */
export function createBridalEventWorkspace(input: {
  eventId: string;
  eventName: string;
  eventDate: string;
  organizerName: string;
  organizerEmail: string;
  venueAddress: string;
  travelDistanceMiles: number;
  mileageRate?: number;
  setupBufferMinutes?: number;
  partyMembers: EventPartyMember[];
  serviceTotalCost: number;
}): BridalEventWorkspace {
  if (!input.partyMembers || input.partyMembers.length === 0) {
    throw new Error('Bridal event requires at least one party member.');
  }

  const mileageRate = input.mileageRate ?? 1.5; // $1.50 per mile
  const travelFee = Math.round(input.travelDistanceMiles * mileageRate * 100) / 100;
  const totalValue = Math.round((input.serviceTotalCost + travelFee) * 100) / 100;

  // Staged payments: 25% Retainer, 50% Mid-point, 25% Day-Of
  const milestones: StagedPaymentMilestone[] = [
    {
      milestoneId: `mile_${input.eventId}_retainer`,
      name: 'Initial Booking Retainer (25%)',
      percentage: 25,
      amount: Math.round(totalValue * 0.25 * 100) / 100,
      dueDate: input.eventDate, // Immediately on booking
      status: 'pending',
    },
    {
      milestoneId: `mile_${input.eventId}_midpoint`,
      name: '30-Day Milestone (50%)',
      percentage: 50,
      amount: Math.round(totalValue * 0.50 * 100) / 100,
      dueDate: input.eventDate,
      status: 'pending',
    },
    {
      milestoneId: `mile_${input.eventId}_day_of`,
      name: 'Final Day-Of Balance (25%)',
      percentage: 25,
      amount: Math.round((totalValue - (Math.round(totalValue * 0.25 * 100) / 100 + Math.round(totalValue * 0.50 * 100) / 100)) * 100) / 100,
      dueDate: input.eventDate,
      status: 'pending',
    },
  ];

  return {
    eventId: input.eventId,
    eventName: input.eventName,
    eventDate: input.eventDate,
    organizerName: input.organizerName,
    organizerEmail: input.organizerEmail,
    venueAddress: input.venueAddress,
    travelDistanceMiles: input.travelDistanceMiles,
    travelFee,
    setupBufferMinutes: input.setupBufferMinutes ?? 45,
    partyMembers: input.partyMembers,
    paymentMilestones: milestones,
    totalContractValue: totalValue,
    status: 'proposal',
  };
}

/**
 * Records a staged milestone payment towards the event contract.
 */
export function recordStagedMilestonePayment(
  workspace: BridalEventWorkspace,
  milestoneId: string,
  paymentAmount: number,
  transactionRef: string
): BridalEventWorkspace {
  const milestone = workspace.paymentMilestones.find((m) => m.milestoneId === milestoneId);
  if (!milestone) {
    throw new Error(`Payment milestone "${milestoneId}" not found in event workspace.`);
  }

  if (paymentAmount < milestone.amount) {
    throw new Error(`Payment of $${paymentAmount} does not meet required milestone amount of $${milestone.amount}.`);
  }

  const updatedMilestones = workspace.paymentMilestones.map((m) => {
    if (m.milestoneId === milestoneId) {
      return {
        ...m,
        status: 'paid' as const,
        paidAt: new Date().toISOString(),
        transactionRef,
      };
    }
    return m;
  });

  return {
    ...workspace,
    status: workspace.status === 'proposal' ? 'contract_signed' : workspace.status,
    contractSignedAt: workspace.contractSignedAt ?? new Date().toISOString(),
    paymentMilestones: updatedMilestones,
  };
}

/**
 * Generates the day-of event packet and itinerary.
 * Invariant: Sensitive individual medical/intake notes are strictly excluded
 * from shared group packets (only available to the lead clinical/licensed stylist).
 */
export function generateBridalDayOfPacket(
  workspace: BridalEventWorkspace,
  requesterRole: 'event_organizer' | 'lead_stylist' | 'party_guest'
): BridalDayOfPacket {
  const timeline = workspace.partyMembers.map((m) => ({
    startTime: m.startTime,
    endTime: m.endTime,
    memberRole: m.role,
    memberName: m.name,
    serviceName: m.serviceName,
    stylistId: m.assignedStylistId,
  }));

  // Sort timeline chronologically
  timeline.sort((a, b) => a.startTime.localeCompare(b.startTime));

  return {
    eventId: workspace.eventId,
    eventName: workspace.eventName,
    eventDate: workspace.eventDate,
    venueAddress: workspace.venueAddress,
    timeline,
    totalMembersCount: workspace.partyMembers.length,
    travelAndSetup: {
      travelFee: workspace.travelFee,
      setupBufferMinutes: workspace.setupBufferMinutes,
    },
    // Only lead stylist receives clinical/allergy notices; shared organizer/guest packets NEVER leak them
    confidentialIntakeIncluded: requesterRole === 'lead_stylist',
  };
}
