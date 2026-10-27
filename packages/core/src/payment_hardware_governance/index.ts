/**
 * F185: Proprietary Payment Hardware Governance
 *
 * Enforces rigorous build-vs-buy governance for payment hardware:
 * prioritizes certified partner terminals and permits custom terminals ONLY if certified partner
 * devices demonstrably cannot meet a validated need and full-lifecycle economics beat approved integrations.
 */

export interface CertifiedPartnerDevice {
  deviceId: string;
  model: 'stripe_wisepos_e' | 'bbpos_wisepad_3' | 'square_terminal' | 'pax_a920';
  pciPtsCertified: boolean;
  nfcContactlessEnabled: boolean;
  offlineProcessingSupport: boolean;
  unitCostUsd: number;
  fieldFailureRatePct: number;
}

export interface ProprietaryHardwareProposal {
  proposalId: string;
  hardwareCodename: string;
  validatedNeedUnmetByPartners: boolean;
  unmetNeedDescription: string;
  projectedBomCostUsd: number;
  certificationCostUsd: number;
  expectedAnnualRmaRatePct: number;
  projectedVolumeUnits: number;
}

export interface HardwareEvaluationVerdict {
  verdictId: string;
  proposalId: string;
  approvedForCustomManufacturing: boolean;
  rejectionReason?: string;
  recommendedSolution: 'adopt_certified_partner_terminal' | 'proceed_with_custom_hardware_rfp';
  activeTerminalArchitecture: 'partner_managed' | 'custom_proprietary';
  lifecycleEconomics: {
    partnerTerminalTco3Yr: number;
    customHardwareTco3Yr: number;
    lifecycleSavingsUsd: number;
  };
  evaluatedAt: string;
}

export interface TerminalHealthStatus {
  operational: boolean;
  batteryPct: number;
  tamperSensorOk: boolean;
  pciPtsValid: boolean;
  alerts: string[];
}

/**
 * Evaluates whether custom proprietary payment terminals are justified against certified partner integrations.
 * Rejects custom hardware if certified devices satisfy operational needs or if partner TCO is lower.
 */
export function evaluatePaymentHardwareStrategy(
  proposal: ProprietaryHardwareProposal,
  partnerDevice: CertifiedPartnerDevice
): HardwareEvaluationVerdict {
  const verdictId = `hrd_eval_${Date.now()}`;
  const evaluatedAt = new Date().toISOString();

  // 3-Year Total Cost of Ownership (TCO) calculations per unit
  // Partner: unit cost + failure replacements (3 yrs) + minimal ecosystem fee ($40/yr)
  const partnerReplacementsCost = partnerDevice.unitCostUsd * (partnerDevice.fieldFailureRatePct / 100) * 3;
  const partnerTerminalTco3Yr = Math.round((partnerDevice.unitCostUsd + partnerReplacementsCost + 120) * 100) / 100;

  // Custom hardware: BOM + amortized certification ($/unit) + RMA servicing + firmware & compliance support ($150/yr)
  const amortizedCertPerUnit = proposal.projectedVolumeUnits > 0 ? proposal.certificationCostUsd / proposal.projectedVolumeUnits : 1000;
  const customRmaCost = proposal.projectedBomCostUsd * (proposal.expectedAnnualRmaRatePct / 100) * 3;
  const customHardwareTco3Yr = Math.round((proposal.projectedBomCostUsd + amortizedCertPerUnit + customRmaCost + 450) * 100) / 100;

  const lifecycleSavingsUsd = Math.round((partnerTerminalTco3Yr - customHardwareTco3Yr) * 100) / 100;

  // Gate 1: Demonstrable unmet operational need
  if (!proposal.validatedNeedUnmetByPartners) {
    return {
      verdictId,
      proposalId: proposal.proposalId,
      approvedForCustomManufacturing: false,
      rejectionReason:
        'VALIDATED_NEED_UNSATISFIED: Certified partner terminals (e.g. Stripe WisePOS E) fully satisfy required payment workflows. Custom manufacturing introduces unnecessary capital and supply-chain risk.',
      recommendedSolution: 'adopt_certified_partner_terminal',
      activeTerminalArchitecture: 'partner_managed',
      lifecycleEconomics: {
        partnerTerminalTco3Yr,
        customHardwareTco3Yr,
        lifecycleSavingsUsd,
      },
      evaluatedAt,
    };
  }

  // Gate 2: Full-lifecycle economics must beat approved partner integrations
  if (customHardwareTco3Yr >= partnerTerminalTco3Yr) {
    return {
      verdictId,
      proposalId: proposal.proposalId,
      approvedForCustomManufacturing: false,
      rejectionReason: `LIFECYCLE_ECONOMICS_UNFAVORABLE: Custom hardware 3-year TCO ($${customHardwareTco3Yr}) exceeds certified partner terminal TCO ($${partnerTerminalTco3Yr}) due to compliance, RMA, and certification overhead.`,
      recommendedSolution: 'adopt_certified_partner_terminal',
      activeTerminalArchitecture: 'partner_managed',
      lifecycleEconomics: {
        partnerTerminalTco3Yr,
        customHardwareTco3Yr,
        lifecycleSavingsUsd,
      },
      evaluatedAt,
    };
  }

  // Both gates passed: Custom manufacturing RFP approved
  return {
    verdictId,
    proposalId: proposal.proposalId,
    approvedForCustomManufacturing: true,
    recommendedSolution: 'proceed_with_custom_hardware_rfp',
    activeTerminalArchitecture: 'custom_proprietary',
    lifecycleEconomics: {
      partnerTerminalTco3Yr,
      customHardwareTco3Yr,
      lifecycleSavingsUsd,
    },
    evaluatedAt,
  };
}

/**
 * Performs terminal runtime health verification, inspecting tamper sensors, battery level,
 * and PCI PTS certificate validity.
 */
export function checkTerminalHealth(telemetry: {
  deviceId: string;
  firmwareVersion: string;
  batteryPct: number;
  tamperSensorTriggered: boolean;
  pciPtsExpiryYear: number;
}): TerminalHealthStatus {
  const currentYear = new Date().getFullYear();
  const alerts: string[] = [];

  if (telemetry.tamperSensorTriggered) {
    alerts.push('SECURITY_ALERT: Physical tamper sensor triggered. Terminal locked per PCI-PTS mandate.');
  }

  if (telemetry.pciPtsExpiryYear < currentYear) {
    alerts.push('COMPLIANCE_ALERT: PCI-PTS certification has expired. Terminal must be decommissioned.');
  }

  if (telemetry.batteryPct < 15) {
    alerts.push('HARDWARE_ALERT: Battery level below 15%. Connect dock immediately.');
  }

  const operational = !telemetry.tamperSensorTriggered && telemetry.pciPtsExpiryYear >= currentYear && telemetry.batteryPct > 5;

  return {
    operational,
    batteryPct: telemetry.batteryPct,
    tamperSensorOk: !telemetry.tamperSensorTriggered,
    pciPtsValid: telemetry.pciPtsExpiryYear >= currentYear,
    alerts,
  };
}
