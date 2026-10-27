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

  // F047 Purchase Order State
  const [poReceivedUnits, setPoReceivedUnits] = useState(15);

  // F048 Campaign Send State
  const [campaignSent, setCampaignSent] = useState(false);

  // F049 Segment Filter Tab
  const [activeSegmentTab, setActiveSegmentTab] = useState<'included' | 'excluded'>('included');

  // F050 Review Feedback State
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [reviewFeedbackSubmitted, setReviewFeedbackSubmitted] = useState(false);

  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];

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

      {/* F047: Purchase Orders & Vendor Receiving */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={18} color="var(--color-primary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 047: Purchase Orders & Partial Receiving
              </strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={poReceivedUnits < 20 ? 'rose' : 'sage'}>
                {poReceivedUnits < 20 ? 'Partially Received (5 Outstanding)' : 'Fully Received'}
              </Badge>
              <Badge variant="muted">PO-2026-0012</Badge>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Supplier ordering with traceable receiving. Missing items remain visibly outstanding until fully reconciled into the stock ledger.
          </p>

          <div style={{ background: '#FAF8F5', borderRadius: '8px', padding: '14px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong>Vendor: Organic Botanical Labs</strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Approved by Chloe V.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '10px', fontSize: '0.82rem', borderTop: '1px solid var(--color-border)', paddingTop: '8px' }}>
              <span><strong>Item:</strong> Soothing Oat Milk Cleanser (150ml)</span>
              <span><strong>Ordered:</strong> 20 units</span>
              <span><strong>Received:</strong> {poReceivedUnits} units</span>
              <span style={{ color: poReceivedUnits < 20 ? '#B36B5C' : 'var(--color-secondary)', fontWeight: 600 }}>
                <strong>Outstanding:</strong> {20 - poReceivedUnits} units
              </span>
            </div>
          </div>

          {poReceivedUnits < 20 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPoReceivedUnits(20);
                alert('Remaining 5 units received into stock! Ledger entry generated under Lot #LOT-BOT-2026B.');
              }}
            >
              <Package size={14} style={{ marginRight: '6px' }} /> Receive Remaining 5 Units into Stock
            </Button>
          ) : (
            <div style={{ fontSize: '0.82rem', color: 'var(--color-secondary)', fontWeight: 600 }}>
              ✓ All 20 units received, audited, and added to sellable stock.
            </div>
          )}
        </Card>
      </section>

      {/* F048 & F049: Email Campaign Builder & Client Segments Inspector */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ backgroundColor: '#FAF8F5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={18} color="var(--color-secondary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 048 & 049: Campaign Builder & Segment Inspector
              </strong>
            </div>
            <Badge variant="sage">Send-Time Consent Active</Badge>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Transparent audience segmentation. Inspect exactly who is included and why others were excluded. Consent is re-verified at the second of send.
          </p>

          <div style={{ background: '#FFF', borderRadius: '8px', border: '1px solid var(--color-border)', padding: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                  Spring Skin Refresh Promo
                </strong>
                <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Target Segment: <strong>First-Visit Completed Welcome Series</strong>
                </p>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setActiveSegmentTab('included')}
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.78rem',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    background: activeSegmentTab === 'included' ? 'var(--color-primary)' : '#FFF',
                    color: activeSegmentTab === 'included' ? '#FFF' : 'var(--color-primary)',
                    cursor: 'pointer',
                  }}
                >
                  <UserCheck size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  Included (1)
                </button>
                <button
                  onClick={() => setActiveSegmentTab('excluded')}
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.78rem',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    background: activeSegmentTab === 'excluded' ? 'var(--color-primary)' : '#FFF',
                    color: activeSegmentTab === 'excluded' ? '#FFF' : 'var(--color-primary)',
                    cursor: 'pointer',
                  }}
                >
                  <UserX size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  Excluded & Reasons (2)
                </button>
              </div>
            </div>

            {/* Segment Inspector Details */}
            {activeSegmentTab === 'included' ? (
              <div style={{ background: '#FAF8F5', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem' }}>
                <strong style={{ color: 'var(--color-secondary)' }}>✓ Emma Watson (emma@example.com)</strong> — 1 completed visit, opted-in to marketing.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem' }}>
                <div style={{ background: '#FAF8F5', padding: '8px 12px', borderRadius: '6px' }}>
                  <strong>Regular VIP (regular@example.com)</strong>: Excluded because client has 4 completed visits (filter requires exactly 1).
                </div>
                <div style={{ background: '#FAF8F5', padding: '8px 12px', borderRadius: '6px' }}>
                  <strong>Opted Out Client (optout@example.com)</strong>: Excluded because client opted out of marketing communications.
                </div>
              </div>
            )}
          </div>

          {campaignSent ? (
            <div style={{ background: 'var(--color-secondary-light)', padding: '12px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <strong>✓ Campaign Dispatched!</strong> Delivered to 1 opted-in recipient. 1 opted-out client excluded at send-time.
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="primary" size="sm" onClick={() => setCampaignSent(true)}>
                <Send size={13} style={{ marginRight: '6px' }} /> Execute Campaign Send
              </Button>
              <Button variant="outline" size="sm" onClick={() => alert('Sending test preview email to team@posieatelier.com...')}>
                Send Test Preview
              </Button>
            </div>
          )}
        </Card>
      </section>

      {/* F050: Fair Review Requests (Anti-Gating Compliant) */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ borderLeft: '4px solid var(--color-tertiary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={18} color="var(--color-tertiary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 050: Fair Review Request (Anti-Gating Compliant)
              </strong>
            </div>
            <Badge variant="sage">FTC Compliant • No Review Gating</Badge>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            We invite honest reviews directly. The public Google review link is never hidden or conditional on giving a 5-star private rating.
          </p>

          <div style={{ background: '#FAF8F5', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: 'var(--color-primary)' }}>
              How was your Hydra-Dew Facial with Chloe V.?
            </h4>
            <p style={{ margin: '0 0 14px 0', fontSize: '0.83rem', color: 'var(--color-text-muted)' }}>
              Whether raving praise or constructive feedback, our direct Google review page is open to everyone:
            </p>

            <div style={{ marginBottom: '16px' }}>
              <a
                href="https://g.page/r/posie-austin/review"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--color-primary)',
                  color: '#FAF8F5',
                  padding: '9px 16px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                <Star size={14} color="var(--color-tertiary)" /> Leave an Honest Review on Google
              </a>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Optional Private Studio Rating (For Internal Improvement Only):
              </span>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      setSelectedRating(star);
                      setReviewFeedbackSubmitted(true);
                    }}
                    style={{
                      background: selectedRating && selectedRating >= star ? 'var(--color-tertiary)' : '#FFF',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                    }}
                  >
                    ★ {star}
                  </button>
                ))}
                {reviewFeedbackSubmitted && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', marginLeft: '8px' }}>
                    ✓ Private feedback recorded. Google link remains active above.
                  </span>
                )}
              </div>
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
