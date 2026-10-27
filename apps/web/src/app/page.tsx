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
  ShoppingBag,
  HeartPulse,
  User,
  Phone,
  ArrowRight,
  Star,
  Check,
  Package,
  Gift,
  FileCheck2,
  Tag,
  CreditCard,
  MapPin,
  X,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  category: 'facials' | 'brows' | 'hair' | 'packages';
  price: number;
  duration: number; // in minutes
  description: string;
  popular?: boolean;
}

const serviceCatalog: ServiceItem[] = [
  {
    id: 's1',
    name: 'Hydra-Dew Glass Glow Facial',
    category: 'facials',
    price: 120,
    duration: 60,
    description: 'Double cleanse, fruit enzyme sweep, and ultra-drenching hyaluronic peptide infusion for radiant skin.',
    popular: true,
  },
  {
    id: 's2',
    name: 'Fluff & Define Precision Brow Sculpt',
    category: 'brows',
    price: 55,
    duration: 35,
    description: 'Custom botanical tinting and precision wax/tweeze shaping that makes your natural arches pop.',
    popular: true,
  },
  {
    id: 's3',
    name: 'Balayage Gloss & Silk Blowout',
    category: 'hair',
    price: 240,
    duration: 90,
    description: 'Custom hand-painted dimensional highlights finished with our signature glass shine toner.',
  },
  {
    id: 's4',
    name: 'Clinical Radiance Chemical Peel',
    category: 'facials',
    price: 150,
    duration: 45,
    description: 'Targeted lactic and mandelic acid peel smoothing uneven texture with zero downtime flaking.',
  },
  {
    id: 's5',
    name: 'HydraFacial 5-Series Radiance Pass',
    category: 'packages',
    price: 500,
    duration: 60,
    description: '5 full HydraFacial sessions ($100 savings). Banked sessions rollover and never expire early.',
    popular: true,
  },
];

const teamSpecialists = [
  {
    id: 'maya',
    name: 'Maya Lin',
    role: 'Master Colorist & Esthetician',
    bio: '10+ years specializing in luminous glass-skin treatments and seamless sunkissed balayage.',
    rating: '5.0',
    reviewsCount: 342,
  },
  {
    id: 'jen',
    name: 'Jen Chen',
    role: 'Licensed Clinical Esthetician',
    bio: 'Barrier-repair specialist and certified chemical peel artist. Gentle, thorough, transformative.',
    rating: '4.9',
    reviewsCount: 218,
  },
  {
    id: 'sophia',
    name: 'Sophia Loren',
    role: 'Senior Esthetician & Brow Artist',
    bio: 'Arch architect and dermaplaning guru. Celebrated for natural, effortlessly lifted finishes.',
    rating: '5.0',
    reviewsCount: 489,
  },
];

const boutiqueProducts = [
  {
    id: 'prod_1',
    name: 'Barrier Gentle Cleanser',
    size: '8.0 fl oz',
    price: 32,
    stock: 10,
    desc: 'Ceramide-rich milky wash that cleanses thoroughly without stripping natural skin lipids.',
  },
  {
    id: 'prod_2',
    name: 'Glow Hyaluronic Serum',
    size: '1.7 fl oz',
    price: 48,
    stock: 4,
    desc: 'Quad-weight hyaluronic acid matrix with niacinamide for dewy, plump skin elasticity.',
  },
  {
    id: 'prod_3',
    name: 'Silk Radiance SPF 50 Drops',
    size: '1.7 fl oz',
    price: 42,
    stock: 8,
    desc: 'Invisible weightless sunscreen drops leaving zero white cast and an ethereal pearlescent finish.',
  },
];

