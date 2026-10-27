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
  Headphones,
  CreditCard,
  BellOff,
  Activity,
  Camera,
  Video,
  Type,
  Wallet,
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

  // F060 Support Escalation State
  const [supportSubmittedAfterHours, setSupportSubmittedAfterHours] = useState(false);
  const [callbackBooked, setCallbackBooked] = useState(false);

  // F061 Billing & Usage Preview State
  const [smsUsageCount, setSmsUsageCount] = useState(5500);

  // F062 Communication Preferences State
  const [promoSmsOptIn, setPromoSmsOptIn] = useState(false);
  const [quietHoursSimulatedNight, setQuietHoursSimulatedNight] = useState(false);

  // F063 Visit Progress Check-in State
  const [checkinComfort, setCheckinComfort] = useState<'routine' | 'severe'>('routine');
  const [checkinReviewed, setCheckinReviewed] = useState(false);

  // F064 Consent-Aware Portfolio State (D12)
  const [mediaGrantRevoked, setMediaGrantRevoked] = useState(false);
  const [anonymitySelection, setAnonymitySelection] = useState<'eyes_obscured' | 'full_face'>('eyes_obscured');

  // F065 Virtual Consultation State (WB A6)
  const [consultRoomCreated, setConsultRoomCreated] = useState(false);
  const [consultCompleted, setConsultCompleted] = useState(false);

  // F066 Arrival & Private Waiting Queue State
  const [clientArrivedState, setClientArrivedState] = useState<'idle' | 'arrived' | 'reversed' | 'in_chair'>('idle');

  // F067 Local Device Preferences State
  const [textSizeSelection, setTextSizeSelection] = useState<'default' | 'large' | 'extra_large'>('default');
  const [contrastSelection, setContrastSelection] = useState<'standard' | 'high_contrast'>('standard');

  // F068 Client Balances & Entitlement State
  const [redeemedSessionCount, setRedeemedSessionCount] = useState(1);

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

      {/* F060: Human Support Escalation Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Headphones size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Human Support Escalation & Staffed Hours (F060)
              </h3>
            </div>
            <Badge variant="sage">Staffed Hours: Mon-Fri 8 AM - 7 PM CT</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            No endless robot loops or unkept 24/7 promises. When you need a human, you get genuine transparency: verified SLAs during open hours and guaranteed morning priority callbacks when off-duty.
          </p>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <Button
              variant={!supportSubmittedAfterHours ? 'primary' : 'outline'}
              size="sm"
              onClick={() => { setSupportSubmittedAfterHours(false); setCallbackBooked(false); }}
            >
              Simulate Day Shift (Staffed Hours)
            </Button>
            <Button
              variant={supportSubmittedAfterHours ? 'primary' : 'outline'}
              size="sm"
              onClick={() => { setSupportSubmittedAfterHours(true); setCallbackBooked(false); }}
            >
              Simulate Night Shift (After Hours: 10:30 PM)
            </Button>
          </div>

          {!supportSubmittedAfterHours ? (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '14px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3A523A', fontWeight: 600, marginBottom: '4px' }}>
                <CheckCircle2 size={16} /> Urgent Escalation Active — 15 Minute Response SLA
              </div>
              <div style={{ color: 'var(--color-text)' }}>
                Dedicated specialist <strong>Marcus</strong> is reviewing terminal network logs for your checkout station. Expected callback or live chat connect: &lt; 15 mins.
              </div>
            </div>
          ) : (
            <div style={{ background: '#FFF9F5', border: '1px solid #E2A76F', padding: '14px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B36B5C', fontWeight: 600, marginBottom: '6px' }}>
                <AlertCircle size={16} /> Human Specialists Currently Off-Duty
              </div>
              <p style={{ margin: '0 0 10px', color: 'var(--color-text)' }}>
                Our team is off-duty until 8:00 AM Central tomorrow. We do not use automated bots to fake live replies.
              </p>
              {callbackBooked ? (
                <Badge variant="sage">✓ Priority Morning Callback Reserved: Thursday 9:00 AM</Badge>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setCallbackBooked(true)}>
                  Schedule Guaranteed Morning Callback (9:00 AM)
                </Button>
              )}
            </div>
          )}
        </Card>
      </section>

      {/* F061: Usage & Bill Preview Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Live Usage & Upcoming Invoice Preview (F061)
              </h3>
            </div>
            <Badge variant="sage">Billing Cycle: Nov 1 – Nov 30</Badge>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Fixed Plan (Studio Team + 1 Seat + Terminal)</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>$114.00</div>
            </div>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Metered SMS ({smsUsageCount.toLocaleString()} segments)</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: smsUsageCount >= 5000 ? '#B36B5C' : 'var(--color-primary)' }}>
                ${(smsUsageCount * 0.02).toFixed(2)}
              </div>
            </div>
            <div style={{ border: '1px solid var(--color-primary)', padding: '12px', borderRadius: '8px', background: '#F9FAF8' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)' }}>Estimated Next Invoice</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                ${((114 + smsUsageCount * 0.02) * 1.0825).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Spend Cap Protection Alert */}
          {smsUsageCount * 0.02 >= 100 ? (
            <div style={{ background: '#FFF7F5', border: '1px solid #C67D6E', padding: '12px 14px', borderRadius: '8px', fontSize: '0.84rem', marginBottom: '16px' }}>
              <strong style={{ color: '#B36B5C', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={15} /> 100% Variable Spend Cap Reached ($100.00):
              </strong>
              <p style={{ margin: '4px 0 0', color: 'var(--color-text)' }}>
                Optional promotional SMS broadcasts are paused to protect against unexpected credit charges. Transactional booking confirmations remain fully active.
              </p>
            </div>
          ) : (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem', color: '#3A523A', marginBottom: '16px' }}>
              ✓ Usage is within your $100.00 monthly variable safety limit.
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)' }}>Simulate SMS Broadcast Volume:</span>
            <Button size="sm" variant="outline" onClick={() => setSmsUsageCount(3500)}>
              Normal (3,500 msgs / $70)
            </Button>
            <Button size="sm" variant="outline" onClick={() => setSmsUsageCount(5500)}>
              Peak Campaign (5,500 msgs / $110 - Cap Alert)
            </Button>
          </div>
        </Card>
      </section>

      {/* F062: Communication Preferences & Quiet Hours Showcase (Document DR05) */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BellOff size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Communication Channels & Quiet Hours (F062 / DR05)
              </h3>
            </div>
            <Badge variant="sage">Quiet Hours: 9 PM – 8 AM</Badge>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #E8E5E0', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ fontSize: '0.86rem' }}>Transactional Appointments</strong>
                <Badge variant="sage">Always On</Badge>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Booking receipts and urgent calendar reschedules. Cannot be disabled without full STOP.
              </p>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #E8E5E0', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ fontSize: '0.86rem' }}>Clinical Care Reminders</strong>
                <Badge variant="sage">Active</Badge>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Post-peel aftercare instructions and patch test check-in prompts.
              </p>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #E8E5E0', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ fontSize: '0.86rem' }}>Promotional & Perks</strong>
                <Badge variant={promoSmsOptIn ? 'sage' : 'muted'}>
                  {promoSmsOptIn ? 'Opted In' : 'Opted Out'}
                </Badge>
              </div>
              <div style={{ marginTop: '8px' }}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPromoSmsOptIn(!promoSmsOptIn)}
                >
                  {promoSmsOptIn ? 'Turn Off Marketing SMS' : 'Opt-In to Glow Perks'}
                </Button>
              </div>
            </div>
          </div>

          {/* Quiet Hours Evaluation Simulation */}
          <div style={{ borderTop: '1px solid #E8E5E0', paddingTop: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>Outbound Dispatch Verification:</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setQuietHoursSimulatedNight(!quietHoursSimulatedNight)}
              >
                {quietHoursSimulatedNight ? 'Simulate Send at 2:00 PM (Day)' : 'Simulate Send at 11:00 PM (Night)'}
              </Button>
            </div>

            {quietHoursSimulatedNight ? (
              <div style={{ background: '#FFF9F5', border: '1px solid #E2A76F', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem', color: '#8A531C' }}>
                🌙 <strong>Night Hour Detected (11:00 PM):</strong> Promotional deals are strictly deferred until 8:00 AM to respect client sleep. Urgent booking confirmations still deliver instantly.
              </div>
            ) : (
              <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem', color: '#3A523A' }}>
                ☀️ <strong>Day Hour (2:00 PM):</strong> Clear to send immediately to consented recipients.
              </div>
            )}
          </div>
        </Card>
      </section>

      {/* F063: Visit Progress Check-ins Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Between-Visit Healing Check-ins (F063)
              </h3>
            </div>
            <Badge variant="sage">Observational Self-Report</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
            Clients can upload healing photos and share comfort updates after peels, lashes, or microneedling. Concerns route straight to their treating specialist with automatic safety triage.
          </p>

          <div style={{ background: '#FAF8F5', padding: '12px 14px', borderRadius: '8px', fontSize: '0.8rem', color: '#735A42', marginBottom: '16px' }}>
            <strong>Legal & Clinical Safeguard:</strong> Check-ins are self-reported client observations to guide care; they do not constitute formal medical diagnoses. Urgent symptoms trigger immediate clinical escalation advice.
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <Button
              size="sm"
              variant={checkinComfort === 'routine' ? 'primary' : 'outline'}
              onClick={() => { setCheckinComfort('routine'); setCheckinReviewed(false); }}
            >
              Day 3: Routine Mild Flaking (Normal)
            </Button>
            <Button
              size="sm"
              variant={checkinComfort === 'severe' ? 'primary' : 'outline'}
              onClick={() => { setCheckinComfort('severe'); setCheckinReviewed(false); }}
            >
              Day 1: Severe Reaction (Safety Alert)
            </Button>
          </div>

          {checkinComfort === 'routine' ? (
            <div style={{ background: '#F8F9F8', padding: '14px', borderRadius: '8px', border: '1px solid #E8E5E0', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Report from <strong>Hailey Morgan</strong> (Jessner Peel, Day 3)</span>
                <Badge variant="sage">Triage: Routine Healing</Badge>
              </div>
              <p style={{ fontStyle: 'italic', margin: '4px 0 10px', color: 'var(--color-text)' }}>
                "Skin is flaking gently around mouth; applying prescribed barrier balm twice daily."
              </p>
              {checkinReviewed ? (
                <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 12px', borderRadius: '6px', color: '#3A523A' }}>
                  ✓ Specialist Elena Rostova reviewed: "Flaking is right on track for day 3. Keep skin hydrated and resist peeling flakes manually."
                </div>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setCheckinReviewed(true)}>
                  Send Specialist Reassurance Note
                </Button>
              )}
            </div>
          ) : (
            <div style={{ background: '#FFF5F2', border: '1px solid #D9826C', padding: '14px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: '#A14E3B' }}>Urgent Clinical Escalation Triggered</span>
                <Badge variant="rose">Triage: Urgent Medical</Badge>
              </div>
              <p style={{ color: 'var(--color-text)', margin: '0 0 10px' }}>
                <strong>SAFETY INSTRUCTION:</strong> Client reported intense burning and localized blistering. Immediate guidance displayed: pause all active products, apply cold compress, and seek urgent medical evaluation if swelling spreads. Treating specialist alerted via urgent notification.
              </p>
            </div>
          )}
        </Card>
      </section>

      {/* F064: Consent-Aware Portfolio Publishing (Document D12) Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Camera size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Consent-Aware Portfolio Publishing (F064 / D12)
              </h3>
            </div>
            <Badge variant="sage">Document D12 Standard</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Treatment consent never grants automatic public marketing rights. Clients hold granular control over whether before/after photos appear on Instagram, the studio website, or remain strictly in private clinical charts.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Authorized Channels</span>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '4px' }}>
                {mediaGrantRevoked ? 'None (Revoked)' : 'Website Portfolio & Instagram'}
              </div>
            </div>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Facial Anonymity Scope</span>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '4px' }}>
                {anonymitySelection === 'eyes_obscured' ? 'Eyes Obscured / Cropped' : 'Full Face Revealed'}
              </div>
            </div>
            <div style={{ border: '1px solid var(--color-primary)', padding: '12px', borderRadius: '8px', background: '#F9FAF8' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)' }}>Live Digital Status</span>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: mediaGrantRevoked ? '#B36B5C' : 'var(--color-primary)', marginTop: '4px' }}>
                {mediaGrantRevoked ? 'Removed from All Owned Platforms' : 'Actively Published (Consented)'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {!mediaGrantRevoked ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setMediaGrantRevoked(true)}
              >
                Simulate Client Revoking Public Marketing Consent
              </Button>
            ) : (
              <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem', color: '#3A523A' }}>
                ✓ Marketing rights revoked. Photo unlinked from website & social feeds. Private clinical charting record preserved intact.
              </div>
            )}
          </div>
        </Card>
      </section>

      {/* F065: Virtual Consultation Connection (WB A6) Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Video size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Virtual Video Consultation Room (F065 / WB A6)
              </h3>
            </div>
            <Badge variant="sage">Zero-App Frictionless Join</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Clients connect to video consultations directly in their browser without downloading third-party software or creating passwords. Call recording is strictly off by default to protect client confidentiality.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid #E8E5E0', padding: '14px', borderRadius: '8px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <strong style={{ fontSize: '0.92rem' }}>Bridal Skin Prep Virtual Consult</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Specialist: Elena Rostova • Client: Sienna Miller</div>
              </div>
              <Badge variant="muted">Recording Strictly OFF</Badge>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Linked Intake: <code>3 Reference Photos Attached</code> • Focus: Acne Scarring & Hydration
            </div>
          </div>

          {!consultCompleted ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setConsultRoomCreated(true)}
              >
                Join One-Click Video Room (Browser Link)
              </Button>
              {consultRoomCreated && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setConsultCompleted(true)}
                >
                  Complete Call & Generate Treatment Plan
                </Button>
              )}
            </div>
          ) : (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '12px 14px', borderRadius: '8px', fontSize: '0.85rem', color: '#3A523A' }}>
              ✓ Consultation completed. Recommended plan: <em>"3-step gentle mandelic peel series"</em> linked directly to client proposal estimate.
            </div>
          )}
        </Card>
      </section>

      {/* F066: Arrival and Private Waiting Room Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserCheck size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Accessible Arrival & Private Waiting Queue (F066)
              </h3>
            </div>
            <Badge variant="sage">Privacy-Preserving Queue</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Clients check in with a single tap. The public salon display shows only sanitized tokens (e.g. "Maya L."), strictly shielding full names, phone numbers, and private VIP member notes.
          </p>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            {clientArrivedState === 'idle' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setClientArrivedState('arrived')}
              >
                Simulate Client Arrival Tap: "I've Arrived"
              </Button>
            )}

            {clientArrivedState === 'arrived' && (
              <>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setClientArrivedState('in_chair')}
                >
                  Call Client to Station ("In Chair")
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setClientArrivedState('reversed')}
                >
                  Reverse Accidental Check-in
                </Button>
              </>
            )}

            {(clientArrivedState === 'in_chair' || clientArrivedState === 'reversed') && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setClientArrivedState('idle')}
              >
                Reset Queue Simulation
              </Button>
            )}
          </div>

          {clientArrivedState === 'arrived' && (
            <div style={{ background: '#F8F9F8', border: '1px solid #738A73', padding: '14px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Private Queue Item: Maya L. (Token #14)</span>
                <Badge variant="sage">Arrived (Est. Wait: 5 mins)</Badge>
              </div>
              <p style={{ margin: '0 0 6px', color: 'var(--color-text)' }}>
                Treatment: <strong>Hydra-Dew Glass Glow Facial</strong> with specialist Elena Rostova.
              </p>
              <div style={{ fontSize: '0.78rem', color: '#8A531C', background: '#FFF9F2', padding: '6px 10px', borderRadius: '4px' }}>
                🔒 <strong>Private Staff Alert:</strong> VIP Client (Prefers cucumber infused water). Hidden from public screens.
              </div>
            </div>
          )}

          {clientArrivedState === 'in_chair' && (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '12px 14px', borderRadius: '8px', fontSize: '0.85rem', color: '#3A523A' }}>
              ✓ Client seated in <strong>Treatment Room 2</strong>. Service timer started.
            </div>
          )}

          {clientArrivedState === 'reversed' && (
            <div style={{ background: '#FAF8F5', border: '1px solid #E2A76F', padding: '12px 14px', borderRadius: '8px', fontSize: '0.85rem', color: '#735A42' }}>
              Accidental check-in reversed back to "Scheduled". Appointment preserved without dropping from calendar.
            </div>
          )}
        </Card>
      </section>

      {/* F067: Local Device Preferences & Accessibility Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card style={{
          fontSize: textSizeSelection === 'large' ? '1.08rem' : textSizeSelection === 'extra_large' ? '1.2rem' : '0.95rem',
          border: contrastSelection === 'high_contrast' ? '2px solid #000000' : '1px solid var(--color-border)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Type size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Device Preferences & Universal Accessibility (F067)
              </h3>
            </div>
            <Badge variant="sage">WCAG AAA Ready</Badge>
          </div>

          <p style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Zero drag-only or memory puzzle interactions. Complete reservations and checkout using high contrast, enlarged touch targets, and full keyboard focus accessibility.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Text Size:</span>
              <Button
                size="sm"
                variant={textSizeSelection === 'default' ? 'primary' : 'outline'}
                onClick={() => setTextSizeSelection('default')}
              >
                Default
              </Button>
              <Button
                size="sm"
                variant={textSizeSelection === 'large' ? 'primary' : 'outline'}
                onClick={() => setTextSizeSelection('large')}
              >
                Large (+15%)
              </Button>
              <Button
                size="sm"
                variant={textSizeSelection === 'extra_large' ? 'primary' : 'outline'}
                onClick={() => setTextSizeSelection('extra_large')}
              >
                XL (+30%)
              </Button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Contrast:</span>
              <Button
                size="sm"
                variant={contrastSelection === 'standard' ? 'primary' : 'outline'}
                onClick={() => setContrastSelection('standard')}
              >
                Standard
              </Button>
              <Button
                size="sm"
                variant={contrastSelection === 'high_contrast' ? 'primary' : 'outline'}
                onClick={() => setContrastSelection('high_contrast')}
              >
                High Contrast
              </Button>
            </div>
          </div>

          <div style={{ background: contrastSelection === 'high_contrast' ? '#FFFFFF' : '#FAF8F5', border: '1px solid #CCC', padding: '12px 14px', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, color: contrastSelection === 'high_contrast' ? '#000000' : 'var(--color-primary)' }}>
              Accessibility Preview Card
            </div>
            <div style={{ color: contrastSelection === 'high_contrast' ? '#000000' : 'var(--color-text)' }}>
              Buttons feature high-visibility 3px focus rings and reduced-motion transitions.
            </div>
          </div>
        </Card>
      </section>

      {/* F068: Client Credit & Balance Explanations Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wallet size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Transparent Client Credit & Balances (F068 / D15 / D17)
              </h3>
            </div>
            <Badge variant="sage">Document D17 Certified</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            No mysterious expired funds or confusing math. Every package session, gift card dollar, and monthly credit is written out in warm, plain English with a complete redemption ledger.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '16px' }}>
            <div style={{ background: '#FAF8F5', border: '1px solid #E8E5E0', padding: '14px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong>HydraFacial 3-Pack Series</strong>
                <Badge variant="sage">{3 - redeemedSessionCount} of 3 Left</Badge>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text)', margin: '4px 0 8px' }}>
                "You have {3 - redeemedSessionCount} of 3 sessions remaining (${(3 - redeemedSessionCount) * 100}.00 value), valid through Oct 15, 2027."
              </p>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                Last used: Oct 20, 2026 at Checkout (#33333333)
              </div>
            </div>

            <div style={{ background: '#FAF8F5', border: '1px solid #E8E5E0', padding: '14px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong>Mother's Day Gift Card</strong>
                <Badge variant="sage">$75.00 Available</Badge>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text)', margin: '4px 0 8px' }}>
                "You have $75.00 spendable store credit from your Mother's Day pampering gift card, with no expiration date."
              </p>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                Protected Code: <code>GIFT-****-9842</code> (Secret masked)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              size="sm"
              variant="outline"
              disabled={redeemedSessionCount >= 3}
              onClick={() => setRedeemedSessionCount(redeemedSessionCount + 1)}
            >
              Simulate Redeeming 1 Package Session at Checkout
            </Button>
            {redeemedSessionCount > 1 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setRedeemedSessionCount(1)}
              >
                Reset Balance
              </Button>
            )}
          </div>
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
