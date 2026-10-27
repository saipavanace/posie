import { describe, it, expect } from 'vitest';
import {
  BrandKitSchema,
  updateBrandKit,
  getEffectiveServiceQuote,
  calculateInclusiveServicePrice,
  formatCanonicalLocationSummary,
  getUnifiedClientTimeline,
  resolveEffectiveServicePolicy,
  checkCalendarConflict,
  syncRemindersOnReschedule,
} from './index';

describe('Posie Core Logic - F001 (Brand Kit)', () => {
  const sampleBrand = {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    businessName: 'Posie Beauty Atelier',
    tagline: 'Glow up without the headache',
    contactEmail: 'hello@posieatelier.com',
    contactPhone: '+1-555-0199',
    logoSvg: '<svg><circle r="10"/></svg>',
    accentColor: '#C67D6E',
    toneOfVoice: 'quirky-playful' as const,
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('validates a correct brand kit structure', () => {
    const parsed = BrandKitSchema.parse(sampleBrand);
    expect(parsed.businessName).toBe('Posie Beauty Atelier');
  });
});

describe('Posie Core Logic - F026 (Service-Specific Policy Rules)', () => {
  const chemicalPeelPolicy = {
    serviceId: 'c8172c3d-d6a9-4519-9e8c-8f24c30c33ef',
    depositPercentage: 50, // 50% deposit for peel
    cancellationWindowHours: 48, // 48-hr cancellation requirement
    preparationInstructions: 'Stop retinol 72 hours prior.',
    requiredWaiverCategory: 'chemical_peel_waiver' as const,
    lateCancelFeePercentage: 100,
  };

  it('resolves tailored deposit and cancellation window for high-prep services', () => {
    const policy = resolveEffectiveServicePolicy(chemicalPeelPolicy);
    expect(policy.depositPercentage).toBe(50);
    expect(policy.cancellationWindowHours).toBe(48);
    expect(policy.requiredWaiverCategory).toBe('chemical_peel_waiver');
  });

  it('falls back to studio defaults when no service-specific policy exists', () => {
    const policy = resolveEffectiveServicePolicy(undefined);
    expect(policy.depositPercentage).toBe(20);
    expect(policy.cancellationWindowHours).toBe(24);
    expect(policy.requiredWaiverCategory).toBe('none');
  });
});

describe('Posie Core Logic - F027 (Calendar Working Views & Concurrency)', () => {
  const existingEvents = [
    {
      id: '11111111-1111-1111-1111-111111111111',
      appointmentId: '22222222-2222-2222-2222-222222222222',
      clientName: 'Maya',
      serviceName: 'Hydra-Dew Glass Glow Facial',
      practitionerId: 'b3f5d8e2-1a4c-4e89-9b12-5c8e9f2a3b4c',
      practitionerName: 'Chloe',
      startTime: '2026-10-27T14:00:00Z',
      endTime: '2026-10-27T15:00:00Z',
      status: 'confirmed' as const,
    },
  ];

  it('detects overlapping scheduling conflicts for the same practitioner', () => {
    const check = checkCalendarConflict(existingEvents, {
      practitionerId: 'b3f5d8e2-1a4c-4e89-9b12-5c8e9f2a3b4c',
      startTime: '2026-10-27T14:30:00Z',
      endTime: '2026-10-27T15:30:00Z',
    });

    expect(check.hasConflict).toBe(true);
    expect(check.conflictingEvent?.clientName).toBe('Maya');
  });

  it('allows non-conflicting time slots', () => {
    const check = checkCalendarConflict(existingEvents, {
      practitionerId: 'b3f5d8e2-1a4c-4e89-9b12-5c8e9f2a3b4c',
      startTime: '2026-10-27T15:30:00Z',
      endTime: '2026-10-27T16:30:00Z',
    });

    expect(check.hasConflict).toBe(false);
  });
});

describe('Posie Core Logic - F028 (Appointment Reminders)', () => {
  const existingReminders = [
    {
      id: '33333333-3333-3333-3333-333333333333',
      appointmentId: '22222222-2222-2222-2222-222222222222',
      clientPhone: '+1-555-0199',
      clientEmail: 'maya@example.com',
      channel: 'sms' as const,
      scheduledSendTimeUtc: '2026-10-26T14:00:00Z',
      status: 'scheduled' as const,
      appointmentStartTimeUtc: '2026-10-27T14:00:00Z',
    },
  ];

  it('cancels obsolete pending reminders and schedules new reminder on reschedule', () => {
    const newStartTime = '2026-10-28T16:00:00Z';
    const updated = syncRemindersOnReschedule(existingReminders, '22222222-2222-2222-2222-222222222222', newStartTime, 24);

    expect(updated[0].status).toBe('cancelled'); // Old cancelled
    expect(updated[1].status).toBe('scheduled'); // New scheduled
    expect(updated[1].scheduledSendTimeUtc).toBe('2026-10-27T16:00:00.000Z'); // Exactly 24h prior
  });
});
