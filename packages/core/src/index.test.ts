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
  generateRecurringProposal,
  processSelfServiceCancellation,
  createPasswordlessPortalSession,
  validatePortalSession,
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

describe('Posie Core Logic - F029 (Recurring Appointment Proposals)', () => {
  it('generates recurring proposals with exact intervals and tentative flags', () => {
    const proposal = generateRecurringProposal(
      '11111111-1111-1111-1111-111111111111',
      '22222222-2222-2222-2222-222222222222',
      '33333333-3333-3333-3333-333333333333',
      '2026-11-01T14:00:00Z',
      'every_4_weeks',
      4
    );

    expect(proposal.totalOccurrences).toBe(4);
    expect(proposal.occurrences.length).toBe(4);
    expect(proposal.occurrences[0].status).toBe('tentative');
    expect(proposal.occurrences[1].proposedDateUtc).toContain('2026-11-29'); // Exactly 28 days later
  });
});

describe('Posie Core Logic - F030 (Self-Service Appointment Changes)', () => {
  it('processes early cancellation with 100% deposit refund', () => {
    const apptTime = '2026-11-10T14:00:00Z';
    const requestTime = new Date('2026-11-08T12:00:00Z'); // 48h prior (beyond 24h window)

    const res = processSelfServiceCancellation(
      'booking-1234',
      apptTime,
      24,
      3000, // $30 deposit
      50,
      requestTime
    );

    expect(res.success).toBe(true);
    expect(res.feeApplicableCents).toBe(0);
    expect(res.message).toContain('Full deposit of $30.00 will be refunded');
  });

  it('applies late cancellation fee if requested inside cancellation notice window', () => {
    const apptTime = '2026-11-10T14:00:00Z';
    const requestTime = new Date('2026-11-10T10:00:00Z'); // 4h prior (inside 24h window)

    const res = processSelfServiceCancellation(
      'booking-1234',
      apptTime,
      24,
      3000,
      50, // 50% late fee
      requestTime
    );

    expect(res.success).toBe(true);
    expect(res.feeApplicableCents).toBe(1500); // $15 fee
    expect(res.message).toContain('late fee of $15.00 applies');
  });
});

describe('Posie Core Logic - F031 (Passwordless Client Portal)', () => {
  it('creates an ephemeral portal session with magic token', () => {
    const session = createPasswordlessPortalSession('client-maya-999', 72);
    expect(session.magicToken.startsWith('tok_')).toBe(true);
    expect(validatePortalSession(session)).toBe(true);
  });

  it('rejects expired portal tokens safely', () => {
    const expiredSession = {
      clientId: 'client-maya-999',
      magicToken: 'tok_expired_sample',
      expiresAt: '2026-10-01T00:00:00Z',
      isValid: true,
    };

    expect(validatePortalSession(expiredSession, new Date('2026-10-26T12:00:00Z'))).toBe(false);
  });
});
