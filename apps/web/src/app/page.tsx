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

  // F032 Custom Website Theme State
  const [websiteTheme, setWebsiteTheme] = useState<'editorial_atelier' | 'calm_minimal'>('editorial_atelier');

  // F034 Consultation Inquiry State
  const [inquiryText, setInquiryText] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // F035 Conditional Intake Form State
  const [hasRetinoids, setHasRetinoids] = useState<boolean | null>(null);
  const [retinoidDetails, setRetinoidDetails] = useState('');
  const [intakeCompleted, setIntakeCompleted] = useState(false);
  const [intakeError, setIntakeError] = useState<string | null>(null);

  // F038 Note Amendment State
  const [amendmentText, setAmendmentText] = useState('');
  const [amendmentAdded, setAmendmentAdded] = useState(false);

  // F039 Photo Markup State
  const [activeZone, setActiveZone] = useState<string>('T-Zone');
  const [permissionScope, setPermissionScope] = useState<'internal' | 'marketing'>('internal');

  // F041 Repeat Intake Delta State
  const [repeatReviewMode, setRepeatReviewMode] = useState<'review' | 'confirmed_same' | 'reported_changes'>('review');
  const [newMedication, setNewMedication] = useState('Started Spironolactone 50mg daily');

  // F043 Bundle Service Selection State
  const [selectedAddon, setSelectedAddon] = useState<boolean>(false);

  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText) return;
    setInquirySubmitted(true);
  };

  const handleCompleteIntake = (e: React.FormEvent) => {
    e.preventDefault();
    setIntakeError(null);
    if (hasRetinoids === null) {
      setIntakeError('Please let us know if you are currently using retinoids.');
      return;
    }
    if (hasRetinoids && !retinoidDetails.trim()) {
      setIntakeError('Please specify your retinoid or Accutane details so we can adjust exfoliation safely.');
      return;
    }
    setIntakeCompleted(true);
  };

  const handleAddAmendment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amendmentText) return;
    setAmendmentAdded(true);
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

      {/* F041: Changes Since Last Visit (Repeat Intake Delta) */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarCheck size={18} color="var(--color-primary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 041: Changes Since Last Visit (Quick Review)
              </strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Repeat Client Visit</Badge>
              <Badge variant="muted">Last Visit: Oct 12</Badge>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Repeat clients review their previous verified answers. Confirm in 1-click or update only what changed—past health records are never overwritten.
          </p>

          <div style={{ background: '#FAF8F5', padding: '14px', borderRadius: '8px', marginBottom: '14px' }}>
            <div style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
              <strong>Verified Answers on File:</strong>
            </div>
            <div style={{ fontSize: '0.83rem', color: 'var(--color-text)', lineHeight: 1.6 }}>
              • <strong>Medications:</strong> None reported on Oct 12<br />
              • <strong>Allergies:</strong> No known cosmetic allergies<br />
              • <strong>Primary Skin Goal:</strong> Barrier hydration
            </div>
          </div>

          {repeatReviewMode === 'review' && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setRepeatReviewMode('confirmed_same')}
              >
                ✓ Everything is still the same (1-Click Confirm)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRepeatReviewMode('reported_changes')}
              >
                ✏️ I have updates to report
              </Button>
            </div>
          )}

          {repeatReviewMode === 'confirmed_same' && (
            <div style={{ background: 'var(--color-secondary-light)', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} color="var(--color-primary)" />
              <span>
                <strong>Quick Confirmation Saved!</strong> Baseline intake verified for today's visit with zero duplicate entry.
              </span>
            </div>
          )}

          {repeatReviewMode === 'reported_changes' && (
            <div style={{ background: '#FFF7F5', border: '1px solid #C67D6E', padding: '14px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B36B5C', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                <AlertCircle size={15} />
                <span>Delta Detected: Practitioner Triage Triggered</span>
              </div>
              <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '6px', fontWeight: 600 }}>
                Update Prescription Medications / New Products:
              </label>
              <input
                type="text"
                value={newMedication}
                onChange={(e) => setNewMedication(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '0.85rem', marginBottom: '10px' }}
              />
              <Button
                variant="primary"
                size="sm"
                onClick={() => alert('New medication delta recorded! Chloe alerted to review Spironolactone before treatment.')}
              >
                Save Updates & Alert Practitioner
              </Button>
            </div>
          )}
        </Card>
      </section>

      {/* F042: Patch Test Record & Service Readiness */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ backgroundColor: '#FAF8F5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="var(--color-secondary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 042: Patch Test & Safety Clearance Record
              </strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Cleared for Service</Badge>
              <Badge variant="muted">Evaluated at 48h</Badge>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Professional-evaluated patch test tracking. Missing evidence or adverse reactions automatically flag readiness without guessing universal medical intervals.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', background: '#FFF', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)', marginBottom: '12px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Product & Lot</span>
              <strong style={{ fontSize: '0.85rem' }}>Lash Adhesive LOT-9821</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Test Location</span>
              <strong style={{ fontSize: '0.85rem' }}>Behind Right Ear</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Observed Result</span>
              <strong style={{ fontSize: '0.85rem', color: 'var(--color-secondary)' }}>Negative (No Erythema)</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Salon Validity Window</span>
              <strong style={{ fontSize: '0.85rem' }}>180 Days (Expires Apr 2027)</strong>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
            <span>Evaluated by: Chloe V., Licensed Aesthetician</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>✓ Appointment Pre-Check: Safety Verified</span>
          </div>
        </Card>
      </section>

      {/* F043: Appointment-Matched Form Bundling & Dynamic Re-Evaluation */}
      <section style={{ marginBottom: '36px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BadgeCheck size={18} color="var(--color-primary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 043: Smart Appointment Form Bundle
              </strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={selectedAddon ? 'rose' : 'sage'}>
                {selectedAddon ? '1 Form Outstanding' : 'All Required Forms Completed'}
              </Badge>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Bundles intake, consent, and prep documents specific to booked treatments. Adding or changing a service re-evaluates requirements instantly without losing completed work.
          </p>

          <div style={{ background: '#FAF8F5', padding: '14px', borderRadius: '8px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                Booked Services: {activeServiceObj.name} {selectedAddon && '+ Level 2 Chemical Peel Add-On'}
              </strong>
              <label style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedAddon}
                  onChange={(e) => setSelectedAddon(e.target.checked)}
                />
                <span>Simulate Adding Chemical Peel</span>
              </label>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: '#FFF', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}>
                <div>
                  <strong>1. General Health & Skin Questionnaire</strong>
                  <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Required for all facial treatments</p>
                </div>
                <Badge variant="sage">✓ Completed on File</Badge>
              </div>

              {selectedAddon && (
                <div style={{ display: 'flex', justifyContent: 'space-between', background: '#FFF7F5', padding: '10px 14px', borderRadius: '6px', border: '1px solid #C67D6E', fontSize: '0.85rem' }}>
                  <div>
                    <strong style={{ color: '#B36B5C' }}>2. Level 2 Chemical Peel Informed Consent</strong>
                    <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Newly required because Chemical Peel was added to appointment</p>
                  </div>
                  <Badge variant="rose">⚠️ Signature Required</Badge>
                </div>
              )}
            </div>
          </div>
        </Card>
      </section>

      {/* F038: Structured Treatment Notes & SOAP Charting */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={18} color="var(--color-primary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 038: Treatment Note & SOAP Charting
              </strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Signed by Chloe V., LE</Badge>
              <Badge variant="muted">Immutable Audit Log</Badge>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Permanent clinical record with products used, skin response, and append-only amendments.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>SUBJECTIVE</span>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>Client noted chin dehydration and tightness after flights.</p>
            </div>
            <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>OBJECTIVE</span>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>Fitzpatrick II. Mild comedones on chin. Tolerated extractions well.</p>
            </div>
            <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>ASSESSMENT</span>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>Healthy epidermal barrier, ideal candidate for hydrating enzyme peel.</p>
            </div>
            <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>PLAN</span>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>Maintenance visit in 4 weeks. Prescribed barrier repair regimen.</p>
            </div>
          </div>

          <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.85rem' }}>
            <strong>Products & Lots Used:</strong> Papaya Enzyme Polish (Lot #2409-A, 5ml), Hyaluronic Quench Gel (3 pumps).
          </div>

          {amendmentAdded ? (
            <div style={{ background: 'var(--color-secondary-light)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <strong>✓ Signed Amendment Logged:</strong> "{amendmentText}" (Recorded with author timestamp).
            </div>
          ) : (
            <form onSubmit={handleAddAmendment} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Append clinical amendment (e.g. 24h follow-up phone call confirmed zero erythema)..."
                value={amendmentText}
                onChange={(e) => setAmendmentText(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.85rem',
                }}
              />
              <Button variant="outline" size="sm" type="submit">
                <Pencil size={12} style={{ marginRight: '4px' }} /> Append Amendment
              </Button>
            </form>
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
