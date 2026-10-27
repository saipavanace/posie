import { z } from 'zod';

export const MessageVariableSchema = z.object({
  clientFirstName: z.string().min(1, 'Client first name is required'),
  serviceName: z.string().min(1, 'Service name is required'),
  appointmentDateFormatted: z.string().min(1, 'Appointment date is required'),
  appointmentTimeFormatted: z.string().min(1, 'Appointment time is required'),
  specialistName: z.string().min(1, 'Specialist name is required'),
  depositPaidFormatted: z.string().min(1, 'Deposit amount is required'),
  remainingBalanceFormatted: z.string().min(1, 'Remaining balance is required'),
  prepSummary: z.string().optional(),
  portalLink: z.string().url('Portal link must be a valid URL'),
  businessName: z.string().min(1),
  businessPhone: z.string().min(7),
});

export type MessageVariables = z.infer<typeof MessageVariableSchema>;

export type MessageTemplateType =
  | 'confirmation'
  | 'reschedule'
  | 'aftercare'
  | 'snippet_reply';

export const MESSAGE_TEMPLATES: Record<MessageTemplateType, string> = {
  confirmation:
    "Hey {{clientFirstName}}! ✨ You're all set for {{serviceName}} on {{appointmentDateFormatted}} at {{appointmentTimeFormatted}} with {{specialistName}}. Your deposit of {{depositPaidFormatted}} is locked in. Reminder: {{prepSummary}} See your visit details or adjust anytime: {{portalLink}} Can't wait to see you! — {{businessName}}",

  reschedule:
    "Hey {{clientFirstName}}! We've successfully shifted your {{serviceName}} to {{appointmentDateFormatted}} at {{appointmentTimeFormatted}} with {{specialistName}}. View your updated details here: {{portalLink}} — {{businessName}}",

  aftercare:
    "Hey {{clientFirstName}}! How are you glowing after your {{serviceName}} today? Remember to keep your skin hydrated and avoid direct sun today. Any questions? Text us at {{businessPhone}}! — {{businessName}}",

  snippet_reply:
    "Hi {{clientFirstName}}! Thanks so much for reaching out to {{businessName}}. We'd love to take care of you. Check out our real-time availability here: {{portalLink}} 💕",
};

/**
 * Validates and compiles a message template with provided variables.
 * Invariant (F007): Throws descriptive validation errors if variables are missing
 * so no broken template tokens (e.g. {{clientFirstName}}) are ever dispatched to clients.
 */
export function compileMessage(
  type: MessageTemplateType,
  variables: MessageVariables
): { compiledText: string; templateType: MessageTemplateType } {
  // Validate schema
  MessageVariableSchema.parse(variables);

  const rawTemplate = MESSAGE_TEMPLATES[type];

  // Regex check to replace placeholders
  const compiled = rawTemplate.replace(/\{\{(\w+)\}\}/g, (match, key: keyof MessageVariables) => {
    const val = variables[key];
    if (val === undefined || val === '') {
      return '';
    }
    return String(val);
  });

  // Check for any unreplaced tokens
  const unreplaced = compiled.match(/\{\{\w+\}\}/g);
  if (unreplaced && unreplaced.length > 0) {
    throw new Error(`Message compilation error: Unresolved tokens: ${unreplaced.join(', ')}`);
  }

  return {
    compiledText: compiled,
    templateType: type,
  };
}
