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
  Bell,
  CalendarDays,
  User,
  ArrowRight,
  Send,
  AlertTriangle,
} from 'lucide-react';

// Brand Information
const brandData = {
  name: 'Posie',
  tagline: 'Glow up without the headache.',
};

// Services with tailored F026 Policies
const services = [
  {
    id: 's1',
    name: 'Hydra-Dew Glass Glow Facial',
    tag: 'Standard Service',
    price: 120,
    duration: 60,
    depositPct: 20, // 20% standard
    cancelWindowHours: 24,
    waiver: 'none',
  },
  {
    id: 's2',
    name: 'TCA Brightening Chemical Peel',
    tag: 'High Prep Service',
    price: 180,
    duration: 75,
    depositPct: 50, // 50% deposit for peel
    cancelWindowHours: 48, // 48-hr cancellation
    waiver: 'chemical_peel_waiver',
  },
  {
    id: 's3',
    name: 'Fluff & Define Brow Sculpt',
    tag: 'Quick Refresh',
    price: 55,
    duration: 35,
    depositPct: 20,
    cancelWindowHours: 24,
    waiver: 'none',
  },
];

// F027: Calendar Schedule State
const calendarAppointments = [
  { id: 'a1', time: '10:00 AM - 11:00 AM', client: 'Maya S.', service: 'Hydra-Dew Facial', staff: 'Chloe' },
  { id: 'a2', time: '11:30 AM - 12:45 PM', client: 'Sarah J.', service: 'TCA Chemical Peel', staff: 'Chloe' },
  { id: 'a3', time: '02:00 PM - 02:35 PM', client: 'Jessica M.', service: 'Brow Sculpt', staff: 'Sienna' },
];

export default function PosieStudioPage() {
  const [selectedService, setSelectedService] = useState<string>('s2');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [calendarView, setCalendarView] = useState<'day' | 'practitioner'>('day');

  // F027 Conflict Demonstration State
  const [hasConflict, setHasConflict] = useState(false);

  // F028 Reminder State
  const [reminderStatus, setReminderStatus] = useState<string>('Scheduled for 24h prior via SMS');

  const activeServiceObj = services.find((s) => s.id === selectedService) || services[1];

  const handleTestConflict = () => {
    setHasConflict(true);
    setTimeout(() => setHasConflict(false), 3000);
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
          <Badge variant="sage">Features F001 - F028 Live</Badge>
          <Badge variant="rose">Atelier Studio</Badge>
        </div>
      </header>

      {/* F027: Interactive Calendar Working Views */}
      <section style={{ marginBottom: '40px' }}>
        <Card style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarDays size={20} color="var(--color-primary)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                Feature 027: Calendar Working Views & Drag Concurrency
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                variant={calendarView === 'day' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setCalendarView('day')}
              >
                Day Timeline
              </Button>
              <Button
                variant={calendarView === 'practitioner' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setCalendarView('practitioner')}
              >
                Specialist Columns
              </Button>
            </div>
          </div>

          {/* Conflict Alert Simulation */}
          {hasConflict && (
            <div
              style={{
                backgroundColor: '#FFE3E3',
                border: '1px solid #FFA8A8',
                color: '#C92A2A',
                padding: '12px 16px',
                borderRadius: '10px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.88rem',
              }}
            >
              <AlertTriangle size={18} />
              <span>
                <strong>Conflict Prevented:</strong> Chloe is already booked for Sarah J. (11:30 AM – 12:45 PM). Overlapping slots cannot be double-booked.
              </span>
            </div>
          )}

          {/* Calendar Event Slots */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {calendarAppointments.map((appt) => (
              <div
                key={appt.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>{appt.time}</strong>
                    <Badge variant="sage">{appt.staff}</Badge>
                  </div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    {appt.client} • {appt.service}
                  </span>
                </div>

                <Badge variant="muted">Confirmed</Badge>
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={handleTestConflict}>
            Simulate Double-Booking Conflict Check
          </Button>
        </Card>
      </section>

      {/* F026: Service-Specific Policy Rules */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-tertiary)', textTransform: 'uppercase' }}>
            Feature 026: Service-Specific Policy Rules
          </span>
          <h2 style={{ fontSize: '1.9rem', color: 'var(--color-primary)' }}>Tailored Policies per Treatment</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            High-prep treatments (like chemical peels) automatically apply tailored deposits and 48-hr notice.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '32px' }}>
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
                    <Badge variant={svc.depositPct > 20 ? 'rose' : 'sage'}>{svc.tag}</Badge>
                    <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-primary)' }}>
                      ${svc.price}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', marginBottom: '8px', color: 'var(--color-primary)' }}>
                    {svc.name}
                  </h3>

                  <div
                    style={{
                      backgroundColor: 'var(--color-bg)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      color: 'var(--color-text)',
                      marginBottom: '14px',
                    }}
                  >
                    <strong>Policy:</strong> {svc.depositPct}% Deposit • {svc.cancelWindowHours}h Cancellation Notice
                  </div>
                </div>

                <Button variant={isSelected ? 'tertiary' : 'outline'} size="sm">
                  {isSelected ? 'Selected' : 'Select'}
                </Button>
              </Card>
            );
          })}
        </div>
      </section>

      {/* F028: Appointment Reminders & Confirmation Box */}
      <section>
        <Card style={{ border: '2px solid var(--color-primary)', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Bell size={20} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1.35rem', color: 'var(--color-primary)' }}>
              Confirm Reservation & Set Automatic Reminder (F028)
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Treatment:</span>
              <strong>{activeServiceObj.name} (${activeServiceObj.price})</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Tailored Deposit ({activeServiceObj.depositPct}%):</span>
              <strong>${((activeServiceObj.price * activeServiceObj.depositPct) / 100).toFixed(2)}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Automated SMS Reminder:</span>
              <strong style={{ color: 'var(--color-secondary)' }}>{reminderStatus}</strong>
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
                <strong>Appointment Confirmed & Reminder Queued!</strong>
                <p style={{ fontSize: '0.85rem' }}>
                  If you reschedule, obsolete reminders are automatically cancelled without duplicate alerts.
                </p>
              </div>
            </div>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={() => setBookingConfirmed(true)}
            >
              Confirm Appointment & Lock Slot
            </Button>
          )}
        </Card>
      </section>
    </main>
  );
}
