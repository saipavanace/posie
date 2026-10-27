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

  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText) return;
    setInquirySubmitted(true);
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
          <Badge variant="sage">Features F001 - F034 Live</Badge>
          <Badge variant="rose">Atelier Studio</Badge>
        </div>
      </header>

      {/* F032 & F033 Showcase Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {/* F032: Brandable Website Studio */}
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Globe size={20} color="var(--color-tertiary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-tertiary)', textTransform: 'uppercase' }}>
              Feature 032: Brandable Booking Site
            </span>
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Custom Domain & Styling
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Published with zero platform badges. Mobile preview always matches live production output.
          </p>

          <div
            style={{
              backgroundColor: 'var(--color-bg)',
              padding: '12px 14px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '14px',
            }}
          >
            <span style={{ fontSize: '0.85rem', fontFamily: 'monospace', color: 'var(--color-primary)' }}>
              https://glow.posieatelier.com
            </span>
            <Badge variant="sage">Active SSL</Badge>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              variant={websiteTheme === 'editorial_atelier' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setWebsiteTheme('editorial_atelier')}
            >
              Editorial Atelier
            </Button>
            <Button
              variant={websiteTheme === 'calm_minimal' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setWebsiteTheme('calm_minimal')}
            >
              Calm Minimal
            </Button>
          </div>
        </Card>

        {/* F033: Search & Local Discovery */}
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Search size={20} color="var(--color-primary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
              Feature 033: Local Google Discovery
            </span>
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Verified Schema.org Metadata
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Auto-generates Google Local JSON-LD structured data with live menus, prices, and coordinates.
          </p>

          <div
            style={{
              backgroundColor: 'var(--color-bg)',
              padding: '14px',
              borderRadius: '10px',
              border: '1px solid var(--color-border)',
            }}
          >
            <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)', display: 'block', marginBottom: '4px' }}>
              Posie Flagship Atelier — Austin, TX
            </strong>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              "BeautySalon" schema • Verified 1204 S Congress Ave • Ranked for local Austin skincare searches.
            </p>
          </div>
        </Card>
      </div>

      {/* F034: Inquiry & Consultation Request Queue */}
      <section style={{ marginBottom: '40px' }}>
        <Card style={{ backgroundColor: '#FFFFFF', border: '2px solid var(--color-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <MessageCircleQuestion size={20} color="var(--color-primary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
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
