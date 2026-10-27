# Posie App User Guide: Core Modules (F001 - F034)

Welcome to **Posie**! This guide details features **F001 through F034** active across the platform.

---

## F001 — Reusable Brand Kit & Voice
* **What it is:** A centralized branding configuration controlling colors, typography, logos, and tone of voice.
* **Palette (Sage & Linen Atelier):**
  * `Primary (#2C3E30)`: Deep Forest Sage for headlines and primary actions.
  * `Secondary (#8A9A86)`: Muted Linen Sage for soft tags and highlights.
  * `Tertiary (#C67D6E)`: Warm Terracotta Rose for playful callouts.
  * `Neutral Canvas (#FAF8F5)`: Linen Off-White for clean contrast.
* **Tone of Voice:** Quirky, authoritative, playful, and jargon-free.
* **Key Invariant:** Brand updates apply to future drafts; historical receipts and records permanently retain original branding.

---

## F002 — Clear Service Catalog
* **What it is:** A transparent treatment menu with preparation instructions and duration breakdowns.
* **Features:** Client-friendly descriptions, pre-treatment care notes, and date-bound practitioner price/duration overrides.

---

## F003 — Staff Profiles & Portfolio Privacy
* **What it is:** Specialist profiles highlighting skills, background, and work examples.
* **Privacy Invariant:** Only staff members with `isPublic: true` and `active: true` appear in search or public booking.

---

## F004 — Plain-Language Booking Policies
* **What it is:** Clear policies governing deposits, cancellations, refunds, and accessibility.
* **How it works:** 20% hold deposit, 24-hr cancellation window with 100% refund, quiet visit toggle, and immutable booking snapshots.

---

## F005 — Direct Booking Links & QR Codes
* **What it is:** Direct booking links and brand-colored QR codes for the studio, specific treatments, and individual specialists.

---

## F006 — Printable Branded Materials
* **What it is:** Generates clean, high-resolution physical print collateral directly from live data.
* **Key Invariant:** Printed prices strictly match the live catalog at generation time.

---

## F007 — Message Template Library
* **What it is:** Automated, quirky, warm, and authoritative messages sent to clients for confirmations, reschedules, and aftercare.

---

## F008 — Document Content Library
* **What it is:** A version-controlled library of approved clauses for service plans, consent waivers, and policies.

---

## F009 — Staff SOPs and Checklists
* **What it is:** Standard operating procedure checklists for morning opening, evening closing, and autoclave sanitization.

---

## F010 — Progressive Feature Setup
* **What it is:** A modular workspace switcher that keeps daily operations clean for solo practitioners.

---

## F011 — Guided First-Day Setup
* **What it is:** A resumable setup progress tracker that walks studio owners through configuring essential features.

---

## F012 — Contextual Help & Demo Sandbox
* **What it is:** A fictional, fully isolated sandbox environment where new staff and studio owners can practice bookings and checkout.

---

## F013 — Client Service Preferences
* **What it is:** Client-centered comfort preferences captured during booking or consultation.

---

## F014 — Quiet Visit & Inclusive Access Requests
* **What it is:** Discrete requests for step-free access, support persons, scent-free treatment rooms, or a silent visit.

---

## F015 — Daily Task Queue
* **What it is:** A single consolidated daily action list covering incomplete forms, callback requests, and low-stock alerts.

---

## F016 — Catalog Import Templates
* **What it is:** Guided CSV templates to import treatments and services from previous platforms (Vagaro, GlossGenius).

---

## F017 — Total Cost Estimator
* **What it is:** A transparent ownership bill preview calculating base subscriptions, card processing, metered SMS, and custom domains.

---

## F018 — Short Daily Owner Digest
* **What it is:** A single high-level daily summary showing confirmed appointments, expected gross collections, secured deposits, and quiet hours.

---

## F019 — Lapsed Client Worklist
* **What it is:** An intelligent treatment-cadence reconnect queue identifying clients overdue for their regular visits.

---

