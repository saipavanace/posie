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


---

## F038 — Structured Treatment Notes & SOAP Charting
* **What it is:** Professional clinical charting specifically tailored for esthetics (facials, peels, lash, brow, massage) capturing Subjective, Objective, Assessment, and Plan (SOAP) fields, products/lots used, and client-reported skin reactions.
* **Key Invariant (WB F23, F29):** Distinguishes mutable drafts from signed records. Once signed with practitioner attribution, historical records are locked and legally immutable; corrections require append-only amendments with timestamp and rationale.

---

## F039 — Image Annotation Tools & Face Mapping
* **What it is:** Non-destructive visual markup for treatment zones, contraindication maps, lash mappings, and brow symmetry over original client photographs.
* **Key Invariant (WB F25):** The raw original photograph checksum and image asset are **never** modified or overwritten. Annotation layers remain completely reversible. Separate explicit client consent is required before any treatment image may be shared beyond internal charting.

---

## F040 — Home-Care Regimen Plans
* **What it is:** Practitioner-approved daily skincare routines (AM/PM/weekly) personalized to client skin goals, honoring client preferences (e.g., fragrance-free, minimalist under 3 steps), with printable bathroom mirror compliance guides.
* **Key Invariant (WB F29):** Revisions generate incremental version numbers (e.g., v1 -> v2) alongside an automated change summary so clients always retain access to the exact routine prescribed during each visit.


---

## F041 — Changes Since Last Visit (Repeat Intake Delta Review)
* **What it is:** Fast repeat intake that presents clients with their previously verified answers from prior visits, enabling 1-click confirmation or delta updates.
* **Key Invariant (WB F21):** Confirmations **never** overwrite baseline historical submissions. A separate review record is created with delta tracking. Changes to sensitive health items (medications, contraindications) automatically alert the practitioner prior to service.

---

## F042 — Patch Test Record & Service Readiness Tracking
* **What it is:** Professional documentation of patch test applications (product, lot number, test site) and results evaluated by qualified practitioners.
* **Key Invariant (WB F28, Doc D09):** Readiness is determined by professional evaluation and salon validity policies (e.g. 180 days for lash adhesive). Missing evidence or adverse reactions automatically flag readiness without guessing universal medical intervals.

---

## F043 — Forms Matched to Appointment & Dynamic Re-Evaluation
* **What it is:** Automated bundling of required intake, informed consent, and preparation documents tailored to the exact booked service package.
* **Key Invariant (WB U21):** Deduplicates shared questionnaires so multi-service appointments never prompt duplicate forms. When services change or add-ons are included, requirements are dynamically re-evaluated while preserving previously completed documents.


---

## F044 — Itemized Service Estimates
* **What it is:** Granular price quotes supporting both fixed pricing and honest price ranges for complex services (e.g. bridal parties, multi-step color transformations), itemizing services, retail products, promotional discounts, estimated local sales taxes, and required deposits.
* **Key Invariant (Doc D04):** Strictly distinguishes an estimate from a final confirmed charge or payment authorization. Estimates include an explicit validity period and visible disclaimer protecting clients from unexpected surprise billing.

---

## F045 — Client Approval of Service Plans & One-Link Proposals
* **What it is:** Interactive, shareable proposal links enabling clients to review service options, submit clarifying questions directly to their specialist, or accept a treatment plan with digital signer attribution.
* **Key Invariant:** Client acceptance strictly binds to **one exact proposal version**. If the practitioner modifies pricing, dates, or scope, the proposal transitions back to pending acceptance, voiding previous agreement and requiring renewed client confirmation.

---

## F046 — Retail Inventory Basics & Traceable Stock Movements
* **What it is:** Inventory management tracking SKUs, barcodes, sellable stock, reserved appointment inventory, and reorder thresholds.
* **Key Invariant (WB F51):** Stock levels are **never silently overwritten**; all receipts, sales, client returns, professional backbar room dispensing, and shrinkage write-offs create traceable, immutable records in the stock movement ledger with staff attribution and timestamps.


---

