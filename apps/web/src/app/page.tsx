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
  FileText,
  ListTodo,
  Layers,
  ChevronRight,
  User,
  Users,
  Package,
  Compass,
  PlayCircle,
  VolumeX,
  Volume2,
  HeartHandshake,
  AlertCircle,
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
  },
  {
    id: 'st2',
    name: 'Sienna Brooks',
    role: 'Brow & Lash Specialist',
    bio: 'Queen of natural, fluffy brows. Believes your brows are sisters, not twins, but they should still hang out together.',
  },
];

// F011: Guided Setup Checklist
const initialSetupSteps = [
  { key: 'brand', label: 'Studio Identity & Brand Colors', done: true },
  { key: 'catalog', label: 'First Treatment Configured', done: true },
  { key: 'policy', label: 'Booking & Cancellation Policies', done: true },
  { key: 'bank', label: 'Connect Payout Bank Account', done: false, blocker: 'Pending Stripe Connect verification' },
];

export default function PosieStudioPage() {
  const [selectedService, setSelectedService] = useState<string>('s1');
  const [selectedStaff, setSelectedStaff] = useState<string>('st1');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // F010 Progressive State
  const [teamModule, setTeamModule] = useState(false);

  // F012 Demo Sandbox Mode State
  const [isDemoMode, setIsDemoMode] = useState(false);

  // F013 Client Service Preferences State
  const [preferredName, setPreferredName] = useState('Maya');
  const [pronunciation, setPronunciation] = useState('MY-uh');
  const [conversationPref, setConversationPref] = useState<'gentle_small_talk' | 'quiet_visit_only' | 'loves_chatting'>('quiet_visit_only');
  const [extraBlanket, setExtraBlanket] = useState(true);
  const [dimLights, setDimLights] = useState(true);

  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];
  const activeStaffObj = staffMembers.find((s) => s.id === selectedStaff) || staffMembers[0];

  const directLinkUrl = `https://posie.app/posie-austin/book?service=${selectedService}&specialist=${selectedStaff}&src=qr_card`;

  const handleCopy = () => {
    navigator.clipboard.writeText(directLinkUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px 80px' }}>
      {/* F012 Demo Sandbox Indicator Banner */}
      {isDemoMode && (
        <div
          style={{
            backgroundColor: '#FFF3CD',
            border: '1px solid #FFE69C',
            color: '#856404',
            padding: '12px 20px',
            borderRadius: '12px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.9rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlayCircle size={18} />
            <span>
              <strong>Demo Sandbox Active (F012):</strong> You are exploring safely with fictional clients. No real SMS messages or credit card charges will be sent.
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsDemoMode(false)}>
            Exit Demo Mode
          </Button>
        </div>
      )}

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

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {!isDemoMode && (
            <Button variant="outline" size="sm" onClick={() => setIsDemoMode(true)}>
              <PlayCircle size={14} style={{ marginRight: '6px' }} />
              Try Demo Sandbox (F012)
            </Button>
          )}

          <Badge variant={teamModule ? 'rose' : 'sage'}>
            {teamModule ? 'Team Studio Mode' : 'Solo Practitioner Mode'}
          </Badge>
        </div>
      </header>

      {/* F011: Guided First-Day Setup Progress Tracker */}
      <section style={{ marginBottom: '40px' }}>
        <Card style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={20} color="var(--color-tertiary)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-tertiary)', textTransform: 'uppercase' }}>
                Feature 011: Guided First Day Setup
              </span>
            </div>
            <Badge variant="sage">80% Ready to Take Bookings</Badge>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '18px' }}>
            Your setup progress is saved automatically. Below are the steps required to receive clients:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '12px' }}>
            {initialSetupSteps.map((step) => (
              <div
                key={step.key}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: step.done ? 'var(--color-secondary-light)' : 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                {step.done ? (
                  <CheckCircle2 size={18} color="var(--color-primary)" />
                ) : (
                  <AlertCircle size={18} color="var(--color-tertiary)" />
                )}
                <div>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--color-primary)', display: 'block' }}>
                    {step.label}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {step.done ? 'Configured & Active' : step.blocker}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* F013: Client Service Preferences & Comfort Requests */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <HeartHandshake size={20} color="var(--color-primary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
              Feature 013: Client Service Preferences
            </span>
          </div>
          <h2 style={{ fontSize: '1.9rem', color: 'var(--color-primary)' }}>Personalized Comfort & Care</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Tell your specialist exactly how you prefer your visit. Saved privately in your treatment record.
          </p>
        </div>

        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            {/* Preferred Name & Pronunciation */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Preferred Name & Pronunciation:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value)}
                  placeholder="First name"
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.9rem',
                    flex: 1,
                  }}
                />
                <input
                  type="text"
                  value={pronunciation}
                  onChange={(e) => setPronunciation(e.target.value)}
                  placeholder="e.g. MY-uh"
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.9rem',
                    width: '110px',
                  }}
                />
              </div>
            </div>

            {/* Conversation Style */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Conversation Preference:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  variant={conversationPref === 'quiet_visit_only' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setConversationPref('quiet_visit_only')}
                >
                  <VolumeX size={14} style={{ marginRight: '6px' }} /> Quiet Visit
                </Button>
                <Button
                  variant={conversationPref === 'gentle_small_talk' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setConversationPref('gentle_small_talk')}
                >
                  <Volume2 size={14} style={{ marginRight: '6px' }} /> Gentle Talk
                </Button>
              </div>
            </div>
          </div>

          {/* Treatment Room Comfort Requests */}
          <div
            style={{
              backgroundColor: 'var(--color-bg)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid var(--color-border)',
            }}
          >
            <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)', display: 'block', marginBottom: '10px' }}>
              Room Comfort Checklist (Staff Sanitized):
            </strong>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={extraBlanket}
                  onChange={(e) => setExtraBlanket(e.target.checked)}
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                Heated Bed & Extra Plush Blanket
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={dimLights}
                  onChange={(e) => setDimLights(e.target.checked)}
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                Dim Ambient Lighting (Zero Overhead Glare)
              </label>
            </div>
          </div>
        </Card>
      </section>

      {/* Treatment Menu */}
      <section style={{ marginBottom: '56px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.9rem', color: 'var(--color-primary)' }}>The Treatment Menu</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Transparent prices. No secret checkout fees.</p>
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
            Book Your Visit for {preferredName}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Treatment:</span>
              <strong>{activeServiceObj.name} (${activeServiceObj.price})</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Specialist:</span>
              <strong>{activeStaffObj.name}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Atmosphere:</span>
              <strong>{conversationPref === 'quiet_visit_only' ? 'Quiet Visit (No small talk)' : 'Gentle Small Talk'}</strong>
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
                <strong>Appointment Snapshot Created for {preferredName}!</strong>
                <p style={{ fontSize: '0.85rem' }}>
                  Preferences for room comfort have been logged for {activeStaffObj.name}.
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
