'use client';

import React, { useState } from 'react';
import { Card, Button, Badge } from '@posie/ui';
import {
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Users,
  CheckSquare2,
  DollarSign,
  TrendingUp,
  UserCheck,
  Moon,
  Calendar,
  AlertCircle,
} from 'lucide-react';

// Brand Information
const brandData = {
  name: 'Posie',
  tagline: 'Glow up without the headache.',
};

// Services
const services = [
  {
    id: 's1',
    name: 'Hydra-Dew Glass Glow Facial',
    tag: 'Fan Favorite',
    price: 120,
    duration: 60,
    description:
      'A deep double cleanse, enzyme exfoliation, and ultra-drenching hyaluronic bath. Zero stinging, zero nonsense, just dewy radiance.',
  },
  {
    id: 's2',
    name: 'Fluff & Define Brow Sculpt',
    tag: 'Quick Refresh',
    price: 55,
    duration: 35,
    description:
      'Custom tinting and precision shaping that makes your natural arches pop so well you can skip filling them in for 4 weeks.',
  },
  {
    id: 's3',
    name: 'Satin Smooth Dermaplaning',
    tag: 'Instant Results',
    price: 90,
    duration: 45,
    description:
      'Gentle peach-fuzz removal and dead cell sweep. Your foundation and serums will glide on like pure silk.',
  },
];

// F018: Daily Owner Digest Data
const ownerDigest = {
  date: 'Today, Monday Oct 26',
  confirmedVisits: 6,
  grossExpected: '$645.00',
  depositsCollected: '$129.00',
  outstandingDueAtCheckout: '$516.00',
  unresolvedExceptions: 1,
  actionRequired: '1 client (Maya) requires signed glycolic acid waiver prior to 2:30 PM appointment.',
};

// F019: Lapsed Client Worklist Data
const lapsedClients = [
  {
    name: 'Sarah Jenkins',
    lastVisit: 'Sept 1, 2026',
    cadence: '4 weeks',
    overdue: '25 days overdue',
    suggestedMsg: 'Hey Sarah! ✨ We miss your glow! Chloe has 2 openings this Friday if you want to refresh your Hydra-Dew facial.',
  },
  {
    name: 'Jessica Miller',
    lastVisit: 'Aug 15, 2026',
    cadence: '6 weeks',
    overdue: '18 days overdue',
    suggestedMsg: 'Hey Jessica! Just checking in on your brow sculpt. Ready for a touch-up? Tap here to book without logging in.',
  },
];

