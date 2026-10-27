import { z } from 'zod';

export const FormRequirementTypeSchema = z.enum([
  'intake',
  'consent',
  'prep_guide',
]);

export type FormRequirementType = z.infer<typeof FormRequirementTypeSchema>;

export const ServiceFormRequirementSchema = z.object({
  serviceId: z.string().uuid(),
  serviceName: z.string().min(1),
  formId: z.string().uuid(),
  formTitle: z.string().min(1),
  formType: FormRequirementTypeSchema,
  reasonRequired: z.string().min(1),
});

export type ServiceFormRequirement = z.infer<typeof ServiceFormRequirementSchema>;

export const AppointmentFormBundleStatusSchema = z.object({
  appointmentId: z.string().uuid(),
  serviceIds: z.array(z.string().uuid()),
  isReady: z.boolean(),
  totalRequired: z.number().int().nonnegative(),
  completedCount: z.number().int().nonnegative(),
  satisfiedFormIds: z.array(z.string().uuid()),
  outstandingForms: z.array(
    z.object({
      formId: z.string().uuid(),
      formTitle: z.string(),
      formType: FormRequirementTypeSchema,
      reasonRequired: z.string(),
      serviceNames: z.array(z.string()),
    })
  ),
});

export type AppointmentFormBundleStatus = z.infer<
  typeof AppointmentFormBundleStatusSchema
>;

/**
 * Compiles the required document set for an appointment based on all booked services and add-ons.
 * INVARIANT: Deduplicates requirements across multiple services so clients are never asked
 * to complete the exact same intake questionnaire twice.
 */
export function compileAppointmentFormRequirements(
  serviceIds: string[],
  catalogRules: ServiceFormRequirement[]
): Array<{
  formId: string;
  formTitle: string;
  formType: FormRequirementType;
  reasonRequired: string;
  serviceNames: string[];
}> {
  const relevantRules = catalogRules.filter((r) => serviceIds.includes(r.serviceId));

  const bundleMap = new Map<
    string,
    {
      formId: string;
      formTitle: string;
      formType: FormRequirementType;
      reasonRequired: string;
      serviceNames: Set<string>;
    }
  >();

  for (const rule of relevantRules) {
    if (!bundleMap.has(rule.formId)) {
      bundleMap.set(rule.formId, {
        formId: rule.formId,
        formTitle: rule.formTitle,
        formType: rule.formType,
        reasonRequired: rule.reasonRequired,
        serviceNames: new Set([rule.serviceName]),
      });
    } else {
      bundleMap.get(rule.formId)!.serviceNames.add(rule.serviceName);
    }
  }

  return Array.from(bundleMap.values()).map((entry) => ({
    formId: entry.formId,
    formTitle: entry.formTitle,
    formType: entry.formType,
    reasonRequired: entry.reasonRequired,
    serviceNames: Array.from(entry.serviceNames),
  }));
}

/**
 * Evaluates the readiness of an appointment by comparing required documents against client's signed records.
 */
export function evaluateAppointmentFormReadiness(params: {
  appointmentId: string;
  serviceIds: string[];
  catalogRules: ServiceFormRequirement[];
  clientCompletedFormIds: string[];
}): AppointmentFormBundleStatus {
  const compiled = compileAppointmentFormRequirements(
    params.serviceIds,
    params.catalogRules
  );
  const completedSet = new Set(params.clientCompletedFormIds);

  const satisfiedFormIds: string[] = [];
  const outstandingForms: Array<{
    formId: string;
    formTitle: string;
    formType: FormRequirementType;
    reasonRequired: string;
    serviceNames: string[];
  }> = [];

  for (const item of compiled) {
    if (completedSet.has(item.formId)) {
      satisfiedFormIds.push(item.formId);
    } else {
      outstandingForms.push(item);
    }
  }

  return AppointmentFormBundleStatusSchema.parse({
    appointmentId: params.appointmentId,
    serviceIds: params.serviceIds,
    isReady: outstandingForms.length === 0,
    totalRequired: compiled.length,
    completedCount: satisfiedFormIds.length,
    satisfiedFormIds,
    outstandingForms,
  });
}

/**
 * Re-evaluates form requirements when an appointment's services change.
 * INVARIANT: Preserves previously satisfied forms and clearly highlights newly required forms.
 */
export function reevaluateOnServiceChange(params: {
  appointmentId: string;
  previousServiceIds: string[];
  newServiceIds: string[];
  catalogRules: ServiceFormRequirement[];
  clientCompletedFormIds: string[];
}): {
  previousStatus: AppointmentFormBundleStatus;
  newStatus: AppointmentFormBundleStatus;
  newlyRequiredForms: Array<{
    formId: string;
    formTitle: string;
    reasonRequired: string;
  }>;
} {
  const previousStatus = evaluateAppointmentFormReadiness({
    appointmentId: params.appointmentId,
    serviceIds: params.previousServiceIds,
    catalogRules: params.catalogRules,
    clientCompletedFormIds: params.clientCompletedFormIds,
  });

  const newStatus = evaluateAppointmentFormReadiness({
    appointmentId: params.appointmentId,
    serviceIds: params.newServiceIds,
    catalogRules: params.catalogRules,
    clientCompletedFormIds: params.clientCompletedFormIds,
  });

  const prevFormIds = new Set(
    compileAppointmentFormRequirements(
      params.previousServiceIds,
      params.catalogRules
    ).map((f) => f.formId)
  );

  const newlyRequiredForms = newStatus.outstandingForms
    .filter((f) => !prevFormIds.has(f.formId))
    .map((f) => ({
      formId: f.formId,
      formTitle: f.formTitle,
      reasonRequired: f.reasonRequired,
    }));

  return {
    previousStatus,
    newStatus,
    newlyRequiredForms,
  };
}
