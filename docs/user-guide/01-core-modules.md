# Posie App User Guide: Core Modules (F001 - F007)

Welcome to **Posie**! This guide details the features currently active in the studio platform.

---

## F001 — Reusable Brand Kit & Voice
* **What it is:** A centralized branding configuration that controls colors, typography, logos, and tone of voice across web and mobile.
* **Palette (Sage & Linen Atelier):**
  * `Primary (#2C3E30)`: Deep Forest Sage for headlines and primary actions.
  * `Secondary (#8A9A86)`: Muted Linen Sage for soft tags and highlights.
  * `Tertiary (#C67D6E)`: Warm Terracotta Rose for playful callouts.
  * `Neutral Canvas (#FAF8F5)`: Linen Off-White for clean contrast.
* **Tone of Voice:**
  * Quirky, authoritative, playful, and jargon-free.
* **Key Invariant:** Brand updates apply to future drafts; historical receipts and records permanently retain original branding.

---

## F002 — Clear Service Catalog
* **What it is:** A transparent treatment menu with preparation instructions and duration breakdowns.
* **Features:**
  * Client-friendly language explaining actual treatment benefits.
  * Pre-treatment care notes.
  * Practitioner-specific price and duration overrides.

---

## F003 — Staff Profiles & Portfolio Privacy
* **What it is:** Specialist profiles highlighting skills, background, and work examples.
* **Privacy Invariant:** 
  * Only staff members with `isPublic: true` and `active: true` appear in search or public booking.
  * Portfolio photos only appear publicly if `clientConsentGranted: true` has been confirmed.

---

## F004 — Plain-Language Booking Policies
* **What it is:** Clear policies governing deposits, cancellations, refunds, and accessibility.
* **How it works:**
  * 20% hold deposit.
  * 24-hr cancellation window with 100% refund.
  * Quiet visit toggle for a silent, peaceful treatment.
  * Immutable policy snapshots created upon booking.

---

## F005 — Direct Booking Links & QR Codes
* **What it is:** Direct booking links and brand-colored QR codes for the studio, specific treatments, and individual specialists.
* **How it works:**
  * Generates URLs with campaign source tracking (`?src=instagram`, `?src=qr_card`) and pre-selected treatments.
  * Generates lightweight, scannable SVG QR codes rendered in studio brand colors (`#2C3E30`).
* **Key Invariant:** Opening a link preserves the selected service and business identity.

---

## F006 — Printable Branded Materials
* **What it is:** Generates clean, high-resolution physical print collateral directly from live data.
* **How it works:**
  * Produces Letter-size printable service menus with formatted pricing, treatment duration, and preparation notes.
* **Key Invariant:** Printed prices strictly match the live catalog at generation time with version and date tags.

---

## F007 — Message Template Library
* **What it is:** Automated, quirky, warm, and authoritative messages sent to clients for confirmations, reschedules, and aftercare.
* **How it works:**
  * Injects appointment dates, times, specialist names, and deposit receipts automatically.
* **Key Invariant:** The compiler throws validation errors if any placeholder token is missing, ensuring broken placeholders (e.g. `{{clientFirstName}}`) are never sent to a client.
