/**
 * F100: Versioned Electronic Signatures & Cryptographic Evidence Record
 * 
 * Invariants (Rules BR05, DR04, DR05, DR10):
 * 1. Cryptographic Binding: Every signature is bound to a SHA-256 digest of the
 *    exact document text and financial terms. Changing a single character invalidates
 *    the hash.
 * 2. Immutable Historical Artifacts (DR04): Once signed, an issued document record
 *    remains permanently fixed. Content revisions create a linked amendment or
 *    superseding document version requiring fresh signature.
 * 3. Consent vs. Payment Separation (DR05): Informed consent, intake forms, and
 *    treatment approvals strictly never authorize an unrelated payment or card charge.
 * 4. Comprehensive Audit Trail (DR10): Signer identity, email, phone, role, IP address,
 *    user-agent, UTC timestamp, and acknowledgment statement are permanently logged.
 * 5. Tamper Verification: Fast cryptographic verification detects any post-signing
 *    data alterations or discrepancies.
 */

import { createHash } from 'crypto';

export type SignerRole = 'client' | 'parent_guardian' | 'practitioner' | 'witness';

export interface SignerIdentity {
  name: string;
  email: string;
  phone?: string;
  role: SignerRole;
  relationshipToClient?: string; // e.g. "Mother / Legal Guardian" if role is parent_guardian
}

export interface SignatureEvidenceRecord {
  evidenceId: string;
  signedAt: string; // ISO 8601 UTC
  signer: SignerIdentity;
  ipAddress: string;
  userAgent: string;
  signatureType: 'drawn' | 'typed';
  signatureData: string; // SVG path string or stylized font name
  consentAcknowledgementText: string;
  documentHash: string; // SHA-256 hex digest
  separatePaymentAcknowledgementConfirmed: boolean;
}

export type DocumentLifecycleStatus =
  | 'draft'
  | 'issued_awaiting_signature'
  | 'signed_completed'
  | 'superseded'
  | 'revoked';

export interface VersionedSignableDocument {
  documentId: string;
  documentType:
    | 'service_consent'
    | 'medical_procedure_consent'
    | 'intake_form'
    | 'estimate_approval'
    | 'cancellation_policy_d05'
    | 'photo_media_release'
    | 'renter_agreement';
  title: string;
  version: number;
  content: string; // Full substantive legal and medical text
  documentHash: string; // SHA-256 hex digest of content
  status: DocumentLifecycleStatus;
  createdAt: string;
  issuedAt?: string;
  signatureEvidence?: SignatureEvidenceRecord;
  supersededByDocumentId?: string;
  amendmentReason?: string;
}

/**
 * Computes a deterministic SHA-256 digest of document content.
 */
export function computeDocumentHash(content: string): string {
  return createHash('sha256').update(content.trim(), 'utf8').digest('hex');
}

/**
 * Creates a new signable document draft with an immutable hash.
 */
export function createSignableDocument(params: {
  documentId: string;
  documentType: VersionedSignableDocument['documentType'];
  title: string;
  content: string;
  version?: number;
}): VersionedSignableDocument {
  if (!params.title.trim()) {
    throw new Error('Document title cannot be empty.');
  }
  if (!params.content.trim()) {
    throw new Error('Document content cannot be empty.');
  }

  const documentHash = computeDocumentHash(params.content);

  return {
    documentId: params.documentId,
    documentType: params.documentType,
    title: params.title,
    version: params.version ?? 1,
    content: params.content,
    documentHash,
    status: 'draft',
    createdAt: new Date().toISOString(),
  };
}

/**
 * Issues document to the client, transitioning status to awaiting signature.
 */
export function issueDocumentForSignature(
  document: VersionedSignableDocument
): VersionedSignableDocument {
  if (document.status !== 'draft') {
    throw new Error(`Cannot issue document in "${document.status}" state.`);
  }

  return {
    ...document,
    status: 'issued_awaiting_signature',
    issuedAt: new Date().toISOString(),
  };
}

