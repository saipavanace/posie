/**
 * F196: Task Mastery Learning in a Safe Demo
 *
 * Provides short, role-specific practice tasks inside fictional sandbox data with instant feedback
 * on completing bookings, schedule adjustments, form reviews, and checkout reconciliation.
 * Invariant: Operates in strict isolation; practice cannot message real clients, charge real cards,
 * or count toward operational performance; explicitly disclaims clinical or professional licensure.
 */

export type DemoPracticeRole = 'receptionist' | 'solo_esthetician' | 'salon_manager' | 'clinical_nurse';

export interface PracticeTaskScenario {
  taskId: string;
  role: DemoPracticeRole;
  title: string;
  instructions: string;
  targetObjective: string;
  requiredActions: string[];
}

export interface PracticeTaskSubmission {
  taskId: string;
  completedActions: string[];
  executionNotes?: string;
}

export interface PracticeTaskEvaluation {
  taskId: string;
  role: DemoPracticeRole;
  isPassed: boolean;
  scorePercentage: number;
  completedStepsCount: number;
  totalRequiredSteps: number;
  missingActions: string[];
  feedbackMessage: string;
  sandboxIsolationEnforced: true;
  licensureDisclaimer: string;
}

export const DEMO_PRACTICE_SCENARIOS: Record<string, PracticeTaskScenario> = {
  reschedule_appointment: {
    taskId: 'reschedule_appointment',
    role: 'receptionist',
    title: 'Reschedule an Overlapping Appointment',
    instructions: 'Client requests moving a Hydra-Dew Facial from 10:00 to 14:00. Verify room availability, adjust time, and check buffer.',
    targetObjective: 'Move slot without creating a calendar double-booking conflict.',
    requiredActions: ['verify_chair_availability', 'select_new_time_slot', 'confirm_reschedule_with_client'],
  },
  clinical_soap_sign: {
    taskId: 'clinical_soap_sign',
    role: 'clinical_nurse',
    title: 'Review and Sign Treatment Chart',
    instructions: 'Review SOAP treatment note draft for chemical peel, ensure skin assessment is complete, and apply professional signature.',
    targetObjective: 'Sign and lock chart draft into immutable record.',
    requiredActions: ['review_objective_assessment', 'verify_patch_test_clearance', 'sign_with_license_number'],
  },
  daily_cash_close: {
    taskId: 'daily_cash_close',
    role: 'salon_manager',
    title: 'Reconcile Register Cash Variance',
    instructions: 'Identify cash count discrepancy at close of day, enter explanation note, and submit daily close report.',
    targetObjective: 'Finalize daily drawer without unresolved blocking flags.',
    requiredActions: ['input_physical_cash_count', 'record_explained_variance_note', 'finalize_drawer_settlement'],
  },
};

export const DEMO_LICENSURE_DISCLAIMER =
  'DEMO SANDBOX NOTICE: Practice tasks evaluate application navigation only. Task completion does not imply professional, legal, or medical licensure competence.';

/**
 * Evaluates a user's practice task submission against expected actions inside safe fictional sandbox data.
 */
export function evaluateDemoPracticeTask(
  scenario: PracticeTaskScenario,
  submission: PracticeTaskSubmission
): PracticeTaskEvaluation {
  const missingActions = scenario.requiredActions.filter(
    (action) => !submission.completedActions.includes(action)
  );

  const totalRequired = scenario.requiredActions.length;
  const completedCount = totalRequired - missingActions.length;
  const scorePercentage = Math.round((completedCount / totalRequired) * 100);
  const isPassed = missingActions.length === 0;

  const feedbackMessage = isPassed
    ? `Task Mastered! Successfully executed all ${totalRequired} steps for '${scenario.title}' in the demo sandbox.`
    : `Incomplete: Missing required actions: ${missingActions.join(', ')}. Review instructions and try again.`;

  return {
    taskId: scenario.taskId,
    role: scenario.role,
    isPassed,
    scorePercentage,
    completedStepsCount: completedCount,
    totalRequiredSteps: totalRequired,
    missingActions,
    feedbackMessage,
    sandboxIsolationEnforced: true,
    licensureDisclaimer: DEMO_LICENSURE_DISCLAIMER,
  };
}
