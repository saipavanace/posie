'use client';

import React, { useState } from 'react';
import { Card, Button, Badge } from '@posie/ui';
import {
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Repeat,
  ExternalLink,
  KeyRound,
  RotateCcw,
  Check,
  X,
  FileText,
} from 'lucide-react';

// Brand Information
const brandData = {
  name: 'Posie',
  tagline: 'Glow up without the headache.',
};

// Sample Active Service
const activeService = {
  name: 'Hydra-Dew Glass Glow Facial',
  price: 120,
  duration: 60,
  specialist: 'Chloe Martinez',
};

// F029 Recurring Occurrences
const initialRecurringOccurrences = [
  { date: 'Thursday, Nov 12 at 2:30 PM', status: 'Confirmed' },
  { date: 'Thursday, Dec 10 at 2:30 PM (in 4 weeks)', status: 'Tentative' },
  { date: 'Thursday, Jan 07 at 2:30 PM (in 8 weeks)', status: 'Tentative' },
];

export default function PosieStudioPage() {
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // F029: Recurring Proposal Toggle
  const [enableRecurring, setEnableRecurring] = useState(false);
  const [recurringInterval, setRecurringInterval] = useState<'4w' | '6w'>('4w');

  // F030: Self-Service Action Simulation State
  const [selfServiceMessage, setSelfServiceMessage] = useState<string | null>(null);

  // F031: Passwordless Portal State
  const [showPortal, setShowPortal] = useState(false);

  const handleSimulateCancel = (isLate: boolean) => {
    if (isLate) {
      setSelfServiceMessage(
        'Self-service cancel requested 3 hours prior. Notice given under the 24-hr window: a late fee of $12.00 applies to deposit.'
      );
    } else {
      setSelfServiceMessage(
        'Self-service cancel requested 48 hours prior. 100% of your $24.00 deposit has been refunded to your card.'
      );
    }
  };

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px 80px' }}>
      {/* Brand Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FAF8F5',
            }}
          >
            <Sparkles size={22} color="var(--color-tertiary)" />
          </div>
          <div>
            <h1 style={{ fontSize: '2.1rem', letterSpacing: '-0.5px', color: 'var(--color-primary)' }}>
              {brandData.name}
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{brandData.tagline}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant={showPortal ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setShowPortal(!showPortal)}
          >
            <KeyRound size={14} style={{ marginRight: '6px' }} />
            {showPortal ? 'Close Client Portal' : 'Open Passwordless Portal (F031)'}
          </Button>
          <Badge variant="sage">Features F001 - F031 Live</Badge>
        </div>
      </header>

      {/* F031: Passwordless Client Portal Experience */}
      {showPortal && (
        <section style={{ marginBottom: '40px' }}>
          <Card style={{ backgroundColor: '#FFFFFF', border: '2px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <KeyRound size={20} color="var(--color-primary)" />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                  Feature 031: Maya's Private Client Portal (Magic Link Session)
                </span>
              </div>
              <Badge variant="rose">No App Download Required</Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: 'var(--color-bg)', padding: '16px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Upcoming Appointment</span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)', display: 'block', margin: '4px 0' }}>
                  Hydra-Dew Glass Glow Facial
                </strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Thursday, Nov 12 at 2:30 PM with Chloe • $24 deposit paid ($96 remaining)
                </p>

                {/* F030 Self Service Action Buttons */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <Button variant="outline" size="sm" onClick={() => handleTestReschedule()}>
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleSimulateCancel(false)}>
                    Cancel (On-Time)
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleSimulateCancel(true)}>
                    Cancel (Late)
                  </Button>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--color-bg)', padding: '16px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Your Saved Preferences</span>
                <div style={{ marginTop: '8px', fontSize: '0.88rem', color: 'var(--color-primary)' }}>
                  <p>• Preferred name: <strong>Maya (MY-uh)</strong></p>
                  <p>• Atmosphere: <strong>Quiet Visit (Silent recharge)</strong></p>
                  <p>• Room comfort: <strong>Extra heated blanket, low lights</strong></p>
                </div>
              </div>
            </div>

            {/* F030 Action Feedback Message */}
            {selfServiceMessage && (
              <div
                style={{
                  backgroundColor: 'var(--color-secondary-light)',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  color: 'var(--color-primary)',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <CheckCircle2 size={18} />
                <span>{selfServiceMessage}</span>
              </div>
            )}
          </Card>
        </section>
      )}

      {/* Booking Form with F029 Recurring Proposals */}
      <section style={{ marginBottom: '40px' }}>
        <Card style={{ border: '2px solid var(--color-primary)', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '16px' }}>
            Book Your Treatment: {activeService.name}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Treatment & Specialist:</span>
              <strong>{activeService.name} (${activeService.price}) with {activeService.specialist}</strong>
            </div>

            {/* F029 Recurring Frequency Selector */}
            <div
              style={{
                backgroundColor: 'var(--color-bg)',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: enableRecurring ? '12px' : '0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={enableRecurring}
                    onChange={(e) => setEnableRecurring(e.target.checked)}
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                  <span>
                    <Repeat size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    <strong>Lock My Skincare Cadence:</strong> Schedule recurring visits (Feature 029)
                  </span>
                </label>
              </div>

              {enableRecurring && (
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                    <Button
                      variant={recurringInterval === '4w' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setRecurringInterval('4w')}
                    >
                      Every 4 Weeks (Optimal Barrier Cadence)
                    </Button>
                    <Button
                      variant={recurringInterval === '6w' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setRecurringInterval('6w')}
                    >
                      Every 6 Weeks
                    </Button>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                    Proposed Recurring Dates (Overlapping dates flagged as tentative until approved):
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {initialRecurringOccurrences.map((occ, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          backgroundColor: '#FFFFFF',
                          fontSize: '0.82rem',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <span>{occ.date}</span>
                        <Badge variant={occ.status === 'Confirmed' ? 'sage' : 'muted'}>{occ.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {bookingConfirmed ? (
            <div
              style={{
                backgroundColor: 'var(--color-secondary-light)',
                padding: '16px',
                borderRadius: '12px',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <CheckCircle2 size={24} color="var(--color-primary)" />
              <div>
                <strong>Appointment Snapshot Confirmed!</strong>
                <p style={{ fontSize: '0.85rem' }}>
                  A secure self-service link (F030) has been generated and added to your passwordless portal (F031).
                </p>
              </div>
            </div>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={() => setBookingConfirmed(true)}
            >
              Confirm Reservation (No Account Needed)
            </Button>
          )}
        </Card>
      </section>
    </main>
  );
}

function handleTestReschedule() {
  alert('Self-Service Reschedule (F030): Choose a new slot from available calendar times.');
}
