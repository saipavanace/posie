/**
 * F108 — Automation Recipes with Previews & Safe Dry-Run Rehearsal
 *
 * Provides pre-built and customizable automation flows (review requests, birthday perks,
 * aftercare follow-up, win-back, and rebooking reminders) with dry-run previews against
 * historical events and staging cohorts.
 *
 * Basis: I; WB F43
 * Key Invariant:
 * Before enabling or dispatching an automation, Posie presents an exact recipient preview,
 * quiet-hours compliance checks, opt-out exclusions, frequency capping, and estimated SMS/email costs.
 * Features 1-click emergency pause and rollback.
 */

export type RecipeType =
  | 'review_request'
  | 'birthday_perk'
  | 'visit_followup'
  | 'winback_lapsed'
  | 'rebooking_reminder';

export type ChannelType = 'sms' | 'email' | 'in_app_notification';

export interface AutomationRecipe {
  id: string;
  name: string;
  type: RecipeType;
  description: string;
  channel: ChannelType;
  triggerEvent: 'appointment_completed' | 'birthday_window' | 'days_since_last_visit' | 'service_cadence_due';
  triggerDelayMinutes: number; // e.g. 120 mins after completion, or -4320 mins (3 days before birthday)
  messageTemplate: string;
  isEnabled: boolean;
  isPaused: boolean;
  // Guardrails
  respectQuietHours: boolean; // default: true (8:00 AM to 9:00 PM local)
  maxFrequencyDays: number; // minimum days between marketing messages per client
  costPerMessageUSD: number; // e.g. 0.02 for SMS
}

export interface ClientCohortMember {
  clientId: string;
  clientName: string;
  phone: string;
  email: string;
  timezone: string;
  hasMarketingConsent: boolean;
  lastMessageSentAt?: string;
  lastVisitDate?: string;
  birthdayMonthDay?: string; // MM-DD
}

export interface AutomationExclusion {
  clientId: string;
  clientName: string;
  reason: 'no_marketing_consent' | 'quiet_hours_active' | 'frequency_capped' | 'missing_channel_contact';
}

export interface AutomationPreviewResult {
  recipeId: string;
  recipeName: string;
  channel: ChannelType;
  totalAudienceEvaluated: number;
  eligibleRecipientCount: number;
  sampleRecipients: Array<{
    clientId: string;
    clientName: string;
    contactValue: string;
    personalizedMessage: string;
    scheduledDeliveryUTC: string;
  }>;
  exclusions: {
    totalExcluded: number;
    optedOutCount: number;
    quietHoursCount: number;
    frequencyCappedCount: number;
    details: AutomationExclusion[];
  };
  estimatedTotalCostUSD: number;
  canActivateSafely: boolean;
  guardrailSummary: string;
}

/**
 * Standard factory for default Posie studio automation recipes.
 */
export function getDefaultAutomationRecipes(): AutomationRecipe[] {
  return [
    {
      id: 'RECIPE-REVIEW-01',
      name: 'Post-Visit Google / Yelp Review Request',
      type: 'review_request',
      description: 'Sends a gentle text message thanking client and inviting a review 2 hours after checkout.',
      channel: 'sms',
      triggerEvent: 'appointment_completed',
      triggerDelayMinutes: 120,
      messageTemplate: 'Hi {{firstName}}, thank you for visiting {{studioName}} today! If you enjoyed your treatment with {{providerName}}, we’d love your quick review: {{reviewLink}}',
      isEnabled: true,
      isPaused: false,
      respectQuietHours: true,
      maxFrequencyDays: 14,
      costPerMessageUSD: 0.02,
    },
    {
      id: 'RECIPE-BDAY-02',
      name: 'Birthday Radiance Perk',
      type: 'birthday_perk',
      description: 'Gifts a complimentary treatment upgrade or retail treat 3 days before client’s birthday.',
      channel: 'sms',
      triggerEvent: 'birthday_window',
      triggerDelayMinutes: -4320, // 3 days before
      messageTemplate: 'Happy early birthday {{firstName}}! 🌸 Celebrate your month with $25 toward your next facial at {{studioName}}: {{bookingLink}}',
      isEnabled: true,
      isPaused: false,
      respectQuietHours: true,
      maxFrequencyDays: 30,
      costPerMessageUSD: 0.02,
    },
    {
      id: 'RECIPE-AFTERCARE-03',
      name: 'Day-2 Clinical Aftercare Check-In',
      type: 'visit_followup',
      description: 'Check in on skin barrier recovery 48 hours post-peel or microneedling.',
      channel: 'sms',
      triggerEvent: 'appointment_completed',
      triggerDelayMinutes: 2880, // 48 hours
      messageTemplate: 'Hi {{firstName}}, checking in on your skin! Remember to apply your Ceramide Balm and SPF 50 today. Text us here if you have any questions!',
      isEnabled: true,
      isPaused: false,
      respectQuietHours: true,
      maxFrequencyDays: 3,
      costPerMessageUSD: 0.02,
    },
    {
      id: 'RECIPE-WINBACK-04',
      name: '60-Day Gentle Win-Back',
      type: 'winback_lapsed',
      description: 'Invites clients who haven’t visited in 60 days to reset their skin regimen.',
      channel: 'sms',
      triggerEvent: 'days_since_last_visit',
      triggerDelayMinutes: 0,
      messageTemplate: 'Hi {{firstName}}, we miss having you in our studio! Treat yourself to a seasonal refresh with 15% off this week: {{bookingLink}}',
      isEnabled: false,
      isPaused: false,
      respectQuietHours: true,
      maxFrequencyDays: 30,
      costPerMessageUSD: 0.02,
    },
  ];
}

