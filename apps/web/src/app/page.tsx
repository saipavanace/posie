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

  // F038 Note Amendment State
  const [amendmentText, setAmendmentText] = useState('');
  const [amendmentAdded, setAmendmentAdded] = useState(false);

  // F039 Photo Markup State
  const [activeZone, setActiveZone] = useState<string>('T-Zone');
  const [permissionScope, setPermissionScope] = useState<'internal' | 'marketing'>('internal');

  // F041 Repeat Intake Delta State
  const [repeatReviewMode, setRepeatReviewMode] = useState<'review' | 'confirmed_same' | 'reported_changes'>('review');
  const [newMedication, setNewMedication] = useState('Started Spironolactone 50mg daily');

  // F043 Bundle Service Selection State
  const [selectedAddon, setSelectedAddon] = useState<boolean>(false);

  // F044 & F045 Proposal State
  const [proposalAccepted, setProposalAccepted] = useState(false);
  const [proposalQuestion, setProposalQuestion] = useState('');
  const [questionSent, setQuestionSent] = useState(false);

  // F046 Retail Inventory State
  const [stockOnHand, setStockOnHand] = useState(8);
  const [stockMovements, setStockMovements] = useState<Array<{ type: string; delta: number; reason: string; time: string }>>([
    { type: 'received_purchase', delta: 10, reason: 'Initial vendor batch receive', time: '10:00 AM' },
    { type: 'retail_sale', delta: -2, reason: 'POS In-store checkout', time: '02:15 PM' },
  ]);

  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];

  const handleAddAmendment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amendmentText) return;
    setAmendmentAdded(true);
  };

  const handleLogSale = () => {
    if (stockOnHand <= 0) return;
    setStockOnHand((prev) => prev - 1);
    setStockMovements((prev) => [
      { type: 'retail_sale', delta: -1, reason: 'Front desk retail checkout', time: 'Just now' },
      ...prev,
    ]);
  };

  const handleBackbarUse = () => {
    if (stockOnHand <= 0) return;
    setStockOnHand((prev) => prev - 1);
    setStockMovements((prev) => [
      { type: 'professional_backbar_use', delta: -1, reason: 'Dispensed to Treatment Room 1', time: 'Just now' },
      ...prev,
    ]);
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

      {/* F044 & F045: Itemized Service Estimate & One-Link Proposal Approval */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Receipt size={18} color="var(--color-primary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 044 & 045: Itemized Estimate & Proposal Approval
              </strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Quote #EST-9821</Badge>
              <Badge variant="muted">Version 1 (Valid 14 Days)</Badge>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Transparent range estimate for multi-service packages. Clients accept the exact version or ask questions before confirming.
          </p>

          <div style={{ background: '#FAF8F5', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '10px' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-primary)' }}>Bridal Party Radiance & Styling Series</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Prepared by Chloe V., Lead Aesthetician</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary)' }}>$470.40 – $545.40</span>
                <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>25% Deposit: $117.60</span>
              </div>
            </div>

            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.84rem', lineHeight: '1.6' }}>
              <li>Bride Deluxe Glass Glow Facial — $150.00 fixed</li>
              <li>Bridal Party Updo & Styling (3x) — $255.00 to $330.00 range</li>
              <li>Touch-Up Lip & Powder Kit — $45.00</li>
              <li style={{ color: 'var(--color-secondary)' }}>Less Bridal Welcome Promo — (-$20.00)</li>
            </ul>

            <div style={{ marginTop: '12px', fontSize: '0.78rem', color: 'var(--color-text-muted)', background: '#FFF', padding: '8px 12px', borderRadius: '6px' }}>
              ℹ️ <em>This is an itemized estimate, not a final charge. Acceptance refers to Version 1 only.</em>
            </div>
          </div>

          {proposalAccepted ? (
            <div style={{ background: 'var(--color-secondary-light)', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCheck size={20} color="var(--color-primary)" />
              <div style={{ fontSize: '0.85rem' }}>
                <strong>Proposal Accepted by Sophia Turner!</strong>
                <p style={{ margin: '2px 0 0', color: 'var(--color-text)' }}>
                  Locked to Version 1. Deposit link dispatched via SMS & email.
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setProposalAccepted(true)}
                >
                  <CheckCircle2 size={14} style={{ marginRight: '6px' }} /> Accept Proposal (v1)
                </Button>
                <button
                  onClick={() => alert('Proposal link copied to clipboard: https://glow.posieatelier.com/proposals/est-9821')}
                  style={{
                    background: '#FFF',
                    border: '1px solid var(--color-border)',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Share 1-Link Proposal
                </button>
              </div>

              {questionSent ? (
                <p style={{ fontSize: '0.82rem', color: 'var(--color-secondary)', margin: 0 }}>
                  ✓ Question logged to Chloe's triage inbox. Estimate remains open and valid.
                </p>
              ) : (
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <input
                    type="text"
                    placeholder="Have a question before accepting? (e.g. Can we adjust timing for hair styling?)..."
                    value={proposalQuestion}
                    onChange={(e) => setProposalQuestion(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (!proposalQuestion) return;
                      setQuestionSent(true);
                    }}
                  >
                    Ask Specialist
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>
      </section>

      {/* F046: Retail Inventory Basics & Traceable Stock Ledger */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ backgroundColor: '#FAF8F5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={18} color="var(--color-secondary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 046: Retail Inventory & Traceable Stock Ledger
              </strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={stockOnHand <= 3 ? 'rose' : 'sage'}>
                {stockOnHand <= 3 ? 'Low Stock Alert' : 'In Stock'}
              </Badge>
              <Badge variant="muted">SKU: POS-OAT-150ML</Badge>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Track variants, barcodes, sellable stock, and backbar usage with an immutable movement ledger.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', background: '#FFF', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Product Name</span>
              <strong style={{ fontSize: '0.85rem' }}>Soothing Oat Milk Cleanser</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>On Hand / Sellable</span>
              <strong style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>{stockOnHand} units</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Retail Price</span>
              <strong style={{ fontSize: '0.85rem' }}>$32.00 (Cost: $12.00)</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Barcode (UPC)</span>
              <code style={{ fontSize: '0.82rem', background: '#ECE6DF', padding: '2px 6px', borderRadius: '4px' }}>850012345678</code>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <Button variant="outline" size="sm" onClick={handleLogSale}>
              -1 Retail Sale (POS)
            </Button>
            <Button variant="outline" size="sm" onClick={handleBackbarUse}>
              -1 Dispense to Backbar Room
            </Button>
          </div>

          <div>
            <strong style={{ fontSize: '0.85rem', color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
              Recent Stock Movement Audit Trail:
            </strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {stockMovements.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    background: '#FFF',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <span>
                    <strong style={{ color: m.delta > 0 ? 'var(--color-secondary)' : '#B36B5C' }}>
                      {m.delta > 0 ? `+${m.delta}` : m.delta}
                    </strong>{' '}
                    — {m.reason} ({m.type})
                  </span>
                  <span style={{ color: 'var(--color-text-muted)' }}>{m.time}</span>
                </div>
              ))}
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
