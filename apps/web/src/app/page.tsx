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
  Database,
  Coins,
  MessageSquareWarning,
  Check,
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

  // F057 Structured Data Export State
  const [exportTriggered, setExportTriggered] = useState(false);

  // F058 Daily Close Workspace State
  const [actualCashInput, setActualCashInput] = useState<number>(320);
  const [blockingTicketResolved, setBlockingTicketResolved] = useState(false);
  const [explainedNote, setExplainedNote] = useState('Missing $18 verified as cash change miscount during noon rush.');
  const [dailyCloseFinalized, setDailyCloseFinalized] = useState(false);

  // F059 Complaint & Redo State
  const [complaintStep, setComplaintStep] = useState<'intake' | 'redo_scheduled' | 'resolved'>('intake');

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

      {/* F057: Structured Data Export & Freedom to Leave Workspace */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Data Export & Freedom-to-Leave Archive (F057)
              </h3>
            </div>
            <Badge variant="sage">Zero Lock-In Guarantee</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Your client relationships, treatment histories, and financial balances belong strictly to you. Export complete standard CSV and JSON bundles anytime with verified cryptographic checksums and open data dictionaries.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
            <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)' }}>142</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Clients & Contacts</div>
            </div>
            <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)' }}>389</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Completed Visits</div>
            </div>
            <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)' }}>$1,450</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Gift Card Balances</div>
            </div>
            <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)' }}>100%</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Signed Consents</div>
            </div>
          </div>

          {exportTriggered ? (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '14px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3A523A', fontWeight: 600, marginBottom: '6px' }}>
                <CheckCircle2 size={16} /> Export Bundle Generated Successfully
              </div>
              <div style={{ color: 'var(--color-text)', marginBottom: '8px' }}>
                Archive <code>posie-exit-pack.zip</code> (SHA256: <code>a7f84c19...</code>) includes <code>contacts.csv</code>, <code>services.csv</code>, <code>appointments.csv</code>, <code>balances.csv</code>, and complete field schema specifications.
              </div>
              <Badge variant="sage">Download Ready (No Expiration)</Badge>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setExportTriggered(true)}>
              <Download size={14} style={{ marginRight: '6px' }} /> Generate Complete Business Exit Pack (ZIP)
            </Button>
          )}
        </Card>
      </section>

      {/* F058: Daily Close & Till Reconciliation Workspace */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Coins size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Daily Close & Cash Drawer Reconciler (F058)
              </h3>
            </div>
            <Badge variant={dailyCloseFinalized ? 'sage' : 'muted'}>
              {dailyCloseFinalized ? 'Till Closed & Reconciled' : 'Close In Progress'}
            </Badge>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Opening Float</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>$200.00</div>
            </div>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Cash Sales</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#3A523A' }}>+$150.00</div>
            </div>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Paid-Out (Petty Cash Milk)</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#B36B5C' }}>-$12.00</div>
            </div>
            <div style={{ border: '1px solid var(--color-primary)', padding: '12px', borderRadius: '8px', background: '#F9FAF8' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)' }}>Expected Cash in Till</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>$338.00</div>
            </div>
          </div>

          {/* Exceptions Check */}
          {!blockingTicketResolved ? (
            <div style={{ background: '#FFF9F2', border: '1px solid #E2A76F', padding: '12px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#8A531C', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertCircle size={15} /> 1 Blocking Exception: Chloe Bennett (Unpaid ticket $95.00)
                </span>
                <Button size="sm" variant="outline" onClick={() => setBlockingTicketResolved(true)}>
                  Resolve & Settle Ticket
                </Button>
              </div>
            </div>
          ) : (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem', color: '#3A523A', marginBottom: '16px' }}>
              ✓ All salon tickets and card tips settled. Ready for till count verification.
            </div>
          )}

          {/* Actual Cash Count & Variance Note */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Counted Drawer Cash:</span>
              <input
                type="number"
                value={actualCashInput}
                onChange={(e) => setActualCashInput(Number(e.target.value))}
                style={{ width: '90px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #CCC', fontSize: '0.9rem' }}
              />
            </div>
            <span style={{ fontSize: '0.85rem', color: actualCashInput === 338 ? '#3A523A' : '#B36B5C', fontWeight: 600 }}>
              Variance: {actualCashInput - 338 === 0 ? '$0.00 (Balanced)' : `-$${(338 - actualCashInput).toFixed(2)} (Short)`}
            </span>
          </div>

          {actualCashInput !== 338 && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
                Required Explanation Note for Discrepancy (Minimum 5 characters):
              </label>
              <input
                type="text"
                value={explainedNote}
                onChange={(e) => setExplainedNote(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #D5CECE', fontSize: '0.85rem' }}
              />
            </div>
          )}

          {dailyCloseFinalized ? (
            <div style={{ background: '#F4F7F4', padding: '12px', borderRadius: '8px', color: '#3A523A', fontSize: '0.85rem', fontWeight: 600 }}>
              ✓ Daily Close Finalized by Elena Rostova. Register locked and card batch sent to processor.
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              disabled={!blockingTicketResolved || (actualCashInput !== 338 && explainedNote.length < 5)}
              onClick={() => setDailyCloseFinalized(true)}
            >
              Sign Off & Lock Daily Close
            </Button>
          )}
        </Card>
      </section>

      {/* F059: Client Complaint & Redo Resolution (Document D18) */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquareWarning size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Client Dispute Resolution & Redo Tracker (F059 / D18)
              </h3>
            </div>
            <Badge variant={complaintStep === 'resolved' ? 'sage' : 'rose'}>
              Status: {complaintStep === 'intake' ? 'Under Review' : complaintStep === 'redo_scheduled' ? 'Redo Scheduled' : 'Resolved'}
            </Badge>
          </div>

          <div style={{ background: '#FAF8F5', padding: '14px', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
              <span>Client: <strong>Sophia Turner</strong> (Visit: Full Platinum Balayage)</span>
              <Badge variant="muted">Original Verbatim Report (Immutable)</Badge>
            </div>
            <p style={{ margin: '6px 0 0', fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--color-text)' }}>
              "Toner turned out noticeably brassier than reference photo consulted at chair."
            </p>
          </div>

          <div style={{ fontSize: '0.85rem', marginBottom: '16px', color: 'var(--color-text-muted)' }}>
            <strong>Factual Chronology Log:</strong>
            <ul style={{ margin: '6px 0 0', paddingLeft: '20px', lineHeight: 1.6 }}>
              <li>10:15 AM: Concern received via phone; client photos uploaded.</li>
              <li>11:30 AM: Lead colorist Elena Rostova reviewed consultation formulation notes.</li>
              {complaintStep !== 'intake' && (
                <li>1:00 PM: Complimentary 45-minute tone correction appointment booked for Friday 10:00 AM.</li>
              )}
              {complaintStep === 'resolved' && (
                <li>Friday 10:45 AM: Redo completed. Violet-ash toner achieved exact desired shade; client happy.</li>
              )}
            </ul>
          </div>

          {complaintStep === 'intake' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setComplaintStep('redo_scheduled')}
            >
              Schedule Complimentary Redo (Attach Recovery Costs)
            </Button>
          )}

          {complaintStep === 'redo_scheduled' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#F8F9F8', padding: '12px', borderRadius: '8px', fontSize: '0.84rem' }}>
                <strong>Service Recovery Investment:</strong> Materials ($24.00) + Labor ($45.00) = <strong>$69.00</strong> (100% complimentary to client).
              </div>
              <div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setComplaintStep('resolved')}
                >
                  <Check size={14} style={{ marginRight: '6px' }} /> Owner Sign-Off & Close Case
                </Button>
              </div>
            </div>
          )}

          {complaintStep === 'resolved' && (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '12px 14px', borderRadius: '8px', fontSize: '0.85rem', color: '#3A523A' }}>
              ✓ Case resolved and closed with owner sign-off. Factual chronology preserved without deleting the original concern.
            </div>
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