/**
 * Applies an electronic signature with complete audit evidence.
 * Invariant DR05: Verifies that consent does not silently bundle unauthorized card charges.
 */
export function applyElectronicSignature(params: {
  document: VersionedSignableDocument;
  signer: SignerIdentity;
  ipAddress: string;
  userAgent: string;
  signatureType: 'drawn' | 'typed';
  signatureData: string;
  consentAcknowledgementText: string;
  acknowledgedSeparationOfPayment: boolean; // Confirms payment is a separate explicit action
  currentTime?: string;
}): VersionedSignableDocument {
  if (params.document.status !== 'issued_awaiting_signature') {
    throw new Error(
      `Cannot sign document with status "${params.document.status}". Must be "issued_awaiting_signature".`
    );
  }

  if (!params.signatureData.trim()) {
    throw new Error('Signature data (drawn vector or typed name) is required.');
  }

  if (!params.acknowledgedSeparationOfPayment) {
    throw new Error(
      'Invariant DR05 Violation: Signer must explicitly acknowledge that signing this document does not silently execute a payment charge.'
    );
  }

  const now = params.currentTime ?? new Date().toISOString();
  // Verify document hash matches content at time of signing
  const currentContentHash = computeDocumentHash(params.document.content);
  if (currentContentHash !== params.document.documentHash) {
    throw new Error('Tamper Alert: Document content has been modified since it was issued.');
  }

  const evidence: SignatureEvidenceRecord = {
    evidenceId: `EVID-${Date.now().toString(36).toUpperCase()}`,
    signedAt: now,
    signer: params.signer,
    ipAddress: params.ipAddress,
    userAgent: params.userAgent,
    signatureType: params.signatureType,
    signatureData: params.signatureData,
    consentAcknowledgementText: params.consentAcknowledgementText,
    documentHash: params.document.documentHash,
    separatePaymentAcknowledgementConfirmed: true,
  };

  return {
    ...params.document,
    status: 'signed_completed',
    signatureEvidence: evidence,
  };
}

/**
 * Verifies the integrity of a signed document.
 * Returns true if the stored cryptographic hash matches both the signature evidence
 * and the content.
 */
export function verifySignatureIntegrity(
  document: VersionedSignableDocument
): { isValid: boolean; error?: string } {
  if (document.status !== 'signed_completed' && document.status !== 'superseded') {
    return { isValid: false, error: 'Document is not in a signed state.' };
  }

  if (!document.signatureEvidence) {
    return { isValid: false, error: 'Signature evidence record is missing.' };
  }

  const calculatedHash = computeDocumentHash(document.content);
  if (calculatedHash !== document.documentHash) {
    return {
      isValid: false,
      error: 'Content Tamper detected: Current document text does not match the issued document hash.',
    };
  }

  if (document.signatureEvidence.documentHash !== document.documentHash) {
    return {
      isValid: false,
      error: 'Signature Mismatch: Signed hash does not match document hash.',
    };
  }

  return { isValid: true };
}

/**
 * Amends a signed document by superseding the original and creating a new version.
 * Invariant DR04: Historical signed document is locked and never rewritten.
 */
export function createAmendedDocument(params: {
  signedDocument: VersionedSignableDocument;
  newContent: string;
  amendmentReason: string;
  newDocumentId: string;
}): { supersededDocument: VersionedSignableDocument; newVersionDraft: VersionedSignableDocument } {
  if (params.signedDocument.status !== 'signed_completed') {
    throw new Error('Only completed signed documents can be superseded with an amendment.');
  }

  const newDoc = createSignableDocument({
    documentId: params.newDocumentId,
    documentType: params.signedDocument.documentType,
    title: params.signedDocument.title,
    content: params.newContent,
    version: params.signedDocument.version + 1,
  });

  const supersededDocument: VersionedSignableDocument = {
    ...params.signedDocument,
    status: 'superseded',
    supersededByDocumentId: params.newDocumentId,
    amendmentReason: params.amendmentReason,
  };

  return {
    supersededDocument,
    newVersionDraft: newDoc,
  };
}
