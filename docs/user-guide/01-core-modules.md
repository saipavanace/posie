# Posie App User Guide: Core Modules (F001 - F004)

Welcome to **Posie**! This guide explains the core features currently active in the studio platform.

---

## F001 — Reusable Brand Kit & Voice
* **What it is:** A centralized branding configuration that controls colors, typography, logos, and tone of voice across web and mobile.
* **Colors (Sage & Linen Atelier):**
  * `Primary (#2C3E30)`: Deep Forest Sage for headlines, primary buttons, and grounding accents.
  * `Secondary (#8A9A86)`: Muted Linen Sage for subheadings, soft tags, and highlights.
  * `Tertiary (#C67D6E)`: Warm Terracotta Rose for playful callouts and badge accents.
  * `Neutral Canvas (#FAF8F5)`: Linen Off-White for clean, accessible contrast.
* **Tone of Voice:**
  * Quirky, authoritative, playful, and jargon-free.
  * Designed to feel like your knowledgeable, supportive older sister who never uses intimidating clinical terms.
* **Key Invariant:** Brand updates automatically apply to all future drafts, while historical receipts, estimates, and signed records permanently retain the branding in effect at the time they were issued.

---

## F002 — Clear Service Catalog
* **What it is:** A transparent treatment menu with preparation instructions and duration breakdowns.
* **Features:**
  * **Client-Friendly Language:** Descriptions explain what the treatment actually does and what it feels like.
  * **Clear Preparation Cautions:** Highlights pre-treatment care (e.g. "Skip retinol 48 hours beforehand").
  * **Practitioner-Specific Overrides:** If a master specialist charges a different rate or requires additional time, the system automatically applies the correct override during that specialist's effective dates without altering base catalog items.

---

## F003 — Staff Profiles & Portfolio Privacy
* **What it is:** Specialist profiles highlighting skills, background, and work examples.
* **Privacy Invariant:** 
  * Only staff members with `isPublic: true` and `active: true` appear in search or public booking.
  * **Client Media Consent:** Portfolio photos only appear publicly if `clientConsentGranted: true` has been confirmed. Internal progress photos never leak to public pages.

---

## F004 — Plain-Language Booking Policies
* **What it is:** Clear, honest, upfront policies governing deposits, cancellations, refunds, and accessibility.
* **How it works:**
  * **Hold Deposit:** A 20% deposit locks in your reservation and applies directly to the final checkout.
  * **24-Hour Notice:** Cancellations with at least 24 hours notice receive a 100% refund.
  * **Accessibility & Comfort:** Clients can request step-free access and toggle a **"Quiet Visit"** (for clients who want a peaceful treatment without small talk).
* **Policy Snapshot Invariant:** When a client books, an immutable policy snapshot is created and permanently linked to the booking ID so changes to studio policies never retroactively alter past commitments.
