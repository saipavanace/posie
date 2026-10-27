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
  Globe,
  Search,
  MessageCircleQuestion,
  Send,
  Upload,
  ArrowRight,
  FileText,
  FileCheck2,
  Printer,
  Download,
  PhoneCall,
  HeartPulse,
  Lock,
  Sun,
  Moon,
  MapPin,
  Pencil,
  Eye,
  CalendarCheck,
  BadgeCheck,
  Calculator,
  Receipt,
  Package,
  CheckCheck,
  Truck,
  Mail,
  Users,
  Filter,
  Star,
  UserCheck,
  UserX,
  Gift,
  Tag,
  Percent,
  Share2,
  Timer,
  DollarSign,
  Paperclip,
  AlertTriangle,
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
    description: 'Double cleanse, fruit enzyme sweep, and ultra-drenching hyaluronic infusion.',
  },
  {
    id: 's2',
    name: 'Fluff & Define Brow Sculpt',
    tag: 'Quick Refresh',
    price: 55,
    duration: 35,
    description: 'Custom tinting and precision shaping that makes your natural arches pop.',
  },
];

export default function PosieStudioPage() {
  const [selectedService, setSelectedService] = useState<string>('s1');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // F054 Shift Cancellation Guard State
  const [shiftCancelAttempted, setShiftCancelAttempted] = useState(false);

  // F055 Time Clock State
  const [clockedIn, setClockedIn] = useState(true);
  const [correctionRequested, setCorrectionRequested] = useState(false);

  // F056 Expense Duplicate State
  const [duplicateWarningShown, setDuplicateWarningShown] = useState(false);

  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];

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
          <Badge variant="sage">Studio Open</Badge>
          <Badge variant="muted">Austin, TX</Badge>
        </div>
      </header>

      {/* Hero Service Selector */}
      <section style={{ marginBottom: '36px' }}>
        <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary)', marginBottom: '16px' }}>
          Book Your Treatment
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {services.map((svc) => (
            <Card
              key={svc.id}
              onClick={() => setSelectedService(svc.id)}
              style={{
                cursor: 'pointer',
                borderColor: selectedService === svc.id ? 'var(--color-secondary)' : 'var(--color-border)',
                backgroundColor: selectedService === svc.id ? 'var(--color-secondary-light)' : '#FFFFFF',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Badge variant="rose">{svc.tag}</Badge>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  <Clock size={14} />
                  <span>{svc.duration} min</span>
                </div>
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '6px' }}>{svc.name}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '12px' }}>{svc.description}</p>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                ${svc.price}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* F054: Team Shifts & Availability Guard */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} color="var(--color-primary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 054: Team Shifts & Client Commitment Guard
              </strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Thursday Roster</Badge>
              <Badge variant="muted">09:00 – 17:00</Badge>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Working shifts and coverage requests are maintained independently. Staff schedule changes cannot silently drop client appointments.
          </p>

          <div style={{ background: '#FAF8F5', borderRadius: '8px', padding: '14px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong>Chloe V. (Lead Aesthetician)</strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Austin Flagship • Room 1</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text)' }}>
              • <strong>Skills:</strong> Chemical Peels, Dermaplaning, Ultrasonic Extractions<br />
              • <strong>Bookings on Shift:</strong> 2 confirmed clients (Jessica Day at 10:00 AM, Cece Parekh at 02:00 PM)
            </div>
          </div>

          {shiftCancelAttempted ? (
            <div style={{ background: '#FFF7F5', border: '1px solid #C67D6E', padding: '14px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B36B5C', fontWeight: 600, marginBottom: '6px' }}>
                <AlertTriangle size={16} />
                <span>Shift Cancellation Blocked (Safety Invariant)</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text)' }}>
                Cannot cancel this shift: <strong>2 client appointments</strong> are currently booked with Chloe. Reassign to another aesthetician or contact clients to reschedule before releasing this shift.
              </p>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShiftCancelAttempted(true)}
            >
              Simulate Staff Shift Cancellation
            </Button>
          )}
        </Card>
      </section>

      {/* F055: Time Clock & Manager Approvals */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ backgroundColor: '#FAF8F5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Timer size={18} color="var(--color-secondary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 055: Time Clock & Manager Approvals
              </strong>
            </div>
            <Badge variant="sage">Active Shift • 7.5 Paid Hours</Badge>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Capture clock-ins, unpaid meal breaks, and staff correction requests with verifiable manager approval logs for payroll reconciliation.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: '#FFF', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)', marginBottom: '14px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Clock In</span>
              <strong style={{ fontSize: '0.85rem' }}>09:00 AM (Verified Tablet)</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Meal Break</span>
              <strong style={{ fontSize: '0.85rem' }}>1:00 PM – 1:30 PM (30m Unpaid)</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Payable Time</span>
              <strong style={{ fontSize: '0.85rem', color: 'var(--color-secondary)' }}>450 mins (7.5 hrs)</strong>
            </div>
          </div>

          {correctionRequested ? (
            <div style={{ background: 'var(--color-secondary-light)', padding: '12px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <strong>✓ Time Correction Request Submitted:</strong> "Adjust clock-in to 08:45 AM (prepped treatment room)." Manager notified for payroll sign-off.
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCorrectionRequested(true)}
            >
              <Pencil size={12} style={{ marginRight: '6px' }} /> Request Time Clock Correction
            </Button>
          )}
        </Card>
      </section>

      {/* F056: Expense & Receipt Capture with Duplicate Detection */}
      <section style={{ marginBottom: '36px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Receipt size={18} color="var(--color-primary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 056: Expense & Receipt Capture with Duplicate Detection
              </strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">$145.00 Recorded</Badge>
              <Badge variant="muted">Receipt PDF Attached</Badge>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Categorize backbar supplies and retail shipments. Built-in heuristics detect potential duplicate receipts before recording.
          </p>

          <div style={{ background: '#FAF8F5', borderRadius: '8px', padding: '14px', border: '1px solid var(--color-border)', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong>SalonCentric Austin — Backbar Supplies</strong>
              <strong style={{ color: 'var(--color-primary)' }}>$145.00</strong>
            </div>
            <p style={{ margin: '0 0 10px 0', fontSize: '0.82rem', color: 'var(--color-text)' }}>
              Purpose: Ultrasonic conductive gel, disposable headbands & esthetician gauze rolls (Paid via Business Card • Nov 02).
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              📎 <a href="#" style={{ color: 'var(--color-secondary)' }}>View Attached Receipt (receipt-145.pdf)</a> • <em>Bookkeeping tracking only (does not constitute formal CPA advice).</em>
            </div>
          </div>

          {duplicateWarningShown ? (
            <div style={{ background: '#FFF7F5', border: '1px solid #C67D6E', padding: '12px 14px', borderRadius: '8px', fontSize: '0.84rem' }}>
              <strong style={{ color: '#B36B5C', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={15} /> Potential Duplicate Detected:
              </strong>
              <p style={{ margin: '4px 0 0', color: 'var(--color-text)' }}>
                An identical expense of $145.00 at "SalonCentric Austin" was already submitted within the last 48 hours. Please verify you are not double-submitting this receipt.
              </p>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDuplicateWarningShown(true)}
            >
              Simulate Submitting Duplicate Receipt
            </Button>
          )}
        </Card>
      </section>

      {/* Booking Box */}
      <section>
        <Card style={{ border: '2px solid var(--color-primary)', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '16px' }}>
            Ready to Reserve Your Visit?
          </h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '20px' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Selected Treatment:</span>
            <strong>{activeServiceObj.name} (${activeServiceObj.price})</strong>
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
                  Reserved directly on {brandData.name}'s verified domain.
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
