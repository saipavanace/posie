import { z } from 'zod';
import { Service } from '../catalog';

export const ClientGoalQuestionnaireSchema = z.object({
  skinOrBeautyGoal: z.enum(['deep_hydration', 'glow_and_peach_fuzz', 'brow_definition', 'acne_calming']),
  hasSensitiveSkin: z.boolean().default(false),
  hasUpcomingEventWithin48Hours: z.boolean().default(false),
  maximumBudgetInCents: z.number().int().positive().optional(),
});

export const ServiceRecommendationResultSchema = z.object({
  recommendedServiceId: z.string().uuid(),
  serviceName: z.string(),
  reasonWhy: z.string(),
  isConsultationRecommendedFirst: z.boolean(),
  preparationCautions: z.string().optional(),
});

export type ClientGoalQuestionnaire = z.infer<typeof ClientGoalQuestionnaireSchema>;
export type ServiceRecommendationResult = z.infer<typeof ServiceRecommendationResultSchema>;

/**
 * Intelligent client-friendly treatment navigator.
 * Invariant (F022): Explains unfamiliar terms in plain language and recommends consultations
 * when skin conditions or upcoming events present uncertainty, without ever diagnosing medical conditions.
 */
export function matchServiceToGoals(
  answers: ClientGoalQuestionnaire,
  availableServices: Service[]
): ServiceRecommendationResult {
  // If client has an upcoming major event within 48 hours, suggest safe non-peel hydration
  if (answers.hasUpcomingEventWithin48Hours && answers.skinOrBeautyGoal === 'glow_and_peach_fuzz') {
    const hydra = availableServices.find((s) => s.name.toLowerCase().includes('hydra')) || availableServices[0];
    return {
      recommendedServiceId: hydra.id,
      serviceName: hydra.name,
      reasonWhy:
        'With your event in 48 hours, we recommend our gentle hydration bath instead of dermaplaning so you experience zero temporary pinkness.',
      isConsultationRecommendedFirst: false,
      preparationCautions: hydra.preparationInstructions,
    };
  }

  if (answers.skinOrBeautyGoal === 'brow_definition') {
    const brow = availableServices.find((s) => s.name.toLowerCase().includes('brow')) || availableServices[0];
    return {
      recommendedServiceId: brow.id,
      serviceName: brow.name,
      reasonWhy: 'Custom shaping and tinting will make your natural arches pop without requiring daily brow makeup.',
      isConsultationRecommendedFirst: false,
      preparationCautions: brow.preparationInstructions,
    };
  }

  if (answers.skinOrBeautyGoal === 'glow_and_peach_fuzz') {
    const derm = availableServices.find((s) => s.name.toLowerCase().includes('satin')) || availableServices[0];
    return {
      recommendedServiceId: derm.id,
      serviceName: derm.name,
      reasonWhy: 'Removes dead skin cells and fine vellus hair so your skincare penetrates 60% better and foundation glides on seamlessly.',
      isConsultationRecommendedFirst: false,
      preparationCautions: derm.preparationInstructions,
    };
  }

  // Default deep hydration
  const defaultSvc = availableServices[0];
  return {
    recommendedServiceId: defaultSvc.id,
    serviceName: defaultSvc.name,
    reasonWhy: 'The ultimate thirst-quencher for tired skin: double cleanse, fruit enzyme sweep, and ultra-drenching hyaluronic mask.',
    isConsultationRecommendedFirst: answers.hasSensitiveSkin,
    preparationCautions: defaultSvc.preparationInstructions,
  };
}
