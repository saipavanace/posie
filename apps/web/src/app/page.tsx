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

// F008: Document Content Library Sample Data
const contentBlocks = [
  {
    id: 'cb1',
    title: 'Facial Exfoliation & Acid Waiver',
    category: 'Consent Waiver',
    reviewedBy: 'Dr. Lisa Vance (Licensed Esthetician Review)',
    version: 'v2.1',
    excerpt: 'I confirm I have not used Accutane within 6 months or topical retinoids within 48 hours. I understand mild pinkness is normal.',
  },
  {
    id: 'cb2',
    title: 'Post-Dermaplaning UV Advisory',
    category: 'Aftercare Clause',
    reviewedBy: 'Studio Owner Approved',
    version: 'v1.4',
    excerpt: 'Apply SPF 30+ generously. Avoid direct steam rooms, harsh scrubs, and heavy sweat sessions for 24 hours.',
  },
];

// F009: Staff SOP Checklist
const initialSopTasks = [
  { id: 't1', text: 'Autoclave & ultrasonic tool cycle completed (270°F)', done: true, by: 'Chloe' },
  { id: 't2', text: 'Sanitize treatment beds with EPA hospital-grade wipes', done: true, by: 'Chloe' },
  { id: 't3', text: 'Restock fresh bamboo linens and botanical headbands', done: false, by: null },
  { id: 't4', text: 'Verify cold-stored hyaluronic ampoules and ice globes', done: false, by: null },
];

export default function PosieStudioPage() {
  const [selectedService, setSelectedService] = useState<string>('s1');
  const [selectedStaff, setSelectedStaff] = useState<string>('st1');
  const [quietVisit, setQuietVisit] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [messagePreviewType, setMessagePreviewType] = useState<'confirmation' | 'reschedule' | 'aftercare'>('confirmation');

  // F009 State
  const [sopTasks, setSopTasks] = useState(initialSopTasks);

  // F010 State: Progressive Feature Modules
  const [teamModule, setTeamModule] = useState(false);
  const [inventoryModule, setInventoryModule] = useState(false);

  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];
  const activeStaffObj = staffMembers.find((s) => s.id === selectedStaff) || staffMembers[0];

  const directLinkUrl = `https://posie.app/posie-austin/book?service=${selectedService}&specialist=${selectedStaff}&src=qr_card`;

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

  const toggleTask = (id: string) => {
    setSopTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done, by: !t.done ? 'Chloe' : null } : t))
    );
  };

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px 80px' }}>
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

        {/* F010 Progressive Mode Indicator */}
        <div style={{ textAlign: 'right' }}>
          <Badge variant={teamModule ? 'rose' : 'sage'}>
            {teamModule ? 'Team Studio Mode' : 'Solo Practitioner Mode'}
          </Badge>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Austin, TX • Posie v1.0
          </p>
        </div>
      </header>

      {/* F010 Progressive Setup Controls Banner */}
      <section
        style={{
          backgroundColor: 'var(--color-card)',
          borderRadius: '16px',
          padding: '20px 24px',
          border: '1px solid var(--color-border)',
          marginBottom: '40px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Layers size={18} color="var(--color-tertiary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-tertiary)', textTransform: 'uppercase' }}>
              Feature 010: Progressive Feature Setup
            </span>
          </div>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)' }}>
            Keep your workspace clean. Turn on extra tools only when you need them.
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            variant={teamModule ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTeamModule(!teamModule)}
          >
            <Users size={16} style={{ marginRight: '6px' }} />
            {teamModule ? 'Team Mode (Active)' : '+ Enable Team Module'}
          </Button>

          <Button
            variant={inventoryModule ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setInventoryModule(!inventoryModule)}
          >
            <Package size={16} style={{ marginRight: '6px' }} />
            {inventoryModule ? 'Retail Stock (Active)' : '+ Enable Retail Module'}
          </Button>
        </div>
      </section>

      {/* F008 & F009 Showcase Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        {/* F008: Document Content Library */}
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <FileText size={20} color="var(--color-primary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
              Feature 008
            </span>
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Document Content Library
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Approved paragraphs and legal/clinical clauses with explicit reviewer attribution and immutable version tracking.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {contentBlocks.map((b) => (
              <div
                key={b.id}
                style={{
                  backgroundColor: 'var(--color-bg)',
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>{b.title}</strong>
                  <Badge variant="rose">{b.version}</Badge>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', marginBottom: '8px', fontStyle: 'italic' }}>
                  "{b.excerpt}"
                </p>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-secondary)' }}>
                  ✓ {b.reviewedBy}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* F009: Staff SOPs and Checklists */}
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <ListTodo size={20} color="var(--color-tertiary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-tertiary)', textTransform: 'uppercase' }}>
              Feature 009
            </span>
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Staff SOPs & Sanitation Checklists
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Opening, closing, and hygiene tasks with staff attribution and version acknowledgment tracking.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {sopTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: task.done ? 'var(--color-secondary-light)' : 'var(--color-bg)',
                  cursor: 'pointer',
                  border: '1px solid var(--color-border)',
                  transition: 'all 0.15s ease',
                }}
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  readOnly
                  style={{ marginTop: '3px', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--color-primary)',
                      textDecoration: task.done ? 'line-through' : 'none',
                      fontWeight: task.done ? 500 : 600,
                    }}
                  >
                    {task.text}
                  </p>
                  {task.by && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>
                      Completed by {task.by}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

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
            Deep-link for social bios and physical cards.
          </p>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <svg width="90" height="90" viewBox="0 0 140 140" fill="none" style={{ borderRadius: '10px', border: '1px solid var(--color-border)' }}>
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
              <rect x="46" y="60" width="16" height="16" rx="3" fill="#2C3E30" />
            </svg>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  backgroundColor: 'var(--color-bg)',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontFamily: 'monospace',
                  wordBreak: 'break-all',
                  marginBottom: '8px',
                }}
              >
                {directLinkUrl}
              </div>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copiedLink ? <><Check size={14} style={{ marginRight: '6px' }} /> Copied</> : <><Copy size={14} style={{ marginRight: '6px' }} /> Copy Link</>}
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
            Printable Price Menus
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Generates high-res physical takeaway menus matching active catalog pricing.
          </p>

          <Button
            variant="secondary"
            size="md"
            onClick={() => window.print()}
            style={{ width: '100%', marginTop: '14px' }}
          >
            <Printer size={16} style={{ marginRight: '8px' }} /> Print Studio Menu
          </Button>
        </Card>
      </div>

      {/* Treatment Menu */}
      <section style={{ marginBottom: '56px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.9rem', color: 'var(--color-primary)' }}>The Treatment Menu</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Transparent prices. No surprise checkout fees.</p>
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

      {/* Booking Policies & Confirmation */}
      <section>
        <Card style={{ border: '2px solid var(--color-primary)', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '16px' }}>
            Book Your Visit Now
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Treatment:</span>
              <strong>{activeServiceObj.name} (${activeServiceObj.price})</strong>
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
                <strong>Request a Quiet Visit:</strong> Let the team know you just want to relax without small talk.
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
                  Confirmation sent using the Message Template Library (F007) and Content Block Waivers (F008).
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
