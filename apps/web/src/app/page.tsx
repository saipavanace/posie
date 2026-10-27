'use client';

import React, { useState } from 'react';
import { Card, Button, Badge } from '@posie/ui';
import {
  Sparkles,
  Clock,
  ShieldCheck,
  QrCode,
  Printer,
  MessageSquare,
  Copy,
  Check,
  CheckCircle2,
  Info,
  Share2,
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
    prep: 'Stop heavy exfoliating acids or retinol 48 hours beforehand.',
  },
  {
    id: 's2',
    name: 'Fluff & Define Brow Sculpt',
    tag: 'Quick Refresh',
    price: 55,
    duration: 35,
    description:
      'Custom tinting and precision shaping that makes your natural arches pop so well you can skip filling them in for 4 weeks.',
    prep: 'Come with clean, makeup-free brows.',
  },
  {
    id: 's3',
    name: 'Satin Smooth Dermaplaning',
    tag: 'Instant Results',
    price: 90,
    duration: 45,
    description:
      'Gentle peach-fuzz removal and dead cell sweep. Your foundation and serums will glide on like pure silk.',
    prep: 'Skip active breakouts and sunburns.',
  },
];

// Specialists
const staffMembers = [
  {
    id: 'st1',
    name: 'Chloe Martinez',
    role: 'Licensed Master Esthetician',
    bio: 'Obsessed with barrier repair, scalp massages, and making sure extractions never feel like torture.',
    skills: ['Hydra-Facials', 'Dermaplaning', 'Sensitive Skin'],
  },
  {
    id: 'st2',
    name: 'Sienna Brooks',
    role: 'Brow & Lash Specialist',
    bio: 'Queen of natural, fluffy brows. Believes your brows are sisters, not twins, but they should still hang out together.',
    skills: ['Brow Mapping', 'Lash Lift & Tint'],
  },
];

// Policies
const bookingPolicies = [
  {
    title: 'Hold Your Spot (Deposit)',
    detail: 'A 20% deposit locks in your slot. It goes straight toward your final bill.',
  },
  {
    title: 'Life Happens (Cancellation)',
    detail: 'Give us 24 hours notice to reschedule or cancel with 100% deposit refund.',
  },
  {
    title: 'Accessibility & Comfort',
    detail: 'Step-free access available. Love silence during your appointment? Select "Quiet Visit" and we won’t chat your ear off.',
  },
];