## F020 — Private Weekly Goals
* **What it is:** Owner-chosen targets for profit, rebooking rates, and protected days off.

---

## F021 — Working Hours & Holiday Calendar
* **What it is:** Weekly operating hours, midday provider breaks, minimum advance notice lead times (default: 2 hours), and scheduled holiday closures.

---

## F022 — Help Clients Choose a Service
* **What it is:** An intelligent, client-facing treatment navigator that asks about skin goals, sensitivity, and upcoming events in plain language.

---

## F023 — Inclusive Menu Options (Gender-Neutral Pricing)
* **What it is:** Transparent, gender-neutral service pricing based strictly on time and treatment complexity.

---

## F024 — Business Contact & Opening Status
* **What it is:** Canonical studio address, parking directions, and accessibility descriptions.

---

## F025 — Unified Client Timeline
* **What it is:** A chronological history combining past visits, retail purchases, signed waivers, and care notes with role-based clinical privacy.

---

## F026 — Service-Specific Policy Rules
* **What it is:** Tailored booking rules, required deposit percentages, and cancellation windows mapped per service.

---

## F027 — Calendar Working Views & Concurrency
* **What it is:** Multi-practitioner day timelines and resource scheduling views with real-time overlap validation.

---

## F028 — Appointment Reminders
* **What it is:** Timezone-aware SMS and email reminder orchestration with automated reschedule synchronization.

---

## F029 — Recurring Appointment Proposals
* **What it is:** Automated recurring appointment proposals based on regular treatment cadences (every 2, 4, or 6 weeks).

---

## F030 — Self-Service Appointment Changes
* **What it is:** Direct links allowing clients to confirm, reschedule, or cancel their bookings without calling the front desk.

---

## F031 — Passwordless Client Portal
* **What it is:** Direct access to appointments, signed waivers, saved preferences, and itemized receipts via secure magic links.

---

## F032 — Brandable Booking Website
* **What it is:** Custom-branded web themes and custom domain mapping (`glow.posieatelier.com`).
* **Key Invariant (WB F13):** Mobile previews match production output 1:1, and failed publishes leave the active site completely intact with zero downtime.

---

## F033 — Website Search & Local Discovery
* **What it is:** Automated Google Local and Schema.org `BeautySalon` structured data generation.
* **Key Invariant:** Produces valid JSON-LD metadata for search engines with exact location coordinates, verified opening hours, and active menu items.

---

## F034 — Inquiry & Consultation Requests
* **What it is:** A triage queue for client treatment questions, skin concerns, and inspiration photo submissions prior to booking.
* **Key Invariant:** Assigns an accountable practitioner owner and response deadline (e.g. 24-hr SLA) without prematurely locking tentative slots on the public schedule.


---

## F035 — Smart Conditional Intake Forms
* **What it is:** Digital intake forms featuring dynamic branching logic, autosaving drafts, and sensitive question explanations (e.g. retinoid or Accutane warnings).
* **Key Invariant (WB F22):** Hidden questions are **never** treated as missing required fields! Only visible questions triggered by affirmative conditions require answers for submission completion. Accessible labels and explanations protect client trust.

---

## F036 — Branded Document Generation
* **What it is:** Generation of itemized estimates, bridal packages, treatment plans, and receipts formatted with brand tokens, low-ink printable CSS, and DOCX/PDF export metadata.
* **Key Invariant:** Missing required data (e.g. empty line items or missing contact numbers) strictly blocks issuing. Once issued, document numbers and snapshots are locked so future catalog price updates or theme edits do not alter historical records.

---

## F037 — Approved Aftercare Delivery
* **What it is:** Tailored, post-visit care protocols with step-by-step instructions (cleansing, SPF, active ingredient contraindications) and direct practitioner contact routes.
* **Key Invariant (WB F29):** Must be approved by a qualified practitioner prior to dispatch. Delivery creates a frozen immutable snapshot of the instructions so that future template edits never rewrite what was delivered to the client.
