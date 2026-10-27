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
  Accessibility,
  CheckSquare2,
  UploadCloud,
  FileSpreadsheet,
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

// F015: Initial Daily Tasks
const initialDailyTasks = [
  {
    id: 'task-1',
    type: 'incomplete_form',
    title: 'Missing Chemical Peel Waiver for Maya',
    details: 'Appointment today at 2:30 PM with Chloe requires signed waiver before room entry.',
    status: 'pending',
  },
  {
    id: 'task-2',
    type: 'unpaid_deposit',
    title: 'Collect 20% Deposit from Sarah L.',
    details: 'Hold window expires in 4 hours for Saturday 11:00 AM slot.',
    status: 'pending',
  },
  {
    id: 'task-3',
    type: 'low_stock_warning',
    title: 'Restock Hyaluronic Serum Ampoules',
    details: 'Only 3 units left in studio backbar (reorder recommended).',
    status: 'completed',
  },
];

export default function PosieStudioPage() {
  const [selectedService, setSelectedService] = useState<string>('s1');
  const [selectedStaff, setSelectedStaff] = useState<string>('st1');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // F012 Demo Mode
  const [isDemoMode, setIsDemoMode] = useState(false);

  // F013 & F014 Client Preference & Accessibility States
  const [preferredName, setPreferredName] = useState('Maya');
  const [quietVisit, setQuietVisit] = useState(true);
  const [stepFree, setStepFree] = useState(true);
  const [scentFree, setSentFree] = useState(false);

  // F015 Daily Task Queue State
  const [tasks, setTasks] = useState(initialDailyTasks);

  // F016 CSV Template Preview State
  const [csvUploaded, setCsvUploaded] = useState(false);

  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];
  const activeStaffObj = staffMembers.find((s) => s.id === selectedStaff) || staffMembers[0];

  const handleResolveTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t))
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

        <div style={{ display: 'flex', gap: '10px' }}>
          <Badge variant="sage">Features F001 - F016 Live</Badge>
          <Badge variant="rose">Atelier Studio</Badge>
        </div>
      </header>

      {/* F015 & F016 Operations Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {/* F015: Daily Task List */}
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <CheckSquare2 size={20} color="var(--color-tertiary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-tertiary)', textTransform: 'uppercase' }}>
              Feature 015: Daily Task Queue
            </span>
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Today's Operational Actions
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Consolidated exceptions: missing forms, unpaid holds, and stock checks with clear owners.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleResolveTask(task.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: task.status === 'completed' ? 'var(--color-secondary-light)' : 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}
              >
                <input
                  type="checkbox"
                  checked={task.status === 'completed'}
                  readOnly
                  style={{ marginTop: '3px', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--color-primary)',
                      textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                      display: 'block',
                    }}
                  >
                    {task.title}
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {task.details}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* F016: Catalog Import Templates */}
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <FileSpreadsheet size={20} color="var(--color-primary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
              Feature 016: Catalog CSV Importer
            </span>
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
            One-Click Catalog Migration
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Upload existing menus from Vagaro or GlossGenius. Invalid rows are isolated without corrupting live data.
          </p>

          <div
            style={{
              border: '2px dashed var(--color-border)',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center',
              backgroundColor: 'var(--color-bg)',
              marginBottom: '16px',
            }}
          >
            <UploadCloud size={32} color="var(--color-primary)" style={{ margin: '0 auto 8px' }} />
            <strong style={{ fontSize: '0.9rem', display: 'block', color: 'var(--color-primary)' }}>
              {csvUploaded ? 'catalog_import_v1.csv (Parsed 3 Valid Treatments)' : 'Drag and drop your catalog CSV here'}
            </strong>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              Standard template: name, category, price_in_cents, duration, prep
            </span>
          </div>

          <Button
            variant={csvUploaded ? 'secondary' : 'outline'}
            size="md"
            onClick={() => setCsvUploaded(!csvUploaded)}
            style={{ width: '100%' }}
          >
            {csvUploaded ? '✓ 3 Treatments Imported (Zero Errors)' : 'Simulate CSV Upload & Validation'}
          </Button>
        </Card>
      </div>

      {/* F014: Quiet Visit & Accessibility Requests */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Accessibility size={20} color="var(--color-tertiary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-tertiary)', textTransform: 'uppercase' }}>
              Feature 014: Inclusive Accessibility & Quiet Visits
            </span>
          </div>
          <h2 style={{ fontSize: '1.9rem', color: 'var(--color-primary)' }}>Tailored Access Accommodations</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Privately routed to the specialist setting up your room so you arrive to a safe, comfortable space.
          </p>
        </div>

        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid var(--color-border)',
                backgroundColor: quietVisit ? 'var(--color-secondary-light)' : 'var(--color-bg)',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={quietVisit}
                onChange={(e) => setQuietVisit(e.target.checked)}
                style={{ accentColor: 'var(--color-primary)' }}
              />
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)', display: 'block' }}>Quiet Visit</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Essential treatment questions only; zero conversational pressure.</span>
              </div>
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid var(--color-border)',
                backgroundColor: stepFree ? 'var(--color-secondary-light)' : 'var(--color-bg)',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={stepFree}
                onChange={(e) => setStepFree(e.target.checked)}
                style={{ accentColor: 'var(--color-primary)' }}
              />
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)', display: 'block' }}>Step-Free Entry</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Ramp access & wider doorway into treatment suite.</span>
              </div>
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid var(--color-border)',
                backgroundColor: scentFree ? 'var(--color-secondary-light)' : 'var(--color-bg)',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={scentFree}
                onChange={(e) => setSentFree(e.target.checked)}
                style={{ accentColor: 'var(--color-primary)' }}
              />
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)', display: 'block' }}>Scent-Free Suite</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>No essential oil diffusers or scented candles.</span>
              </div>
            </label>
          </div>
        </Card>
      </section>

      {/* Booking Confirmation Box */}
      <section>
        <Card style={{ border: '2px solid var(--color-primary)', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '16px' }}>
            Confirm Appointment for {preferredName}
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
              <span style={{ color: 'var(--color-text-muted)' }}>Accommodations Logged:</span>
              <strong>
                {[quietVisit ? 'Quiet Visit' : null, stepFree ? 'Step-Free' : null, scentFree ? 'Scent-Free' : null]
                  .filter(Boolean)
                  .join(' • ') || 'Standard Visit'}
              </strong>
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
                <strong>Appointment Snapshot Confirmed!</strong>
                <p style={{ fontSize: '0.85rem' }}>
                  A daily task has been created for {activeStaffObj.name} with your accessibility requests.
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