export default function PosieStudioPage() {
  const [selectedService, setSelectedService] = useState<string>('s1');
  const [selectedStaff, setSelectedStaff] = useState<string>('st1');
  const [quietVisit, setQuietVisit] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [messagePreviewType, setMessagePreviewType] = useState<'confirmation' | 'reschedule' | 'aftercare'>('confirmation');

  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];
  const activeStaffObj = staffMembers.find((s) => s.id === selectedStaff) || staffMembers[0];

  // F005: Direct Link
  const directLinkUrl = `https://posie.app/posie-austin/book?service=${selectedService}&specialist=${selectedStaff}&src=qr_card`;

  // F007: Compiled Messages
  const messagePreviews = {
    confirmation: `Hey Maya! ✨ You're all set for ${activeServiceObj.name} on Thursday, Nov 12 at 2:30 PM with ${activeStaffObj.name}. Your deposit of $24.00 is locked in. Reminder: ${activeServiceObj.prep} See your visit details or adjust anytime: https://posie.app/portal/visit-123 Can't wait to see you! — Posie`,
    reschedule: `Hey Maya! We've successfully shifted your ${activeServiceObj.name} to Friday, Nov 13 at 11:00 AM with ${activeStaffObj.name}. View your updated details here: https://posie.app/portal/visit-123 — Posie`,
    aftercare: `Hey Maya! How are you glowing after your ${activeServiceObj.name} today? Remember to keep your skin hydrated and avoid direct sun today. Any questions? Text us at +1-555-0199! — Posie`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(directLinkUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px 80px' }}>
      {/* Brand Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
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

        <div style={{ textAlign: 'right' }}>
          <Badge variant="rose">Atelier Studio</Badge>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Austin, TX • Open Tue-Sat
          </p>
        </div>
      </header>

      {/* F005 & F006 Showcase Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        {/* F005: Direct Booking Link & QR Code */}
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <QrCode size={20} color="var(--color-tertiary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-tertiary)', textTransform: 'uppercase' }}>
              Feature 005
            </span>
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Direct Booking Link & QR Code
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Pre-configures the exact treatment and specialist for Instagram bio, referral cards, or window signs.
          </p>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
            {/* SVG QR Code */}
            <svg width="100" height="100" viewBox="0 0 140 140" fill="none" style={{ borderRadius: '10px', border: '1px solid var(--color-border)' }}>
              <rect width="140" height="140" rx="12" fill="#FAF8F5" />
              <rect x="14" y="14" width="32" height="32" rx="6" fill="#2C3E30" />
              <rect x="20" y="20" width="20" height="20" rx="3" fill="#FAF8F5" />
              <rect x="24" y="24" width="12" height="12" rx="2" fill="#2C3E30" />
              <rect x="94" y="14" width="32" height="32" rx="6" fill="#2C3E30" />
              <rect x="100" y="20" width="20" height="20" rx="3" fill="#FAF8F5" />
              <rect x="104" y="24" width="12" height="12" rx="2" fill="#2C3E30" />
              <rect x="14" y="94" width="32" height="32" rx="6" fill="#2C3E30" />
              <rect x="20" y="100" width="20" height="20" rx="3" fill="#FAF8F5" />
              <rect x="24" y="104" width="12" height="12" rx="2" fill="#2C3E30" />
              <rect x="56" y="24" width="8" height="12" rx="2" fill="#2C3E30" />
              <rect x="74" y="16" width="10" height="8" rx="2" fill="#2C3E30" />
              <rect x="56" y="44" width="28" height="8" rx="2" fill="#2C3E30" />
              <rect x="46" y="60" width="16" height="16" rx="3" fill="#2C3E30" />
              <rect x="72" y="62" width="20" height="8" rx="2" fill="#2C3E30" />
              <rect x="102" y="56" width="16" height="24" rx="2" fill="#2C3E30" />
              <rect x="56" y="86" width="24" height="12" rx="2" fill="#2C3E30" />
            </svg>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  backgroundColor: 'var(--color-bg)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  wordBreak: 'break-all',
                  marginBottom: '10px',
                  border: '1px solid var(--color-border)',
                }}
              >
                {directLinkUrl}
              </div>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copiedLink ? <><Check size={14} style={{ marginRight: '6px' }} /> Copied!</> : <><Copy size={14} style={{ marginRight: '6px' }} /> Copy Link</>}
              </Button>
            </div>
          </div>
        </Card>

        {/* F006: Printable Branded Materials */}
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Printer size={20} color="var(--color-primary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
              Feature 006
            </span>
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Printable Price Menus & Collateral
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Auto-compiles print-ready sheets for physical studio reception or customer takeaway bags.
          </p>

          <div
            style={{
              backgroundColor: 'var(--color-bg)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid var(--color-border)',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong style={{ fontSize: '0.9rem' }}>Posie Studio Menu (v1.3)</strong>
              <Badge variant="sage">Letter / Print Ready</Badge>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              3 Active treatments • Generated with live pricing & preparation guides.
            </p>
          </div>

          <Button
            variant="secondary"
            size="md"
            onClick={() => window.print()}
            style={{ width: '100%' }}
          >
            <Printer size={16} style={{ marginRight: '8px' }} /> Print Treatment Menu
          </Button>
        </Card>
      </div>

      {/* F007: Message Template Library */}
      <section style={{ marginBottom: '48px' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <MessageSquare size={20} color="var(--color-tertiary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-tertiary)', textTransform: 'uppercase' }}>
              Feature 007
            </span>
          </div>
          <h2 style={{ fontSize: '1.9rem', color: 'var(--color-primary)' }}>Message Template Library</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Quirky, warm, authoritative communication sent to your clients automatically without missing variables.
          </p>
        </div>

        <Card style={{ backgroundColor: '#FFFFFF' }}>
          {/* Template Tabs */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '18px', borderBottom: '1px solid var(--color-border)', paddingBottom: '14px' }}>
            <Button
              variant={messagePreviewType === 'confirmation' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setMessagePreviewType('confirmation')}
            >
              Booking Confirmation
            </Button>
            <Button
              variant={messagePreviewType === 'reschedule' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setMessagePreviewType('reschedule')}
            >
              Reschedule Notice
            </Button>
            <Button
              variant={messagePreviewType === 'aftercare' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setMessagePreviewType('aftercare')}
            >
              Post-Visit Aftercare
            </Button>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-bg)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid var(--color-border)',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {messagePreviews[messagePreviewType]}
          </div>
        </Card>
      </section>

      {/* Treatment Menu Selection */}
      <section style={{ marginBottom: '56px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.9rem', color: 'var(--color-primary)' }}>The Treatment Menu</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Select a treatment to update your direct link and message preview.</p>
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

      {/* Specialists */}
      <section style={{ marginBottom: '56px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.9rem', color: 'var(--color-primary)' }}>Meet Your Specialists</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {staffMembers.map((staff) => {
            const isSelected = selectedStaff === staff.id;
            return (
              <Card
                key={staff.id}
                style={{
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                  borderWidth: isSelected ? '2px' : '1px',
                }}
                onClick={() => setSelectedStaff(staff.id)}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-secondary-light)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1.2rem',
                      fontFamily: 'var(--font-headline)',
                      flexShrink: 0,
                    }}
                  >
                    {staff.name[0]}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>{staff.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-tertiary)', fontWeight: 600, marginBottom: '8px' }}>
                      {staff.role}
                    </p>
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>{staff.bio}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Booking Policies & Confirmation */}
      <section>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.9rem', color: 'var(--color-primary)' }}>Honest, Plain-Language Policies</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {bookingPolicies.map((pol) => (
            <Card key={pol.title} style={{ backgroundColor: 'var(--color-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <ShieldCheck size={20} color="var(--color-primary)" />
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>{pol.title}</h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>{pol.detail}</p>
            </Card>
          ))}
        </div>

        <Card style={{ border: '2px solid var(--color-primary)', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '16px' }}>
            Book Your Visit Now
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Treatment:</span>
              <strong>{activeServiceObj.name} (${activeServiceObj.price})</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Specialist:</span>
              <strong>{activeStaffObj.name}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
              <input
                type="checkbox"
                id="quietCheck"
                checked={quietVisit}
                onChange={(e) => setQuietVisit(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
              />
              <label htmlFor="quietCheck" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                <strong>Request a Quiet Visit:</strong> Let the team know you just want to relax and enjoy the treatment without small talk.
              </label>
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
                <strong>Appointment Snapshot Created!</strong>
                <p style={{ fontSize: '0.85rem' }}>
                  Confirmation sent using the Message Template Library (F007).
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