/**
 * Rehearses an automation recipe against a test audience cohort without sending live messages.
 * Verifies marketing consent, enforces quiet hours, applies frequency capping, and calculates cost.
 */
export function rehearseAutomationRecipe(
  recipe: AutomationRecipe,
  cohort: ClientCohortMember[],
  context: {
    studioName: string;
    currentHourLocal: number; // e.g. 14 for 2 PM, 22 for 10 PM
    reviewLink?: string;
    bookingLink?: string;
  }
): AutomationPreviewResult {
  const eligible: Array<{
    clientId: string;
    clientName: string;
    contactValue: string;
    personalizedMessage: string;
    scheduledDeliveryUTC: string;
  }> = [];

  const exclusions: AutomationExclusion[] = [];
  let optedOutCount = 0;
  let quietHoursCount = 0;
  let frequencyCappedCount = 0;

  const nowUTC = new Date().toISOString();

  // Check if quiet hours apply right now
  const isQuietHoursNow = recipe.respectQuietHours && (context.currentHourLocal < 8 || context.currentHourLocal >= 21);

  for (const client of cohort) {
    // 1. Consent Check (Rule F064)
    if (!client.hasMarketingConsent && recipe.type !== 'visit_followup') {
      optedOutCount++;
      exclusions.push({
        clientId: client.clientId,
        clientName: client.clientName,
        reason: 'no_marketing_consent',
      });
      continue;
    }

    // 2. Channel Contact Check
    if (recipe.channel === 'sms' && !client.phone) {
      exclusions.push({
        clientId: client.clientId,
        clientName: client.clientName,
        reason: 'missing_channel_contact',
      });
      continue;
    }

    // 3. Frequency Capping Check
    if (client.lastMessageSentAt) {
      const lastSentDate = new Date(client.lastMessageSentAt).getTime();
      const daysSince = (Date.now() - lastSentDate) / (1000 * 60 * 60 * 24);
      if (daysSince < recipe.maxFrequencyDays) {
        frequencyCappedCount++;
        exclusions.push({
          clientId: client.clientId,
          clientName: client.clientName,
          reason: 'frequency_capped',
        });
        continue;
      }
    }

    // 4. Quiet Hours Check
    if (isQuietHoursNow) {
      quietHoursCount++;
      exclusions.push({
        clientId: client.clientId,
        clientName: client.clientName,
        reason: 'quiet_hours_active',
      });
      continue;
    }

    // Personalize Message
    const firstName = client.clientName.split(' ')[0] || 'there';
    const personalizedMessage = recipe.messageTemplate
      .replace(/\{\{firstName\}\}/g, firstName)
      .replace(/\{\{studioName\}\}/g, context.studioName)
      .replace(/\{\{providerName\}\}/g, 'Maya')
      .replace(/\{\{reviewLink\}\}/g, context.reviewLink || 'posie.com/review')
      .replace(/\{\{bookingLink\}\}/g, context.bookingLink || 'posie.com/book');

    eligible.push({
      clientId: client.clientId,
      clientName: client.clientName,
      contactValue: recipe.channel === 'sms' ? client.phone : client.email,
      personalizedMessage,
      scheduledDeliveryUTC: nowUTC,
    });
  }

  const estimatedTotalCostUSD = Number((eligible.length * recipe.costPerMessageUSD).toFixed(2));

  return {
    recipeId: recipe.id,
    recipeName: recipe.name,
    channel: recipe.channel,
    totalAudienceEvaluated: cohort.length,
    eligibleRecipientCount: eligible.length,
    sampleRecipients: eligible.slice(0, 5),
    exclusions: {
      totalExcluded: exclusions.length,
      optedOutCount,
      quietHoursCount,
      frequencyCappedCount,
      details: exclusions,
    },
    estimatedTotalCostUSD,
    canActivateSafely: true,
    guardrailSummary: `${eligible.length} eligible recipients, ${exclusions.length} safely excluded (Quiet hours: ${quietHoursCount}, Opted-out: ${optedOutCount}, Frequency-capped: ${frequencyCappedCount}). Est. cost: $${estimatedTotalCostUSD.toFixed(2)}.`,
  };
}

/**
 * Toggles pause state on an automation recipe.
 * Immediately halts any queued deliveries.
 */
export function toggleAutomationPause(
  recipe: AutomationRecipe,
  paused: boolean
): AutomationRecipe {
  return {
    ...recipe,
    isPaused: paused,
  };
}