export default function PosieClientPage() {
  // Navigation & Category
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Interactive Booking State
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>('maya');
  const [selectedSlot, setSelectedSlot] = useState<string>('Today at 2:00 PM');
  const [bookingComplete, setBookingComplete] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>('Zendaya Coleman');
  const [guestPhone, setGuestPhone] = useState<string>('310-555-0199');
  const [agreeToD05Policy, setAgreeToD05Policy] = useState<boolean>(true);

  // Boutique Shopping Cart State
  const [cartItems, setCartItems] = useState<Array<{ id: string; name: string; price: number; qty: number }>>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'shipping'>('pickup');
  const [orderPlacedPin, setOrderPlacedPin] = useState<string | null>(null);

  // Client Portal Modal State
  const [portalOpen, setPortalOpen] = useState<boolean>(false);

  // Filtered Services
  const displayedServices = selectedCategory === 'all'
    ? serviceCatalog
    : serviceCatalog.filter((s) => s.category === selectedCategory);

  // Cart operations
  const addToCart = (prod: typeof boutiqueProducts[0]) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === prod.id);
      if (existing) {
        return prev.map((item) => item.id === prod.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: prod.id, name: prod.name, price: prod.price, qty: 1 }];
    });
    setCartOpen(true);
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartShipping = fulfillmentType === 'shipping' ? (cartSubtotal >= 75 ? 0 : 5.95) : 0;
  const cartTotal = cartSubtotal + cartShipping;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Top Studio Bar */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(250, 248, 245, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--color-border)',
          padding: '16px 28px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo & Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                fontWeight: 'bold',
                fontFamily: 'var(--font-headline)',
                fontSize: '1.25rem',
              }}
            >
              P
            </div>
            <div>
              <span
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-headline)',
                  color: 'var(--color-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                Posie
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginTop: '-2px' }}>
                Beauty & Wellness Atelier • Beverly Hills
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#services" style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500 }}>
              Treatments
            </a>
            <a href="#specialists" style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500 }}>
              Specialists
            </a>
            <a href="#boutique" style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500 }}>
              Boutique
            </a>
            <a href="#membership" style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500 }}>
              Memberships
            </a>

            {/* Client Portal Button */}
            <button
              onClick={() => setPortalOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary)',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <User size={16} /> Client Portal
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setCartOpen(true)}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--color-border)',
                padding: '8px 14px',
                borderRadius: '9999px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--color-primary)',
              }}
            >
              <ShoppingBag size={16} />
              Bag ({cartItems.reduce((acc, i) => acc + i.qty, 0)})
            </button>

            {/* Studio OS Admin Link */}
            <a
              href="/admin"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                padding: '9px 18px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.88rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              💈 Studio OS
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '64px 20px 48px',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Badge variant="sage">★ 4.9 Rating (1,200+ Verified Visits)</Badge>
          <Badge variant="muted">Guest Checkout • No Account Password Required</Badge>
        </div>

        <h1
          style={{
            fontSize: '3.6rem',
            color: 'var(--color-primary)',
            lineHeight: 1.15,
            marginBottom: '20px',
            fontFamily: 'var(--font-headline)',
            fontWeight: 500,
          }}
        >
          Effortless glow.<br />
          <span style={{ fontStyle: 'italic', color: 'var(--color-tertiary-hover)' }}>Zero headache.</span>
        </h1>

        <p
          style={{
            fontSize: '1.2rem',
            color: 'var(--color-text-muted)',
            maxWidth: '680px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}
        >
          Bespoke facials, precision brow sculpts, and clean clinical esthetics crafted in an intimate sanctuary. Book in seconds with protected card holds and transparent 24h cancellation terms.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              const element = document.getElementById('services');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Treatment Menu
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              const element = document.getElementById('boutique');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Shop Atelier Skincare
          </Button>
        </div>
      </header>

      {/* Treatments & Live Booking Flow Section */}
      <section id="services" style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px 64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
              Curated Treatment Menu
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.96rem' }}>
              Every session includes botanical consultation, tailored aftercare instructions, and medical safety checks.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px', background: '#EAE6DF', padding: '4px', borderRadius: '8px' }}>
            {['all', 'facials', 'brows', 'hair', 'packages'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  border: 'none',
                  background: selectedCategory === cat ? '#FFFFFF' : 'transparent',
                  color: selectedCategory === cat ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  boxShadow: selectedCategory === cat ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                {cat === 'all' ? 'All Services' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '20px' }}>
          {displayedServices.map((svc) => (
            <Card
              key={svc.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: activeService?.id === svc.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', lineHeight: 1.3 }}>
                    {svc.name}
                  </h3>
                  {svc.popular && <Badge variant="rose">Fan Favorite</Badge>}
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '18px', minHeight: '44px' }}>
                  {svc.description}
                </p>
              </div>

              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #F0ECE6',
                    paddingTop: '14px',
                    marginBottom: '14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    <Clock size={16} /> {svc.duration} mins
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    ${svc.price}
                  </div>
                </div>

                <Button
                  variant={activeService?.id === svc.id ? 'primary' : 'outline'}
                  size="md"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setActiveService(svc);
                    setBookingStep(1);
                    setBookingComplete(false);
                  }}
                >
                  {activeService?.id === svc.id ? 'Selected for Booking ✓' : 'Reserve Appointment'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Active Reservation Workspace (Step 1 -> 2 -> 3) */}
        {activeService && (
          <div
            style={{
              marginTop: '36px',
              border: '2px solid var(--color-primary)',
              borderRadius: '16px',
              backgroundColor: '#FFFFFF',
              padding: '28px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <Badge variant="sage">Step {bookingStep} of 3: Reserve Treatment</Badge>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--color-primary)', marginTop: '6px' }}>
                  Reserving {activeService.name} (${activeService.price})
                </h3>
              </div>
              <button
                onClick={() => setActiveService(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Step 1: Specialist Selection */}
            {bookingStep === 1 && (
              <div>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                  Select your certified specialist. Each team member brings dedicated expertise and bespoke touch.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
                  {teamSpecialists.map((spec) => (
                    <div
                      key={spec.id}
                      onClick={() => setSelectedSpecialist(spec.id)}
                      style={{
                        border: selectedSpecialist === spec.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        background: selectedSpecialist === spec.id ? '#FAF8F5' : '#FFFFFF',
                        padding: '16px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ color: 'var(--color-primary)', fontSize: '1.05rem' }}>{spec.name}</strong>
                        <span style={{ fontSize: '0.8rem', color: '#B36B5C', fontWeight: 600 }}>★ {spec.rating}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px', marginBottom: '8px' }}>
                        {spec.role}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#68736B', lineHeight: 1.4 }}>
                        {spec.bio}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="primary" size="lg" onClick={() => setBookingStep(2)}>
                    Continue to Date & Time <ArrowRight size={18} style={{ marginLeft: '6px' }} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Atomic Slot Hold (F075) */}
            {bookingStep === 2 && (
              <div>
                <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '12px 18px', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2B5329', fontSize: '0.88rem' }}>
                    <ShieldCheck size={18} />
                    <strong>Atomic Slot Hold Active (F075):</strong> Selected appointment slot is protected from concurrent booking.
                  </div>
                  <div style={{ color: '#2B5329', fontWeight: 'bold', fontSize: '0.88rem' }}>
                    Hold Expires: 09:42 remaining
                  </div>
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
                  Available times with {teamSpecialists.find((s) => s.id === selectedSpecialist)?.name}:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
                  {['Today at 2:00 PM', 'Tomorrow at 10:30 AM', 'Tomorrow at 3:00 PM'].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        padding: '14px',
                        borderRadius: '8px',
                        border: selectedSlot === slot ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        background: selectedSlot === slot ? 'var(--color-primary)' : '#FFFFFF',
                        color: selectedSlot === slot ? '#FFFFFF' : 'var(--color-primary)',
                        fontWeight: 600,
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="outline" size="md" onClick={() => setBookingStep(1)}>
                    ← Back to Specialists
                  </Button>
                  <Button variant="primary" size="lg" onClick={() => setBookingStep(3)}>
                    Continue to Guest Details <ArrowRight size={18} style={{ marginLeft: '6px' }} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Guest Checkout & Document D05 Policy Acknowledgment */}
            {bookingStep === 3 && !bookingComplete && (
              <div>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                  Guest checkout: No passwords to remember. You will receive an instant calendar invite and SMS confirmation.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: '4px' }}>
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid var(--color-border)',
                        fontSize: '0.92rem',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: '4px' }}>
                      Mobile Phone (for SMS updates)
                    </label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid var(--color-border)',
                        fontSize: '0.92rem',
                      }}
                    />
                  </div>
                </div>

                {/* Document D05 Policy Accordion */}
                <div style={{ border: '1px solid #E5E0D8', borderRadius: '8px', background: '#FFFDF9', padding: '14px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <ShieldCheck size={18} color="var(--color-primary)" />
                    <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                      Cancellation & Deposit Terms (Document D05 Policy)
                    </strong>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.5, margin: 0 }}>
                    We reserve dedicated studio space and specialist time for your visit. You may cancel or reschedule free of charge up to <strong>24 hours prior</strong>. A $50.00 card hold is preauthorized today; your card is only charged in the event of an unexcused no-show.
                  </p>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', cursor: 'pointer', fontSize: '0.82rem' }}>
                    <input
                      type="checkbox"
                      checked={agreeToD05Policy}
                      onChange={(e) => setAgreeToD05Policy(e.target.checked)}
                    />
                    <span>I understand and accept Posie’s 24-hour cancellation policy.</span>
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button variant="outline" size="md" onClick={() => setBookingStep(2)}>
                    ← Back to Times
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={!agreeToD05Policy}
                    onClick={() => setBookingComplete(true)}
                  >
                    Confirm Reservation ($50 Deposit Preauth)
                  </Button>
                </div>
              </div>
            )}

            {/* Booking Confirmed State */}
            {bookingComplete && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-secondary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <CheckCircle2 size={36} color="var(--color-primary)" />
                </div>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
                  You’re Booked, {guestName.split(' ')[0]}!
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto 20px' }}>
                  Your appointment for <strong>{activeService.name}</strong> with <strong>{teamSpecialists.find((s) => s.id === selectedSpecialist)?.name}</strong> is confirmed for <strong>{selectedSlot}</strong>.
                </p>
                <div style={{ display: 'inline-flex', gap: '10px' }}>
                  <Button variant="outline" size="sm" onClick={() => setPortalOpen(true)}>
                    View in Client Portal
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => setActiveService(null)}>
                    Done
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Boutique Skincare Retail Section */}
      <section id="boutique" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '64px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Badge variant="sage">Unified Stock Ledger (F096)</Badge>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--color-primary)', marginTop: '8px', marginBottom: '10px' }}>
              Atelier Boutique Essentials
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '580px', margin: '0 auto' }}>
              Clean, professional-grade formulas prescribed in treatment. In-studio pickup ready within 15 minutes or complimentary standard shipping over $75.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {boutiqueProducts.map((prod) => (
              <Card key={prod.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ background: '#F8F6F2', height: '180px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <Sparkles size={36} color="var(--color-tertiary)" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>{prod.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{prod.size}</span>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                    {prod.desc}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                      ${prod.price}.00
                    </span>
                    <span style={{ fontSize: '0.76rem', color: '#2B5329', fontWeight: 600 }}>
                      ✓ {prod.stock} in stock (Beverly Hills)
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="md"
                    style={{ width: '100%' }}
                    onClick={() => addToCart(prod)}
                  >
                    Add to Bag
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership & Banked Credits Section */}
      <section id="membership" style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 20px' }}>
        <div style={{ border: '2px solid var(--color-primary)', borderRadius: '16px', background: '#FFFFFF', padding: '36px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px', alignItems: 'center' }}>
          <div>
            <Badge variant="rose">Document D16 Terms • Respectful Retention</Badge>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--color-primary)', marginTop: '8px', marginBottom: '12px' }}>
              The Posie Radiance VIP Club
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Enjoy one monthly custom clinical facial, 15% off all boutique skincare, and dedicated priority booking. Banked sessions rollover indefinitely; pause anytime up to 60 days without forfeiting your credits.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', fontSize: '0.9rem', color: 'var(--color-primary)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Check size={18} color="var(--color-success)" /> 1 Monthly Hydra-Dew Facial ($120.00 value)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Check size={18} color="var(--color-success)" /> 15% Off all in-store and online skincare
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Check size={18} color="var(--color-success)" /> Banked sessions never expire; 90-day grace on cancellation
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={18} color="var(--color-success)" /> Zero lock-in contracts or cancellation penalties
              </li>
            </ul>

            <Button variant="primary" size="lg">
              Join Radiance VIP ($75.00 / month)
            </Button>
          </div>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Subscriber Monthly Value
            </span>
            <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--color-primary)', margin: '8px 0' }}>
              $75<span style={{ fontSize: '1.2rem', fontWeight: 500 }}>/mo</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-tertiary-hover)', fontWeight: 600, marginBottom: '16px' }}>
              Save $45+ on every monthly appointment
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', paddingTop: '14px', lineHeight: 1.5 }}>
              Includes transparent cancellation preview: review unused banked credits before confirming termination.
            </div>
          </div>
        </div>
      </section>

      {/* Slide-out Shopping Bag Drawer */}
      {cartOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 100,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              backgroundColor: '#FFFFFF',
              height: '100%',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', margin: 0 }}>Your Atelier Bag</h3>
                <button
                  onClick={() => setCartOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                >
                  <X size={20} />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textAlign: 'center', marginTop: '40px' }}>
                  Your shopping bag is currently empty.
                </p>
              ) : (
                <div>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 0',
                        borderBottom: '1px solid #F0ECE6',
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>{item.name}</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                          ${item.price}.00 × {item.qty}
                        </div>
                      </div>
                      <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                        ${item.price * item.qty}.00
                      </div>
                    </div>
                  ))}

                  {/* Fulfillment Method Toggle */}
                  <div style={{ marginTop: '20px', background: '#FAF8F5', padding: '12px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
                      Delivery Option:
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => setFulfillmentType('pickup')}
                        style={{
                          flex: 1,
                          padding: '8px',
                          borderRadius: '6px',
                          border: fulfillmentType === 'pickup' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                          background: fulfillmentType === 'pickup' ? 'var(--color-primary)' : '#FFF',
                          color: fulfillmentType === 'pickup' ? '#FFF' : 'var(--color-primary)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Studio Pickup (Free)
                      </button>
                      <button
                        onClick={() => setFulfillmentType('shipping')}
                        style={{
                          flex: 1,
                          padding: '8px',
                          borderRadius: '6px',
                          border: fulfillmentType === 'shipping' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                          background: fulfillmentType === 'shipping' ? 'var(--color-primary)' : '#FFF',
                          color: fulfillmentType === 'shipping' ? '#FFF' : 'var(--color-primary)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Ground Shipping ({cartSubtotal >= 75 ? 'Free' : '$5.95'})
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div>
                {orderPlacedPin ? (
                  <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '14px', borderRadius: '8px', marginBottom: '14px', textAlign: 'center' }}>
                    <div style={{ color: '#2B5329', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>
                      ✓ Order Placed! Ready for Pickup
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '2px', color: '#2B5329' }}>
                      PIN: {orderPlacedPin}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#4A6B48', marginTop: '4px' }}>
                      Show this 4-digit PIN at the Posie front desk.
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                      <span>Subtotal:</span>
                      <span>${cartSubtotal}.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                      <span>Total:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <Button
                      variant="primary"
                      size="lg"
                      style={{ width: '100%' }}
                      onClick={() => setOrderPlacedPin('7419')}
                    >
                      Complete Checkout (${cartTotal.toFixed(2)})
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Client Portal Self-Service Modal */}
      {portalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              padding: '28px',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={22} color="var(--color-primary)" />
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-primary)', margin: 0 }}>
                  Zendaya’s Client Portal
                </h3>
              </div>
              <button
                onClick={() => setPortalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Upcoming Appointments */}
            <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Upcoming Confirmed Visit
              </span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                <div>
                  <strong style={{ fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                    Hydra-Dew Glass Glow Facial
                  </strong>
                  <div style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    With Maya Lin • Tomorrow at 2:00 PM (60 mins)
                  </div>
                </div>
                <Badge variant="sage">Confirmed</Badge>
              </div>
            </div>

            {/* Active Passes & Banked Credits */}
            <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Active Passes & Series Entitlements
              </span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                <div>
                  <strong style={{ fontSize: '0.98rem', color: 'var(--color-primary)' }}>
                    HydraFacial 5-Series Radiance Pass
                  </strong>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    3 of 5 Sessions Remaining • Renews Automatically
                  </div>
                </div>
                <Badge variant="muted">3 Credits Left</Badge>
              </div>
            </div>

            {/* Signed Documents & Consents */}
            <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Signed Consents & Form Records (Rule DR10)
              </span>
              <div style={{ marginTop: '8px', fontSize: '0.82rem', color: '#555', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>Chemical Peel & Retinoid Protocol Consent (v1.0)</strong>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                    SHA-256: 7f83b165...e3b0c442
                  </div>
                </div>
                <Badge variant="sage">Verified E-Sign ✓</Badge>
              </div>
            </div>

            <Button
              variant="outline"
              size="md"
              style={{ width: '100%' }}
              onClick={() => setPortalOpen(false)}
            >
              Close Portal
            </Button>
          </div>
        </div>
      )}

      {/* Floating Bottom Navigation Pill (Switch Between Client, Studio OS, and QA Lab) */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 90,
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: '9999px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.82rem',
        }}
      >
        <span style={{ fontWeight: 600, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          ✨ Mode:
        </span>
        <span style={{ background: '#EAE6DF', color: 'var(--color-primary)', padding: '3px 8px', borderRadius: '12px', fontWeight: 600 }}>
          Client Booking Site (/)
        </span>
        <a
          href="/admin"
          style={{
            color: 'var(--color-text-muted)',
            textDecoration: 'none',
            padding: '3px 8px',
            borderRadius: '12px',
            fontWeight: 500,
          }}
        >
          💈 Studio OS (/admin)
        </a>
        <a
          href="/dev"
          style={{
            color: '#B36B5C',
            textDecoration: 'none',
            padding: '3px 8px',
            borderRadius: '12px',
            fontWeight: 600,
            background: '#FFF5F3',
          }}
        >
          🧪 Feature Lab (F001–F115)
        </a>
      </div>
    </div>
  );
}
