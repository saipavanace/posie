/**
 * F137 — Intake and Note OCR Assistance
 *
 * Implements draft-only optical character recognition and form digitization
 * from paper charts and intake scans with per-field confidence scoring and mandatory human triage.
 *
 * KEY INVARIANT (Basis: I; Document Processing & Privacy, WB F148):
 * Human-in-the-Loop & Provenance Lock.
 * "A human confirms identity and sensitive fields before they become records."
 * OCR extractions remain uncommitted drafts until a qualified staff member or practitioner
 * verifies the text against the raw scan. Medically sensitive fields (allergies, medications, contraindications)
 * or any field with confidence <90% trigger a mandatory triage review flag.
 */

export interface OcrExtractedField {
  fieldKey: string;
  fieldLabel: string;
  extractedValue: string;
  confidenceScore: number; // 0.0 to 1.0
  isMedicallySensitive: boolean;
  requiresHumanTriage: boolean;
  isVerifiedByHuman: boolean;
  verifiedValue?: string;
  verifiedByUserId?: string;
  verifiedAtUtc?: string;
}

export interface OcrDocumentSession {
  documentId: string;
  documentType: 'paper_intake_form' | 'handwritten_treatment_note' | 'product_label';
  rawImageUri: string;
  extractedAtUtc: string;
  status: 'draft_pending_human_verification' | 'verified_and_committed';
  fields: OcrExtractedField[];
  triagePendingCount: number;
  allFieldsVerified: boolean;
  committedRecordId?: string;
}

/**
 * Creates an OCR document processing session with automated confidence evaluation.
 */
export function processOcrDocumentDraft(
  documentId: string,
  documentType: OcrDocumentSession['documentType'],
  rawImageUri: string,
  rawDetections: Array<{
    fieldKey: string;
    fieldLabel: string;
    extractedValue: string;
    confidenceScore: number;
    isMedicallySensitive: boolean;
  }>
): OcrDocumentSession {
  let triagePendingCount = 0;

  const fields: OcrExtractedField[] = rawDetections.map((det) => {
    // Flag for human review if low confidence OR medically critical
    const requiresHumanTriage = det.confidenceScore < 0.9 || det.isMedicallySensitive;
    if (requiresHumanTriage) {
      triagePendingCount++;
    }

    return {
      ...det,
      requiresHumanTriage,
      isVerifiedByHuman: false,
    };
  });

  return {
    documentId,
    documentType,
    rawImageUri,
    extractedAtUtc: new Date().toISOString(),
    status: 'draft_pending_human_verification',
    fields,
    triagePendingCount,
    allFieldsVerified: false,
  };
}

/**
 * Verifies a single extracted OCR field with human staff confirmation.
 */
export function verifyOcrField(
  session: OcrDocumentSession,
  fieldKey: string,
  confirmedValue: string,
  verifierUserId: string
): OcrDocumentSession {
  const updatedFields = session.fields.map((f) => {
    if (f.fieldKey === fieldKey) {
      return {
        ...f,
        isVerifiedByHuman: true,
        verifiedValue: confirmedValue,
        verifiedByUserId: verifierUserId,
        verifiedAtUtc: new Date().toISOString(),
      };
    }
    return f;
  });

  const remainingTriage = updatedFields.filter((f) => f.requiresHumanTriage && !f.isVerifiedByHuman).length;
  const allVerified = updatedFields.every((f) => f.isVerifiedByHuman || !f.requiresHumanTriage);

  return {
    ...session,
    fields: updatedFields,
    triagePendingCount: remainingTriage,
    allFieldsVerified: allVerified,
  };
}

/**
 * Commits a fully verified OCR session into official studio records.
 */
export function commitVerifiedOcrRecord(
  session: OcrDocumentSession,
  authorizingUserId: string
): OcrDocumentSession {
  if (!session.allFieldsVerified && session.triagePendingCount > 0) {
    throw new Error(
      `WB F137 Invariant: Cannot commit unverified OCR draft. ${session.triagePendingCount} sensitive or low-confidence fields require human verification.`
    );
  }

  return {
    ...session,
    status: 'verified_and_committed',
    committedRecordId: `rec_ocr_${Date.now()}`,
  };
}