## F047 — Purchase Orders & Receiving
* **What it is:** Supplier ordering workflows that manage partial vendor shipments, record batch/lot tracking, and automatically reconcile received inventory into the stock ledger.
* **Key Invariant (Doc D21):** Missing or substituted products remain visibly outstanding after partial delivery. Approval and vendor transmission are treated as distinct states; generating an order draft never automatically commits funds.

---

## F048 — Email Campaign Builder & Send-Time Consent
* **What it is:** Brand-consistent email marketing builder featuring preview rendering, test sends, and targeted client segments.
* **Key Invariant (WB F41):** Recipient marketing consent is strictly verified at **the exact moment of send**, not merely when the campaign was drafted. Clients who opted out between drafting and delivery are automatically excluded.

---

## F049 — Client Segments & Exclusion Inspector
* **What it is:** Dynamic audience segmentation based on objective visit patterns (e.g., first visit completed, active package holders, lapsed return cadence, VIP lifetime spend).
* **Key Invariant (WB F21):** Features a transparent exclusion inspector displaying both included clients and human-understandable exclusion reasons (e.g. "Excluded: repeat client with 4 completed visits; filter requires exactly 1").

---

## F050 — Fair Review Requests (Anti-Gating Compliant)
* **What it is:** Automated, post-visit review invitations connecting clients directly to public platforms like Google Maps.
* **Key Invariant (WB F44, U11):** **Strictly anti-gating (FTC compliant).** All completed clients receive the unrestricted public review link upfront. Private satisfaction ratings are collected for internal improvement only and never suppress or condition access to public review platforms.


---

## F051 — Client Referral Tracking & Completed-Visit Attribution
* **What it is:** Word-of-mouth referral program generating attributable client referral codes (`SARAH-GLOW`) and share links.
* **Key Invariant (WB F45):** Referral credits ($20 credit) disburse **only after the referred client completes their first qualifying visit**. Self-referrals (matching email, phone, or client ID), duplicate claims, and canceled visits are strictly prevented from generating rewards.

---

## F052 — Promotion Controls & Margin Safeguards
* **What it is:** Promotional discount engine managing coupon codes with date windows, service applicability, minimum order subtotals, and maximum discount caps.
* **Key Invariant (WB F47):** Mutually exclusive discounts **never stack silently**. Stacking is rejected unless both promotions explicitly permit it. Enforces owner margin floors so discounts can never push prices below the baseline operational cost.

---

## F053 — Approved Document Repository & Governance
* **What it is:** Governed policy and consent clause repository mapping versioned legal and clinical disclosures directly to salon service catalogs.
* **Key Invariant (DR01, DR02):** Editing clinical or informed consent clauses requires **named specialist review** (differentiating business-supplied, counsel-reviewed, and clinician-reviewed content) prior to publication, without misleading blanket "compliant" stamps.


---

## F054 — Team Shifts & Availability
* **What it is:** Staff scheduling and shift management system that tracks scheduled work hours, break blocks, and coverage requests across team members.
* **Key Invariant (WB F52):** Deleting, reducing, or canceling a team shift **strictly blocks** if active client appointments are booked within that time window. To prevent client abandonment, the system requires reassignment or manual client contact before the shift can be canceled.

---

## F055 — Staff Time Clock & Manager Approvals
* **What it is:** Digital punch clock capturing staff clock-in, clock-out, and unpaid meal breaks, calculating total worked hours and pay period summaries.
* **Key Invariant (WB F53):** Edits to historical punch times create a traceable correction request that preserves original timestamps and requires designated manager review and sign-off before payroll reconciliation.

---

## F056 — Expense & Receipt Capture with Duplicate Detection
* **What it is:** Salon operating expense tracker supporting receipt image attachments, tax-ready expense categorization, and smart duplicate detection.
* **Key Invariant (WB F54):** Flags duplicate expense candidates matching the same merchant, amount, and approximate date to prevent double-counting. Displays explicit tax disclaimers ensuring business owners understand recorded categories serve operational bookkeeping and require professional tax advice.


---

