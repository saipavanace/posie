# Posie App User Guide: Core Modules (F001 - F019)

Welcome to **Posie**! This guide details features **F001 through F019** active across the platform.

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
* **Privacy Invariant:** 
  * Only staff members with `isPublic: true` and `active: true` appear in search or public booking.
  * Portfolio photos only appear publicly if `clientConsentGranted: true` has been confirmed.

---

## F004 — Plain-Language Booking Policies
* **What it is:** Clear policies governing deposits, cancellations, refunds, and accessibility.
* **How it works:** 20% hold deposit, 24-hr cancellation window with 100% refund, quiet visit toggle, and immutable booking snapshots.

---

## F005 — Direct Booking Links & QR Codes
* **What it is:** Direct booking links and brand-colored QR codes for the studio, specific treatments, and individual specialists.
* **How it works:** Generates campaign-tracked URLs (`?src=instagram`, `?src=qr_card`) and lightweight SVG QR codes rendered in `#2C3E30`.

---

## F006 — Printable Branded Materials
* **What it is:** Generates clean, high-resolution physical print collateral directly from live data.
* **How it works:** Produces Letter-size printable service menus with formatted pricing and preparation notes.
* **Key Invariant:** Printed prices strictly match the live catalog at generation time.

---

## F007 — Message Template Library
* **What it is:** Automated, quirky, warm, and authoritative messages sent to clients for confirmations, reschedules, and aftercare.
* **Key Invariant:** Throws validation errors if any placeholder token is missing, ensuring broken placeholders (e.g. `{{clientFirstName}}`) are never sent to a client.

---

## F008 — Document Content Library
* **What it is:** A version-controlled library of approved clauses for service plans, consent waivers, and policies.
* **Key Invariant (DR02):** Revisions create a new version while issued client documents preserve their exact signed text.

---

## F009 — Staff SOPs and Checklists
* **What it is:** Standard operating procedure checklists for morning opening, evening closing, and autoclave sanitization.
* **Key Invariant:** Updating an SOP checklist increments the version and resets acknowledgment tracking so all staff review the new version.

---

## F010 — Progressive Feature Setup
* **What it is:** A modular workspace switcher that keeps daily operations clean.
* **How it works:** Solo practitioners start in an uncluttered view (schedule, clients, services, settings). Extra modules like team management and retail inventory remain hidden until explicitly enabled.

---

## F011 — Guided First-Day Setup
* **What it is:** A resumable setup progress tracker that walks studio owners through configuring essential features.
* **Key Invariant:** Evaluates readiness to take bookings and shows the exact unresolved blockers (e.g., missing services or policies) without ambiguity.

---

## F012 — Contextual Help & Demo Sandbox
* **What it is:** A fictional, fully isolated sandbox environment where new staff and studio owners can practice bookings, checkout, and client communication.
* **Key Invariant:** Demo actions are strictly sandboxed: they never dispatch real client SMS messages, never initiate real bank charges, and are filtered out from production analytics.

---

## F013 — Client Service Preferences
* **What it is:** Client-centered comfort preferences captured during booking or consultation.
* **Key Invariant:** Private practitioner care notes remain isolated to the treatment staff and are never exported to public or marketing audiences.

---

## F014 — Quiet Visit & Inclusive Access Requests
* **What it is:** Discrete requests for step-free access, support persons, scent-free treatment rooms, or a silent visit.
* **Key Invariant:** Only the practitioner preparing the room sees these private requests; they are never converted into public marketing tags.

---

## F015 — Daily Task Queue
* **What it is:** A single consolidated daily action list covering incomplete forms, callback requests, low-stock alerts, and room preparation.
* **Key Invariant:** Completing a task marks staff attribution and resolves duplicate alerts across the studio.

---

## F016 — Catalog Import Templates
* **What it is:** Guided CSV templates to import treatments and services from previous platforms (Vagaro, GlossGenius).
* **Key Invariant:** Invalid rows are isolated and reported with line numbers without corrupting valid live records.

---

## F017 — Total Cost Estimator
* **What it is:** A transparent ownership bill preview calculating base subscriptions, card processing, metered SMS, and custom domains.
* **Key Invariant (WB C7 C14):** Owners can inspect how each operational dimension impacts their bill with zero hidden fees.

---

## F018 — Short Daily Owner Digest
* **What it is:** A single high-level daily summary showing confirmed appointments, expected gross collections, secured deposits, and outstanding balances.
* **Key Invariant:** Highlights the single most critical decision needed for tomorrow and honors studio quiet hours (9 PM to 8 AM).

---

## F019 — Lapsed Client Worklist
* **What it is:** An intelligent treatment-cadence reconnect queue identifying clients overdue for their regular visits.
* **Key Invariant:** Strictly excludes opted-out marketing recipients, deceased clients, or those with future appointments already on the calendar.
