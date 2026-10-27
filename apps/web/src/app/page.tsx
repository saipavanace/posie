'use client';

import React, { useState } from 'react';
import { Card, Button, Badge } from '@posie/ui';
import {
  Sparkles,
  Clock,
  ShieldCheck,
  Calendar,
  Heart,
  ChevronRight,
  Info,
  CheckCircle2,
} from 'lucide-react';

// F001 Brand State
const brandData = {
  name: 'Posie',
  tagline: 'Glow up without the headache.',
  toneDescription:
    'Quirky, authoritative, playful — like your smart, fun older sister who knows all the skincare secrets and never talks down to you.',
};

// F002 Service Catalog Sample Data
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

// F003 Staff Profiles
const staffMembers = [
  {
    id: 'st1',
    name: 'Chloe Martinez',
    role: 'Licensed Master Esthetician',
    bio: 'Obsessed with barrier repair, scalp massages, and making sure extractions never feel like torture.',
    skills: ['Hydra-Facials', 'Dermaplaning', 'Sensitive Skin'],
    isPublic: true,
  },
  {
    id: 'st2',
    name: 'Sienna Brooks',
    role: 'Brow & Lash Specialist',
    bio: 'Queen of natural, fluffy brows. Believes your brows are sisters, not twins, but they should still hang out together.',
    skills: ['Brow Mapping', 'Lash Lift & Tint'],
    isPublic: true,
  },
];

// F004 Policies
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
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [quietVisit, setQuietVisit] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px 80px' }}>
      {/* F001: Brand Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '50px',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Logo SVG */}
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

      {/* Hero Announcement (F001 Tone Showcase) */}
      <section
        style={{
          backgroundColor: 'var(--color-secondary-light)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '48px',
          border: '1px solid var(--color-secondary)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: '650px' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--color-primary)', marginBottom: '10px' }}>
            No complicated jargon. Just treatments that actually work.
          </h2>
          <p style={{ color: '#2C3E30', fontSize: '1rem', lineHeight: 1.5 }}>
            Pick a treatment, choose your favorite specialist, and book in less than 60 seconds without creating
            yet another annoying login account.
          </p>
        </div>
        <Button variant="primary" size="lg">
          Book Appointment
        </Button>
      </section>

      {/* F002: Service Catalog */}
      <section style={{ marginBottom: '56px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Feature 002
            </span>
            <h2 style={{ fontSize: '1.9rem', color: 'var(--color-primary)' }}>The Treatment Menu</h2>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Transparent prices. No secret fees.</p>
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
                  position: 'relative',
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

                  <div
                    style={{
                      backgroundColor: 'var(--color-bg)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      color: 'var(--color-text)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '16px',
                    }}
                  >
                    <Info size={16} color="var(--color-tertiary)" />
                    <span><strong>Prep:</strong> {svc.prep}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--color-border)',
                    paddingTop: '12px',
                    marginTop: 'auto',
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

      {/* F003: Staff Profiles */}
      <section style={{ marginBottom: '56px' }}>
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Feature 003
          </span>
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
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                      {staff.bio}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {staff.skills.map((s) => (
                        <Badge key={s} variant="muted">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* F004: Policies & Booking Confirmation */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Feature 004
          </span>
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

        {/* Interactive Booking Summary Card */}
        <Card style={{ border: '2px solid var(--color-primary)', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '16px' }}>
            Ready to confirm your appointment?
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Selected Treatment:</span>
              <strong>{services.find((s) => s.id === selectedService)?.name || 'Please select a treatment above'}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Specialist:</span>
              <strong>{staffMembers.find((s) => s.id === selectedStaff)?.name || 'Any Available Specialist'}</strong>
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
                  A link has been simulated. Your terms are locked to Policy Version 1.0 without account creation.
                </p>
              </div>
            </div>
          ) : (
            <Button
              variant="primary"
              size="lg"
              disabled={!selectedService}
              onClick={() => setBookingConfirmed(true)}
              style={{ opacity: selectedService ? 1 : 0.6 }}
            >
              {selectedService ? 'Confirm & Lock Slot (No Account Needed)' : 'Select a Treatment to Continue'}
            </Button>
          )}
        </Card>
      </section>
    </main>
  );
}
