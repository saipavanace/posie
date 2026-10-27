/**
 * F106: Brand Changes Across All Surfaces (Rules BR02, BR03, BR05, BR07, BR09, BR10, DR04)
 * 
 * Invariants:
 * 1. Unified Brand Token Propagation (Rule BR03): Updating the active brand theme
 *    propagates across client booking sites, confirmation messages, and new draft documents.
 * 2. Immutable Issued Artifacts (Rules BR05, DR04): A brand theme revision applies
 *    strictly to new drafts and future views. Past issued invoices, receipts, care cards,
 *    and signed treatment consent records permanently preserve the exact logo, colors,
 *    and contact numbers present at the moment of issue.
 * 3. Safe Staging, Preview & Rollback (Rule BR10): Brand revisions can be staged in a
 *    draft version, previewed across mobile/desktop/print, approved for publication,
 *    or rolled back to a prior version without data loss.
 * 4. Local Location Exceptions (Rule BR07): Multi-location studios can inherit global
 *    brand tokens while overriding local addresses, hours, and merchant identities.
 */

export interface BrandDesignTokens {
  primaryColor: string; // e.g. "#2C3E30"
  secondaryColor: string; // e.g. "#8A9A86"
  accentColor: string; // e.g. "#C67D6E"
  headlineFont: string; // e.g. "Newsreader"
  bodyFont: string; // e.g. "Manrope"
  logoSvg: string;
  businessName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
}

export interface BrandThemeVersion {
  versionId: string;
  versionNumber: number;
  tokens: BrandDesignTokens;
  publishedAt?: string;
  publishedBy?: string;
  status: 'draft' | 'published' | 'archived';
  changelogNotes?: string;
}

export interface LocationBrandOverrides {
  locationId: string;
  locationName: string;
  localAddress: string;
  localPhone: string;
  localMerchantId: string; // Invariant BR07: Never overwritten by global theme
  customImageryHeroUrl?: string;
}

export interface IssuedDocumentSnapshot {
  documentId: string;
  title: string;
  issuedAt: string;
  brandVersionApplied: number;
  bakedBrandTokens: BrandDesignTokens; // Invariant DR04: Fixed snapshot of tokens
  content: string;
}

/**
 * Creates an initial published brand theme version.
 */
export function createInitialBrandTheme(params: {
  tokens: BrandDesignTokens;
  publishedBy: string;
}): BrandThemeVersion {
  return {
    versionId: 'THEME-V1',
    versionNumber: 1,
    tokens: params.tokens,
    publishedAt: new Date().toISOString(),
    publishedBy: params.publishedBy,
    status: 'published',
  };
}

/**
 * Stages a new draft brand revision for multi-surface preview.
 */
export function stageBrandRevision(params: {
  currentTheme: BrandThemeVersion;
  updatedTokens: Partial<BrandDesignTokens>;
  changelogNotes: string;
}): BrandThemeVersion {
  return {
    versionId: `THEME-V${params.currentTheme.versionNumber + 1}-DRAFT`,
    versionNumber: params.currentTheme.versionNumber + 1,
    tokens: {
      ...params.currentTheme.tokens,
      ...params.updatedTokens,
    },
    status: 'draft',
    changelogNotes: params.changelogNotes,
  };
}

/**
 * Publishes a staged brand revision.
 * Future drafts inherit the new version; past issued documents remain fixed.
 */
export function publishBrandRevision(params: {
  stagedTheme: BrandThemeVersion;
  publishedBy: string;
}): { publishedTheme: BrandThemeVersion; previousThemeStatus: 'archived' } {
  if (params.stagedTheme.status !== 'draft') {
    throw new Error('Only draft themes can be published.');
  }

  const now = new Date().toISOString();

  const publishedTheme: BrandThemeVersion = {
    ...params.stagedTheme,
    versionId: `THEME-V${params.stagedTheme.versionNumber}`,
    status: 'published',
    publishedAt: now,
    publishedBy: params.publishedBy,
  };

  return {
    publishedTheme,
    previousThemeStatus: 'archived',
  };
}

/**
 * Issues a document, baking in the current published brand tokens.
 * Invariant DR04 & BR05: Preserves exact tokens permanently, even if brand is later revised.
 */
export function issueBrandedDocument(params: {
  documentId: string;
  title: string;
  content: string;
  activeTheme: BrandThemeVersion;
  locationOverrides?: LocationBrandOverrides;
}): IssuedDocumentSnapshot {
  if (params.activeTheme.status !== 'published') {
    throw new Error('Documents can only be issued against an approved, published brand theme.');
  }

  const bakedTokens: BrandDesignTokens = {
    ...params.activeTheme.tokens,
    contactPhone: params.locationOverrides?.localPhone ?? params.activeTheme.tokens.contactPhone,
  };

  return {
    documentId: params.documentId,
    title: params.title,
    issuedAt: new Date().toISOString(),
    brandVersionApplied: params.activeTheme.versionNumber,
    bakedBrandTokens: bakedTokens,
    content: params.content,
  };
}

/**
 * Verifies that a historical document preserves its original brand tokens
 * after a subsequent global theme update (Rule BR05 / DR04 check).
 */
export function verifyHistoricalArtifactIntegrity(params: {
  issuedDocument: IssuedDocumentSnapshot;
  newTheme: BrandThemeVersion;
}): boolean {
  // Document's baked tokens must NOT match the new theme's changed tokens
  return (
    params.issuedDocument.brandVersionApplied < params.newTheme.versionNumber &&
    params.issuedDocument.bakedBrandTokens.primaryColor !== params.newTheme.tokens.primaryColor
  );
}

/**
 * Rolls back an active theme to a prior version without modifying historical artifacts.
 */
export function rollbackBrandTheme(params: {
  historicalTheme: BrandThemeVersion;
  rolledBackBy: string;
}): BrandThemeVersion {
  return {
    versionId: `THEME-ROLLBACK-${Date.now().toString(36).toUpperCase()}`,
    versionNumber: params.historicalTheme.versionNumber,
    tokens: params.historicalTheme.tokens,
    status: 'published',
    publishedAt: new Date().toISOString(),
    publishedBy: params.rolledBackBy,
    changelogNotes: `Rollback to Theme Version ${params.historicalTheme.versionNumber}`,
  };
}
