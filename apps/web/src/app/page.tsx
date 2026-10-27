'use client';

import React, { useState } from 'react';
import { Card, Button, Badge } from '@posie/ui';
import {
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Users,
  DollarSign,
  TrendingUp,
  UserCheck,
  Moon,
  Calendar,
  AlertCircle,
  HelpCircle,
  Target,
  ArrowRight,
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

// F020: Private Weekly Goals Sample
const initialGoals = [
  { id: 'g1', title: 'Weekly Profit Target', current: 1500, target: 2000, unit: '$', pct: 75 },
  { id: 'g2', title: 'Protected Days Off', current: 2, target: 2, unit: 'days', pct: 100 },
];

// F021: Studio Hours Sample
const studioHours = [
  { day: 'Mon', hours: 'Closed (Rest Day)', open: false },
  { day: 'Tue - Fri', hours: '9:00 AM - 6:00 PM', open: true },
  { day: 'Sat', hours: '10:00 AM - 5:00 PM', open: true },
  { day: 'Sun', hours: 'Closed (Rest Day)', open: false },
];

export default function PosieStudioPage() {
  const [selectedService, setSelectedService] = useState<string>('s1');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // F022: Help Me Choose Navigator State
  const [selectedGoal, setSelectedGoal] = useState<'glow' | 'brows' | 'hydration'>('hydration');
  const [hasEventIn48h, setHasEventIn48h] = useState(false);

  // Navigator Recommendation
  const recommendedServiceId =
    selectedGoal === 'brows' ? 's2' : hasEventIn48h ? 's1' : selectedGoal === 'glow' ? 's3' : 's1';

  const recommendationReason =
    selectedGoal === 'brows'
      ? 'Custom shaping and tinting will make your natural arches pop without requiring daily brow makeup.'
      : hasEventIn48h
      ? 'With an event within 48 hours, we recommend our gentle Hydra-Dew bath instead of dermaplaning for zero redness.'
      : selectedGoal === 'glow'
      ? 'Removes dead skin cells and peach fuzz so serums penetrate deeply and foundation glides on seamlessly.'
      : 'The ultimate thirst-quencher for tired skin: double cleanse, fruit enzyme sweep, and ultra-drenching mask.';

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
          <Badge variant="sage">Features F001 - F022 Live</Badge>
          <Badge variant="rose">Atelier Studio</Badge>
        </div>
      </header>

      {/* F022: Interactive "Help Me Choose" Service Navigator */}
      <section style={{ marginBottom: '40px' }}>
        <Card style={{ backgroundColor: '#FFFFFF', border: '2px solid var(--color-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <HelpCircle size={20} color="var(--color-primary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
              Feature 022: Not Sure What to Book? We've Got You.
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Find Your Perfect Treatment in 10 Seconds
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
            No skincare degree needed. Tell us what your skin is craving right now:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <Button
              variant={selectedGoal === 'hydration' ? 'primary' : 'outline'}
              size="md"
              onClick={() => setSelectedGoal('hydration')}
              style={{ justifyContent: 'flex-start' }}
            >
              💦 Deep Thirst Quenching (Dry / Dull)
            </Button>

            <Button
              variant={selectedGoal === 'glow' ? 'primary' : 'outline'}
              size="md"
              onClick={() => setSelectedGoal('glow')}
              style={{ justifyContent: 'flex-start' }}
            >
              ✨ Silky Glow & Peach-Fuzz Removal
            </Button>

            <Button
              variant={selectedGoal === 'brows' ? 'primary' : 'outline'}
              size="md"
              onClick={() => setSelectedGoal('brows')}
              style={{ justifyContent: 'flex-start' }}
            >
              🪄 Fluffy, Defined Natural Brows
            </Button>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', cursor: 'pointer', marginBottom: '20px' }}>
            <input
              type="checkbox"
              checked={hasEventIn48h}
              onChange={(e) => setHasEventIn48h(e.target.checked)}
              style={{ accentColor: 'var(--color-primary)' }}
            />
            I have a wedding, photoshoot, or big event within the next 48 hours.
          </label>

          {/* Recommendation Banner */}
          <div
            style={{
              backgroundColor: 'var(--color-secondary-light)',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                Recommended Match:
              </span>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', margin: '2px 0 4px' }}>
                {services.find((s) => s.id === recommendedServiceId)?.name}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                {recommendationReason}
              </p>
            </div>

            <Button
              variant="tertiary"
              size="sm"
              onClick={() => setSelectedService(recommendedServiceId)}
            >
              Select Treatment <ArrowRight size={14} style={{ marginLeft: '6px' }} />
            </Button>
          </div>
        </Card>
      </section>

      {/* F020 & F021 Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {/* F020: Private Weekly Goals */}
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Target size={20} color="var(--color-tertiary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-tertiary)', textTransform: 'uppercase' }}>
              Feature 020: Private Weekly Goals
            </span>
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Owner Goals & Work-Life Balance
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Private to you. Nonpunitive feedback that protects days off alongside contribution targets.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {initialGoals.map((g) => (
              <div key={g.id} style={{ backgroundColor: 'var(--color-bg)', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>{g.title}</strong>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                    {g.unit === '$' ? `$${g.current} / $${g.target}` : `${g.current} / ${g.target} ${g.unit}`}
                  </span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--color-border)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${g.pct}%`, height: '100%', backgroundColor: 'var(--color-secondary)' }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* F021: Working Hours & Holiday Calendar */}
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Calendar size={20} color="var(--color-primary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
              Feature 021: Hours & Lead Times
            </span>
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Studio Working Hours
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            2-hour minimum lead time • 60-day advance booking window • Timezone: America/Chicago.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {studioHours.map((h) => (
              <div
                key={h.day}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: h.open ? 'var(--color-bg)' : 'transparent',
                  border: h.open ? '1px solid var(--color-border)' : '1px dashed var(--color-border)',
                  fontSize: '0.85rem',
                }}
              >
                <strong>{h.day}</strong>
                <span style={{ color: h.open ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                  {h.hours}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Treatment Menu */}
      <section style={{ marginBottom: '40px' }}>
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
                <strong>Appointment Confirmed!</strong>
                <p style={{ fontSize: '0.85rem' }}>
                  Slot scheduled within studio operating hours (F021).
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
