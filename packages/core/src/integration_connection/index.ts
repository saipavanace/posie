/**
 * F133 — Integration Connection Center
 *
 * Exposes connection telemetry, authorized scopes, synchronization freshness,
 * retry queues, and self-service reconnection workflows for external platform services.
 *
 * KEY INVARIANT (Basis: I; Integration Usability, WB F67):
 * Delayed Data Impact Disclosure.
 * "A disconnected integration shows what data may be delayed."
 * Whenever an integration enters a disconnected, token-expired, or degraded state,
 * the system explicitly surfaces the exact data flows and external dashboards currently
 * lagging behind, preventing silent data discrepancies.
 */

export type IntegrationServiceId =
  | 'quickbooks_online'
  | 'stripe_terminal'
  | 'twilio_sms'
  | 'google_calendar'
  | 'zapier_webhooks';

export type IntegrationStatus = 'connected' | 'degraded' | 'disconnected' | 'token_expired';

export interface ExternalIntegrationState {
  serviceId: IntegrationServiceId;
  displayName: string;
  category: 'accounting' | 'payments' | 'telephony' | 'calendar' | 'automation';
  status: IntegrationStatus;
  authorizedScopes: string[];
  lastSyncTimestampUtc?: string;
  pendingRetryQueueCount: number;
  /** Explicit warning of what external records or client communications are delayed */
  delayedDataImpactDescription?: string;
  lastErrorMessage?: string;
  reconnectEndpoint: string;
}

export interface IntegrationCenterOverview {
  studioId: string;
  totalIntegrationsCount: number;
  healthyCount: number;
  degradedOrOfflineCount: number;
  hasCriticalDisconnections: boolean;
  integrations: ExternalIntegrationState[];
  actionRequiredSummary: string[];
}

/**
 * Standard integrations baseline for Posie Studio OS.
 */
export const DEFAULT_INTEGRATION_TEMPLATES: Record<IntegrationServiceId, Omit<ExternalIntegrationState, 'lastSyncTimestampUtc' | 'status' | 'pendingRetryQueueCount'>> = {
  quickbooks_online: {
    serviceId: 'quickbooks_online',
    displayName: 'QuickBooks Online',
    category: 'accounting',
    authorizedScopes: ['com.intuit.quickbooks.accounting'],
    reconnectEndpoint: '/api/integrations/qbo/oauth/connect',
  },
  stripe_terminal: {
    serviceId: 'stripe_terminal',
    displayName: 'Stripe Terminal (WisePOS E)',
    category: 'payments',
    authorizedScopes: ['terminal.hardware.read', 'payments.write'],
    reconnectEndpoint: '/api/integrations/stripe/terminal/pair',
  },
  twilio_sms: {
    serviceId: 'twilio_sms',
    displayName: 'Twilio SMS & A2P 10DLC',
    category: 'telephony',
    authorizedScopes: ['messages:send', 'phone_numbers:read'],
    reconnectEndpoint: '/api/integrations/twilio/reconnect',
  },
  google_calendar: {
    serviceId: 'google_calendar',
    displayName: 'Google Calendar Two-Way Sync',
    category: 'calendar',
    authorizedScopes: ['https://www.googleapis.com/auth/calendar.events'],
    reconnectEndpoint: '/api/integrations/google/oauth/connect',
  },
  zapier_webhooks: {
    serviceId: 'zapier_webhooks',
    displayName: 'Zapier Automation Hooks',
    category: 'automation',
    authorizedScopes: ['webhooks.read', 'webhooks.write'],
    reconnectEndpoint: '/api/integrations/zapier/settings',
  },
};

/**
 * Evaluates the studio's integration connection health and compiles delayed data disclosures.
 */
export function compileIntegrationCenterOverview(
  studioId: string,
  states: ExternalIntegrationState[]
): IntegrationCenterOverview {
  let healthyCount = 0;
  let degradedOrOfflineCount = 0;
  let hasCriticalDisconnections = false;
  const actionRequiredSummary: string[] = [];

  const evaluatedIntegrations = states.map((state) => {
    let delayedDataImpactDescription: string | undefined = undefined;

    if (state.status !== 'connected') {
      degradedOrOfflineCount++;

      switch (state.serviceId) {
        case 'quickbooks_online':
          delayedDataImpactDescription =
            'Daily sales journal entries and sales tax liability accounts are lagging in QuickBooks. Historical reports in Posie remain unaffected.';
          actionRequiredSummary.push('QuickBooks Online disconnected: Click to refresh Intuit OAuth token.');
          break;
        case 'stripe_terminal':
          delayedDataImpactDescription =
            'WisePOS E card reader pairing lost. In-person tap/chip transactions temporarily paused; manual entry or mobile wallet links active.';
          hasCriticalDisconnections = true;
          actionRequiredSummary.push('Stripe Terminal offline: Re-pair physical card reader.');
          break;
        case 'twilio_sms':
          delayedDataImpactDescription =
            'Carrier messaging delayed. Client transactional appointment reminders queued in retry buffer.';
          hasCriticalDisconnections = true;
          actionRequiredSummary.push('Twilio carrier alert: Check A2P 10DLC sender status.');
          break;
        case 'google_calendar':
          delayedDataImpactDescription =
            'Two-way calendar sync paused. Personal practitioner calendar busy blocks are not refreshing in Posie.';
          actionRequiredSummary.push('Google Calendar authorization expired: Re-authenticate Google account.');
          break;
        case 'zapier_webhooks':
          delayedDataImpactDescription =
            'Outbound Zapier webhook events queued in retry pool. External CRM updates delayed.';
          break;
      }
    } else {
      healthyCount++;
    }

    return {
      ...state,
      delayedDataImpactDescription: delayedDataImpactDescription || state.delayedDataImpactDescription,
    };
  });

  return {
    studioId,
    totalIntegrationsCount: states.length,
    healthyCount,
    degradedOrOfflineCount,
    hasCriticalDisconnections,
    integrations: evaluatedIntegrations,
    actionRequiredSummary,
  };
}
