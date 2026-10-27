'use client';

import React, { useState } from 'react';
import { Card, Button, Badge } from '@posie/ui';
import {
  Calendar,
  CreditCard,
  Users,
  Package,
  Briefcase,
  Scale,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  ShoppingBag,
  Coins,
  ShieldCheck,
  User,
  Search,
  DollarSign,
  HeartPulse,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export default function PosieStudioAdminPage() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'pos' | 'clients' | 'inventory' | 'team' | 'financials'>('calendar');

  // POS State
  const [posTipSplit, setPosTipSplit] = useState<boolean>(true);
  const [posPaymentMethod, setPosPaymentMethod] = useState<'terminal' | 'split'>('terminal');
  const [posCheckoutCompleted, setPosCheckoutCompleted] = useState<boolean>(false);

  // Time off state
  const [timeOffApproved, setTimeOffApproved] = useState<boolean>(false);
  const [coverageAssigned, setCoverageAssigned] = useState<boolean>(true);

  // Accounting sync state
  const [qboSyncDone, setQboSyncDone] = useState<boolean>(false);

  // Pickup verification state
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pickupVerified, setPickupVerified] = useState<boolean>(false);

  // F101 Chart Amendment & Role Access State
  const [chartAmendmentAdded, setChartAmendmentAdded] = useState<boolean>(false);
  const [viewingRole, setViewingRole] = useState<'practitioner' | 'marketing'>('practitioner');
  const [accessDeniedWarning, setAccessDeniedWarning] = useState<boolean>(false);

  // F102 Before/After Photos State
  const [marketingPermissionGranted, setMarketingPermissionGranted] = useState<boolean>(true);
  const [marketingRevocationReason, setMarketingRevocationReason] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F6F2' }}>
      {/* Top Admin Bar */}
      <header
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--color-border)',
          padding: '14px 28px',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                P
              </div>
              <div>
                <strong style={{ fontSize: '1.15rem', color: 'var(--color-primary)', display: 'block' }}>
                  Posie Atelier — Studio OS
                </strong>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
                  Beverly Hills Sanctuary • Provider Terminal
                </span>
              </div>
            </div>

            <Badge variant="sage">Maya Lin (Clocked In 09:14 AM)</Badge>
            <Badge variant="muted">Daily Close: Balanced ($480.00)</Badge>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="/"
              style={{
                color: 'var(--color-primary)',
                textDecoration: 'none',
                fontSize: '0.86rem',
                fontWeight: 600,
                border: '1px solid var(--color-border)',
                padding: '6px 14px',
                borderRadius: '6px',
                background: '#FAF8F5',
              }}
            >
              ← Client Booking Site (/)
            </a>
            <a
              href="/dev"
              style={{
                color: '#B36B5C',
                textDecoration: 'none',
                fontSize: '0.86rem',
                fontWeight: 600,
                border: '1px solid #E5C3B8',
                padding: '6px 14px',
                borderRadius: '6px',
                background: '#FFF5F3',
              }}
            >
              🧪 Feature Lab (F001–F100)
            </a>
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar & Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px' }}>
        {/* Navigation Sidebar */}
        <aside>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
            {[
              { id: 'calendar', label: 'Calendar & Schedule', icon: Calendar },
              { id: 'pos', label: 'Point of Sale (POS)', icon: CreditCard },
              { id: 'clients', label: 'Clients & Charting', icon: Users },
              { id: 'inventory', label: 'Retail & Store Orders', icon: Package },
              { id: 'team', label: 'Team & Commissions', icon: Briefcase },
              { id: 'financials', label: 'Accounting & Sync', icon: Scale },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '13px 18px',
                    border: 'none',
                    background: isSelected ? 'var(--color-primary)' : 'transparent',
                    color: isSelected ? '#FFFFFF' : 'var(--color-primary)',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '0.88rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderBottom: '1px solid #F0ECE6',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '16px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '16px' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
              Quick Status
            </span>
            <div style={{ fontSize: '0.82rem', marginBottom: '6px' }}>
              <strong>Terminal:</strong> WisePOS E (Online)
            </div>
            <div style={{ fontSize: '0.82rem', marginBottom: '6px' }}>
              <strong>Preauth Holds:</strong> 4 Active ($200)
            </div>
            <div style={{ fontSize: '0.82rem' }}>
              <strong>Today’s Gross:</strong> $1,180.00
            </div>
          </div>
        </aside>

        {/* Workspace Panels */}
        <main>
          {/* 1. CALENDAR VIEW */}
          {activeTab === 'calendar' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary)', margin: 0 }}>
                    Today’s Studio Schedule — Tuesday, Oct 27
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    3 Practitioners • 8 Booked Appointments • 2 Processing Gaps
                  </span>
                </div>
                <Button size="sm" variant="primary">
                  + New Walk-In Appointment
                </Button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {/* Column 1: Maya Lin */}
                <Card>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                    <div>
                      <strong style={{ color: 'var(--color-primary)' }}>Maya Lin</strong>
                      <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', display: 'block' }}>Master Colorist & Esthetician</span>
                    </div>
                    <Badge variant="sage">3 Visits</Badge>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ border: '2px solid #8A9A86', background: '#F8FAF7', padding: '12px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong style={{ fontSize: '0.88rem', color: 'var(--color-primary)' }}>Zendaya Coleman</strong>
                        <span style={{ fontSize: '0.76rem', color: '#2B5329', fontWeight: 600 }}>2:00 PM</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        Hydra-Dew Glass Facial (60m)
                      </div>
                      <div style={{ marginTop: '6px', display: 'flex', gap: '6px' }}>
                        <span style={{ fontSize: '0.72rem', background: '#E8ECE6', padding: '2px 6px', borderRadius: '4px' }}>Room 1</span>
                        <span style={{ fontSize: '0.72rem', background: '#F5E3DF', color: '#B36B5C', padding: '2px 6px', borderRadius: '4px' }}>VIP Client</span>
                      </div>
                    </div>

                    <div style={{ border: '1px dashed #A2B59F', background: '#FCFDFB', padding: '8px 12px', borderRadius: '6px', fontSize: '0.76rem', color: '#4A6B48' }}>
                      ⏱ <strong>Processing Gap (30m):</strong> Free for walk-in brow consultation or sanitation.
                    </div>

                    <div style={{ border: '1px solid var(--color-border)', background: '#FFFFFF', padding: '12px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong style={{ fontSize: '0.88rem', color: 'var(--color-primary)' }}>Chloe Bennett</strong>
                        <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>4:00 PM</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        Balayage Highlight & Glaze (90m)
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Column 2: Jen Chen */}
                <Card>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                    <div>
                      <strong style={{ color: 'var(--color-primary)' }}>Jen Chen</strong>
                      <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', display: 'block' }}>Licensed Esthetician</span>
                    </div>
                    <Badge variant="sage">3 Visits</Badge>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ border: '1px solid var(--color-border)', background: '#FFFFFF', padding: '12px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong style={{ fontSize: '0.88rem', color: 'var(--color-primary)' }}>Hailey Bieber</strong>
                        <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>11:00 AM</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        Clinical Radiance Peel (45m)
                      </div>
                      <div style={{ marginTop: '6px' }}>
                        <span style={{ fontSize: '0.72rem', background: '#E8ECE6', padding: '2px 6px', borderRadius: '4px' }}>Patch Test Passed ✓</span>
                      </div>
                    </div>

                    <div style={{ border: '1px solid var(--color-border)', background: '#FFFFFF', padding: '12px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong style={{ fontSize: '0.88rem', color: 'var(--color-primary)' }}>Emma Stone</strong>
                        <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>1:30 PM</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        Dermaplaning & Peptide Infusion (60m)
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Column 3: Sophia Loren */}
                <Card>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                    <div>
                      <strong style={{ color: 'var(--color-primary)' }}>Sophia Loren</strong>
                      <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', display: 'block' }}>Brow Specialist</span>
                    </div>
                    <Badge variant="sage">2 Visits</Badge>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ border: '1px solid var(--color-border)', background: '#FFFFFF', padding: '12px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong style={{ fontSize: '0.88rem', color: 'var(--color-primary)' }}>Camila Cabello</strong>
                        <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>12:15 PM</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        Precision Brow Sculpt & Tint (35m)
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* 2. POINT OF SALE (POS & CHECKOUT) */}
          {activeTab === 'pos' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary)', margin: 0 }}>
                    Active POS Checkout Ticket — Zendaya Coleman
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Ticket #TKT-88912 • Multi-Tender & Split Tip Pool Supported
                  </span>
                </div>
                <Badge variant={posCheckoutCompleted ? 'sage' : 'rose'}>
                  {posCheckoutCompleted ? 'Paid & Closed' : 'Open Ticket'}
                </Badge>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
                <Card>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '14px' }}>
                    Itemized Ticket Lines
                  </h3>

                  <div style={{ borderBottom: '1px solid #F0ECE6', paddingBottom: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <strong>Hydra-Dew Glass Facial</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Primary Specialist: Maya Lin ($120.00)</div>
                      </div>
                      <strong>$120.00</strong>
                    </div>
                  </div>

                  <div style={{ borderBottom: '1px solid #F0ECE6', paddingBottom: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <strong>Toner & Silk Blowout Finishing</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Assistant Specialist: Jen Chen ($60.00)</div>
                      </div>
                      <strong>$60.00</strong>
                    </div>
                  </div>

                  <div style={{ borderBottom: '1px solid #F0ECE6', paddingBottom: '12px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <strong>Barrier Gentle Cleanser (Retail)</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>SKU: CLN-001 (Sales Tax 8.25%)</div>
                      </div>
                      <strong>$32.00</strong>
                    </div>
                  </div>

                  {/* Multi-Provider Tip Split */}
                  <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', padding: '14px', borderRadius: '8px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <strong style={{ fontSize: '0.88rem', color: 'var(--color-primary)' }}>
                        Client Gratuity: $40.00 (Customer Added on Reader)
                      </strong>
                      <Badge variant="sage">100% Pass-Through</Badge>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem', marginTop: '8px' }}>
                      <div style={{ background: '#FFF', padding: '8px', borderRadius: '6px', border: '1px solid #E8E5E0' }}>
                        Maya Lin (75% Split): <strong>$30.00</strong>
                      </div>
                      <div style={{ background: '#FFF', padding: '8px', borderRadius: '6px', border: '1px solid #E8E5E0' }}>
                        Jen Chen (25% Split): <strong>$10.00</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>Services Gross:</span>
                      <span>$180.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>Retail Boutique:</span>
                      <span>$32.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>Sales Tax:</span>
                      <span>$2.64</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>Staff Tips:</span>
                      <span>$40.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '2px solid var(--color-primary)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                      <span>Total Due:</span>
                      <span>$254.64</span>
                    </div>
                  </div>
                </Card>

                {/* Tender & Device Panel */}
                <Card>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '14px' }}>
                    Collect Tender
                  </h3>

                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <button
                      onClick={() => setPosPaymentMethod('terminal')}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '6px',
                        border: posPaymentMethod === 'terminal' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        background: posPaymentMethod === 'terminal' ? 'var(--color-primary)' : '#FFF',
                        color: posPaymentMethod === 'terminal' ? '#FFF' : 'var(--color-primary)',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Tap to Pay (Terminal)
                    </button>
                    <button
                      onClick={() => setPosPaymentMethod('split')}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '6px',
                        border: posPaymentMethod === 'split' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        background: posPaymentMethod === 'split' ? 'var(--color-primary)' : '#FFF',
                        color: posPaymentMethod === 'split' ? '#FFF' : 'var(--color-primary)',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Split Tender
                    </button>
                  </div>

                  {posPaymentMethod === 'split' && (
                    <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '6px', fontSize: '0.8rem', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span>Gift Certificate (GIFT-****-4242):</span>
                        <strong>$50.00 Applied</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Remaining Balance to Card:</span>
                        <strong>$204.64</strong>
                      </div>
                    </div>
                  )}

                  <div style={{ border: '1px solid #E8E5E0', padding: '14px', borderRadius: '8px', textAlign: 'center', marginBottom: '18px' }}>
                    <CreditCard size={32} color="var(--color-primary)" style={{ margin: '0 auto 8px' }} />
                    <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)', display: 'block' }}>
                      WisePOS E Terminal Ready
                    </strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      Ready for Contactless Apple Pay, Google Pay, or EMV Chip
                    </span>
                  </div>

                  {posCheckoutCompleted ? (
                    <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                      <CheckCircle2 size={24} color="#2B5329" style={{ margin: '0 auto 4px' }} />
                      <strong style={{ color: '#2B5329', fontSize: '0.9rem', display: 'block' }}>
                        Ticket Finalized & Receipt Sent
                      </strong>
                      <span style={{ fontSize: '0.76rem', color: '#4A6B48' }}>
                        SMS receipt delivered to 310-555-0199
                      </span>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      size="lg"
                      style={{ width: '100%' }}
                      onClick={() => setPosCheckoutCompleted(true)}
                    >
                      Charge $254.64 to Reader
                    </Button>
                  )}
                </Card>
              </div>
            </div>
          )}

          {/* 3. CLIENTS & CHARTING */}
          {activeTab === 'clients' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary)', margin: 0 }}>
                    Client Profile & Treatment Charts
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Authoritative SOAP Notes, Form Consents, and Patch Test Evaluations
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button size="sm" variant="outline">Export History</Button>
                  <Button size="sm" variant="primary">+ New Treatment Note</Button>
                </div>
              </div>

              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', margin: 0 }}>Zendaya Coleman</h3>
                    <div style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      Phone: (310) 555-0199 • Member since Nov 2024 • Gold VIP (450 pts)
                    </div>
                  </div>
                  <Badge variant="sage">Medical Patch Test: Cleared ✓</Badge>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
                  <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Active Skin Allergies</span>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>None Reported</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Discontinued Retin-A 5 days prior</div>
                  </div>
                  <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Signed E-Consent (F100)</span>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>Verified Tamper-Sealed ✓</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>SHA-256 Digest Bound</div>
                  </div>
                  <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Series Entitlements (F092)</span>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>3 of 5 Credits Left</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>HydraFacial 5-Series Pass</div>
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <strong style={{ fontSize: '0.96rem', color: 'var(--color-primary)' }}>
                      SOAP Clinical Treatment Note — Oct 20, 2026 (Signed by Maya Lin)
                    </strong>
                    <Badge variant={chartAmendmentAdded ? 'rose' : 'sage'}>
                      {chartAmendmentAdded ? 'Amended Note (Rule DR04)' : 'Signed & Locked (Statutory 7-Yr Retention: 2033)'}
                    </Badge>
                  </div>

                  <div style={{ fontSize: '0.84rem', color: '#555', lineHeight: 1.6, marginBottom: '12px' }}>
                    <div><strong>Subjective:</strong> Client reports mild dryness around nasal folds following transcontinental flight. No sensitivity to citrus enzymes.</div>
                    <div><strong>Objective:</strong> Mild erythema on T-zone; stratum corneum slightly dehydrated. Pores clear on cheek apex.</div>
                    <div><strong>Assessment:</strong> Dehydrated combination skin with resilient barrier. Tolerates fruit enzyme exfoliation well.</div>
                    <div><strong>Plan:</strong> Prescribed Barrier Gentle Cleanser + Hyaluronic Serum nightly. Avoid AHAs for 48 hours.</div>
                  </div>

                  {chartAmendmentAdded && (
                    <div style={{ background: '#FFF9F7', border: '1px solid #E5C3B8', padding: '12px', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '12px' }}>
                      <strong style={{ color: '#8F4A3E', display: 'block', marginBottom: '4px' }}>
                        ✓ Addendum AMD-01 Appended (Oct 20, 2026, 4:30 PM UTC — Author: Maya Lin)
                      </strong>
                      <div style={{ color: '#555' }}>
                        <strong>Reason:</strong> Late entry: Client phoned 2h post-treatment reporting mild cheek apex erythema.<br />
                        <strong>Observation:</strong> Advised client to apply chilled ceramide compress; flush completely resolved within 20 minutes. Original signed note preserved verbatim.
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {!chartAmendmentAdded ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (viewingRole === 'marketing') {
                            setAccessDeniedWarning(true);
                          } else {
                            setChartAmendmentAdded(true);
                            setAccessDeniedWarning(false);
                          }
                        }}
                      >
                        Append Late Entry Addendum (F101)
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setChartAmendmentAdded(false)}
                      >
                        Reset Amendment
                      </Button>
                    )}

                    <button
                      onClick={() => {
                        const next = viewingRole === 'practitioner' ? 'marketing' : 'practitioner';
                        setViewingRole(next);
                        setAccessDeniedWarning(false);
                      }}
                      style={{
                        background: 'none',
                        border: '1px solid var(--color-border)',
                        padding: '5px 10px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        color: 'var(--color-text-muted)',
                        cursor: 'pointer',
                      }}
                    >
                      Simulate Role: <strong>{viewingRole === 'practitioner' ? 'Practitioner (Has Access)' : 'Marketing Intern (Blocked)'}</strong>
                    </button>
                  </div>

                  {accessDeniedWarning && (
                    <div style={{ marginTop: '10px', background: '#FFF7F5', border: '1px solid #C67D6E', padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem', color: '#8F4A3E' }}>
                      ⚠ <strong>Access Denied (Rule DR07):</strong> Staff role &ldquo;marketing&rdquo; does not inherit clinical chart access. Only certified practitioners and clinical directors can view or append to treatment charts.
                    </div>
                  )}
                </div>

                {/* F102: Standardized Before & After Photos Widget */}
                <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <strong style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                        Standardized Before & After Clinical Media (F102)
                      </strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        Document D12 Media Consent & Non-Destructive Raw Original Preservation
                      </div>
                    </div>
                    <Badge variant={marketingPermissionGranted ? 'sage' : 'muted'}>
                      {marketingPermissionGranted ? 'Marketing Consent: Active (Instagram / Web)' : 'Marketing Revoked (Internal Clinical Only)'}
                    </Badge>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    {/* Before Photo */}
                    <div style={{ background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <strong style={{ fontSize: '0.86rem', color: 'var(--color-primary)' }}>Before Peel (Oct 20)</strong>
                        <span style={{ fontSize: '0.74rem', background: '#EAE6DF', padding: '2px 6px', borderRadius: '4px' }}>Angle: Frontal 18&quot;</span>
                      </div>
                      <div style={{ background: '#F4F1EA', height: '110px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '0.8rem' }}>
                        📷 Raw Capture (SHA-256 Verified)
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                        Lighting: <strong>3200K (Warm Incandescent)</strong> • Unmodified Raw Media
                      </div>
                    </div>

                    {/* After Photo */}
                    <div style={{ background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <strong style={{ fontSize: '0.86rem', color: 'var(--color-primary)' }}>After Peel (Oct 27)</strong>
                        <span style={{ fontSize: '0.74rem', background: '#EAE6DF', padding: '2px 6px', borderRadius: '4px' }}>Angle: Frontal 18&quot;</span>
                      </div>
                      <div style={{ background: '#F4F1EA', height: '110px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '0.8rem' }}>
                        📷 Raw Capture (SHA-256 Verified)
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                        Lighting: <strong>5000K (Daylight LED)</strong> • Non-destructive markup overlay
                      </div>
                    </div>
                  </div>

                  {/* Disclosure Notice */}
                  <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '10px 14px', borderRadius: '6px', fontSize: '0.78rem', color: '#555', marginBottom: '12px' }}>
                    ⚠ <strong>Capture Condition Difference Disclosed (F102 Invariant):</strong> Before photo was captured under 3200K warm tungsten vs After photo under 5000K daylight LED. Posie mandates transparent disclosure of lighting delta to eliminate deceptive aesthetic marketing claims.
                  </div>

                  {/* Dual-Tier Consent Controls */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EAE6DF', paddingTop: '10px' }}>
                    <div style={{ fontSize: '0.78rem', color: '#444' }}>
                      <strong>Tier 1:</strong> Internal Clinical Progress (Covered) • <strong>Tier 2:</strong> Public Marketing ({marketingPermissionGranted ? 'Approved' : 'Revoked'})
                    </div>
                    {marketingPermissionGranted ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setMarketingPermissionGranted(false);
                          setMarketingRevocationReason('Client requested withdrawal from social media');
                        }}
                      >
                        Client Revokes Marketing Consent (Rule D12)
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setMarketingPermissionGranted(true);
                          setMarketingRevocationReason(null);
                        }}
                      >
                        Re-grant Document D12 Marketing Consent
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* 4. INVENTORY & STORE ORDERS */}
          {activeTab === 'inventory' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary)', margin: 0 }}>
                    Unified Stock & Online Store Orders (F096)
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Single ledger synchronizing in-person POS sales and web storefront orders
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
                <Card>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '14px' }}>
                    Physical Stock Counts (Beverly Hills Atelier)
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { name: 'Barrier Gentle Cleanser (CLN-001)', available: 10, reserved: 0, price: 32 },
                      { name: 'Glow Hyaluronic Serum (SRM-002)', available: 4, reserved: 1, price: 48 },
                      { name: 'Silk Radiance SPF 50 Drops (SPF-003)', available: 8, reserved: 0, price: 42 },
                    ].map((p) => (
                      <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #F0ECE6', borderRadius: '8px' }}>
                        <div>
                          <strong>{p.name}</strong>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>${p.price}.00 Unit Retail</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <strong style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>{p.available} Available</strong>
                          {p.reserved > 0 && (
                            <span style={{ fontSize: '0.74rem', color: '#B36B5C', display: 'block' }}>({p.reserved} held in online cart)</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '14px' }}>
                    Studio Pickup Verification PIN
                  </h3>

                  <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', padding: '14px', borderRadius: '8px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>Order #ORD-77291</strong>
                      <Badge variant="sage">Awaiting Pickup</Badge>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                      Client: Zendaya Coleman • 1x Barrier Gentle Cleanser
                    </div>
                  </div>

                  <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                    Ask the client for the 4-digit verification PIN displayed on their mobile confirmation receipt:
                  </p>

                  <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="e.g. 5912"
                      value={enteredPin}
                      onChange={(e) => setEnteredPin(e.target.value)}
                      style={{
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid var(--color-border)',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        letterSpacing: '2px',
                        width: '120px',
                        textAlign: 'center',
                      }}
                    />
                    <Button
                      size="md"
                      variant="primary"
                      onClick={() => {
                        if (enteredPin.trim().length === 4) setPickupVerified(true);
                      }}
                    >
                      Verify & Hand Off
                    </Button>
                  </div>

                  {pickupVerified && (
                    <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
                      ✓ <strong>PIN Verified!</strong> Order marked fulfilled. Stock decremented permanently from the unified ledger.
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}

          {/* 5. TEAM, COMMISSIONS & TIME OFF */}
          {activeTab === 'team' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary)', margin: 0 }}>
                    Team Earnings & Coverage Planning (F097 / F098)
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Document D20 Commission Statements and Client Commitment Defense
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '20px' }}>
                {/* Commission Statement Card */}
                <Card>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <strong style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                        Sophia Loren — Oct 16 – Oct 31, 2026
                      </strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        Statement ID: STMT-OCT-2026-01 • Document D20 Standard
                      </div>
                    </div>
                    <Badge variant="sage">Manager Approved ✓</Badge>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.82rem', marginBottom: '14px' }}>
                    <div style={{ background: '#FAF8F5', padding: '10px', borderRadius: '6px' }}>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Service Comm (45%)</span>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--color-primary)' }}>$135.00</strong>
                    </div>
                    <div style={{ background: '#FAF8F5', padding: '10px', borderRadius: '6px' }}>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Retail Comm (10%)</span>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--color-primary)' }}>$5.00</strong>
                    </div>
                    <div style={{ background: '#FAF8F5', padding: '10px', borderRadius: '6px' }}>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Net Tips (100%)</span>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--color-primary)' }}>$60.00</strong>
                    </div>
                  </div>

                  <div style={{ background: '#F8FAF7', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#2B5329' }}>
                    ✓ <strong>Immutable Statement Invariant:</strong> Signed statement cannot be rewritten. Subsequent client redo refunds generate forward adjustments in the next open pay period.
                  </div>
                </Card>

                {/* Time Off & Coverage Card */}
                <Card>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <strong style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                        Absence Request: Maya Lin
                      </strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        3-Day Vacation (Nov 10 – Nov 12)
                      </div>
                    </div>
                    <Badge variant={timeOffApproved ? 'sage' : 'muted'}>
                      {timeOffApproved ? 'Approved & Locked' : 'Pending Owner Review'}
                    </Badge>
                  </div>

                  <div style={{ border: '1px solid var(--color-border)', padding: '12px', borderRadius: '6px', marginBottom: '14px', fontSize: '0.82rem' }}>
                    <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '6px' }}>
                      Conflict Impact Report (F098):
                    </strong>
                    <div style={{ color: '#555', marginBottom: '4px' }}>
                      • Chloe Bennett (Hydra-Dew Facial) → Coverage Assigned: <strong>Jen Chen (Licensed)</strong>
                    </div>
                    <div style={{ color: '#555' }}>
                      • Hailey Bieber (Peel) → Queued for <strong>Proactive VIP Reschedule Call</strong>
                    </div>
                  </div>

                  {timeOffApproved ? (
                    <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
                      ✓ Time off approved. Maya’s calendar hard-blocked against online booking for Nov 10–12.
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      size="md"
                      style={{ width: '100%' }}
                      onClick={() => setTimeOffApproved(true)}
                    >
                      Approve Time Off (All Commitments Resolved)
                    </Button>
                  )}
                </Card>
              </div>
            </div>
          )}

          {/* 6. FINANCIALS & ACCOUNTING SYNC */}
          {activeTab === 'financials' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary)', margin: 0 }}>
                    Financial Ledger & QuickBooks / Xero Sync (F099)
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Double-Entry Journal Balancing with Idempotent Retry Protection
                  </span>
                </div>
              </div>

              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                      Daily Close Batch: DAILY-SALES-1027
                    </strong>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                      QuickBooks Online Sync • Idempotency Key: IDEMP-2026-10-27-DAILY
                    </div>
                  </div>
                  <Badge variant={qboSyncDone ? 'sage' : 'muted'}>
                    {qboSyncDone ? 'Synced: QBO-JE-894102' : 'Pending Sync'}
                  </Badge>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.84rem', marginBottom: '16px' }}>
                  <div style={{ background: '#FAF8F5', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
                      Debits (Assets & Expenses) — $360.63
                    </strong>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>1050 Undeposited Clearing Funds:</span>
                      <strong>$350.18</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>6050 Merchant Processing Fee:</span>
                      <strong>$10.45</strong>
                    </div>
                  </div>

                  <div style={{ background: '#FAF8F5', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
                      Credits (Revenues & Liabilities) — $360.63
                    </strong>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>4000 Service Revenue:</span>
                      <strong>$200.00</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>4100 Retail Boutique Revenue:</span>
                      <strong>$50.00</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>2100 Deferred Revenue (Gift Cards):</span>
                      <strong>$50.00</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>2200 Sales Tax Payable:</span>
                      <strong>$20.63</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>2300 Tips Payable:</span>
                      <strong>$40.00</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', color: '#2B5329', fontWeight: 600 }}>
                    ✓ Double-Entry Balance Verified: Debits $360.63 === Credits $360.63
                  </span>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setQboSyncDone(true)}
                  >
                    {qboSyncDone ? 'Batch Synced ✓' : 'Dispatch Sync to QuickBooks Online'}
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Floating Bottom Quick-Switcher */}
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
        <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>✨ Mode:</span>
        <a
          href="/"
          style={{
            color: 'var(--color-text-muted)',
            textDecoration: 'none',
            padding: '3px 8px',
            borderRadius: '12px',
            fontWeight: 500,
          }}
        >
          Client Booking Site (/)
        </a>
        <span style={{ background: '#EAE6DF', color: 'var(--color-primary)', padding: '3px 8px', borderRadius: '12px', fontWeight: 600 }}>
          💈 Studio OS (/admin)
        </span>
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
          🧪 Feature Lab (F001–F100)
        </a>
      </div>
    </div>
  );
}
