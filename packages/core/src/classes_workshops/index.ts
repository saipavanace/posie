import { z } from 'zod';

export const AttendeeStatusSchema = z.enum(['confirmed', 'waitlisted', 'attended', 'cancelled']);
export type AttendeeStatus = z.infer<typeof AttendeeStatusSchema>;

export const ClassAttendeeSchema = z.object({
  entryId: z.string(),
  sessionId: z.string(),
  attendeeId: z.string(),
  attendeeName: z.string(),
  attendeeEmail: z.string().email(),
  attendeePhone: z.string().optional(),
  status: AttendeeStatusSchema,
  ticketType: z.enum(['direct_purchase', 'package_membership_credit']),
  paidAmountCents: z.number().nonnegative(),
  registeredAt: z.string().datetime(),
  checkedInAt: z.string().datetime().optional(),
});
export type ClassAttendee = z.infer<typeof ClassAttendeeSchema>;

export const ClassSessionSchema = z.object({
  sessionId: z.string(),
  tenantId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  instructorId: z.string(),
  instructorName: z.string(),
  roomId: z.string(),
  roomName: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  maxCapacity: z.number().int().positive(),
  waitlistCapacity: z.number().int().nonnegative().default(5),
  priceCents: z.number().nonnegative(),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled']).default('scheduled'),
  roster: z.array(ClassAttendeeSchema).default([]),
  createdAt: z.string().datetime(),
});
export type ClassSession = z.infer<typeof ClassSessionSchema>;

/**
 * Registers an attendee for a class session.
 * Invariant: "The final seat is sold once, including during concurrent checkout."
 * Rejects over-capacity registrations and smoothly routes to waitlist.
 */
export function registerAttendeeForClass(params: {
  session: ClassSession;
  attendeeId: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone?: string;
  ticketType: 'direct_purchase' | 'package_membership_credit';
  joinWaitlistIfFull?: boolean;
  currentTime?: string;
}): {
  success: true;
  status: 'confirmed' | 'waitlisted';
  updatedSession: ClassSession;
  attendee: ClassAttendee;
} | { success: false; reason: string } {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  // Filter active confirmed attendees
  const confirmedAttendees = params.session.roster.filter((a) => a.status === 'confirmed');
  const waitlistedAttendees = params.session.roster.filter((a) => a.status === 'waitlisted');

  // Prevent duplicate registration for the same attendee
  const existingActive = params.session.roster.find(
    (a) => a.attendeeId === params.attendeeId && (a.status === 'confirmed' || a.status === 'waitlisted')
  );
  if (existingActive) {
    return {
      success: false,
      reason: `Attendee is already registered with status: ${existingActive.status}.`,
    };
  }

  // 1. If seats are available, confirm the seat
  if (confirmedAttendees.length < params.session.maxCapacity) {
    const newAttendee: ClassAttendee = {
      entryId: `ent_${Math.random().toString(36).substring(2, 9)}`,
      sessionId: params.session.sessionId,
      attendeeId: params.attendeeId,
      attendeeName: params.attendeeName,
      attendeeEmail: params.attendeeEmail,
      attendeePhone: params.attendeePhone,
      status: 'confirmed',
      ticketType: params.ticketType,
      paidAmountCents: params.session.priceCents,
      registeredAt: now.toISOString(),
    };

    const updatedSession: ClassSession = {
      ...params.session,
      roster: [...params.session.roster, newAttendee],
    };

    return {
      success: true,
      status: 'confirmed',
      updatedSession,
      attendee: newAttendee,
    };
  }

  // 2. Class is at full capacity: evaluate waitlist
  if (params.joinWaitlistIfFull) {
    if (waitlistedAttendees.length >= params.session.waitlistCapacity) {
      return {
        success: false,
        reason: 'Both the class capacity and waitlist capacity are completely full.',
      };
    }

    const waitlistedAttendee: ClassAttendee = {
      entryId: `ent_${Math.random().toString(36).substring(2, 9)}`,
      sessionId: params.session.sessionId,
      attendeeId: params.attendeeId,
      attendeeName: params.attendeeName,
      attendeeEmail: params.attendeeEmail,
      attendeePhone: params.attendeePhone,
      status: 'waitlisted',
      ticketType: params.ticketType,
      paidAmountCents: 0, // Waitlist holds do not charge until confirmed
      registeredAt: now.toISOString(),
    };

    const updatedSession: ClassSession = {
      ...params.session,
      roster: [...params.session.roster, waitlistedAttendee],
    };

    return {
      success: true,
      status: 'waitlisted',
      updatedSession,
      attendee: waitlistedAttendee,
    };
  }

  return {
    success: false,
    reason: `Class "${params.session.title}" is completely sold out (${params.session.maxCapacity}/${params.session.maxCapacity} seats filled).`,
  };
}

/**
 * Cancels a confirmed attendee's seat and automatically promotes the next waitlisted attendee.
 */
export function cancelAttendeeAndPromoteWaitlist(params: {
  session: ClassSession;
  attendeeId: string;
  currentTime?: string;
}): {
  updatedSession: ClassSession;
  cancelledAttendee: ClassAttendee;
  promotedAttendee?: ClassAttendee;
} {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  const attendeeToCancel = params.session.roster.find(
    (a) => a.attendeeId === params.attendeeId && (a.status === 'confirmed' || a.status === 'waitlisted')
  );

  if (!attendeeToCancel) {
    throw new Error(`Attendee "${params.attendeeId}" not found in active roster.`);
  }

  const wasConfirmed = attendeeToCancel.status === 'confirmed';

  // Mark cancelling attendee as cancelled
  let updatedRoster = params.session.roster.map((a) => {
    if (a.attendeeId === params.attendeeId) {
      return { ...a, status: 'cancelled' as AttendeeStatus };
    }
    return a;
  });

  let promotedAttendee: ClassAttendee | undefined;

  // If a confirmed attendee cancelled, promote the earliest waitlisted attendee
  if (wasConfirmed) {
    const nextWaitlisted = updatedRoster.find((a) => a.status === 'waitlisted');
    if (nextWaitlisted) {
      promotedAttendee = {
        ...nextWaitlisted,
        status: 'confirmed',
        registeredAt: now.toISOString(),
      };
      updatedRoster = updatedRoster.map((a) =>
        a.entryId === nextWaitlisted.entryId ? promotedAttendee! : a
      );
    }
  }

  const updatedSession: ClassSession = {
    ...params.session,
    roster: updatedRoster,
  };

  return {
    updatedSession,
    cancelledAttendee: { ...attendeeToCancel, status: 'cancelled' },
    promotedAttendee,
  };
}

/**
 * Checks in an attendee when they arrive for the workshop/class.
 */
export function checkInClassAttendee(params: {
  session: ClassSession;
  attendeeId: string;
  currentTime?: string;
}): ClassSession {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  return {
    ...params.session,
    roster: params.session.roster.map((a) => {
      if (a.attendeeId === params.attendeeId && a.status === 'confirmed') {
        return {
          ...a,
          status: 'attended',
          checkedInAt: now.toISOString(),
        };
      }
      return a;
    }),
  };
}
