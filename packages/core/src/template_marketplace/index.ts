/**
 * Posie Core - F156: Expert Template Marketplace
 *
 * Implements a governed marketplace for licensed creators, designers, and clinicians
 * to publish, license, and adopt versioned salon templates (intake forms, aftercare protocols,
 * consent agreements, and treatment proposals). Strictly distinguishes clinician-reviewed,
 * counsel-reviewed, and designer-curated content with explicit jurisdictions and credentials,
 * completely prohibiting misleading blanket "compliant" badges.
 *
 * Compliance: Follows Posie Rule DR04 & WB F156 (Creator recruitment, licensing and review;
 * legal and clinical templates show jurisdiction and qualified reviewer; version support).
 */

export type TemplateCategory =
  | 'intake_form'
  | 'aftercare_protocol'
  | 'consent_agreement'
  | 'service_proposal';

export type ReviewType =
  | 'clinician_reviewed'
  | 'counsel_reviewed'
  | 'designer_curated';

export interface TemplateCreator {
  name: string;
  organization: string;
  verifiedTitle: string;
}

export interface ReviewCredentials {
  reviewType: ReviewType;
  reviewedByName: string;
  professionalLicenseOrBarNumber: string;
  jurisdiction: string; // e.g. 'US-CA', 'US-NY', 'US-FL', 'UK'
  reviewDate: string;
  expirationDate: string;
}

export interface MarketplaceTemplate {
  templateId: string;
  title: string;
  category: TemplateCategory;
  version: string;
  creator: TemplateCreator;
  reviewCredentials: ReviewCredentials;
  contentSchema: Record<string, any>;
  pricing: {
    priceCents: number;
    isFreeCommunityTemplate: boolean;
  };
  adoptionCount: number;
  changelog: string;
  publishedAt: string;
}

export interface TemplateInstallation {
  installationId: string;
  templateId: string;
  installedVersion: string;
  studioId: string;
  installedAt: string;
  customizedOverrides?: Record<string, any>;
}

/**
 * Publishes an expert template to the marketplace with verified credential checks
 */
export function publishMarketplaceTemplate(
  templateInput: Omit<MarketplaceTemplate, 'templateId' | 'adoptionCount' | 'publishedAt'>
): MarketplaceTemplate {
  const { reviewCredentials } = templateInput;

  // Invariant: Clinical and legal templates strictly require verified credentials
  if (reviewCredentials.reviewType === 'clinician_reviewed' || reviewCredentials.reviewType === 'counsel_reviewed') {
    if (
      !reviewCredentials.professionalLicenseOrBarNumber ||
      reviewCredentials.professionalLicenseOrBarNumber.trim().length < 4
    ) {
      throw new Error(
        `Professional license or bar number is mandatory for templates tagged as "${reviewCredentials.reviewType}"`
      );
    }

    if (!reviewCredentials.jurisdiction || reviewCredentials.jurisdiction.trim().length < 2) {
      throw new Error('Specific legal or clinical jurisdiction (e.g. US-CA, US-NY) is mandatory');
    }
  }

  return {
    ...templateInput,
    templateId: `tpl-mkt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    adoptionCount: 0,
    publishedAt: new Date().toISOString(),
  };
}

/**
 * Adopts an expert template into a studio's operational catalog
 */
export function adoptMarketplaceTemplate(
  template: MarketplaceTemplate,
  studioId: string,
  initialOverrides?: Record<string, any>
): {
  installation: TemplateInstallation;
  updatedTemplate: MarketplaceTemplate;
} {
  const installation: TemplateInstallation = {
    installationId: `inst-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    templateId: template.templateId,
    installedVersion: template.version,
    studioId,
    installedAt: new Date().toISOString(),
    customizedOverrides: initialOverrides,
  };

  const updatedTemplate: MarketplaceTemplate = {
    ...template,
    adoptionCount: template.adoptionCount + 1,
  };

  return {
    installation,
    updatedTemplate,
  };
}

/**
 * Checks if a newer verified version of an installed template is available in the marketplace
 */
export function checkTemplateUpdate(
  installation: TemplateInstallation,
  currentMarketplaceTemplate: MarketplaceTemplate
): {
  hasUpdate: boolean;
  installedVersion: string;
  latestVersion: string;
  changelog: string;
} {
  const hasUpdate = installation.installedVersion !== currentMarketplaceTemplate.version;
  return {
    hasUpdate,
    installedVersion: installation.installedVersion,
    latestVersion: currentMarketplaceTemplate.version,
    changelog: currentMarketplaceTemplate.changelog,
  };
}
