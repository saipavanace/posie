import { z } from 'zod';

export const WorkspaceModuleFlagsSchema = z.object({
  soloPractitionerMode: z.boolean().default(true),
  teamManagementEnabled: z.boolean().default(false),
  retailInventoryEnabled: z.boolean().default(false),
  classesAndWorkshopsEnabled: z.boolean().default(false),
  boothRenterSeparationEnabled: z.boolean().default(false),
  clinicalChartingEnabled: z.boolean().default(false),
});

export type WorkspaceModuleFlags = z.infer<typeof WorkspaceModuleFlagsSchema>;

export type WorkspaceSection = 'schedule' | 'clients' | 'services' | 'team' | 'inventory' | 'classes' | 'settings';

/**
 * Calculates which workspace navigation sections are visible based on progressive feature flags.
 * Invariant (F010): Solo practitioners start with an uncluttered daily view (schedule, clients, services, settings)
 * and can complete bookings without seeing or configuring unrelated complex modules (team, inventory, classes).
 */
export function getVisibleWorkspaceSections(flags: WorkspaceModuleFlags): WorkspaceSection[] {
  const sections: WorkspaceSection[] = ['schedule', 'clients', 'services'];

  if (flags.teamManagementEnabled) {
    sections.push('team');
  }

  if (flags.retailInventoryEnabled) {
    sections.push('inventory');
  }

  if (flags.classesAndWorkshopsEnabled) {
    sections.push('classes');
  }

  sections.push('settings');
  return sections;
}

/**
 * Toggles an advanced module and updates the workspace configuration.
 */
export function toggleWorkspaceModule(
  current: WorkspaceModuleFlags,
  moduleKey: keyof WorkspaceModuleFlags,
  enabled: boolean
): WorkspaceModuleFlags {
  const updated = {
    ...current,
    [moduleKey]: enabled,
    soloPractitionerMode:
      moduleKey === 'teamManagementEnabled' && enabled ? false : current.soloPractitionerMode,
  };

  return WorkspaceModuleFlagsSchema.parse(updated);
}
