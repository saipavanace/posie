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
  const [customDomainActive, setCustomDomainActive] = useState(true);

  // F034 Consultation Inquiry State
  const [inquiryText, setInquiryText] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // F035 Conditional Intake Form State
  const [hasRetinoids, setHasRetinoids] = useState<boolean | null>(null);
  const [retinoidDetails, setRetinoidDetails] = useState('');
  const [intakeCompleted, setIntakeCompleted] = useState(false);
  const [intakeError, setIntakeError] = useState<string | null>(null);

  // F036 Document Generation State
  const [docIssued, setDocIssued] = useState(true);

  // F037 Aftercare State
  const [aftercareDelivered, setAftercareDelivered] = useState(true);

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

      {/* F032: Brandable Booking Website Studio */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ backgroundColor: '#FAF8F5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={18} color="var(--color-primary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Brandable Booking Studio
              </strong>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Feature 032
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Pick your layout aesthetic and publish to your custom domain without third-party platform branding.
          </p>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setWebsiteTheme('editorial_atelier')}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid var(--color-primary)',
                backgroundColor: websiteTheme === 'editorial_atelier' ? 'var(--color-primary)' : 'transparent',
                color: websiteTheme === 'editorial_atelier' ? '#FFF' : 'var(--color-primary)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              Editorial Atelier Theme
            </button>
            <button
              onClick={() => setWebsiteTheme('calm_minimal')}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid var(--color-primary)',
                backgroundColor: websiteTheme === 'calm_minimal' ? 'var(--color-primary)' : 'transparent',
                color: websiteTheme === 'calm_minimal' ? '#FFF' : 'var(--color-primary)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              Calm Minimalist Theme
            </button>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Verified Custom Domain:</span>
              <code style={{ background: '#ECE6DF', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                glow.posieatelier.com
              </code>
            </div>
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

      {/* F036: Branded Document Generation */}
      <section style={{ marginBottom: '36px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="var(--color-primary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 036: Branded Document Studio
              </strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Doc #EST-2026-0042</Badge>
              <Badge variant="muted">Issued & Locked</Badge>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Itemized treatment plans, estimates, and receipts generated from approved ledger data. Downloadable in low-ink PDF or DOCX.
          </p>

          <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', backgroundColor: '#FAF8F5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', marginBottom: '12px' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-primary)' }}>Bespoke Bridal Radiance Plan</h4>
                <p style={{ margin: '2px 0 0', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  Prepared by Chloe V., Lead Aesthetician • Clara Oswald
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>$599.40</span>
                <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Incl. 8% local sales tax</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>2 Line Items • Locked Version 1 (Immutable)</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8rem',
                    background: '#FFF',
                    border: '1px solid var(--color-border)',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                  onClick={() => alert('Exporting low-ink printable PDF...')}
                >
                  <Printer size={13} /> Print PDF
                </button>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8rem',
                    background: '#FFF',
                    border: '1px solid var(--color-border)',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                  onClick={() => alert('Downloading editable DOCX template...')}
                >
                  <Download size={13} /> Download DOCX
                </button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* F037: Approved Aftercare Delivery */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ backgroundColor: '#FAF8F5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HeartPulse size={18} color="var(--color-secondary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 037: Approved Aftercare Delivery
              </strong>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-secondary)' }}>
              Practitioner Approved • Frozen Delivery
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
            Service-specific recovery instructions verified by your esthetician. Delivered via SMS and portal with emergency contact route.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div style={{ backgroundColor: '#FFF', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-primary)', marginBottom: '4px' }}>
                Step 1: Gentle Cleansing Only (Days 1–3)
              </strong>
              <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--color-text-muted)' }}>
                Cleanse with lukewarm water and oat cleanser. Do not use scrubs, glycolic acid, or cleansing brushes.
              </p>
            </div>
            <div style={{ backgroundColor: '#FFF', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-primary)', marginBottom: '4px' }}>
                Step 2: Mineral SPF 50 (Days 1–14)
              </strong>
              <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--color-text-muted)' }}>
                Apply non-nano zinc oxide SPF 50 every 2 hours if outdoors or sitting near bright windows.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <PhoneCall size={13} color="var(--color-secondary)" /> Direct contact route: Text Chloe at (555) 234-5678
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', fontWeight: 600 }}>
              ✓ Delivered to client at (555) 019-2834
            </span>
          </div>
        </Card>
      </section>

      {/* F034: Consultation / Treatment Question */}
      <section style={{ marginBottom: '36px' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <MessageCircleQuestion size={18} color="var(--color-primary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Feature 034: Treatment Question or Consultation Request
            </span>
          </div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Ask a Specialist Before You Book
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '18px' }}>
            Have sensitive skin or unsure if a treatment is right for you? Submit a photo or question; our team replies within 24 hours.
          </p>

          {inquirySubmitted ? (
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
              <CheckCircle2 size={24} />
              <div>
                <strong>Inquiry Sent to Chloe (Response SLA: 24h)!</strong>
                <p style={{ fontSize: '0.85rem' }}>
                  We'll review your notes and text you personalized guidance before booking.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendInquiry}>
              <textarea
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                placeholder="e.g. I recently started tretinoin and want to know which facial is safe for my skin barrier..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  marginBottom: '14px',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Upload size={14} /> Optional: Inspiration photos can be uploaded after submission
                </span>
                <Button variant="primary" size="md" type="submit">
                  <Send size={14} style={{ marginRight: '6px' }} /> Submit Consultation Inquiry
                </Button>
              </div>
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
