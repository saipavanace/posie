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


---

## F066 — Arrival and Waiting Status
* **What it is:** Digital front-desk arrival check-in and private waiting queue workspace with client SMS arrival confirmations.
* **Key Invariant (WB T, Row 14):** **Waiting room privacy.** Public reception screens strictly display sanitized display names (e.g. `Maya L.`), never leaking full identities, phone numbers, treatment histories, or VIP member tags. Staff can reverse accidental check-ins without corrupting or dropping calendar bookings.

---

## F067 — Local Device Preferences & Universal Accessibility
* **What it is:** Device-level accessibility preferences supporting enlarged typography (+15% / +30%), high-contrast themes, reduced motion, and high-visibility focus indicators.
* **Key Invariant (R04, UX):** Full booking and checkout operability **without drag-only gestures or memory puzzle interactions**. Accessibility settings dynamically emit standard CSS variables and data attributes so all interactive buttons and modals remain WCAG AAA compliant.

---

## F068 — Client Credit & Balance Explanations (Documents D15, D17)
* **What it is:** Entitlement ledger translating gift cards, prepaid package series, and monthly membership allowances into plain, friendly English explanations.
* **Key Invariant (D15, D17):** Every balance reduction **strictly links to an authoritative appointment ID or checkout event**, preventing untracked balance deductions. Gift card certificates automatically mask secret redemption codes (`GIFT-****-9842`) to protect balances from public exposure.


---

## F069 — Staff Document Generation (Documents D19, D20)
* **What it is:** Automated legal template generator for worker onboarding packets, relationship separation agreements, and commission earnings detail statements.
* **Key Invariant (D19, D20):** **Worker classification integrity.** Strictly distinguishes W-2 studio employees from independent 1099 booth renters. Independent renters retain their own merchant accounts and client data ownership without merging into salon commercial records. Commission statements clearly differentiate estimates from manager-approved amounts.

---

## F070 — International Language Presentation (Documents DR08, DR09)
* **What it is:** Multi-language localization system supporting client-facing service menus, intake disclosures, and waiver forms (English, Spanish, French, Vietnamese, Korean).
* **Key Invariant (DR08, DR09):** **Zero pricing drift.** Translations change neither cents prices nor service entitlements, and **currencies are never inferred from locale**. Signed intake and consent records permanently preserve the exact translated language and text shown to the client at signature time.

---

## F071 — Rebooking at Checkout
* **What it is:** Post-service rebooking engine offering biological return cadence recommendations (e.g. 4-week brow tint refresh, 6-week toner) with convenient suggested appointment slots.
* **Key Invariant (Basis: B):** **Complete freedom to defer.** Proposed return slots remain strictly unbooked until explicitly accepted by the client. Clients can reserve instantly, request an automated text reminder 1 week before their window, or defer gracefully without forced pressure.

---

## F072 — Customer-Owned Contact Number & Zero-Lock-In Portability
* **What it is:** Dedicated business telephony provisioning that guarantees salon owners legally own and control their salon phone and SMS lines.
* **Key Invariant (Basis: B, Portability):** **Zero carrier or platform lock-in.** The salon business name is permanently recorded on the carrier telecom registration. When migrating or switching providers, Posie issues a pre-filled, compliant Letter of Authorization (LOA) with Carrier Account SID and Billing Telephone Number (BTN) in 1-click without exit penalties or data hostaging.

---

## F073 — Multi-Tenant Isolation & Least-Privilege Role Control (Document DR07)
* **What it is:** Tenant boundary enforcement and granular role-based access control protecting client privacy and staff permissions across salon locations.
* **Key Invariant (Document DR07, Recipient Firewall):** **Strict clinical boundary.** Front-desk coordinators, receptionists, and marketing staff are strictly firewalled from accessing or printing confidential clinical SOAP charting, medical history, and patch test records. Cross-tenant access is blocked at the core boundary layer, and revoking staff access instantly terminates all active auth tokens.

---

## F074 — Financial Ledger & Idempotent Checkout History (Documents D14, D15, D17)
* **What it is:** Immutable double-entry financial transaction ledger with 3-way payout reconciliation and network-retry idempotency safeguards.
* **Key Invariant (Documents D14, D15, D17):** **Idempotent payment execution.** In flaky salon Wi-Fi environments, double-tapping checkout buttons or retrying payment requests never double-debits a client card. The ledger strictly reconciles gross client charges, card processing fees, and net bank payouts to the exact penny with zero unaccounted leakage.

---

## F075 — Reliable Booking Engine & Guest Checkout
* **What it is:** High-concurrency booking engine letting clients book as guests without being forced to download an app or create an account with passwords.
* **Key Invariant (Basis: B; WB F5):** **Atomic slot hold protection.** When a client selects a time slot, a temporary 10-minute hold token locks the practitioner's calendar; concurrent booking attempts for overlapping windows are immediately rejected. Staff can also dispatch secure 1-click Express Provisional links for phone bookings, allowing clients to confirm their time and card hold without staff taking numbers over the phone.

---

## F076 — Room & Equipment Scheduling
* **What it is:** Multi-resource reservation coordinator locking treatment suites, specialized esthetic devices (e.g. IPL laser, HydraFacial), and styling chairs alongside practitioners.
* **Key Invariant (Basis: B; WB F16):** **Sanitization buffer isolation.** Two services cannot consume the same exclusive resource at the same time. Mandatory turnaround periods (e.g. 15-minute suite disinfection, 20-minute laser handpiece sterilization) are strictly attached to reservations, preventing any booking until cleanup is completed.

---

## F077 — Processing & Finishing Intervals
* **What it is:** Three-phase appointment scheduler modeling hands-on work, chemical processing gaps (e.g. 40-minute hair color development or numbing cream dwell), and finishing blowouts.
* **Key Invariant (Basis: B; WB F15):** **Non-evicting processing gaps.** During a chemical processing gap, the practitioner's hands-on time is freed to accept a quick secondary service (e.g. express dry cut or consultation) in another chair, **without releasing the primary client's occupied station**. Secondary services are blocked from stealing the occupied chair or encroaching on the finish time.

---

## F078 — Multi-Practitioner Appointments & Visit Itinerary (Document D02)
* **What it is:** Coordinated sequential appointment engine uniting multiple specialists (e.g. Master Colorist + Lash Specialist) into a single unified client visit.
* **Key Invariant (Basis: B; multi-staff workflows):** **Ripple consequence analysis before alert dispatch.** Evaluates practitioner qualifications and credential requirements per segment. When an earlier segment experiences a processing delay, the system assesses downstream schedule collisions on subsequent practitioners and clients before alerting staff or revising Document D02 itineraries.

---

## F079 — Group & Family Booking (Document D22)
* **What it is:** Multi-guest party and bridal proposal coordinator with shared deposit management, single or itemized split payments, and day-of event packets.
* **Key Invariant (Document D22, Legal Basis: B):** **Medical intake firewall for adults.** Legal guardians can access their minor children's medical disclosures (e.g. nut or chemical allergies). However, adult party members' health questionnaires and pregnancy disclosures are strictly firewalled from event organizers and fellow guests, stripped automatically from shared day-of event packets.

---

## F080 — Classes & Workshops
* **What it is:** Group session and masterclass capacity manager coordinating studio room availability, instructor assignments, attendance rosters, and waitlists.
* **Key Invariant (Basis: B; WB F18):** **Single-sale final seat guarantee.** Atomic seat reservation guarantees the final class seat cannot be double-sold during concurrent checkout. When a confirmed attendee cancels, the system automatically promotes the earliest waitlisted guest to confirmed status with immediate notification.

---

## F081 — Timed Waitlist Offers
* **What it is:** Preference-matching waitlist dispatch engine that notifies waiting clients when an appointment slot becomes available.
* **Key Invariant (Basis: B; WB F9 U5):** **Expiring exclusive claim windows.** Dispatches an exclusive 15-minute claim token to the top candidate matching day-of-week and time-of-day preferences. If the candidate claims the slot, further offers are immediately stopped; if the window expires without claim, the slot safely advances to the next candidate without race conditions.

---

## F082 — Cancellation Recovery Queue
* **What it is:** Real-time cancellation recovery coordinator ranking earlier-move requests, standby VIP clients, and waitlist entries to refill last-minute calendar drops.
* **Key Invariant (Basis: I; cancellation recovery):** **Strict recovery accounting.** Distinguishes genuine incremental revenue (new clients from waitlist or on-call standby) from simple reschedule volume (moving existing clients from next week). Reschedule volume is strictly tracked as shifted appointments, never inflated as net-new sales recovery.

---

## F083 — Two-Way External Calendar Sync (Google & Outlook)
* **What it is:** Real-time calendar synchronization integrating personal Google Calendar, Outlook 365, and Apple iCal events with salon practitioner schedules.
* **Key Invariant (Basis: B; WB F17):** **Sync loop suppression & paid appointment defense.** Events exported by Posie are tagged with origin IDs and ignored during inbound webhook sync to prevent infinite ping-pong echo loops. Confirmed, paid salon appointments are strictly defended against silent external calendar deletions, requiring formal cancellation workflows within Posie.

---

## F084 — Deposits and Preauthorizations (Document D05)
* **What it is:** Payment security engine collecting upfront booking deposits or credit card authorizations with transparent cancellation policies.
* **Key Invariant (Document D05, DR05):** **7-day preauth expiration defense & immutable policy snapshots.** Card pre-authorizations automatically flag risk when appointments are booked >7 days in advance, recommending captured deposits. Document D05 permanently captures the agreed cancellation cutoff (e.g. 24h), executing 100% automatic refunds for timely notices and lawful deposit forfeitures for late cancellations or no-shows.

---

## F085 — Unified Checkout & Split Tender (Documents D14, D15)
* **What it is:** Single-ticket checkout combining services, taxable retail products, add-ons, and specialist gratuities with split tender payment.
* **Key Invariant (Basis: B; WB U22 C17):** **Separately traceable double-entry accounting.** Partial payments (gift cards, cash, credit card) remain individually reconciled. Includes zero-balance tipping support (allowing clients redeeming 100% package vouchers to cleanly tip their stylist) and hosted client-phone payment links where staff never touch the client's credit card.

