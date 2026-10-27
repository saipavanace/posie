import { z } from 'zod';

export const DemoBusinessSchema = z.object({
  id: z.string().uuid(),
  isDemoTenant: z.literal(true),
  name: z.string(),
  fictionalClients: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
      isFictional: z.literal(true),
    })
  ),
  fictionalAppointments: z.array(
    z.object({
      id: z.string().uuid(),
      clientName: z.string(),
      serviceName: z.string(),
      dateFormatted: z.string(),
      priceInCents: z.number(),
    })
  ),
});

export type DemoBusiness = z.infer<typeof DemoBusinessSchema>;

/**
 * Creates isolated demo sandbox business records for safe hands-on exploration.
 * Invariant (F012): Actions performed in demo business are strictly isolated:
 * they never dispatch real client messages, never move live money, and are excluded from production analytics.
 */
export function createDemoSandbox(): DemoBusiness {
  return {
    id: '00000000-0000-0000-0000-000000000001',
    isDemoTenant: true,
    name: 'Posie Demo Atelier (Fictional Sandbox)',
    fictionalClients: [
      {
        id: '11111111-0000-0000-0000-000000000001',
        name: 'Jane Doe (Demo Client)',
        email: 'jane.demo@example.com',
        phone: '+1-555-0101',
        isFictional: true,
      },
      {
        id: '11111111-0000-0000-0000-000000000002',
        name: 'Lily Green (Demo Client)',
        email: 'lily.demo@example.com',
        phone: '+1-555-0102',
        isFictional: true,
      },
    ],
    fictionalAppointments: [
      {
        id: '22222222-0000-0000-0000-000000000001',
        clientName: 'Jane Doe (Demo Client)',
        serviceName: 'Hydra-Dew Glass Glow Facial',
        dateFormatted: 'Tomorrow at 10:00 AM',
        priceInCents: 12000,
      },
    ],
  };
}

/**
 * Guard ensuring demo transactions or messages are never sent to external networks.
 */
export function assertSafeDemoAction(isDemoTenant: boolean): { canDispatchLiveEvents: boolean } {
  return {
    canDispatchLiveEvents: !isDemoTenant,
  };
}