export default function PosieStudioPage() {
  const [selectedService, setSelectedService] = useState<string>('s1');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // F017 Total Cost Estimator State
  const [monthlyVolume, setMonthlyVolume] = useState<number>(5000); // $5,000 / mo
  const [staffCount, setStaffCount] = useState<number>(1);
  const [customDomain, setCustomDomain] = useState<boolean>(false);

  // Cost calculation
  const baseSub = 29;
  const extraStaffCost = Math.max(0, staffCount - 1) * 15;
  const processingCost = Math.round(monthlyVolume * 0.026 + (monthlyVolume / 75) * 0.1);
  const domainCost = customDomain ? 10 : 0;
  const totalCost = baseSub + extraStaffCost + processingCost + domainCost;

  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px 80px' }}>
      {/* Brand Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '36px',
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
          <Badge variant="sage">Features F001 - F019 Live</Badge>
          <Badge variant="rose">Atelier Studio</Badge>
        </div>
      </header>

      {/* F018: Short Daily Owner Digest Banner */}
      <section style={{ marginBottom: '40px' }}>
        <Card style={{ backgroundColor: '#FFFFFF', border: '2px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} color="var(--color-primary)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                Feature 018: Daily Owner Digest • {ownerDigest.date}
              </span>
            </div>
            <Badge variant="sage">
              <Moon size={12} style={{ marginRight: '4px' }} /> Quiet Hours Active (9 PM - 8 AM)
            </Badge>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: 'var(--color-bg)', padding: '14px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Confirmed Visits</span>
              <strong style={{ fontSize: '1.4rem', display: 'block', color: 'var(--color-primary)' }}>
                {ownerDigest.confirmedVisits} Appointments
              </strong>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg)', padding: '14px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Expected Gross</span>
              <strong style={{ fontSize: '1.4rem', display: 'block', color: 'var(--color-primary)' }}>
                {ownerDigest.grossExpected}
              </strong>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg)', padding: '14px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Deposits Secured</span>
              <strong style={{ fontSize: '1.4rem', display: 'block', color: 'var(--color-secondary)' }}>
                {ownerDigest.depositsCollected}
              </strong>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg)', padding: '14px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Due at Checkout</span>
              <strong style={{ fontSize: '1.4rem', display: 'block', color: 'var(--color-tertiary)' }}>
                {ownerDigest.outstandingDueAtCheckout}
              </strong>
            </div>
          </div>

          {/* Top Decision Action Bar */}
          <div
            style={{
              backgroundColor: 'var(--color-secondary-light)',
              padding: '12px 16px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.88rem',
              color: 'var(--color-primary)',
            }}
          >
            <AlertCircle size={18} />
            <span><strong>Today's Focus:</strong> {ownerDigest.actionRequired}</span>
          </div>
        </Card>
      </section>

      {/* F017 & F019 Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {/* F017: Total Cost Estimator */}
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <DollarSign size={20} color="var(--color-tertiary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-tertiary)', textTransform: 'uppercase' }}>
              Feature 017: Total Cost Estimator
            </span>
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Honest Studio Bill Preview
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            No "nickel & diming". See your exact monthly costs before committing to a plan.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                <span>Monthly Card Volume:</span>
                <strong>${monthlyVolume.toLocaleString()} / mo</strong>
              </div>
              <input
                type="range"
                min="1000"
                max="25000"
                step="1000"
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem' }}>
              <span>Staff Specialists:</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 3].map((num) => (
                  <Button
                    key={num}
                    variant={staffCount === num ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setStaffCount(num)}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={customDomain}
                onChange={(e) => setCustomDomain(e.target.checked)}
                style={{ accentColor: 'var(--color-primary)' }}
              />
              Add Custom Studio Domain ($10/mo)
            </label>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-bg)',
              padding: '14px',
              borderRadius: '12px',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Estimated Monthly Total:</span>
              <strong style={{ fontSize: '1.4rem', color: 'var(--color-primary)' }}>${totalCost}.00</strong>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              Includes $29 base + ${processingCost} card fees (2.6% + 10¢) + ${extraStaffCost} extra staff + ${domainCost} domain.
            </p>
          </div>
        </Card>

        {/* F019: Lapsed Client Reconnect Worklist */}
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <UserCheck size={20} color="var(--color-primary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
              Feature 019: Lapsed Client Worklist
            </span>
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Treatment Cadence Reconnect
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Clients overdue past their individual treatment interval. Opted-out clients are strictly excluded.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {lapsedClients.map((client) => (
              <div
                key={client.name}
                style={{
                  backgroundColor: 'var(--color-bg)',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>{client.name}</strong>
                  <Badge variant="rose">{client.overdue}</Badge>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                  Regular cycle: {client.cadence} • Last seen {client.lastVisit}
                </p>
                <Button variant="outline" size="sm" style={{ fontSize: '0.75rem', width: '100%' }}>
                  Preview Reconnect SMS
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Treatment Menu */}
      <section style={{ marginBottom: '56px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.9rem', color: 'var(--color-primary)' }}>The Treatment Menu</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {services.map((svc) => {
            const isSelected = selectedService === svc.id;
            return (
              <Card
                key={svc.id}
                style={{
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                  borderWidth: isSelected ? '2px' : '1px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                onClick={() => setSelectedService(svc.id)}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <Badge variant="sage">{svc.tag}</Badge>
                    <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-primary)' }}>
                      ${svc.price}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', marginBottom: '8px', color: 'var(--color-primary)' }}>
                    {svc.name}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                    {svc.description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--color-border)',
                    paddingTop: '12px',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    <Clock size={16} /> {svc.duration} mins
                  </span>
                  <Button variant={isSelected ? 'tertiary' : 'outline'} size="sm">
                    {isSelected ? 'Selected' : 'Select'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Booking Confirmation Box */}
      <section>
        <Card style={{ border: '2px solid var(--color-primary)', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '16px' }}>
            Book Your Appointment
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Selected Treatment:</span>
              <strong>{activeServiceObj.name} (${activeServiceObj.price})</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Required 20% Deposit:</span>
              <strong>${(activeServiceObj.price * 0.2).toFixed(2)}</strong>
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
                  Updated in your Daily Owner Digest (F018).
                </p>
              </div>
            </div>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={() => setBookingConfirmed(true)}
            >
              Confirm & Lock Slot (No Account Needed)
            </Button>
          )}
        </Card>
      </section>
    </main>
  );
}