---

## F086 — Tap to Pay and Certified Terminals
* **What it is:** In-person contactless point-of-sale supporting certified countertop smart terminals (WisePOS E) and Tap to Pay on iPhone.
* **Key Invariant (Basis: B; WB F31):** **Interrupted processing recovery.** When a network disconnect or reader timeout occurs mid-dip or tap, Posie locks the session and queries the gateway's authoritative transaction state before allowing a retry. If the charge executed, the receipt is finalized with zero duplicate debits; if uncharged, the reader safely resets.

---

## F087 — Refunds & Exchanges (Document D15)
* **What it is:** Post-transaction adjustment suite handling full/partial refunds, retail product returns, tips, and inventory restocking manifests.
* **Key Invariant (Basis: B; R02, Document D15):** **Reconciled balance protection.** Staff cannot issue a refund greater than the remaining balance after deducting prior refunds. Retail returns automatically manifest back into the inventory stock ledger, and every refund records an immutable audit reason (e.g. medical contraindication, client dissatisfaction).

---

## F088 — No-Show Collection & Fee Recovery (Document D05)
* **What it is:** Automated cancellation policy enforcement attempting collection of stipulated no-show fees against vaulted payment cards.
* **Key Invariant (Basis: I; WB F8 C15, Document D05):** **Truth-in-vaulting & gentle recovery.** Saved cards are never represented as guaranteed collectible funds. When a card declines (insufficient funds, expired card), Posie transparently surfaces the decline code, texts the client a gentle self-service settlement link (`posie.com/settle/...`), and provides an auditable manager courtesy waiver for emergencies.

---

## F089 — Dispute & Chargeback Evidence Workspace (Documents D05, D15, D18)
* **What it is:** Automated dispute defense engine assembling signed intake forms, cancellation policies, SOAP charts, and terminal receipts into an audit-ready chargeback defense bundle.
* **Key Invariant (Basis: I; WB F34, Documents D05/D15/D18):** **Cryptographic truth-in-defense.** Assembles 5 critical verification pillars (signed D05 policy, signed treatment consent hash, practitioner SOAP notes, terminal receipt, and two-way SMS logs) with deadline tracking. Truth-in-defense notice clarifies that evidence submission strictly follows card network rules without false promises of guaranteed bank rulings.

---

## F090 — Payout and Hold Tracker
* **What it is:** Multi-balance deposit tracker providing total visibility into available cleared funds, pending batches, and reserved risk holds.
* **Key Invariant (Basis: I; WB F36 C8):** **Confirmed settlement verification.** Predicted payout arrival dates are strictly distinguished from confirmed settlements. Payouts require verified bank ACH trace numbers before being logged as settled, and owner verification requirements (e.g. ID verification holds) surface with direct action links.

---

## F091 — Gift Card Liability Ledger (Document D17)
* **What it is:** Stored-value certificate and redemption engine with GAAP-compliant deferred revenue liability accounting.
* **Key Invariant (Basis: B; WB F38, Document D17):** **Unearned liability separation.** Selling a gift card logs deferred liability under Account 2100 with zero recognized service revenue. Earned revenue is recognized solely when value is partially or fully redeemed for services or retail products. Certificates feature secure masked codes (`GIFT-****-4242`) and real-time balance tracking.

---

## F092 — Package & Series Entitlements (Documents D13, D16)
* **What it is:** Multi-session prepaid series tracker (e.g. 5x HydraFacial package) managing session consumption, rollover dates, and partial cancellations.
* **Key Invariant (Basis: B; WB F39, Documents D13/D16):** **Partial refund revocation integrity.** Refunding an active package series refunds only the unconsumed sessions while permanently revoking remaining entitlement units to 0. Already consumed sessions remain permanently locked in the historical ledger, completely preventing negative session balances or reused visits.

---

## F093 — Membership Lifecycle & Transparent Cancellation Preview (Document D16)
* **What it is:** Recurring client membership program (monthly credits, discounted services, retail perks) with respectful, jargon-free subscription control.
* **Key Invariant (Basis: B; WB F40, Document D16):** **Anti-surprise cancellation preview & credit retention.** Subscribers are never trapped or blindsided by immediate forfeiture of hard-earned banked credits. Cancellation workflows present a transparent preview detailing exactly how many banked credits remain redeemable (with a mandatory 90-day post-cancellation redemption window), how much future billing is avoided, and zero surprise penalty fees. Includes flexible 60-day billing pause protections and smart dunning grace periods with card-update links before service suspension.

---

## F094 — Tipping Across Checkout Types & Provider Allocation
* **What it is:** Flexible gratuity distribution engine supporting split appointments, multiple specialists and assistants, zero-dollar package tickets, and post-service refund policies.
* **Key Invariant (Basis: B; WB F41):** **Zero-balance tipping & 3-way refund protection.** Clients redeeming 100% prepaid vouchers or gift passes can add card tips without awkward workarounds. When multiple providers service a visit (e.g. Lead Colorist and Assistant), tips allocate proportionally according to defined percentage or dollar splits. When a client requests a service refund/redo, Posie presents an explicit, auditable choice: retain the tip with staff (protecting their labor), clawback the tip from payroll, or absorb the tip under the salon's operational goodwill retention budget.

---

## F095 — Loyalty Balance Ledger & Rewards
* **What it is:** Double-entry points and tier elevation ledger for beauty and wellness clients, tracking accruals across retail and services, threshold promotions, and return clawbacks.
* **Key Invariant (Basis: B; WB F42):** **Rule versioning & historical point protection.** Loyalty point accrual rules are strictly version-controlled with effective date stamps. If a salon updates point accrual rules (e.g. changing from 1 pt/$1 to 0.5 pt/$1), the system strictly applies new rules to future purchases, permanently preserving previously earned point balances from silent retroactive dilution. Returns and refunds cleanly reverse only the points accrued on the returned item.

---

## F096 — Online Retail Storefront & Unified Stock Ledger
* **What it is:** E-commerce retail storefront supporting boutique skincare sales with physical stock reservations, pickup vs. shipping fulfillment, tax calculations, and automatic restocking.
* **Key Invariant (Basis: B; WB F52):** **Single unified stock ledger & cart reservation holds.** Online storefront sales and in-person POS sales draw atomically from the exact same physical stock ledger. When an online customer begins checkout, stock is protected by a 15-minute reservation timer, preventing double-booking or overselling with in-studio walk-in buyers. Pickups generate secure 4-digit verification PINs; carrier shipments calculate live weight, shipping tiers, and tracking numbers; and cancelled orders cleanly restock units back into available general inventory.

---

## F097 — Commission Calculation & Staff Earnings Statements (Document D20)
* **What it is:** Tiered service and retail commission tracking engine generating transparent Document D20 earnings statements with 100% tip pass-through and payroll reconciliation.
* **Key Invariant (Basis: B; WB F53, Document D20):** **Immutable historical payroll & forward adjustment integrity.** Commission rules feature effective-dated versions, ensuring future commission adjustments never alter historical runs. Once a pay period statement is reviewed and approved by management, the historical statement is permanently locked. If a client receives a post-payroll service refund or redo, Posie strictly forbids rewriting historical approved earnings; instead, it generates an auditable forward adjustment line item in the next open pay period statement. Statements are clearly labeled as studio reconciliation detail to preserve statutory payroll boundaries.

---

## F098 — Time Off & Client Coverage Planning
* **What it is:** Staff absence approval, conflict impact analysis, coverage reassignment, and schedule blocking suite for beauty and wellness teams.
* **Key Invariant (Basis: I; team scheduling):** **Client commitment defense & certified coverage matching.** Prohibits the silent deletion, dropping, or orphan status of existing client bookings when staff request time off. The system generates an authoritative Conflict Impact Report quantifying appointments and revenue at risk. Owner approval is strictly blocked until every conflicting booking has either been reassigned to an available provider certified for that specific service, or queued for proactive client rescheduling outreach. Upon approval, the staff member's calendar is hard-blocked against online booking and walk-in scheduling.

---

## F099 — Accounting Integration & Reconciled Journal Sync (QuickBooks & Xero)
* **What it is:** Real-time general ledger synchronization mapping studio sales, gift card liabilities, sales taxes, tips, merchant processing fees, and bank clearing deposits to external accounting software.
* **Key Invariant (Basis: B; WB F68):** **Double-entry balancing & idempotent retry protection.** Sync retries never duplicate journal entries in QuickBooks Online or Xero; every transaction batch requires a unique idempotency key. Rather than transmitting a single blended sales number, Posie reconciles distinct financial accounts: Service Revenue (Account 4000), Retail Sales (Account 4100), Gift Card Deferred Liability (Account 2100), Sales Tax Payable (Account 2200), Tips Payable (Account 2300), Merchant Processing Fees (Account 6050), and Undeposited Clearing Funds (Account 1050), strictly enforcing that Total Debits equal Total Credits.

---

## F100 — Versioned Electronic Signatures & Cryptographic Evidence (Rules BR05, DR04, DR05, DR10)
* **What it is:** Compliant e-signature suite for intake questionnaires, treatment consents, photographic media releases, estimate approvals, and cancellation policy acknowledgments.
* **Key Invariant (Basis: B; WB F22, Rules BR05, DR04, DR05, DR10):** **Cryptographic hash binding & consent-payment separation.** Signatures are mathematically bound to a SHA-256 digest of the exact document text; altering a single character triggers a tamper alert. In accordance with Rule DR05, signing an informed consent or intake questionnaire explicitly does NOT authorize a payment card charge. Per Rule DR04, once signed, historical document artifacts remain immutable. Amendments supersede the original document and spawn a linked Version 2 draft requiring fresh client signature acceptance. Audit evidence records permanently capture UTC timestamps, client IP addresses, browser user agents, and signature vectors.

---

## F101 — Private Records & Chart Amendments (Rules DR04, DR07, D08)
* **What it is:** Clinical and esthetic charting suite managing treatment notes, SOAP documentation, role-based privacy firewalls, append-only amendments, and statutory retention tracking.
* **Key Invariant (Basis: B; WB F23, F27; Rules DR04, DR07, D08):** **Append-only addenda & role-restricted privacy.** Draft notes can be refined by the practitioner, but once signed, the record is permanently locked against direct editing. Any subsequent correction or late entry must be appended as an immutable addendum that preserves the original signed note verbatim, stamps the UTC timestamp, and identifies author justification. In compliance with Rule DR07, marketing and general front-desk roles cannot inherit clinical chart access. Tracks a 7-year statutory retention lifecycle and compiles complete audit-stamped client record timeline exports.

