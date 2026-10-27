import { z } from 'zod';

export const AftercareStepSchema = z.object({
  stepNumber: z.number().int().positive(),
  title: z.string().min(1),
  instruction: z.string().min(1),
  timingWindow: z.string().min(1),
  doNotDoWarning: z.string().optional(),
});

export type AftercareStep = z.infer<typeof AftercareStepSchema>;

export const AftercareTemplateSchema = z.object({
  id: z.string().uuid(),
  serviceId: z.string().uuid(),
  serviceName: z.string().min(1),
  instructions: z.array(AftercareStepSchema).min(1, 'At least one aftercare step is required'),
  practitionerApprovedStaffId: z.string().uuid().optional(),
  approvedAt: z.string().datetime().optional(),
  emergencyContactRoute: z.string().min(1, 'A direct practitioner contact route is required'),
  version: z.number().int().positive().default(1),
  updatedAt: z.string().datetime(),
});

export type AftercareTemplate = z.infer<typeof AftercareTemplateSchema>;

export const AftercareDeliveryRecordSchema = z.object({
  id: z.string().uuid(),
  templateId: z.string().uuid(),
  serviceId: z.string().uuid(),
  appointmentId: z.string().uuid(),
  clientId: z.string().uuid(),
  deliveredByStaffId: z.string().uuid(),
  deliveryMethod: z.enum(['sms', 'email', 'portal']),
  recipientDestination: z.string().min(1),
  deliveredAt: z.string().datetime(),
  /** Frozen snapshot of instructions delivered at this specific timestamp */
  snapshotInstructions: z.array(AftercareStepSchema),
  directContactRoute: z.string(),
});

export type AftercareDeliveryRecord = z.infer<typeof AftercareDeliveryRecordSchema>;

/**
 * Creates a new service aftercare template.
 */
export function createAftercareTemplate(params: {
  id?: string;
  serviceId: string;
  serviceName: string;
  instructions: AftercareStep[];
  emergencyContactRoute: string;
}): AftercareTemplate {
  return AftercareTemplateSchema.parse({
    id: params.id || '30000000-0000-0000-0000-000000000037',
    serviceId: params.serviceId,
    serviceName: params.serviceName,
    instructions: params.instructions,
    emergencyContactRoute: params.emergencyContactRoute,
    version: 1,
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Approves an aftercare protocol by a qualified practitioner.
 */
export function approveAftercareTemplate(
  template: AftercareTemplate,
  staffId: string
): AftercareTemplate {
  return AftercareTemplateSchema.parse({
    ...template,
    practitionerApprovedStaffId: staffId,
    approvedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Delivers approved aftercare to a client following an appointment.
 * INVARIANT: Unapproved aftercare instructions cannot be dispatched.
 * INVARIANT: Delivered record stores an immutable snapshot; subsequent template revisions will not rewrite this record.
 */
export function deliverAftercare(params: {
  deliveryId?: string;
  template: AftercareTemplate;
  appointmentId: string;
  clientId: string;
  deliveredByStaffId: string;
  deliveryMethod: 'sms' | 'email' | 'portal';
  recipientDestination: string;
}): AftercareDeliveryRecord {
  if (!params.template.practitionerApprovedStaffId || !params.template.approvedAt) {
    throw new Error(
      'Cannot deliver aftercare: The instructions must be approved by a qualified practitioner before sending.'
    );
  }

  return AftercareDeliveryRecordSchema.parse({
    id: params.deliveryId || '40000000-0000-0000-0000-000000000037',
    templateId: params.template.id,
    serviceId: params.template.serviceId,
    appointmentId: params.appointmentId,
    clientId: params.clientId,
    deliveredByStaffId: params.deliveredByStaffId,
    deliveryMethod: params.deliveryMethod,
    recipientDestination: params.recipientDestination,
    deliveredAt: new Date().toISOString(),
    snapshotInstructions: params.template.instructions,
    directContactRoute: params.template.emergencyContactRoute,
  });
}
