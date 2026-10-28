import { prisma } from "./client";
import { hashPassword } from "./auth";

async function main() {
  console.log("🌱 Starting Posie database seed...");

  // 1. Clean up existing tables
  await prisma.auditLog.deleteMany();
  await prisma.session.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.inventoryItem.deleteMany();
  await prisma.service.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();
  await prisma.salon.deleteMany();

  // 2. Create Flagship Salon
  const salon = await prisma.salon.create({
    data: {
      name: "Atelier Posie Manhattan",
      slug: "atelier-posie",
      currency: "USD",
      timezone: "America/New_York",
      phone: "+1 (212) 555-0199",
      email: "concierge@atelierposie.com",
      address: "432 Park Avenue, Suite 18B, New York, NY 10022",
    },
  });

  console.log(`✓ Created Salon: ${salon.name} (${salon.id})`);

  // 3. Create Seed Users
  const defaultPasswordHash = await hashPassword("password123");

  const owner = await prisma.user.create({
    data: {
      salonId: salon.id,
      email: "owner@atelierposie.com",
      passwordHash: defaultPasswordHash,
      name: "Elena Rostova",
      role: "OWNER",
      title: "Founder & Creative Director",
      phone: "+1 (212) 555-0101",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
  });

  const staff = await prisma.user.create({
    data: {
      salonId: salon.id,
      email: "staff@atelierposie.com",
      passwordHash: defaultPasswordHash,
      name: "Marcus Vance",
      role: "STAFF",
      title: "Master Aesthetician & Colorist",
      phone: "+1 (212) 555-0102",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
  });

  const boothRenter = await prisma.user.create({
    data: {
      salonId: salon.id,
      email: "renter@atelierposie.com",
      passwordHash: defaultPasswordHash,
      name: "Chloe Dubois",
      role: "BOOTH_RENTER",
      title: "Independent Lash & Brow Specialist (1099)",
      phone: "+1 (212) 555-0103",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    },
  });

  const clientUser = await prisma.user.create({
    data: {
      salonId: salon.id,
      email: "client@atelierposie.com",
      passwordHash: defaultPasswordHash,
      name: "Sophia Montgomery",
      role: "CLIENT",
      title: "VIP Member",
      phone: "+1 (212) 555-0104",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
  });

  console.log(`✓ Seeded 4 Users with role-based credentials (password: password123)`);

  // 4. Create Flagship Services
  const facial = await prisma.service.create({
    data: {
      salonId: salon.id,
      name: "Bespoke Biologique Recherche Facial",
      category: "Aesthetics",
      durationMinutes: 75,
      priceCents: 25000,
      depositRequiredCents: 5000,
      description: "Custom clinical lymphatic drainage, lactic acid exfoliation, cold-pressed oxygen infusion.",
      isActive: true,
    },
  });

  const balayage = await prisma.service.create({
    data: {
      salonId: salon.id,
      name: "Atelier Balayage & Gloss Finish",
      category: "Hair",
      durationMinutes: 120,
      priceCents: 32000,
      depositRequiredCents: 7500,
      description: "Hand-painted dimensional balayage followed by custom peptide gloss sealing.",
      isActive: true,
    },
  });

  const guaSha = await prisma.service.create({
    data: {
      salonId: salon.id,
      name: "Sculptural Gua Sha Face Lift",
      category: "Wellness",
      durationMinutes: 60,
      priceCents: 18000,
      depositRequiredCents: 4000,
      description: "Targeted fascial release with black obsidian stones and rosehip oil.",
      isActive: true,
    },
  });

  const haircut = await prisma.service.create({
    data: {
      salonId: salon.id,
      name: "Precision Dry Cut & Botanical Treatment",
      category: "Hair",
      durationMinutes: 50,
      priceCents: 14000,
      depositRequiredCents: 3000,
      description: "Dry tailored architectural cut with Japanese steam scalp detox.",
      isActive: true,
    },
  });

  console.log(`✓ Seeded 4 Core Services`);

  // 5. Create Clients
  const client1 = await prisma.client.create({
    data: {
      salonId: salon.id,
      firstName: "Sophia",
      lastName: "Montgomery",
      email: "sophia@example.com",
      phone: "+1 (212) 555-0104",
      patchTestStatus: "VERIFIED",
      preferredPronouns: "she/her",
      notes: "Prefers low lighting in treatment room. Sensitive skin around cheekbones.",
      totalVisits: 5,
      totalSpendCents: 124000,
    },
  });

  const client2 = await prisma.client.create({
    data: {
      salonId: salon.id,
      firstName: "Alexander",
      lastName: "Hayes",
      email: "alexander.hayes@example.com",
      phone: "+1 (917) 555-0182",
      patchTestStatus: "VERIFIED",
      preferredPronouns: "he/him",
      notes: "Double espresso on arrival. Executive haircut standing appointment.",
      totalVisits: 3,
      totalSpendCents: 48000,
    },
  });

  const client3 = await prisma.client.create({
    data: {
      salonId: salon.id,
      firstName: "Vivienne",
      lastName: "Laurent",
      email: "vivienne.laurent@example.com",
      phone: "+1 (646) 555-0199",
      patchTestStatus: "PENDING",
      preferredPronouns: "she/her",
      notes: "First time color client. Requires 48h patch test verification before tint.",
      totalVisits: 1,
      totalSpendCents: 25000,
    },
  });

  console.log(`✓ Seeded 3 Active Clients`);

  // 6. Create Appointments
  const today = new Date();
  const appointment1 = await prisma.appointment.create({
    data: {
      salonId: salon.id,
      clientId: client1.id,
      staffId: staff.id,
      serviceId: facial.id,
      scheduledAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
      durationMinutes: 75,
      status: "CONFIRMED",
      totalPriceCents: 25000,
      depositPaidCents: 5000,
      paymentStatus: "DEPOSIT_COLLECTED",
      clientNotes: "Preparing skin for gala event tomorrow.",
    },
  });

  const appointment2 = await prisma.appointment.create({
    data: {
      salonId: salon.id,
      clientId: client2.id,
      staffId: owner.id,
      serviceId: haircut.id,
      scheduledAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 30),
      durationMinutes: 50,
      status: "CONFIRMED",
      totalPriceCents: 14000,
      depositPaidCents: 3000,
      paymentStatus: "DEPOSIT_COLLECTED",
      clientNotes: "Standard executive maintenance.",
    },
  });

  console.log(`✓ Seeded 2 Today's Appointments`);

  // 7. Seed Inventory Items
  await prisma.inventoryItem.createMany({
    data: [
      {
        salonId: salon.id,
        sku: "BR-SERUM-PLACENTA-30ML",
        name: "Serum Placenta Botanical Repair 30ml",
        brand: "Biologique Recherche",
        category: "Skincare",
        quantityOnHand: 14,
        reorderThreshold: 5,
        retailPriceCents: 16500,
        costPriceCents: 8200,
      },
      {
        salonId: salon.id,
        sku: "BR-CREME-DERMO-50ML",
        name: "Crème Dermopurifiante 50ml",
        brand: "Biologique Recherche",
        category: "Skincare",
        quantityOnHand: 8,
        reorderThreshold: 4,
        retailPriceCents: 11500,
        costPriceCents: 5700,
      },
      {
        salonId: salon.id,
        sku: "POSIE-SCALP-ELIXIR-60ML",
        name: "Atelier Posie Botanical Scalp Elixir",
        brand: "Posie House Formulations",
        category: "Haircare",
        quantityOnHand: 28,
        reorderThreshold: 10,
        retailPriceCents: 5800,
        costPriceCents: 2100,
      },
      {
        salonId: salon.id,
        sku: "POSIE-SILK-SPF50-75ML",
        name: "Linen Silk Shield SPF 50 Mineral Fluid",
        brand: "Posie House Formulations",
        category: "Sunscreen",
        quantityOnHand: 22,
        reorderThreshold: 8,
        retailPriceCents: 6400,
        costPriceCents: 2400,
      },
    ],
  });

  console.log(`✓ Seeded 4 Retail Inventory Items`);

  // 8. Seed Invoices
  await prisma.invoice.create({
    data: {
      salonId: salon.id,
      clientId: client1.id,
      invoiceNumber: "INV-2026-0001",
      subtotalCents: 25000,
      taxCents: 2219,
      totalCents: 27219,
      paidCents: 5000,
      status: "ISSUED",
      dueDate: new Date(Date.now() + 14 * 86400000),
    },
  });

  console.log(`✓ Seeded Commercial Invoices`);

  // 9. Audit Log
  await prisma.auditLog.create({
    data: {
      salonId: salon.id,
      userId: owner.id,
      action: "DATABASE_INITIALIZED",
      entityType: "SALON",
      entityId: salon.id,
      details: "Database successfully seeded with luxury flagship salon data, 4 users, and inventory.",
    },
  });

  console.log("✨ Posie Database Seed Completed Successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