---

## F102 — Standardized Before and After Photos (Document D12, Rules F039, F064)
* **What it is:** Standardized photographic clinical documentation suite tracking aesthetic progress across treatment courses with capture guidance, raw media preservation, and dual-tier consent management.
* **Key Invariant (Basis: B; WB F24, U17; Document D12):** **Capture disparity disclosure & two-tier marketing firewall.** Guides camera angles (Frontal, Left/Right 45°, Macro) and metadata (distance in inches, ambient lighting Kelvin). Side-by-side comparison progress reports must explicitly disclose significant differences in lighting (>500K) or distance (>3") to eliminate deceptive before-and-after claims. Face mapping and markup layers (F039) are stored non-destructively, permanently preserving the raw camera capture with a SHA-256 fingerprint. Enforces a strict two-tier permission firewall: treatment consent covers private internal clinical evaluations, while public social media or marketing sharing requires explicit Document D12 authorization that can be revoked by the client at any time without compromising clinical history.

---

## F103 — Client Deduplication & Reversible Merge (Rules F007, F041, DR04)
* **What it is:** Intelligent duplicate resolution suite identifying duplicate profiles, defending shared household family contacts from accidental consolidation, and executing reversible profile merges with complete audit snapshots.
* **Key Invariant (Basis: B; WB F07, F41, DR04):** **Shared phone household defense & reversible merge snapshots.** Automated deduplication never blindly merges profiles sharing a phone number or billing address if first names differ (e.g. parent/child, spouses). Instead, they are flagged as shared household contacts requiring explicit practitioner review. Destructive profile merges capture pre-merge state snapshots of both source and target profiles, enabling `unmergeClientProfiles` to cleanly restore independent profiles, appointment histories, intake forms, and card tokens with zero data loss.

---

## F104 — Historical Migration Mapping & Provenance Archive
* **What it is:** Multi-source migration staging engine supporting legacy beauty and wellness platforms (GlossGenius, Vagaro, Boulevard, Mindbody, Fresha, Square Appointments) with column mapping, data validation, and provenance archiving.
* **Key Invariant (Basis: B; WB F08, F34):** **Provenance archive integrity.** Any legacy source field not explicitly mapped to Posie schema (e.g. legacy formula notes, custom client tags, external membership IDs) is never silently discarded. The migration engine archives raw unmapped values in an immutable `provenanceArchive` containing original column names, values, source platform, and migration timestamp. Staging pre-validates data rows, flagging anomalies (missing phones, duplicate emails, unmapped attributes) for resolution before cutover.

---

## F105 — Migration Rehearsal & Live Cutover (Rules BR05, DR04, DR05)
* **What it is:** Pre-cutover rehearsal dry-run engine verifying financial opening balances, active customer obligations, and historical record fidelity before generating an authorized cutover certificate.
* **Key Invariant (Basis: B; WB F09, F38, F39, DR04):** **Active customer obligations reconciliation.** Cutover strictly blocks if unmapped active customer obligations (unredeemed gift card balances or active package series passes) are detected in legacy data rows, unless management explicitly signs off on an approved interim redemption workflow. Archiving a customer liability alone is legally insufficient. Once pre-cutover reconciliation succeeds (verifying total gift card liability, package passes, sample audit records, and zero critical anomalies), Posie issues a tamper-evident `CutoverCertificate` authorizing live cutover.

---

## F106 — Brand Changes Across Surfaces & Historical Lock (Rules BR03, BR05, BR10, DR04)
* **What it is:** Comprehensive design token propagation engine controlling brand identity (logos, color palettes, typography, voice tone) across online booking, customer portals, staff dashboards, SMS/email notifications, and physical print collateral.
* **Key Invariant (Basis: B; WB F01, F32, Rules BR03, BR05, BR10, DR04):** **Draft staging, instant rollback & historical document immutability.** Brand identity changes are prepared in an isolated draft state and tested via live previews before atomic publishing across all surfaces. If an unexpected design clash occurs, studios can instantly revert to previous revisions via one-click rollback. In strict adherence to Rules BR05 and DR04, published brand updates apply only to future views and newly generated documents. Previously issued invoices, receipts, signed treatment consents, and clinical chart exports retain their original baked brand tokens and legal entity details permanently. Multi-location studios can apply localized styling overrides without disturbing parent merchant IDs or legal registrations.

---

## F107 — One Link for a Complete Visit & Express Flow (Smart Visit Hub)
* **What it is:** Unified, resumable client journey link (`posie.com/v/:token`) combining service selection, conditional medical intake questionnaires, versioned e-signatures, deposit payments, appointment itineraries, and post-service aftercare.
* **Key Invariant (Basis: T; HoneyBook / Mangomint pattern; Rules DR04, DR05):** **Step immutability, payment decline isolation & self-checkout.** Completed steps are never repeated. If a card authorization declines, completed medical questionnaires and signed consents remain securely preserved with clear, actionable next steps for payment retry. Includes **Express Pro Booking** (staff reserves a tentative slot and sends the link for client confirmation and card vaulting) and **Self-Checkout on Client Phone** (clients review the ticket, select gratuity, and pay via Apple Pay / Card on their own mobile device, ensuring staff never touch the physical card).

---

## F108 — Automation Recipes with Previews & Safe Dry-Run (WB F43)
* **What it is:** Pre-built and customizable studio engagement recipes (review invitations, early birthday perks, 48-hour clinical aftercare check-ins, 60-day win-back campaigns, and rebooking reminders).
* **Key Invariant (Basis: I; WB F43, Rule F064):** **Transparent dry-run previews & 1-click pause.** Before enabling any automation, Posie runs a rehearsal against historical events and client cohorts. It reveals the exact recipient list, excludes opted-out clients, enforces marketing quiet hours (e.g., 9:00 PM to 8:00 AM local time), applies frequency capping (e.g., maximum 1 marketing message per 14 days), and calculates total estimated carrier messaging costs. Features an emergency pause switch that immediately cancels pending deliveries.

---

## F109 — Unified Client Communication Inbox & Portability (WB F20)
* **What it is:** Consolidated multi-channel inbox unifying two-way SMS, email, and web chat into a single thread per client with team assignment, read receipts, and client history context.
* **Key Invariant (Basis: B; WB F20, Rules F025, F063, F101, DR04):** **Delivery truth, number privacy & attributed communication firewall.** A failed or unverified message is never falsely marked as delivered. Inbound SMS replies are permanently stamped as "Attributed Client Communication" (recording author, contact number, and timestamp) and are strictly firewalled from being silently converted into signed medical SOAP chart findings without practitioner sign-off (Rule F101). Staff communicate via the studio’s verified business phone line, protecting their personal cell numbers with full carrier number portability.

---

## F110 — Business Calling, Voicemail & Staff Routing (WB U19)
* **What it is:** In-app business telephony suite providing studio phone lines, caller ID with instant client profile popups, voicemail-to-text automated transcription, and after-hours call routing.
* **Key Invariant (Basis: B; WB U19, Rules F060, F072, F110, F130):** **Approved recording controls & human escalation truth.** Staff and callers can clearly distinguish recorded, transcribed, and unrecorded calls. Audible two-party recording consent disclosures are strictly enforced before any recording activates. Publishes clear, staffed operating hours (e.g., Mon–Sat 9:00 AM – 7:00 PM) and transparent voicemail callback expectations, strictly prohibiting fraudulent or unstaffed claims of 24/7 live telephone support.

---

## F111 — Message Consent and Delivery System (Rules DR05, DR07, DR10, R03)
* **What it is:** Purpose-specific communication consent engine managing transactional confirmations, promotional campaigns, digital aftercare, carrier sender registration (A2P 10DLC), opt-out enforcement, and monthly SMS budget spend caps.
* **Key Invariant (Basis: Foundation; R03, Rules DR05, DR07, DR10):** **Instant marketing suppression & transactional protection.** Consent is purpose-specific: accepting an appointment or signing a treatment consent never automatically enrolls a client in marketing blasts (Rule DR05). When a client sends "STOP" or revokes marketing consent, promotional sends across all automation flows and broadcast campaigns are instantly suppressed, while critical transactional visit itineraries, reschedules, and receipts remain strictly preserved. Enforces hard monthly SMS budget caps to protect studios from unexpected carrier fees.

---

## F112 — Metric Dictionary and Governed Data Model
* **What it is:** Canonical analytics dictionary defining appointments, service lines, retail products, money, time, and cohorts with transparent source lineage and calculation freshness.
* **Key Invariant (Basis: Foundation; analytics chapter):** **Single Source of Truth & verifiable lineage.** Every screen (executive dashboard, practitioner pay stub, daily drawer close, QuickBooks journal sync) calculates financial and operational metrics from the exact same canonical formulas. Every calculated metric exposes underlying ledger accounts (e.g., Accounts 4000, 4100, 2100, 2300) and UTC freshness timestamps, completely eliminating contradictory totals across studio views.

---

## F113 — Role-Based Dashboards & Renter Privacy Firewall (WB F57, F58)
* **What it is:** Tailored performance and operational cockpits providing appropriate granularity for studio owners, general managers, commission practitioners, and independent booth renters.
* **Key Invariant (Basis: Launch candidate (L); WB F57, F58, Rules F020, F113, F127):** **Independent privacy firewall & non-punitive goals.** Booth renters and commission practitioners can view only their own personal sales, tip earnings, retention rates, and assigned clients. They are strictly firewalled from viewing studio net profit, overhead expenses, or another practitioner's financial earnings or client notes. Features private personal milestone goals and contextual growth trends, intentionally avoiding toxic public staff leaderboards or punitive rankings.

---

## F114 — Retention and Return Cohorts (WB F58)
* **What it is:** Acquisition cohort analytics engine tracking first-to-second visit conversion rates, return intervals, repeat revenue contribution, and cadence-based lapsed client outreach.
* **Key Invariant (Basis: Growth (G); WB F58, Rules F019, F049, F114, F165):** **Same-day repeat filter & immature cohort disclosure.** Same-day add-on services or emergency adjustments never count as repeat visits; retention strictly measures return appointments on distinct calendar dates. Cohorts under 60 days old are explicitly stamped as `immature_in_progress` to prevent premature panic over active return windows. Tracks individualized return cadences (e.g., 28 days for lash refills vs. 45 days for facials) to identify overdue lapsed clients for gentle, proactive rebooking.

---

## F115 — Service Contribution Analysis (Rules R06, R07)
* **What it is:** Unit-level service profitability engine calculating net operational contribution margin (Gross Revenue minus direct backbar supplies, practitioner compensation, and merchant processing fees).
* **Key Invariant (Basis: Growth (G); Rules R06, R07, F143, F152, F177):** **Operational contribution truth & missing cost coverage.** Estimated contribution is strictly labeled as unit operational margin and explicitly disclaims GAAP CPA-audited net profit. If backbar recipes or payment fees are unmapped, the system flags `hasMissingCostCoverage: true` and identifies missing cost inputs. Evaluates third-party discount promotions (e.g. ClassPass off-peak rates) against owner-defined dollar and percentage contribution floors to prevent margin cannibalization.

---

## F116 — Acquisition Attribution Records & Marketplace Defense (WB C9)
* **What it is:** Multi-channel client acquisition origin tracking, fair commission attribution, and dispute resolution module.
* **Key Invariant (Basis: Launch candidate (L); WB C9, Rules F019, F116, F135, DR06):** **Direct link 0% commission defense & auditable dispute override.** Platforms like Fresha and StyleSeat often inappropriately tax existing clients brought by the salon. Posie strictly enforces that imported legacy clients and direct booking link visitors are 0% commission by policy. Only genuine consumer marketplace discoveries incur acquisition fees (e.g. 20%), and owners can dispute/override attribution with a mandatory reason and immutable audit log entry.

---

## F117 — Booking and Product Analytics (WB F57, Rule DR10)
* **What it is:** Granular booking and checkout conversion funnel analysis tracking client progression across discovery, slot selection, intake submission, consent signing, deposit authorization, and final checkout.
* **Key Invariant (Basis: Foundation; WB F57, Rules F057, F117, DR10):** **Idempotent event deduplication & granular drop-off tracking.** Repeated clicks, accidental reloads, and back-button navigations within a single user session are deduplicated by `(sessionId, milestone)` to prevent false conversion drops or inflated top-of-funnel metrics. Tracks stage-by-stage drop-off rates across all 6 stages (`service_viewed` -> `slot_selected` -> `intake_submitted` -> `consent_signed` -> `deposit_authorized` -> `checkout_completed`), flagging stages with drop-offs exceeding 30% for targeted UX optimization.

---

## F118 — Operational Reliability Dashboard & Incident Recovery (WB C6)
* **What it is:** Mission-critical subsystem health monitor, graceful offline degradation coordinator, and payment reconciliation engine.
* **Key Invariant (Basis: Operational; WB C6, Rules F058, F118, DR04):** **Ambiguous payment reconciliation & read-only emergency view.** When external payment hardware or network connections interrupt an in-flight POS transaction, the system enters an ambiguous state. Rather than risking duplicate charges via blind retries, Posie verifies gateway status first before recommending a resolution (`void`, `retry`, or `mark_paid`). In degraded or offline states, practitioners can view today's schedule and clinical allergy alerts via cached local storage.

---

## F119 — Complete Exit Archive & Freedom to Leave (WB C10, Rule DR06)
* **What it is:** 100% self-service, zero-fee comprehensive studio data export generating human-readable offline archives and cryptographically verified raw data.
* **Key Invariant (Basis: Core Trust; WB C10, Rules DR06, F119, F120):** **Zero extortion fee ($0) & standalone offline browsing.** Posie guarantees complete data portability with no fee, waiting period, or required support calls. The export package includes standard CSVs (clients, appointments, formulas, inventory, transactions), an active liabilities ledger (unredeemed gift cards, unused package series), an immutable SHA-256 integrity manifest, and a self-contained offline `index.html` viewer allowing the studio to view their full history forever without an active subscription.

---

## F120 — Phone, Tablet, and Desktop Parity (WB F60 C13, Rule DR08)
* **What it is:** Full responsive parity auditing and touch-optimized workflow engine ensuring solo practitioners can run their entire business from any mobile device.
* **Key Invariant (Basis: Launch candidate (L); WB F60 C13, Rule DR08, WCAG 2.1 AA):** **Solo practitioner 100% workday parity & mobile ergonomic standards.** Solo estheticians and hairstylists are never blocked or forced onto a desktop computer to complete core workday tasks (calendar booking, SOAP note charting, client clinical photo uploads, and card checkout). Audits touch ergonomics (minimum 44x44px touch targets), mobile bottom-sheet drawers instead of desktop modals, and WCAG AA contrast ratios, guaranteeing 100% functional parity across all screen viewports.

---

## F121 — Unified Search and Commands (WB F60)
* **What it is:** Global role-safe omni-search and command palette (`Cmd+K`) across clients, appointments, clinical charts, studio settings, and admin quick actions.
* **Key Invariant (Basis: Launch candidate (L); WB F60, Rules F121, F020, F057):** **Role-Safe Results & Snippet Privacy.** Search never reveals a restricted note or clinical diagnosis through its snippet to an unauthorized role. Receptionists and staff see clinical findings as `[Restricted Clinical / Financial Record Redacted]`, and independent booth renters are firewalled from viewing another practitioner's clients or documents.

---

## F122 — Emergency Day View & Outage Recovery (WB C6)
* **What it is:** Encrypted, locally cached read-only day view of today's appointments, client contact numbers, and clinical safety alerts for offline operation during cloud or internet outages.
* **Key Invariant (Basis: Launch candidate (L); WB C6, Rules F058, F122, DR04):** **No False Offline Confirmation.** "No offline payment or appointment change is implied to be confirmed." Any operation attempted during an outage is recorded as `offline_unconfirmed_queued` with an explicit disclaimer that cloud reconnection and reconciliation are required before the action is confirmed. Features cache age indicators and device controls.

---

## F123 — Public API and Webhooks (WB F67)
* **What it is:** Developer platform providing permission-scoped REST APIs, HMAC-SHA256 cryptographically signed webhooks, exponential backoff retries, and rate limiting.
* **Key Invariant (Basis: Growth (G); WB F67, Rules F123, DR04, DR10):** **Idempotency & Safe Partner Delivery.** Every webhook dispatch carries a unique idempotency key (`evt_...`), API version tag, and HMAC-SHA256 signature header, allowing partners to handle duplicate or out-of-order deliveries safely without duplicate side effects. Tokens are strictly permission-scoped.

---

## F124 — Product Use Per Service & Fractional Backbar (Mangomint, Rules R06, R07)
* **What it is:** Fractional backbar inventory tracking, formula version history, digital scale measurements, and residual mixing bowl waste accounting.
* **Key Invariant (Basis: Growth (G); Rules R06, R07, F124):** **Consistent Unit Conversions & Unmeasured Estimate Transparency.** Converts consistently across metric (ml, g) and US customary (fl oz, oz) units. Any usage not weighed on a verified scale is explicitly stamped `estimated_formula_default` rather than falsely claiming physical measurement. Residual bowl waste is tracked distinctly from consumed volume to protect true service contribution margins.

---

## F125 — Lots Expiry and Stock Forecasts (WB F46, F47, F150)
* **What it is:** Batch/lot tracking, manufacturer expiration management, Period After Opening (PAO) open-container degradation monitoring, and appointment-driven stock consumption forecasting.
* **Key Invariant (Basis: Growth (G); WB F46, F47, F150, Rules F125, F042):** **Definite Shortage Truth & Lot Expiry Safety.** Alerts strictly distinguish definite scheduled shortages (confirmed appointments requiring SKU X where current unexpired stock < committed units) from speculative estimates with unknown usage rates. Products exceeding PAO or manufacturer expiration dates are automatically quarantined from clinical selection.

---

## F126 — Service Readiness Rules (WB F42, F43)
* **What it is:** Multi-factor readiness verification engine checking intake forms, patch test observations, staff certifications, equipment calibration, and product stock prior to appointment check-in.
* **Key Invariant (Basis: Technical/Clinical (T); Gingr pattern, WB F42, F43, Rules F126, F042):** **Professionally Approved Rules & Clinical Routing.** "Missing information routes to review rather than an automated diagnosis." The system never makes blanket automated medical eligibility decisions. Missing clinical safety requirements route to a practitioner review task with a mandatory documented override audit trail (reason, timestamp, and practitioner ID).

---

## F127 — Business Anomaly Explanations (WB F58, WB F88)
* **What it is:** Operational diagnostic engine flagging unusual booking drops, empty calendar gap spikes, payment decline surges, and merchant fee rate drifts with root-cause attribution.
* **Key Invariant (Basis: Growth (G); WB F58, Rules F127, F020, F113):** **Governed Metrics & Low-Sample Suppression.** "Low sample sizes and missing data suppress overconfident alerts." When observation counts fall below statistical validity thresholds (e.g. fewer than 15 baseline appointments), alerts are automatically suppressed as `insufficient_sample_size` to prevent alarm fatigue and panic over normal small-business variance.

---

## F128 — Guardian and Authorized Payer Roles (Rules DR04, DR05, F100)
* **What it is:** Multi-party identity engine separating the client receiving treatment, legal guardians (for minors/dependents), third-party payers, and itinerary update recipients.
* **Key Invariant (Basis: Core Trust; Rules DR04, DR05, F100, F128):** **Payer Separation from Clinical Records.** "Paying for an appointment alone never grants access to private notes or images." Third-party payers (parents, spouses, employers) receive billing invoices and receipts ONLY. They are strictly firewalled from viewing confidential intake questionnaires, clinical SOAP notes, or before/after photography without explicit signed authorization from the client.

---

## F129 — Documented Care Summaries (D10, D11)
* **What it is:** Client-friendly aesthetic visit report card generator including practitioner-approved products used, clinical observations, home-care regimen next steps, and consented photography.
* **Key Invariant (Basis: Technical/Clinical (T); Gingr report cards, D10, D11, Rule F129):** **Signed Record & Professional Traceability.** Staff approve the summary and can trace every statement to its source. AI/dictation drafts remain strictly unfinalized until reviewed and approved by the responsible practitioner. Photos lacking explicit client media publication consent are automatically filtered out.

---

## F130 — Assisted Support Sessions (WB F60, Rules SEC, OPS)
* **What it is:** Time-bounded, permission-scoped support delegation console allowing Posie support engineers to inspect specific configuration issues while strictly masked from sensitive data.
* **Key Invariant (Basis: Operational (I); WB F60, Rules SEC, OPS, F130):** **Scope Restriction & Secret Shielding.** Support cannot see payment secrets or private records outside the granted scope. Payment card details (PAN/CVC), gateway secret keys, client clinical SOAP charts, and staff personal compensation are strictly masked. All sessions have an owner 1-click instant kill switch and a maximum 2-hour hard cap.

---

## F131 — Payroll Ready Exports (WB F55)
* **What it is:** Provider-ready compensation export compiling approved timecards, service commissions, tip splits, product commissions, and forward clawbacks into standardized payroll files (Gusto, ADP, Rippling).
* **Key Invariant (Basis: Checkout / Payroll Foundation; WB F55, Rules F131, F097):** **Pay Rules & Period Locks.** "Every amount ties to a service, time record or approved correction." Once a pay period is approved and closed, underlying line items and time punch records are locked against backdated modifications. Retroactive changes generate an auditable forward adjustment in the next open pay period. An exception ledger flags missing employee IDs, unmapped tax IDs, and negative balances before payroll transmission.

---

## F132 — Tax and Receipt Configuration
* **What it is:** Location-based, effective-dated sales tax engine handling multi-jurisdiction tax rates (state, county, city) and category-specific taxability (services vs retail products).
* **Key Invariant (Basis: Checkout Foundation; Launch candidate (L); Rules F132, F099):** **Effective-Dated Tax Rules & Revenue Separation.** "Tax changes are effective-dated and separately reported from business revenue." Tax liability collected is credited strictly to Liability Account 2200 (Sales Tax Payable) and is never co-mingled with gross business revenue. Historical closed receipts and invoices retain their exact effective-dated tax rates.

---

## F133 — Integration Connection Center (WB F67)
* **What it is:** Central integration cockpit exposing connection health, authorized OAuth scopes, synchronization freshness, and retry queues for external services (QuickBooks Online, Stripe Terminal, Twilio SMS, Google Calendar, Zapier).
* **Key Invariant (Basis: Growth (G); WB F67, Rules F133, F123):** **Delayed Data Impact Disclosure.** "A disconnected integration shows what data may be delayed." When an integration is disconnected or its token expires, the system explicitly warns what external dashboards (e.g. QuickBooks journal entries or Twilio transactional SMS) are currently lagging, eliminating silent integration failures.

---

## F134 — Approvals for Consequential Changes (Rules SEC, LEG)
* **What it is:** Blast-radius preview engine and multi-party approval gate for high-impact actions: bulk SMS broadcasts, large financial refunds (>$150), full studio data exports, and catalog price changes.
* **Key Invariant (Basis: Growth (G); Trustworthy Automation, Rules SEC, LEG, F134):** **Blast-Radius Transparency & Audit Approval.** "Approvers see the exact affected records and any cost before accepting." Posie computes an immutable dry-run preview displaying the total affected clients, financial dollar exposure, and risk severity, requiring authorized manager sign-off with recorded rationale before execution.

---

## F135 — Supported Wallet and Online Payment Methods (WB F30)
* **What it is:** Modern digital wallet configuration supporting Apple Pay, Google Pay, Link by Stripe, and interest-free BNPL (Klarna/Afterpay) across web booking and in-person POS.
* **Key Invariant (Basis: Growth (G); WB F30, Payment Foundation):** **Transparent Fee & Device Capability Disclosure.** "Supported methods and fees are disclosed per country and device." The checkout engine detects hardware/browser capabilities (activating Apple Pay on Safari/iOS and Google Pay on Chrome/Android) and itemizes processing fees transparently. All credentials flow through hosted tokenization fields, maintaining strict PCI DSS SAQ A compliance.

---

## F136 — Transparent Waitlist Priorities (WB F81)
* **What it is:** Fair recovery waitlist engine matching clients to last-minute openings based on explicit preferences (service, practitioner, notice window, and time flexibility).
* **Key Invariant (Basis: Growth (G); Fair Recovery Design, WB F81, Rule F136):** **Objective Prioritization & Anti-Double-Booking.** "Prioritization never uses inferred health, wealth or protected characteristics." Prioritization rules are strictly objective and studio-configured. Openings issue an exclusive timed claim offer (e.g. 15-minute countdown) to prevent two clients from double-booking the same slot.

---

## F137 — Intake and Note OCR Assistance (WB F148)
* **What it is:** Document OCR digitization engine extracting structured draft fields from paper intake questionnaires, handwritten SOAP notes, and product labels with per-field confidence scoring.
* **Key Invariant (Basis: Growth (G); Document Processing & Privacy, WB F148, Rule F137):** **Human-in-the-Loop & Provenance Lock.** "A human confirms identity and sensitive fields before they become records." Extracted fields remain uncommitted drafts until verified by a qualified staff member. Medically sensitive items (allergies, medications) and any extraction with confidence <90% trigger a mandatory triage review flag.

---

## F138 — Business Branded Mobile App (WB F62)
* **What it is:** Dedicated client mobile application (iOS, Android, PWA) reflecting the studio's custom visual branding, app icon, custom domain links, and push notification itineraries.
* **Key Invariant (Basis: Expansion (X); WB F62, Rule F138):** **Delivered Experience Parity & Security Exit.** "Each supported app receives security updates and has an exit plan." The branded app experience matches web booking capabilities with biometric authentication and an instant $0 client record export exit guarantee (Rule DR06) without hidden platform convenience fees.

---

## F139 — Multi Location Operations (WB F59)
* **What it is:** Enterprise coordination engine managing multi-studio ateliers with shared service catalogs, location-specific tax/pricing autonomy, cross-location gift card/series redemption, and consolidated reporting.
* **Key Invariant (Basis: Expansion (X); WB F59, Rule F139):** **Consolidation Truth & Unique Client Deduplication.** "Location consolidation avoids double-counting shared clients." Clients who book services across multiple locations are deduplicated by canonical identity in enterprise reporting, measuring true client reach and cross-visitation rates without inflating numbers.

---

## F140 — Booth Renter Merchant Separation (WB F37)
* **What it is:** Independent merchant architecture supporting 1099 booth and chair renters with dedicated Stripe Connect merchant accounts, direct destination transfers, and firewalled client databases.
* **Key Invariant (Basis: Expansion (X); WB F37, Legal Entity & Merchant Separation, Rule F140):** **Legal Entity Autonomy & Zero Co-Mingling.** "Shared checkout does not mix legal ownership or bank balances." Customer payments for booth renter treatments route directly to the renter's designated merchant account via destination splits (minus agreed facility fees). The salon owner never co-mingles or holds renter funds, and renter client lists remain firewalled from salon management.

---

## F141 — Embedded Payroll (WB F55, R05)
* **What it is:** Integrated payroll execution run directly through approved embedded payroll partners (e.g. Gusto Embedded, Check HQ), encompassing multi-state tax filings, direct deposit disbursements, statutory tax calculations (FICA, Medicare, federal/state withholdings), tip distributions, and accountable retroactive corrections.
* **Key Invariant (Basis: Expansion (X); PART FIN LEG OPS, WB F55, Rule F141):** **Accountable Filing Signatures & Provider-Ready Precedence.** "Filing failures, corrections and employee inquiries have accountable owners. Provider-ready export precedes embedded payroll; do not build tax filing from scratch." Every payroll run requires a named studio approver signature and client IP address. Retroactive adjustments or corrections maintain an immutable audit trail and trigger partner filing synchronization flags to guarantee state and federal tax reporting integrity.

---

## F142 — Offline Operational Changes (WB F60, Outage Continuity)
* **What it is:** Resilient local-first offline queueing engine enabling salon operations to proceed uninterrupted during network or internet outages, supporting client check-ins, service completions, deferred payment capture tokens, and intake signatures.
* **Key Invariant (Basis: Expansion (X); SEC PAY OPS, WB F60, Rule F142):** **No Double-Billing & Transparent Conflict Triage.** "Local encryption and server state machine. Reconnection cannot double-charge or silently lose a booking." High-risk destructive mutations (arbitrary refunds, calendar deletions, bank account updates) are strictly forbidden while offline. Upon reconnection, actions are reconciled against authoritative server snapshots; any appointment cancelled remotely while offline triggers a non-destructive conflict flag requiring explicit staff triage.

---

## F143 — Schedule Optimization (WB F20, F143, F151)
* **What it is:** Algorithmic schedule compacting and quality-of-life planning engine that consolidates awkward fragmented gaps (15–30 min dead zones) and actively facilitates practitioner lifestyle goals (such as protecting Fridays off or enforcing maximum daily working spans) while strictly monitoring weekly contribution revenue floors.
* **Key Invariant (Basis: Expansion (X); DATA UX, WB F20, F143, Rule F143):** **Tradeoff Transparency & Practitioner Consent.** "Suggestions expose tradeoffs and require approval." Optimization proposals never silently alter client appointments. Each suggestion clearly displays disruption risk, shift delta in minutes, and client flexibility constraints, requiring practitioner authorization before mutating calendar reservations.

---

## F144 — Mobile Service Routes (WB F44, D22)
* **What it is:** Route planning, travel fee calculation, and itinerary dispatch engine designed for mobile and on-location beauty professionals (bridal events, home care, pop-ups), incorporating geographic radius tiers, setup/teardown buffers, and automated traffic alerts.
* **Key Invariant (Basis: Expansion (X); PART, WB F44, Rule F144):** **Transparent Travel Pricing & Honest Traffic Alerts.** "Route estimates cannot override client commitments without approval." Travel fees explicitly separate flat dispatch fees from per-mile surcharges outside complimentary service zones. Real-time traffic delays exceeding 5 minutes trigger courteous, automated client notifications with revised arrival windows and practitioner ETA updates.

---

## F145 — Constrained AI Receptionist (WB F64, AI Receptionist)
* **What it is:** Strictly governed conversational voice and text assistant for incoming studio phone calls and messages, handling verified business inquiries (opening hours, address, parking, pricing) and permitted booking tasks with caller identity verification and immediate human handoff.
* **Key Invariant (Basis: Growth (G); AI MSG OPS, WB F64, SQUIRE / Zenoti Parity, Rule F145):** **Zero-Hallucination Guardrails & Critical Safety Escalation.** "Unknown prices or policies trigger clarification rather than invention. Differentiate reliability and truthful handoff." The assistant is strictly constrained to the studio's verified knowledge base and pricing catalog. Any query involving medical contraindications, allergic reactions, retinol sensitivity, or clinical conditions immediately escalates to urgent staff triage with an unedited conversation transcript. Booking actions under registered profiles require OTP verification.

---

## F146 — Reliable Booking Across Channels (WB F64, Channel Completeness)
* **What it is:** Unified omnichannel booking and modification engine synchronizing in-progress reservations across Voice AI, interactive SMS, native mobile apps, and web booking portals.
* **Key Invariant (Basis: Expansion (X); AI MSG SEC, WB F64, Rule F146):** **Single Reservation Identity & Zero-Duplicate Guarantee.** "Shared action tools, channel identity and confirmation rules. Channel switching does not create another booking." Clients can initiate an inquiry via phone, transition seamlessly to an SMS secure confirmation link, and reschedule on the web portal without spawning duplicate reservations or ghost bookings. Every state transition produces an immutable, visible action receipt with idempotency enforcement.

---

## F147 — Assistant That Acts in Current Screen (WB F65)
* **What it is:** Context-aware operator assistant embedded inside practitioner workflows (day calendar, client profiles, checkout tickets, SOAP charts) capable of inspecting the active on-screen record and safely drafting proposed actions.
* **Key Invariant (Basis: Growth (G); AI SEC, WB F65, Rule F147):** **Role-Based Scope & Consequential Change Diff Confirmation.** "Role-aware context and action logs. Unsupported actions are declined and consequential edits require confirmation." Actions altering finances (courtesy discounts), schedule slots, or patient medical histories require explicit human confirmation of a structured before/after diff. Out-of-scope actions or actions attempted by unauthorized roles (e.g. front-desk applying discounts) are cleanly declined.

---

## F148 — Draft Notes from Dictation (WB F66)
* **What it is:** Hands-free clinical dictation transcription engine transforming consented audio recordings into structured SOAP treatment note drafts (Subjective, Objective, Assessment, Plan) with time-stamped audio provenance.
* **Key Invariant (Basis: Expansion (X); AI CLIN SEC, WB F66, Rule F148):** **Phonetic Medical Triage & Licensed Practitioner Locking.** "The professional signs the note; uncertain terms remain flagged." AI drafts stay uncommitted in draft status. Phonetically ambiguous or clinical terms (erythema, tretinoin, hyaluronic, keloid) are highlighted with triage flags. The licensed practitioner must review, edit, and append their verified professional license number and signature before the chart becomes an immutable clinical record.

---

## F149 — Ask Questions of Business Data (WB F65)
* **What it is:** Governed natural-language analytics query engine answering questions about studio performance using standardized metric definitions (F111 Metric Dictionary) and declared dimensional filters.
* **Key Invariant (Basis: Growth (G); AI DATA, WB F65, Rule F149):** **Governed Metric Precedence & Truthful Insufficient Data Reporting.** "Metric layer and evaluation set. The answer reproduces a saved report or clearly says data are insufficient." Operates without raw, unrestricted SQL execution. If the sample size is below verified thresholds (e.g. <5 transactions), the engine explicitly reports insufficient data rather than interpolating or hallucinating business numbers. Every response links to a reproducible saved report.

---

## F150 — Forecast Demand and Staffing (WB F150)
* **What it is:** Predictive operations and staffing engine estimating future appointment demand, chair capacity utilization, cancellation risk exposure, and recommended labor hours.
* **Key Invariant (Basis: Expansion (X); DATA, WB F150, Rule F150):** **Empirical Uncertainty Intervals & Cold-Start Graceful Degradation.** "Sufficient history and monitoring. Forecasts are evaluated on future periods and degrade gracefully for new businesses." Every projection outputs explicit statistical uncertainty intervals (80% confidence bounds) alongside simple 4-week historical moving averages. For new ateliers or services with <4 weeks of history, the model flags limited data and gracefully widens confidence bounds to prevent overstaffing or understaffing.

---

## F151 — What-If Business Planning (WB F151, F020, F143)
* **What it is:** Interactive strategic planning engine allowing salon owners to rehearse the financial and workload impacts of schedule adjustments, pricing changes, service mix shifts, or staffing additions.
* **Key Invariant (Basis: Growth (G); DATA FIN, WB F151, Rule F151):** **Ground-Truth Costs & Contribution Floor Safeguards.** "Trusted historical costs and explicit owner-entered assumptions; scenarios never become actual forecasts without validation." Enables owners to set protected lifestyle time off (e.g. 4-day work week or 32 hours maximum) while evaluating whether net direct contribution meets or exceeds their mandatory weekly contribution floor.

---

## F152 — Measured Growth Experiments (WB F152, F117, F082)
* **What it is:** Rigorous A/B testing and randomized holdout experiment engine for salon rebooking promotions, off-peak pricing incentives, and client win-back campaigns.
* **Key Invariant (Basis: Growth (G); DATA MSG, WB F152, Rule F152):** **Randomized Holdout Verification & Margin Cannibalization Guards.** "Results distinguish causal tests from simple before-and-after trends." Automatically partitions eligible clients into treatment and holdout control cohorts (e.g. 50/50 split), isolating true causal conversion uplift from natural demand trends while monitoring client opt-out rates and net contribution dollars to prevent profit erosion. Requires verified owner authorization before launching.

---

## F153 — Cancellation Policy Simulator (WB F153, F108, F127)
* **What it is:** Predictive policy rehearsal simulator modeling the delicate tradeoff between upfront booking deposit friction, funnel checkout completion rates, cancellation frequencies, and recovered contribution dollars.
* **Key Invariant (Basis: Expansion (X); DATA LEG, WB F153, Rule F153):** **Blast-Radius Rehearsal & Conversion-vs-Recovery Modeling.** "Historical funnel and financial data. Policy changes are approved and effects are measured after rollout." Generates empirical impact projections across conversion friction vs uncollected no-show recoveries (e.g. $30 fixed deposit vs 100% full prepay) before policies are published to clients, protecting studios from unintended booking drops.

---

## F154 — Service Match Assistant (WB F154, F022)
* **What it is:** Conversational service navigation assistant matching client goals, hair/skin types, budget ranges, and time availability to suitable treatments from the studio's verified active service catalog.
* **Key Invariant (Basis: Expansion (X); AI CLIN, WB F154, Rule F154):** **Strict Clinical Guardrails & Practitioner Referral.** "Medical questions or ambiguous eligibility are referred to a qualified professional." The engine strictly adheres to approved catalog treatments with transparent pricing. Any mention of active clinical contraindications, retinol burns, severe eczema flares, or medical conditions hard-stops automated service matching and directs the guest to a licensed practitioner consultation.

---

## F155 — Purchasing Recommendations (WB F155, F047, F125)
* **What it is:** Inventory procurement recommendation engine analyzing stock on hand, committed appointment allocations, supplier lead times, and owner budget caps to calculate optimal reorder quantities.
* **Key Invariant (Basis: Expansion (X); DATA OPS PART, WB F155, Rule F155):** **Demand-Aware Replenishment & Authorized Buyer Signoff.** "The owner approves costs and substitutions before ordering." Reorder models incorporate minimum order quantities (MOQ) and case pack constraints. Generating recommendations or draft purchase orders never automatically spends salon funds or transmits orders until an authorized buyer explicitly reviews and signs the purchase order.

---

## F156 — Expert Template Marketplace (WB F156)
* **What it is:** Vetted community and expert marketplace where licensed aesthetic clinicians, legal counsel, and certified salon designers publish, version, and license intake forms, chart layouts, and aftercare templates.
* **Key Invariant (Basis: Expansion (X); DATA CLIN LEG, WB F156, Rule F156):** **Qualified Reviewer Credentials & Prohibited Universal Compliance Claims.** "Templates carry jurisdiction, version, author credentials, and qualified reviewer credentials; universal 'compliant' badges are prohibited." Clinical and legal intake templates mandate explicit jurisdiction (e.g. `US-CA`), qualified professional credentials (license or bar number), and semantic versions. Studios adopting templates receive automated update detection notifications when authoring specialists release newer revisions.

---

## F157 — Client-Controlled Care Passport (WB F157)
* **What it is:** Client-sovereign portable treatment record allowing guests to securely store and share patch test clearances, chemical peel / hair color formulations, and clinical treatment histories with independent specialists across different studios.
* **Key Invariant (Basis: Trust (T); DATA PRIV, WB F157, Rule F157):** **Time-Limited Granular Grants & Instant Client Revocation.** "Client controls grant scope and expiry; businesses access records only under an active grant; revocation is immediate." External studios cannot browse client records without a cryptographically scoped, time-limited token. Clients retain absolute kill-switch authority to terminate active access grants at any instant.

---

## F158 — Practitioner Relocation Workflow (WB F158, F037, F140)
* **What it is:** Governed practitioner transition system ensuring orderly, lawful relocations while maintaining strict distinction between 1099 independent contractor customer books and W-2 employer-owned client lists.
* **Key Invariant (Basis: Expansion (X); DATA LEG PRIV, WB F158, Rule F158):** **Statutory Contract Classification & Professional Continuity of Care.** "Contractual terms govern client contact export rights; W-2 client lists remain business property unless an explicit non-solicitation waiver is signed; departure notices maintain continuity of care." Independent 1099 booth renters can export their client contacts and formulas. For W-2 departures, export access is locked unless authorized by salon management, while ensuring clients receive neutral, professional continuity-of-care notices.

---

## F159 — Recovery Operations and Security Assurance (WB F159)
* **What it is:** Automated disaster recovery orchestration and continuous security governance engine maintaining encrypted system snapshots, verifying data integrity digests, and conducting simulated restore drills.
* **Key Invariant (Basis: Trust (T); DATA SEC OPS, WB F159, Rule F159):** **RTO <= 15m / RPO <= 5m Verification & Automated Token Pruning.** "Automated restore drills verify recovery time objectives (RTO <= 15m) and recovery point objectives (RPO <= 5m); access tokens are continuously reviewed and expired credentials pruned." Snapshots carry SHA-256 cryptographic digests. Automated recovery drills simulate point-in-time restores to confirm zero data corruption across appointments, gift card balances, and financial ledgers.

---

## F160 — Enterprise Administration (WB F160, F139)
* **What it is:** Enterprise multi-location identity and security administration console featuring SAML 2.0 / OpenID Connect Single Sign-On (SSO), automated SCIM user provisioning/deprovisioning, and cryptographically verifiable audit logging.
* **Key Invariant (Basis: Trust (T); DATA SEC ENT, WB F160, Rule F160):** **SCIM Instant Session Kill & Scoped RBAC Delegation.** "Automated SCIM deprovisioning instantly invalidates enterprise credentials and terminates all active sessions across all locations; role delegations are location-scoped with verifiable audit exports." Deprovisioning an employee via SCIM immediately kills active session tokens across all studio branches in real time.

---

## F161 — Medical Practice Records and Signoff (WB F161, WB F26, WB F27, Rule F161)
* **What it is:** Regulated medical aesthetics and clinical charting suite providing structured medical observations, mid-level practitioner delegation, medical director supervisory reviews, and governed clinical record access.
* **Key Invariant (Basis: Expansion (X); CLIN LEG SEC, WB F161, Rule F161, Table 67/68):** **Medical Director Supervision & Governed Clinical Access.** "Structured charts, clinician review, medical director workflow and governed clinical record access." Distinguishes spa treatment notes from regulated EMR charts. High-risk medical aesthetics (neurotoxins, medical peels, lasers) performed by mid-level practitioners (RNs, PAs) mandate physician medical director review before final locking. Non-clinical front-desk staff are denied chart access with tamper-evident audit logging; amendments preserve prior notes and clinical justifications without overwriting historical data.

---

## F162 — Training and Qualification Records (WB F162, Table 79, Row 28)
* **What it is:** Practitioner credential governance and service readiness manager tracking professional licenses, modality certifications, laser safety credentials, and expiration timelines.
* **Key Invariant (Basis: Expansion (X); CLIN OPS, WB F162, Rule F162, Table 79):** **Prerequisite Enforcement & Automated Scheduling Blocks.** "Track certificates, expiration dates, equipment training and authorized services for staff; expired credentials trigger review, without claiming to certify legal competence." Blocks booking assignments and service execution when prerequisite qualifications expire or lapse, alerting management 30 days prior while strictly isolating personnel qualification records from renter commercial terms and client histories.

---

## F163 — Distributor and Scale Integrations (WB F163, D21, Table 81)
* **What it is:** Precision hardware scale and supplier catalog integration linking Bluetooth/USB dispensing scales and distributor inventory feeds to appointment service costing.
* **Key Invariant (Basis: Expansion (X); PART OPS, WB F163, Rule F163, Table 81):** **Gram-Level Precision Costing & Non-Fabricating Disconnect Fallbacks.** "Connect approved suppliers, inventory feeds and supported weighing devices to receiving and service costing; disconnects preserve manual operation and never fabricate stock counts." Smart scales capture actual grams dispensed (hair color, developer, toner), identifying backbar waste against baseline formulas. Distributor catalog disconnects gracefully allow manual data entry without ever guessing or synthesizing inventory counts. Generating purchase orders never places orders without authorized buyer signoff.

---

## F164 — Staff Coverage Exchanges (WB F164, Table 90, Table 105)
* **What it is:** Governed shift coverage and peer replacement exchange allowing practitioners to offer shifts to qualified internal colleagues or vetted substitute providers.
* **Key Invariant (Basis: Expansion (X); LEG OPS NET, WB F164, Rule F164, Table 105):** **Qualification Matching & Assignment-Limited Access Isolation.** "Invite qualified internal or approved substitute staff to cover a shift with access limited to that assignment; coverage does not expose the full client database to a substitute." Substitutes must hold active credentials matching the scheduled appointments. Accepted coverage strictly limits the substitute's visibility to the clients and timing on that specific shift, firewalling the rest of the studio's client book, unassigned appointments, and financial reports.

---

## F165 — Explainable Return Likelihood (WB F165, Table 90, Table 110, Row 18)
* **What it is:** Transparent, cadence-driven client retention engine identifying lapsed or rebooking candidates based on verified historical visit intervals and explicit scheduling preferences.
* **Key Invariant (Basis: Expansion (X); DATA LEG, WB F165, Rule F165, Table 110):** **Transparent Cadence Ranking & Absolute Opt-Out Respect.** "Rank optional outreach candidates using prior visit cadence and explicit preferences, with reasons and opt-outs; no sensitive characteristics or opaque client value labels are exposed." Analyzes visit intervals and preferred appointment days without black-box scores, opaque tiers, or demographic proxies. Clients with active marketing or rebooking opt-outs are strictly suppressed from outreach queues.

---

## F166 — Brand Design Assistant (WB F166, BR01, BR02, BR04, BR06)
* **What it is:** AI-assisted and curated aesthetic brand styling suite providing mood presets, accessible typography pairings, WCAG 2.1 AA contrast validation, and voice rewrites with strict factual guardrails.
* **Key Invariant (Basis: Growth (G); AI DES UX, WB F166, BR01, BR04, BR06):** **Accessibility Ratios & Protected Factual Boundaries.** "Suggest typography, layout and tone from owner-provided assets, then preview across approved templates; outputs meet accessibility checks and require owner publication." Enforces WCAG 2.1 AA contrast requirements (minimum 4.5:1 for body copy). Tone and vocabulary rewriting strictly preserves dates, prices, cancellation policies, and required clinical disclosures verbatim.

---

## F167 — Country Specific Operations (WB F167, Table 90)
* **What it is:** International expansion configuration manager adding statutory tax models (sales tax, GST/HST, VAT inclusive/exclusive), local currencies, payment rails, and country-specific invoicing metadata.
* **Key Invariant (Basis: Expansion (X); LEG FIN LANG PART, WB F167, Table 90):** **Deterministic Tax Regimes & Mandatory Statutory Fields.** "Add local currencies, tax, messaging, payment and record requirements market by market; every supported country's operating and support processes are owned." Taxes follow statutory conventions (e.g., UK VAT is tax-inclusive; US sales tax is tax-exclusive). Invoices mandate jurisdiction-specific compliance fields (e.g., VAT registration numbers, CRA business numbers).

---

## F168 — Bridal and Event Workspace (WB F168, D22, Table 82)
* **What it is:** Multi-client event and bridal party coordination workspace managing complex party timelines, artist assistants, travel buffers, and staged payment schedules.
* **Key Invariant (Basis: Expansion (X); LEG PART, WB F168, Rule F168, Table 82):** **Multi-Tier Milestone Retainers & Individual Health Privacy.** "Coordinate multiple clients, trials, shared timelines, contracts, travel, assistants and staged payments; individual privacy survives shared event administration." Organizes multi-guest schedules with milestone payments (25% retainer, 50% milestone, 25% day-of balance). While the organizer approves commercial terms and pays invoices, sensitive individual medical/allergy notes remain strictly confidential and outside shared group packets.

---

## F169 — Safe Bulk Change Planning (WB F169, Table 51, BR10)
* **What it is:** Impact simulation and consequence preview engine modeling the blast radius of proposed catalog pricing, duration, and policy modifications across upcoming appointments.
* **Key Invariant (Basis: Expansion (X); CORE SEC, WB F169, Rule F169, Table 51):** **Dependency Blast Radius Preview & 1-Click Rollback Guarantees.** "Preview every appointment, price, consent and message affected by a proposed rule or catalog change; dependency model and snapshots; owner approval commits one version with a recoverable change log." Previews impacted appointments and revenue deltas before committing. Prior state snapshots ensure immediate 1-click reversal without altering settled financial ledgers or historical records.

---

## F170 — Late Running Recovery (WB F170, Table 90)
* **What it is:** Real-time appointment overrun mitigation and guest recovery suite calculating downstream schedule impact, absorbing buffer intervals, and dispatching staff-approved realistic arrival updates.
* **Key Invariant (Basis: Expansion (X); DATA MSG, WB F170, Rule F170, Table 90):** **Buffer Absorption & Staff-Approved Transparent Updates.** "When a visit overruns, suggest limited schedule changes and send approved, realistic arrival updates; staff approve changes and clients can request alternatives." Automatically calculates net downstream delays while absorbing available buffer intervals. Arrival notices require staff signoff, offering guests clear options: accept adjusted time, reschedule with late fee waived, or switch to an available peer provider.

---

## F171 — Shared Room and Equipment Rentals (WB F171, Table 90, Table 105)
* **What it is:** Capacity sharing and short-term facility rental suite allowing verified independent practitioners to reserve treatment rooms, laser suites, and styling stations.
* **Key Invariant (Basis: Expansion (X); NET LEG PAY, WB F171, Rule F171, Table 90):** **Practitioner Eligibility & Segregated Damage Escrows.** "Allow approved businesses to reserve available facilities with eligibility, deposits and damage reporting; resource calendar, contracts and independent merchant model; every booking has a responsible operator." Verifies professional licenses and active liability insurance before booking. Security deposits remain strictly segregated from rental fees on distinct ledgers, with mandatory check-in/check-out photo condition checklists and deposit withholding for verified damage.

---

## F172 — Business Continuity Handover (WB F172, Table 90)
* **What it is:** Emergency contingency handover manager preparing authorized temporary cover packs for solo practitioners or studio owners during sudden medical leave or emergencies.
* **Key Invariant (Basis: Expansion (X); OPS LEG SEC, WB F172, Rule F172, Table 90):** **Role-Limited Temporary Delegation & Banking Firewalls.** "Prepare an authorized temporary cover pack for illness or emergency, including clients to contact and unresolved work; role-limited access and contingency contacts; the owner controls activation and records every access." The designated proxy receives temporary, emergency access strictly limited to imminent appointments, client contacts, and open work. Banking credentials, merchant payout accounts, and business equity remain strictly firewalled.

---

## F173 — Action Based Analytics Workspace (WB F173, Table 90, Table 108/109)
* **What it is:** Analytics-to-action engine transforming observed metric deviations into previewable schedule consolidation, rebooking outreach, or operational proposals.
* **Key Invariant (Basis: Growth (G); DATA AI, WB F173, Rule F173, Table 90):** **Truthful Outcome Reporting & Explicit Action Dismissal.** "Turn a validated finding into a previewable task, campaign or schedule proposal; report observed outcomes separately from estimated time saved; claim incremental benefit only with a valid comparison." Each recommendation displays underlying metric evidence, estimated operational costs, and an explicit dismissal option. Verified actual financial gains are strictly separated from speculative "time saved" estimates.

---

## F174 — Electronic Prescribing (WB F174, Table 91, Table 108)
* **What it is:** Regulated electronic prescription suite for aesthetic medical treatments (e.g. compounded topical BLT anesthetics, post-procedure prophylactics) integrating prescriber credential verification and pharmacy transmission.
* **Key Invariant (Basis: Expansion (X); CLIN LEG PART SEC, WB F174, Rule F174, Table 91):** **Prescriber Verification & Allergy Contraindication Gates.** "Integrate a certified prescribing provider with prescriber verification and the required medical workflow; operate only within validated clinical scope." Validates prescriber NPI, DEA, and state medical licenses. Automatically cross-references patient allergy profiles before routing orders to certified compounding pharmacies; software never substitutes for independent medical judgment.

---

## F175 — Clinical Telehealth Network (WB F175, Table 91, Table 105)
* **What it is:** Telemedicine clinician network and good-faith medical clearance consultation suite for elective aesthetic and wellness procedures.
* **Key Invariant (Basis: Expansion (X); NET CLIN LEG OPS, WB F175, Rule F175, Table 91):** **Strict State Licensure Matching & Immediate Clinical Escalation.** "Recruit and credential clinicians for permitted consultations with clear responsibility and escalation; availability and coverage are verified before sale." Matches patients exclusively with clinicians credentialed and licensed in the patient's physical state. Contraindications or acute red flags (e.g. active infection, pregnancy) trigger immediate clearance deferrals or structured escalation packets to in-person emergency care.

---

## F176 — Insurance Billing (WB F176, Table 91)
* **What it is:** Electronic healthcare claims processing (CMS-1500 / 837P format), eligibility verification (270/271), and electronic remittance reconciliation (ERA 835) for covered aesthetic and therapeutic procedures.
* **Key Invariant (Basis: Expansion (X); CLIN FIN PART, WB F176, Table 91):** **Remittance Reconciliation & Accountable Denial Ownership.** "Support eligibility, claims and remittance only for legitimate covered services and qualified providers; claims reconcile to remittances and denials have owners." Requires verified rendering provider NPI, taxonomy, and pre-verified insurance eligibility. Adjudicated claims reconcile strictly to remittance advice files, and denied claims mandate an assigned billing specialist owner with explicit corrective appeal tracking.

---

## F177 — Consumer Discovery Marketplace (WB F177, WB F61, WB F63, Table 91)
* **What it is:** Opt-in consumer discovery marketplace attracting local clientele while strictly preserving provider autonomy and zero-commission client ownership.
* **Key Invariant (Basis: Validate separately (V); NET OPS DATA, WB F177, Rule F177, Table 91):** **Opt-In Autonomy & Protected Client Attribution.** "Attract clients and providers in a local market, with opt-in listings, transparent attribution and dispute handling; a provider can use direct booking without buying marketplace distribution." Direct salon booking links, QR codes, and existing salon clients incur 0% marketplace commission. Only genuine net-new discovery incurs explicit commission (e.g. 15%), and salons retain auditable evidence dispute rights without competitor ad poaching.

---

## F178 — Embedded Working Capital (WB F178, WB U13, Table 91)
* **What it is:** Merchant revenue-based working capital advances underwritten by regulated commercial banking partners, funded through daily card sales holdbacks.
* **Key Invariant (Basis: Validate separately (V); PAY FIN LEG PART, WB F178, Rule F178, Table 91):** **Transparent Factor Pricing & Daily Percentage Holdbacks.** "Offer eligible financing through regulated partners with transparent costs and appropriate underwriting; software does not imply guaranteed eligibility or approval." Features a single transparent fixed factor fee with zero compounding interest, zero late payment penalties, and flexible daily percentage holdbacks (e.g. 10%) from settled card batches.

---

## F179 — Financial Protection Products (WB F179, Table 91, Table 108/109)
* **What it is:** Underwritten no-show fee and chargeback guarantee protection backed by funded contractual insurance reserves.
* **Key Invariant (Basis: Validate separately (V); PAY FIN LEG OPS, WB F179, Rule F179, Table 91):** **Contractually Backed Guarantees & Strict Eligibility Exclusions.** "Explore no-show or payout protection only with explicit eligibility, exclusions and financially backed coverage; promises match a funded contractual product." Coverage mandates verified pre-authorized payment methods and signed cancellation policies on file. Excludes salon-initiated cancellations. Approved claims for uncollected client no-shows disburse guaranteed reimbursement directly to the studio's ledger.

---

## F180 — External Staffing Marketplace (WB F180, Table 91, Table 105)
* **What it is:** Independent professional substitute marketplace connecting salons in need of urgent shift coverage with verified freelance stylists, estheticians, and assistants.
* **Key Invariant (Basis: Validate separately (V); NET CLIN LEG OPS, WB F180, Rule F180, Table 91, Table 105):** **Credential Verification & Escrow-Protected Shift Payouts.** "Recruit and verify substitute professionals and match paid coverage requests with dispute and incident handling; coverage quality is monitored operationally." Enforces state licensing and background check verifications before gig matching. Shift compensation is held in escrow upon booking and released upon verified completion minus transparent platform fees (10%), with immediate escrow freezing upon reported incidents or disputes.

---

## F181 — Collective Purchasing Network (WB F181, Table 91, Table 105)
* **What it is:** Collaborative wholesale supply aggregation network pooling purchasing volume across independent salons to unlock tier-one distributor pricing on color lines, backbar essentials, and consumables.
* **Key Invariant (Basis: Validate separately (V); NET PART FIN OPS, WB F181, Rule F181, Table 91):** **Net Savings Integrity & End-to-End Batch Tracing.** "Aggregate voluntary purchasing demand across businesses to negotiate supplier terms and trace fulfillment; savings include shipping, waste and return costs." Transparently models freight friction, breakage/waste reserves, and handling fees to ensure net salon savings genuinely survive operational costs. Fulfills batch orders with carrier tracking and pro-rata savings distribution.

---

## F182 — Privacy Preserving Peer Benchmarks (WB F182, Table 91, Table 105)
* **What it is:** Opt-in comparative intelligence network providing salons with peer quartile benchmarks (rebook rate, retail-to-service ratio, 90-day retention, chair revenue) segmented by business type, maturity, and metro tier.
* **Key Invariant (Basis: Validate separately (V); DATA SEC LEG NET, WB F182, Rule F182, Table 91):** **K-Anonymity Cell Size Enforcement & Automatic Suppression.** "Offer opt-in aggregated comparisons by business type and maturity, with minimum cell sizes and suppression; evaluate inference risk; enforce cohort, query and release limits, suppressing outputs that fail review." Requires explicit opt-in consent. If a querying cohort has fewer than 10 independent consenting businesses, the entire report is suppressed to eliminate individual salon re-identification or revenue inference.

---

## F183 — Visual Service Previews (WB F183, Table 91)
* **What it is:** Client-controlled cosmetic simulation engine for hair balayage, lash extensions, brow microblading, and lip blush consultation visualization.
* **Key Invariant (Basis: Validate separately (V); AI CLIN LEG, WB F183, Rule F183, Table 91):** **Mandatory Disclaimer Watermarking & Right-to-Purge.** "Explore clearly labeled cosmetic simulations for hair, lash or brow consultation with client control; specialist imaging, diverse evaluation and consent; preview images are never used as evidence of actual outcomes." Requires verified client consent; permanently embeds prominent non-guarantee consultation disclaimers; allows clients to invoke instant data purging upon consultation conclusion.

---

## F184 — Clinical Image Interpretation (WB F184, Table 91)
* **What it is:** Regulatory firewall and governance engine strictly separating medical/dermatological diagnostic imaging from casual aesthetic salon booking and charting workflows.
* **Key Invariant (Basis: Validate separately (V); CLIN LEG AI, WB F184, Rule F184, Table 91):** **Strict Booking Firewall & SaMD/IRB Segregation.** "Treat medical image assessment as a separate research and regulated-product decision, not a booking feature; clinical validation, regulatory expertise and ongoing monitoring; no diagnostic launch without required evidence." Any attempt to execute automated diagnostic classification within standard booking or salon notes is blocked immediately, routing the guest to an in-person clinical physician and restricting AI interpretation exclusively to authorized IRB clinical research environments.

---

## F185 — Proprietary Payment Hardware Governance (WB F185, Table 91, Table 105)
* **What it is:** Build-versus-buy decision and hardware fleet health governance engine evaluating certified partner terminals (e.g. Stripe WisePOS E) versus custom proprietary payment terminals.
* **Key Invariant (Basis: Validate separately (V); PAY PART OPS, WB F185, Rule F185, Table 91):** **Partner-First Hierarchy & Full-Lifecycle Economics.** "Consider custom terminals only if certified partner devices demonstrably cannot meet a validated need; hardware engineers, manufacturing, certification and support; full lifecycle economics beat approved integrations." Blocks custom hardware development unless partner devices demonstrably fail a verified operational requirement and 3-year custom TCO (BOM, PCI certification, RMA logistics) beats partner integrations. Monitors hardware tamper sensors, battery health, and PCI PTS certificate validity.




























