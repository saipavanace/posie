'use client';

import React, { useState } from 'react';
import { Card, Button, Badge } from '@posie/ui';
import {
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Users,
  DollarSign,
  TrendingUp,
  UserCheck,
  Moon,
  Calendar,
  AlertCircle,
  HelpCircle,
  MapPin,
  History,
  Lock,
  Phone,
  Mail,
  Car,
} from 'lucide-react';

// Brand Information
const brandData = {
  name: 'Posie',
  tagline: 'Glow up without the headache.',
};

// F024: Canonical Location
const studioLocation = {
  name: 'Posie Flagship Atelier',
  address: '1204 S Congress Ave, Suite 200, Austin, TX 78704',
  phone: '+1 (512) 555-0199',
  email: 'hello@posieatelier.com',
  parking: 'Complimentary valet or reserved client spots in rear lot.',
  accessibility: 'Step-free ramp entry • Elevator to 2nd Floor • Low-glare suite lighting',
};

// Services (F023: Inclusive Gender-Neutral Complexity Options)
const services = [
  {
    id: 's1',
    name: 'Hydra-Dew Glass Glow Facial',
    tag: 'Fan Favorite',
    basePrice: 120,
    duration: 60,
    description: 'Double cleanse, fruit enzyme sweep, and ultra-drenching hyaluronic infusion.',
    complexityTierName: 'Extended Cryo & Pore Flush',
    complexitySurcharge: 30,
  },
  {
    id: 's2',
    name: 'Fluff & Define Brow Sculpt',
    tag: 'Quick Refresh',
    basePrice: 55,
    duration: 35,
    description: 'Custom tinting and precision shaping that makes your natural arches pop.',
    complexityTierName: 'Lamination & Tint Combo',
    complexitySurcharge: 25,
  },
  {
    id: 's3',
    name: 'Satin Smooth Dermaplaning',
    tag: 'Instant Results',
    basePrice: 90,
    duration: 45,
    description: 'Gentle peach-fuzz removal and dead cell sweep. Silk finish.',
    complexityTierName: 'Add Vitamin C Brightening Infusion',
    complexitySurcharge: 20,
  },
];

// F025: Sample Client Timeline (Chronological Audit)
const initialTimeline = [
  {
    id: 'e1',
    time: 'Today, 2:30 PM',
    title: 'Hydra-Dew Facial Completed',
    actor: 'Chloe (Master Esthetician)',
    type: 'visit',
    isPrivate: false,
  },
  {
    id: 'e2',
    time: 'Today, 2:15 PM',
    title: 'Skin Care Observation: Sensitivity noted on nose bridge',
    actor: 'Chloe',
    type: 'clinical_note',
    isPrivate: true,
  },
  {
    id: 'e3',
    time: 'Oct 24, 2026',
    title: 'Signed Digital Acid & Exfoliation Waiver (v1.2)',
    actor: 'Maya (Client)',
    type: 'waiver',
    isPrivate: false,
  },
];

export default function PosieStudioPage() {
  const [selectedService, setSelectedService] = useState<string>('s1');
  const [addComplexityTier, setAddComplexityTier] = useState<boolean>(false);
  const [timelineRole, setTimelineRole] = useState<'esthetician' | 'client'>('esthetician');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];
  const finalPrice = addComplexityTier
    ? activeServiceObj.basePrice + activeServiceObj.complexitySurcharge
    : activeServiceObj.basePrice;

  // Filter timeline based on least privilege role (F025)
  const visibleTimeline = initialTimeline.filter((item) =>
    timelineRole === 'client' ? !item.isPrivate : true
  );

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
          <Badge variant="sage">Features F001 - F025 Live</Badge>
          <Badge variant="rose">Atelier Studio</Badge>
        </div>
      </header>

      {/* F024: Canonical Business Location & Parking Bar */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <MapPin size={18} color="var(--color-primary)" />
                <strong style={{ fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                  {studioLocation.name}
                </strong>
                <Badge variant="muted">Open Tue-Sat</Badge>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>{studioLocation.address}</p>
            </div>

            <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--color-primary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={15} /> {studioLocation.phone}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Car size={15} /> Free Valet & Parking
              </span>
            </div>
          </div>
        </Card>
      </section>

      {/* F025: Unified Client Timeline Workspace */}
      <section style={{ marginBottom: '40px' }}>
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <History size={20} color="var(--color-primary)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                Feature 025: Unified Client Timeline (Maya's Profile)
              </span>
            </div>

            {/* Role Filter Switcher */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                variant={timelineRole === 'esthetician' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTimelineRole('esthetician')}
              >
                Esthetician View (Full Access)
              </Button>
              <Button
                variant={timelineRole === 'client' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTimelineRole('client')}
              >
                Client View (Redacted)
              </Button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {visibleTimeline.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: item.isPrivate ? '#FFF4E5' : 'var(--color-bg)',
                  border: item.isPrivate ? '1px solid #FFD8A8' : '1px solid var(--color-border)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>{item.title}</strong>
                    {item.isPrivate && (
                      <Badge variant="rose">
                        <Lock size={10} style={{ marginRight: '4px' }} /> Private Care Note
                      </Badge>
                    )}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    Recorded by {item.actor} • {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* F023: Treatment Menu with Gender-Neutral Complexity Tier */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-tertiary)', textTransform: 'uppercase' }}>
            Feature 023: Transparent, Gender-Neutral Pricing
          </span>
          <h2 style={{ fontSize: '1.9rem', color: 'var(--color-primary)' }}>Treatment Menu</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            We price by time and complexity, never by gender. Extra add-ons are fully agreed before booking.
          </p>
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
                onClick={() => {
                  setSelectedService(svc.id);
                  setAddComplexityTier(false);
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <Badge variant="sage">{svc.tag}</Badge>
                    <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-primary)' }}>
                      ${svc.basePrice}
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
            Book Your Appointment
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Treatment:</span>
              <strong>{activeServiceObj.name}</strong>
            </div>

            {/* F023 Complexity Tier Consent Option */}
            <div
              style={{
                backgroundColor: 'var(--color-bg)',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={addComplexityTier}
                  onChange={(e) => setAddComplexityTier(e.target.checked)}
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <span>
                  <strong>Optional Upgrade:</strong> {activeServiceObj.complexityTierName} (+${activeServiceObj.complexitySurcharge})
                </span>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', color: 'var(--color-primary)' }}>
              <strong>Total Quoted Price:</strong>
              <strong>${finalPrice}.00</strong>
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
                <strong>Appointment Confirmed!</strong>
                <p style={{ fontSize: '0.85rem' }}>
                  Recorded on your chronological client timeline (F025).
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
