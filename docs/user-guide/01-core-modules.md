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
















