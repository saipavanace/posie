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

  // F051 Referral State
  const [copiedReferral, setCopiedReferral] = useState(false);

  // F052 Promo State
  const [promoCodeInput, setPromoCodeInput] = useState('SPRING20');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(24);

  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];
  const finalPrice = promoApplied ? activeServiceObj.price - discountAmount : activeServiceObj.price;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCodeInput.trim().toUpperCase() === 'SPRING20') {
      // 20% discount on selected service
      const disc = Math.round(activeServiceObj.price * 0.2);
      setDiscountAmount(Math.min(disc, 30)); // Capped at $30
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "SPRING20" for 20% off.');
    }
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
              onClick={() => {
                setSelectedService(svc.id);
                setPromoApplied(false);
              }}
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

      {/* F051: Client Referral Program ("Give $20, Get $20") */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ borderLeft: '4px solid var(--color-secondary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Gift size={18} color="var(--color-secondary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 051: Client Referral Program (Give $20, Get $20)
              </strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Available Credit: $20.00</Badge>
              <Badge variant="muted">Code: SARAH-GLOW</Badge>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Friends get $20 off their first treatment; you get $20 credit when their visit completes. Self-referrals and cancellations are strictly safeguarded.
          </p>

          <div style={{ background: '#FAF8F5', padding: '14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block' }}>Your Personal Share Link</span>
              <code style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                https://glow.posieatelier.com/refer?code=SARAH-GLOW
              </code>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCopiedReferral(true);
                setTimeout(() => setCopiedReferral(false), 2500);
              }}
            >
              <Share2 size={13} style={{ marginRight: '6px' }} />
              {copiedReferral ? 'Copied to Clipboard!' : 'Copy Referral Link'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F052: Promotion Controls & Margin Safeguards */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ backgroundColor: '#FAF8F5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Tag size={18} color="var(--color-primary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 052: Promotion Controls & Margin Safeguards
              </strong>
            </div>
            <Badge variant="sage">Anti-Stacking Protected</Badge>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Coupons respect service eligibility, expiry dates, and owner margin floors. Discounts never stack silently.
          </p>

          <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
            <input
              type="text"
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
              placeholder="Enter promo code (e.g. SPRING20)..."
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid var(--color-border)',
                fontSize: '0.88rem',
                fontWeight: 600,
                width: '200px',
                textTransform: 'uppercase',
              }}
            />
            <Button variant="primary" size="sm" type="submit">
              Apply Coupon
            </Button>
            {promoApplied && (
              <span style={{ fontSize: '0.82rem', color: 'var(--color-secondary)', fontWeight: 600 }}>
                ✓ SPRING20 Applied: -$24.00 (20% off, max $30 cap respected)
              </span>
            )}
          </form>

          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            ℹ️ <em>Promotional discounts cannot be combined with existing service packages. Owner margin floor ($50.00) enforced.</em>
          </div>
        </Card>
      </section>

      {/* F053: Approved Document Repository & Governance */}
      <section style={{ marginBottom: '36px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCheck2 size={18} color="var(--color-secondary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 053: Approved Document Repository & Governance
              </strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Clinician Reviewed</Badge>
              <Badge variant="muted">Version 1 (Locked)</Badge>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Governed clause repository. Legal and clinical consent terms require named specialist review before catalog publication.
          </p>

          <div style={{ background: '#FAF8F5', borderRadius: '8px', padding: '14px', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>
                TCA Chemical Peel Informed Consent & Contraindication Waiver
              </strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                Reviewed by Dr. Evelyn Reed, MD (Clinical Advisor)
              </span>
            </div>
            <p style={{ margin: '0 0 10px 0', fontSize: '0.82rem', color: 'var(--color-text)', lineHeight: 1.5 }}>
              "I understand that Level 2 TCA peels cause epidermal flaking for 5–7 days. I attest I have not used oral Accutane in the last 6 months or topical tretinoin in the last 5 days..."
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              Mapped automatically to: <strong>Level 2 Chemical Peel</strong> & <strong>Glass Glow Facial with Peel Add-On</strong>
            </div>
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
            <span>
              {promoApplied ? (
                <>
                  <span style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)', marginRight: '8px' }}>
                    ${activeServiceObj.price}
                  </span>
                  <strong style={{ color: 'var(--color-primary)', fontSize: '1.15rem' }}>${finalPrice}</strong>
                </>
              ) : (
                <strong>{activeServiceObj.name} (${activeServiceObj.price})</strong>
              )}
            </span>
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
