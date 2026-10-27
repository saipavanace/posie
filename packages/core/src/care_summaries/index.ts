/**
 * F129 — Documented Care Summaries
 *
 * Generates client-friendly, aesthetic visit report cards with approved products,
 * factual practitioner observations, home-care next steps, and permitted photography.
 *
 * KEY INVARIANT (Basis: T; Gingr Report Cards, D10, D11):
 * Signed Record & Professional Traceability.
 * "Staff approve the summary and can trace every statement to its source."
 * Care summaries never make undocumented medical efficacy claims. AI and dictation drafts
 * stay unfinalized until approved and signed by the responsible practitioner.
 * Only photographs with explicit client media release are included.
 */

export interface CareSummaryProduct {
  productId: string;
  name: string;
  purpose: 'applied_in_treatment' | 'recommended_home_care';
  instructions?: string;
}

export interface CareSummaryPhoto {
  photoId: string;
  caption: string;
  hasClientMediaRelease: boolean;
  thumbnailUrl: string;
}

export interface CareSummaryDraft {
  id: string;
  appointmentId: string;
  serviceName: string;
  practitionerName: string;
  practitionerId: string;
  clientName: string;
  visitDate: string;
  treatmentObservations: string;
  products: CareSummaryProduct[];
  homeCareNextSteps: string[];
  recommendedRebookWeeks?: number;
  photos: CareSummaryPhoto[];
  status: 'draft' | 'practitioner_approved_signed' | 'delivered_to_client';
  approvedByPractitionerId?: string;
  signedAtUtc?: string;
}

/**
 * Creates an unfinalized care summary draft from treatment notes.
 */
export function createCareSummaryDraft(
  appointmentId: string,
  serviceName: string,
  clientName: string,
  practitionerId: string,
  practitionerName: string,
  visitDate: string,
  observations: string,
  products: CareSummaryProduct[] = [],
  nextSteps: string[] = [],
  photos: CareSummaryPhoto[] = []
): CareSummaryDraft {
  // Invariant: filter out photos without explicit client media release
  const permittedPhotos = photos.filter((p) => p.hasClientMediaRelease);

  return {
    id: `care_sum_${Date.now()}`,
    appointmentId,
    serviceName,
    clientName,
    practitionerId,
    practitionerName,
    visitDate,
    treatmentObservations: observations,
    products,
    homeCareNextSteps: nextSteps,
    photos: permittedPhotos,
    status: 'draft',
  };
}

/**
 * Signs and locks a care summary for client delivery.
 */
export function signAndApproveCareSummary(
  summary: CareSummaryDraft,
  signerPractitionerId: string
): CareSummaryDraft {
  if (signerPractitionerId !== summary.practitionerId) {
    throw new Error('Only the responsible practitioner who performed the service can sign and approve the care summary.');
  }

  if (!summary.treatmentObservations || summary.treatmentObservations.trim().length < 5) {
    throw new Error('A care summary must include factual treatment observations before approval.');
  }

  return {
    ...summary,
    status: 'practitioner_approved_signed',
    approvedByPractitionerId: signerPractitionerId,
    signedAtUtc: new Date().toISOString(),
  };
}

/**
 * Formats client-facing HTML report card for the client portal.
 */
export function renderCareSummaryHtml(summary: CareSummaryDraft): string {
  if (summary.status === 'draft') {
    throw new Error('WB F129 Invariant: Unapproved care summary drafts cannot be delivered to clients.');
  }

  const productList = summary.products
    .map((p) => `<li><strong>${p.name}</strong> (${p.purpose === 'applied_in_treatment' ? 'Treatment' : 'Home-Care'}): ${p.instructions || 'Daily application'}</li>`)
    .join('');

  const nextStepsList = summary.homeCareNextSteps
    .map((s) => `<li>${s}</li>`)
    .join('');

  return `
<div class="posie-care-summary" style="font-family: sans-serif; max-width: 600px; padding: 24px; border: 1px solid #E5E0D8; border-radius: 12px; background: #FAF8F5;">
  <div style="border-bottom: 2px solid #C47059; padding-bottom: 12px; margin-bottom: 16px;">
    <h2 style="color: #4A3B32; margin: 0;">Your Treatment Care Packet</h2>
    <span style="font-size: 0.85rem; color: #7A6F68;">${summary.serviceName} • ${summary.visitDate} with ${summary.practitionerName}</span>
  </div>
  <div style="margin-bottom: 16px;">
    <h3 style="font-size: 1rem; color: #4A3B32;">Practitioner Observations</h3>
    <p style="font-size: 0.9rem; color: #555; background: #FFF; padding: 12px; border-radius: 8px;">${summary.treatmentObservations}</p>
  </div>
  ${productList ? `<div style="margin-bottom: 16px;"><h3 style="font-size: 1rem; color: #4A3B32;">Products &amp; Formulas</h3><ul style="font-size: 0.88rem; color: #555;">${productList}</ul></div>` : ''}
  ${nextStepsList ? `<div style="margin-bottom: 16px;"><h3 style="font-size: 1rem; color: #4A3B32;">Next Steps</h3><ul style="font-size: 0.88rem; color: #555;">${nextStepsList}</ul></div>` : ''}
  <div style="font-size: 0.75rem; color: #888; border-top: 1px solid #E5E0D8; padding-top: 8px;">
    Verified and signed by ${summary.practitionerName} on ${summary.signedAtUtc?.slice(0, 10)}. Software does not replace medical advice.
  </div>
</div>
  `.trim();
}
