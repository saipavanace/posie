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
  Phone,
  MessageSquare,
  Send,
} from 'lucide-react';

export default function PosieStudioAdminPage() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'pos' | 'clients' | 'inventory' | 'team' | 'financials' | 'brand_migration' | 'inbox_calling' | 'automations_hub'>('calendar');

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

  // F103 Deduplication State
  const [adminDedupMerged, setAdminDedupMerged] = useState<boolean>(false);
  const [adminDedupUnmerged, setAdminDedupUnmerged] = useState<boolean>(false);

  // F104 & F105 Migration State
  const [adminMigrationSource, setAdminMigrationSource] = useState<'glossgenius' | 'vagaro' | 'boulevard'>('glossgenius');
  const [adminCutoverDone, setAdminCutoverDone] = useState<boolean>(false);

  // F106 Brand Token State
  const [adminThemeChoice, setAdminThemeChoice] = useState<'Sage & Linen' | 'Rose Terracotta' | 'Noir Atelier'>('Sage & Linen');
  const [adminThemeStaged, setAdminThemeStaged] = useState<boolean>(false);

  // F107 Visit Hub State
  const [adminVisitLinkCopied, setAdminVisitLinkCopied] = useState<boolean>(false);
  const [adminSelfCheckoutCompleted, setAdminSelfCheckoutCompleted] = useState<boolean>(false);

  // F108 Automation State
  const [adminRecipeFilter, setAdminRecipeFilter] = useState<'review' | 'birthday' | 'aftercare'>('review');
  const [adminRecipePaused, setAdminRecipePaused] = useState<boolean>(false);

  // F109 Client Inbox State
  const [adminOutboundSent, setAdminOutboundSent] = useState<boolean>(false);
  const [adminTimelineNoteSaved, setAdminTimelineNoteSaved] = useState<boolean>(false);

  // F110 Telephony State
  const [adminCallIncoming, setAdminCallIncoming] = useState<boolean>(false);
  const [adminCallRecordingActive, setAdminCallRecordingActive] = useState<boolean>(true);

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
              🧪 Feature Lab (F001–F110)
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
              { id: 'brand_migration', label: 'Brand & Migration', icon: Sparkles },
              { id: 'inbox_calling', label: 'Client Inbox & Calling', icon: Phone },
              { id: 'automations_hub', label: 'Visit Hub & Flows', icon: MessageSquare },
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

          {/* 7. BRAND & MIGRATION STUDIO (F103, F104, F105, F106) */}
          {activeTab === 'brand_migration' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary)', margin: 0 }}>
                    Studio Brand &amp; Legacy Migration Suite
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Design Token Propagation (F106), Client Deduplication (F103), and Zero-Loss Migration (F104, F105)
                  </span>
                </div>
              </div>

              {/* F106: Brand Propagation & Historical Lock */}
              <Card style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                      Brand Identity &amp; Token Propagation (F106)
                    </strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Synchronizes typography, colors, and logos across all booking surfaces with safe staging and rollback.
                    </div>
                  </div>
                  <Badge variant={adminThemeStaged ? 'rose' : 'sage'}>
                    {adminThemeStaged ? 'Draft Staged Preview' : 'Active: ' + adminThemeChoice}
                  </Badge>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ background: '#FAF8F5', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <strong style={{ fontSize: '0.88rem', color: 'var(--color-primary)', display: 'block', marginBottom: '6px' }}>
                      Surface Token Sync
                    </strong>
                    <div style={{ fontSize: '0.8rem', color: '#555', marginBottom: '10px' }}>
                      Primary Palette: <strong>{adminThemeChoice}</strong><br />
                      Surfaces: Client Booking (/) • Studio OS (/admin) • SMS Notifications
                    </div>
                    <div
                      style={{
                        padding: '10px',
                        borderRadius: '6px',
                        color: '#FFF',
                        textAlign: 'center',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        backgroundColor: adminThemeChoice === 'Sage & Linen' ? '#2D3E2F' : adminThemeChoice === 'Rose Terracotta' ? '#B36B5C' : '#1A1A1A',
                      }}
                    >
                      Brand Primary Token Preview: {adminThemeChoice}
                    </div>
                  </div>

                  <div style={{ background: '#FAF8F5', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <strong style={{ fontSize: '0.88rem', color: 'var(--color-primary)', display: 'block', marginBottom: '6px' }}>
                      Historical Document Immutability (Rule BR05 / DR04)
                    </strong>
                    <div style={{ fontSize: '0.8rem', color: '#555', marginBottom: '8px' }}>
                      Receipt #REC-2024-912 (Issued to Zendaya Coleman):<br />
                      Baked Brand: <strong>Sage &amp; Linen (Permanent)</strong>
                    </div>
                    <div style={{ background: '#FFF', border: '1px solid #EAE6DF', padding: '8px 10px', borderRadius: '6px', fontSize: '0.76rem', color: '#666' }}>
                      🔒 Invariant: Future theme changes never alter previously issued invoices, receipts, or signed records. Past documents retain original legal entity details and colors.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Button
                    size="sm"
                    variant={adminThemeChoice === 'Sage & Linen' && !adminThemeStaged ? 'primary' : 'outline'}
                    onClick={() => {
                      setAdminThemeChoice('Sage & Linen');
                      setAdminThemeStaged(false);
                    }}
                  >
                    Sage &amp; Linen (Default)
                  </Button>
                  <Button
                    size="sm"
                    variant={adminThemeChoice === 'Rose Terracotta' && !adminThemeStaged ? 'primary' : 'outline'}
                    onClick={() => {
                      setAdminThemeChoice('Rose Terracotta');
                      setAdminThemeStaged(false);
                    }}
                  >
                    Rose Terracotta
                  </Button>
                  <Button
                    size="sm"
                    variant={adminThemeChoice === 'Noir Atelier' && !adminThemeStaged ? 'primary' : 'outline'}
                    onClick={() => {
                      setAdminThemeChoice('Noir Atelier');
                      setAdminThemeStaged(false);
                    }}
                  >
                    Noir Atelier
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setAdminThemeStaged(!adminThemeStaged)}
                  >
                    {adminThemeStaged ? 'Publish Staged Theme' : 'Stage Draft Preview'}
                  </Button>
                </div>
              </Card>

              {/* F103: Client Deduplication & Household Contact Defense */}
              <Card style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                      Client Deduplication &amp; Household Defense (F103)
                    </strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Probable match scoring with reversible merges and shared family phone protection.
                    </div>
                  </div>
                  <Badge variant={adminDedupMerged ? (adminDedupUnmerged ? 'muted' : 'sage') : 'rose'}>
                    {adminDedupMerged ? (adminDedupUnmerged ? 'Profiles Restored' : 'Merged: Zendaya Coleman') : 'Review Required (Match Score: 85)'}
                  </Badge>
                </div>

                <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '14px', marginBottom: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.82rem', marginBottom: '10px' }}>
                    <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                      <strong>Target Profile:</strong> Zendaya Coleman<br />
                      Phone: (310) 555-0199 • 14 Visits • 450 Pts
                    </div>
                    <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                      <strong>Candidate Profile:</strong> Claire Coleman (Mother)<br />
                      Phone: (310) 555-0199 (Shared) • 3 Visits • 75 Pts
                    </div>
                  </div>

                  <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '6px', fontSize: '0.78rem', color: '#555' }}>
                    🛡 <strong>Shared Household Defense:</strong> Auto-merge is blocked because distinct first names indicate a family household sharing a landline/mobile number. Only an explicit practitioner override can combine these accounts.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {!adminDedupMerged ? (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        setAdminDedupMerged(true);
                        setAdminDedupUnmerged(false);
                      }}
                    >
                      Execute Reversible Merge (Snapshot Captured)
                    </Button>
                  ) : !adminDedupUnmerged ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setAdminDedupUnmerged(true)}
                    >
                      <RotateCcw size={14} style={{ marginRight: '6px' }} />
                      Unmerge Profiles (Restore Independent Accounts DR04)
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setAdminDedupMerged(false);
                        setAdminDedupUnmerged(false);
                      }}
                    >
                      Reset Deduplication Demo
                    </Button>
                  )}
                </div>
              </Card>

              {/* F104 & F105: Historical Migration Staging & Live Cutover */}
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                      Legacy Migration Staging &amp; Live Cutover (F104, F105)
                    </strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Multi-platform mapping (GlossGenius / Vagaro / Boulevard) with Provenance Archive and Cutover Verification.
                    </div>
                  </div>
                  <Badge variant={adminCutoverDone ? 'sage' : 'muted'}>
                    {adminCutoverDone ? 'Cutover Certified ✓' : 'Staging in Progress'}
                  </Badge>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', fontSize: '0.82rem', marginBottom: '14px' }}>
                  <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <strong>Staged Records:</strong>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-primary)', marginTop: '4px' }}>1,420 Clients</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>Source: {adminMigrationSource.toUpperCase()}</div>
                  </div>
                  <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <strong>Provenance Archive (F104):</strong>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#8F4A3E', marginTop: '4px' }}>384 Custom Fields</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>Formulas, old tags preserved</div>
                  </div>
                  <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <strong>Active Obligations (F105):</strong>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2B5329', marginTop: '4px' }}>$4,250 Reconciled</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>Gift cards &amp; packages verified</div>
                  </div>
                </div>

                {adminCutoverDone ? (
                  <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A', marginBottom: '14px' }}>
                    ✓ <strong>Cutover Certificate #CUTOVER-CERT-2026-01:</strong> Opening balance sheet validated. Historical customer obligations reconciled with 0 anomalies. Studio is authorized for production cutover.
                  </div>
                ) : null}

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {(['glossgenius', 'vagaro', 'boulevard'] as const).map((source) => (
                    <Button
                      key={source}
                      size="sm"
                      variant={adminMigrationSource === source ? 'primary' : 'outline'}
                      onClick={() => setAdminMigrationSource(source)}
                    >
                      {source === 'glossgenius' ? 'GlossGenius' : source === 'vagaro' ? 'Vagaro' : 'Boulevard'}
                    </Button>
                  ))}

                  <Button
                    size="sm"
                    variant={adminCutoverDone ? 'outline' : 'primary'}
                    onClick={() => setAdminCutoverDone(!adminCutoverDone)}
                  >
                    {adminCutoverDone ? 'Revoke Cutover Staging' : 'Issue Cutover Certificate (F105)'}
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* 8. CLIENT INBOX & BUSINESS TELEPHONY (F109, F110) */}
          {activeTab === 'inbox_calling' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary)', margin: 0 }}>
                    Client Inbox &amp; Telephony Suite
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Unified Two-Way SMS / Email (F109), Business Calling &amp; Voicemail Transcription (F110)
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Badge variant="sage">Studio Line: (310) 555-7674</Badge>
                  <Badge variant="muted">A2P 10DLC Verified</Badge>
                </div>
              </div>

              {/* F110: Telephony & Caller ID Header Card */}
              <Card style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={18} color="var(--color-primary)" />
                    <strong style={{ fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                      Inbound Calling &amp; Voicemail Center (F110)
                    </strong>
                  </div>
                  <Badge variant={adminCallRecordingActive ? 'sage' : 'muted'}>
                    {adminCallRecordingActive ? 'Recording: Two-Party Consented (Rule U19)' : 'Unrecorded Calling'}
                  </Badge>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  {/* Caller ID Popup */}
                  <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Caller ID Match
                        </span>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--color-primary)', display: 'block' }}>
                          Zendaya Coleman ((310) 555-0199)
                        </strong>
                      </div>
                      <Badge variant="sage">Gold VIP Member</Badge>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.5 }}>
                      <div><strong>Upcoming:</strong> Hydra-Dew Glass Facial • Sun Nov 01 @ 2:00 PM (Maya Lin)</div>
                      <div><strong>Medical Alert:</strong> Discontinued Retin-A 5 days prior (Cleared)</div>
                      <div><strong>Routing:</strong> Staff Ring Group (Operating Hours: 9 AM – 7 PM PT)</div>
                    </div>
                  </div>

                  {/* Voicemail & Task */}
                  <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <strong style={{ fontSize: '0.88rem', color: 'var(--color-primary)' }}>
                        Automated Voicemail Transcript
                      </strong>
                      <span style={{ fontSize: '0.74rem', background: '#EAE6DF', padding: '2px 6px', borderRadius: '4px' }}>Task #VM-421</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#444', fontStyle: 'italic', margin: '0 0 8px 0' }}>
                      &ldquo;Hi Maya, this is Zendaya! Just checking if we can add an extra hyaluronic boost tomorrow. Thank you!&rdquo;
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: '#777' }}>
                      <span>AI Confidence: 99% • Audio: 14s</span>
                      <Button size="sm" variant="outline">Callback Client</Button>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setAdminCallRecordingActive(!adminCallRecordingActive)}
                  >
                    Toggle Recording Consent (Rule U19: {adminCallRecordingActive ? 'Active' : 'Disabled'})
                  </Button>
                </div>
              </Card>

              {/* F109: Shared Messaging Thread */}
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                  <div>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                      Two-Way Client Conversation: Zendaya Coleman
                    </strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      Communicating via Studio Business Line (310) 555-7674 • Staff cell numbers protected
                    </div>
                  </div>
                  <span style={{ fontSize: '0.76rem', color: '#2B5329', fontWeight: 600 }}>
                    ● Maya Lin assigned &amp; active
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px', maxHeight: '280px', overflowY: 'auto' }}>
                  {/* Outbound message */}
                  <div style={{ alignSelf: 'flex-end', background: 'var(--color-primary)', color: '#FFF', padding: '12px 16px', borderRadius: '12px 12px 2px 12px', maxWidth: '70%', fontSize: '0.84rem' }}>
                    <div>Hi Zendaya! Looking forward to your Hydra-Dew Facial tomorrow at 2:00 PM. Please arrive 5 minutes early to settle in.</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', textAlign: 'right' }}>
                      Sent via Studio SMS • 10:15 AM • Delivered ✓
                    </div>
                  </div>

                  {/* Inbound message */}
                  <div style={{ alignSelf: 'flex-start', background: '#FAF8F5', border: '1px solid var(--color-border)', padding: '12px 16px', borderRadius: '12px 12px 12px 2px', maxWidth: '70%', fontSize: '0.84rem' }}>
                    <div>Thank you Maya! My skin barrier feels a little dry after my flight, can we add extra hydration?</div>
                    <div style={{ fontSize: '0.7rem', color: '#888', marginTop: '4px' }}>
                      Received via SMS ((310) 555-0199) • 10:22 AM
                    </div>
                  </div>

                  {adminOutboundSent && (
                    <div style={{ alignSelf: 'flex-end', background: 'var(--color-primary)', color: '#FFF', padding: '12px 16px', borderRadius: '12px 12px 2px 12px', maxWidth: '70%', fontSize: '0.84rem' }}>
                      <div>Absolutely! I have added a chilled botanical ceramide mask to your protocol. See you tomorrow!</div>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', textAlign: 'right' }}>
                        Sent just now • Delivered ✓
                      </div>
                    </div>
                  )}
                </div>

                {adminTimelineNoteSaved && (
                  <div style={{ background: '#FFF9F7', border: '1px solid #E5C3B8', padding: '10px 14px', borderRadius: '6px', fontSize: '0.8rem', color: '#8F4A3E', marginBottom: '14px' }}>
                    ✓ <strong>Attributed Communication Record Saved (Rule F101 Firewall):</strong> Saved to Zendaya&apos;s administrative profile. Notice: This communication cannot and does not overwrite official SOAP clinical charting records without licensed practitioner examination.
                  </div>
                )}

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setAdminOutboundSent(true)}
                  >
                    <Send size={14} style={{ marginRight: '6px' }} />
                    Reply as Maya Lin
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setAdminTimelineNoteSaved(!adminTimelineNoteSaved)}
                  >
                    {adminTimelineNoteSaved ? 'Remove from Timeline' : 'Save Message to Client Timeline (Rule F101)'}
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* 9. VISIT HUB & AUTOMATION FLOWS (F107, F108) */}
          {activeTab === 'automations_hub' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary)', margin: 0 }}>
                    Visit Hub &amp; Automation Flows
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Resumable Visit Links (F107) and Pre-Rehearsed Automation Recipes (F108)
                  </span>
                </div>
              </div>

              {/* F107: One Link for a Complete Visit & Express Flow */}
              <Card style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                      One Link for a Complete Visit &amp; Express Flow (F107)
                    </strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Resumable client journey combining forms, e-consents, deposits, itineraries, and client-phone self-checkout.
                    </div>
                  </div>
                  <Badge variant={adminSelfCheckoutCompleted ? 'sage' : 'muted'}>
                    {adminSelfCheckoutCompleted ? 'Self-Checkout Paid ($180.00)' : 'Active Express Session'}
                  </Badge>
                </div>

                <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <strong>Express Reservation: Zendaya Coleman</strong>
                      <div style={{ fontSize: '0.8rem', color: '#555' }}>
                        Hydra-Dew Glass Facial ($150) • Maya Lin • Sun Nov 01 @ 2:00 PM
                      </div>
                    </div>
                    <span style={{ fontSize: '0.78rem', background: '#FFF', border: '1px solid var(--color-border)', padding: '4px 10px', borderRadius: '4px' }}>
                      Token: <code>vtok_8941a2</code>
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', fontSize: '0.74rem', textAlign: 'center', marginBottom: '12px' }}>
                    <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid #738A73', color: '#2B5329', fontWeight: 600 }}>1. Service ✓</div>
                    <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid #738A73', color: '#2B5329', fontWeight: 600 }}>2. Intake ✓</div>
                    <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid #738A73', color: '#2B5329', fontWeight: 600 }}>3. E-Consent ✓</div>
                    <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid #738A73', color: '#2B5329', fontWeight: 600 }}>4. Deposit ✓</div>
                    <div style={{ background: adminSelfCheckoutCompleted ? '#FFF' : '#FAF8F5', padding: '8px', borderRadius: '4px', border: adminSelfCheckoutCompleted ? '1px solid #738A73' : '1px dashed #CCC', color: adminSelfCheckoutCompleted ? '#2B5329' : '#888', fontWeight: 600 }}>
                      5. Self-Checkout {adminSelfCheckoutCompleted ? '✓' : ''}
                    </div>
                  </div>

                  {adminSelfCheckoutCompleted ? (
                    <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
                      ✓ <strong>Client Phone Self-Checkout Confirmed:</strong> Zendaya paid $150 service + $30 tip via Apple Pay. Staff never touched physical credit card. Digital receipt and bathroom mirror aftercare delivered.
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      Client can open link from confirmation SMS anytime to view arrival instructions or execute self-checkout at visit completion.
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Button
                    size="sm"
                    variant={adminVisitLinkCopied ? 'outline' : 'primary'}
                    onClick={() => setAdminVisitLinkCopied(true)}
                  >
                    {adminVisitLinkCopied ? 'Link Copied: posie.com/v/vtok_8941a2 ✓' : 'Copy Resumable Visit Link'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setAdminSelfCheckoutCompleted(!adminSelfCheckoutCompleted)}
                  >
                    {adminSelfCheckoutCompleted ? 'Reset Self-Checkout' : 'Simulate Client Phone Self-Checkout (F107)'}
                  </Button>
                </div>
              </Card>

              {/* F108: Automation Recipes with Previews & Safe Dry-Run */}
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                      Automation Recipes &amp; Dry-Run Rehearsal (F108)
                    </strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Rehearse flows against client cohorts before activation with quiet hours and consent protection.
                    </div>
                  </div>
                  <Badge variant={adminRecipePaused ? 'rose' : 'sage'}>
                    {adminRecipePaused ? 'Emergency Paused' : 'Active Flow: Post-Visit Review'}
                  </Badge>
                </div>

                <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.82rem', marginBottom: '12px' }}>
                    <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                      <div>Total Cohort:</div>
                      <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>142 Clients</strong>
                    </div>
                    <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                      <div>Eligible Recipients:</div>
                      <strong style={{ fontSize: '1.1rem', color: '#2B5329' }}>18 Verified</strong>
                    </div>
                    <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                      <div>Safely Excluded:</div>
                      <strong style={{ fontSize: '1.1rem', color: '#8F4A3E' }}>124 Clients</strong>
                    </div>
                    <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                      <div>Estimated Cost:</div>
                      <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>$0.36 USD</strong>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#555', marginBottom: '8px' }}>
                    🛡 <strong>Guardrails:</strong> Frequency capping (14 days), Marketing consent verified (Rule F064), Quiet hours enforced (8 PM–9 AM local).
                  </div>

                  <div style={{ background: '#FFF', border: '1px solid var(--color-border)', padding: '10px 14px', borderRadius: '6px', fontSize: '0.8rem', color: '#444' }}>
                    <strong>Message Preview:</strong> &ldquo;Hi &#123;&#123;firstName&#125;&#125;, thank you for visiting Posie Atelier today! If you enjoyed your treatment with Maya, we&rsquo;d love your quick review: posie.com/review/beverlyhills&rdquo;
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Button
                    size="sm"
                    variant={adminRecipePaused ? 'primary' : 'outline'}
                    onClick={() => setAdminRecipePaused(!adminRecipePaused)}
                  >
                    {adminRecipePaused ? 'Resume Recipe' : '1-Click Emergency Pause (F108)'}
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
          🧪 Feature Lab (F001–F110)
        </a>
      </div>
    </div>
  );
}