## F057 — Structured Data Export & Freedom to Leave
* **What it is:** Complete business data export producing standardized, documented CSV and JSON bundles covering clients, services, booking histories, gift card liabilities, and signed intake/consent metadata.
* **Key Invariant (WB C10, F057, F119):** **Zero vendor lock-in.** Every export archive includes an open schema dictionary, record counts, and cryptographic checksums verifying that visible records reconcile identically with raw exports. Owners can safely leave the platform or transition tools anytime without fee penalties or data withholding.

---

## F058 — Daily Close Workspace & Till Reconciliation
* **What it is:** End-of-day register closing and cash drawer balancing workspace. Tracks cash opening float, cash sales, paid-ins, paid-out petty cash movements, card batches, and unallocated tips.
* **Key Invariant (WB C12, C17):** Unresolved tickets block closure unless addressed, and till shortages or overages **strictly require an honest explanation note** (minimum 5 characters) before locking the daily ledger, eliminating untracked register slippage.

---

## F059 — Client Complaint Resolution & Redo Record (Document D18)
* **What it is:** Structured dispute management and service recovery workflow for tracking client complaints, appointment re-dos, and goodwill resolutions.
* **Key Invariant (D18):** Preserves an **immutable audit record** of the original client concern and factual chronological timeline. Consequential financial actions (refunds, store credits) strictly require named business owner sign-off, adverse reaction reports enforce qualified clinical lead triage, and complimentary re-dos track full business recovery costs (materials, labor, and goodwill).


---

## F060 — Human Support Escalation & Honest Staffed Hours
* **What it is:** Direct escalation path to real human support specialists with defined operating hours, urgent priority routing, and scheduled callbacks.
* **Key Invariant (WB C5, Row 70):** Bots and automated routing **strictly cannot promise immediate human responses outside staffed hours**. After-hours requests surface the next staffed window, place the ticket in the priority morning queue, and offer scheduled telephone callbacks to prevent unfulfilled 24/7 promises.

---

## F061 — Usage & Bill Preview
* **What it is:** Real-time billing transparency tool showing accrued fixed plan costs, staff calendar licenses, metered marketing SMS broadcasts, and payment terminal rentals.
* **Key Invariant (WB C7, C14):** Features owner-configured **spending caps with automated 80% and 100% threshold alerts**. Reaching 100% pauses non-essential metered variable marketing campaigns to prevent surprise end-of-month invoices while keeping essential booking operations running.

---

## F062 — Communication Preferences & Quiet Hours (Document DR05)
* **What it is:** Granular messaging permissions system separating transactional appointment alerts, clinical aftercare instructions, and promotional marketing broadcasts, with client-defined quiet hours.
* **Key Invariant (DR05):** Unsubscribing from promotional marketing **never disables essential appointment receipts or safety alerts**. Promotional text blasts respect local quiet hours (default 9:00 PM – 8:00 AM) and are deferred until morning, while all opt-in/opt-out actions append immutable timestamps to the client's consent audit trail.


---

## F063 — Visit Progress Check-ins
* **What it is:** Optional post-service check-in system allowing clients to upload healing photos and share comfort observations between appointments.
* **Key Invariant (WB T, Row 10):** Reports strictly include an explicit **non-diagnostic legal disclaimer** clarifying that client self-reports do not constitute medical diagnoses. Severe reaction symptoms automatically trigger approved urgent medical escalation instructions and alert treating practitioners with top priority.

---

## F064 — Consent-Aware Portfolio Publishing (Document D12)
* **What it is:** Granular media rights management separating internal clinical charting from public website portfolios, social media, and lookbooks.
* **Key Invariant (D12, DR05):** Treatment consent alone **strictly cannot be used as authorization for public marketing**. Media grants require separate explicit client sign-off detailing permitted channels and facial anonymity scopes. Revoking consent instantly unpublishes digital assets from all owned platforms.

---

## F065 — Virtual Consultation Connection
* **What it is:** Video consultation suite connecting scheduled virtual skin/hair appointments with approved video providers (Daily.co, Google Meet, Zoom Healthcare).
* **Key Invariant (WB A6, Row 6):** **Zero-friction access** via one-click guest browser links requiring no app installations or account creation. Call recording is **strictly disabled by default**, and rooms link directly to pre-call intake photos and post-consult treatment proposals.
