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

      {/* F039: Image Annotation Tools & Treatment Zone Mapping */}
      <section style={{ marginBottom: '36px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} color="var(--color-secondary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 039: Non-Destructive Face Mapping & Annotations
              </strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={permissionScope === 'marketing' ? 'rose' : 'muted'}>
                {permissionScope === 'marketing' ? 'Marketing Consented' : 'Internal Clinical Only'}
              </Badge>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
            Original client photos are preserved immutably. Markup overlays store clinical notes by treatment zone.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '16px', alignItems: 'center' }}>
            {/* Visual Zone Grid */}
            <div
              style={{
                height: '180px',
                backgroundColor: '#FAF8F5',
                border: '2px dashed var(--color-secondary)',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)' }}>Interactive Face Map</span>
                <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Selected Zone: <strong>{activeZone}</strong>
                </p>
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
                {['Forehead', 'T-Zone', 'Cheeks', 'Chin'].map((z) => (
                  <button
                    key={z}
                    onClick={() => setActiveZone(z)}
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.75rem',
                      borderRadius: '4px',
                      border: '1px solid var(--color-border)',
                      background: activeZone === z ? 'var(--color-secondary)' : '#FFF',
                      color: activeZone === z ? '#FFF' : 'var(--color-primary)',
                      cursor: 'pointer',
                    }}
                  >
                    {z}
                  </button>
                ))}
              </div>
            </div>

            {/* Zone Details */}
            <div style={{ background: '#FAF8F5', padding: '14px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                  Zone Notes: {activeZone}
                </strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Layer: Peel Contraindications</span>
              </div>
              <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--color-text)' }}>
                {activeZone === 'T-Zone' && 'Mild redness reported. Use 1 layer of glycolic peel; do not perform double pass.'}
                {activeZone === 'Forehead' && 'Healthy skin barrier. Full 2-minute peel contact time.'}
                {activeZone === 'Cheeks' && 'Hydration target: apply ultra-quenching hyaluronic serum with cold globe roll.'}
                {activeZone === 'Chin' && 'Ultrasonic pore sweep performed. Extra botanical calming balm applied.'}
              </p>
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => setPermissionScope(permissionScope === 'internal' ? 'marketing' : 'internal')}
                  style={{
                    fontSize: '0.78rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-secondary)',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  {permissionScope === 'internal' ? 'Enable Client Marketing Consent' : 'Revoke Marketing Consent'}
                </button>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>SHA-256 Base Image Verified</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* F040: Home-Care Regimen Plan */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ backgroundColor: '#FAF8F5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sun size={18} color="var(--color-tertiary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 040: Home-Care Regimen & Bathroom Guide
              </strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Prescribed v1</Badge>
              <Badge variant="muted">Fragrance-Free</Badge>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Practitioner-approved daily routine aligned with client preferences. Versioned so clients can track routine evolution.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div style={{ background: '#FFF', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: 'var(--color-primary)' }}>
                <Sun size={15} color="var(--color-tertiary)" />
                <strong style={{ fontSize: '0.9rem' }}>Morning (AM) Routine</strong>
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.83rem', lineHeight: '1.5' }}>
                <li><strong>Step 1:</strong> Milky Oat Cleanser (Cleanse gently with lukewarm water)</li>
                <li><strong>Step 2:</strong> Mineral Barrier Zinc SPF 50 (Apply 2 finger lengths)</li>
              </ul>
            </div>
            <div style={{ background: '#FFF', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: 'var(--color-primary)' }}>
                <Moon size={15} color="var(--color-secondary)" />
                <strong style={{ fontSize: '0.9rem' }}>Evening (PM) Routine</strong>
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.83rem', lineHeight: '1.5' }}>
                <li><strong>Step 1:</strong> Double Cleanse with Calming Camellia Oil</li>
                <li><strong>Step 2:</strong> Lipid Repair Night Balm (Press pea-sized amount into skin)</li>
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Honored Preferences: Fragrance-Free Only • Minimalist (2 Steps AM / PM)
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert('Printing bathroom mirror daily compliance card...')}
            >
              <Printer size={13} style={{ marginRight: '6px' }} /> Print Bathroom Mirror Card
            </Button>
          </div>
        </Card>
      </section>

      {/* F035: Conditional Intake Forms */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ borderLeft: '4px solid var(--color-secondary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCheck2 size={18} color="var(--color-secondary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 035: Smart Conditional Intake Form
              </strong>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-secondary)' }}>
              Autosaved Draft • WCAG Compliant
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Branching questions only appear when relevant. Hidden questions are never marked as missing required fields!
          </p>

          {intakeCompleted ? (
            <div
              style={{
                backgroundColor: 'var(--color-secondary-light)',
                padding: '16px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <CheckCircle2 size={24} color="var(--color-primary)" />
              <div>
                <strong style={{ color: 'var(--color-primary)' }}>Intake Form Validated & Saved!</strong>
                <p style={{ fontSize: '0.85rem', margin: '2px 0 0', color: 'var(--color-text)' }}>
                  Your answers are privately linked to your appointment snapshot. Chloe can review sensitive contraindications safely.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCompleteIntake}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.92rem', marginBottom: '6px' }}>
                  Are you currently taking Accutane or using prescribed retinoids?
                </label>
                <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="retinoid"
                      checked={hasRetinoids === true}
                      onChange={() => setHasRetinoids(true)}
                    />
                    <span>Yes, I do</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="retinoid"
                      checked={hasRetinoids === false}
                      onChange={() => setHasRetinoids(false)}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* Branching Question */}
              {hasRetinoids && (
                <div
                  style={{
                    backgroundColor: '#FAF8F5',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-secondary)', fontSize: '0.82rem', marginBottom: '6px' }}>
                    <AlertCircle size={14} />
                    <strong>Why we ask:</strong> Accutane & retinoids thin the stratum corneum. We modify chemical exfoliation to prevent barrier damage.
                  </div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px' }}>
                    Please share your retinoid name, percentage, or recent dosage date:
                  </label>
                  <input
                    type="text"
                    value={retinoidDetails}
                    onChange={(e) => setRetinoidDetails(e.target.value)}
                    placeholder="e.g. Tretinoin 0.05% every other night; last applied 2 days ago"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.88rem',
                    }}
                  />
                </div>
              )}

              {intakeError && (
                <p style={{ color: '#C67D6E', fontSize: '0.85rem', marginBottom: '12px' }}>{intakeError}</p>
              )}

              <Button variant="primary" size="md" type="submit">
                Complete & Validate Intake
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
