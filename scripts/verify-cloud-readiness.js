const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('💎 POSIE CLOUD READINESS & PRODUCTION VERIFICATION');
console.log('================================================================\n');

function run(label, cmd, cwd = path.join(__dirname, '..')) {
  process.stdout.write(`⏳ ${label}... `);
  try {
    const output = execSync(cmd, { cwd, stdio: ['pipe', 'pipe', 'pipe'] });
    console.log('✅ PASSED');
    return output.toString();
  } catch (err) {
    console.log('❌ FAILED');
    console.error(`\nError details for "${label}":\n`);
    if (err.stdout) console.error(err.stdout.toString());
    if (err.stderr) console.error(err.stderr.toString());
    process.exit(1);
  }
}

// 1. Verify PostgreSQL Prisma Generation
run('Testing Prisma Client generation (PostgreSQL)', 'node scripts/switch-provider.js postgresql', path.join(__dirname, '..', 'packages', 'database'));

// 2. Verify SQLite Prisma Generation (Local default)
run('Testing Prisma Client generation (SQLite)', 'node scripts/switch-provider.js sqlite', path.join(__dirname, '..', 'packages', 'database'));

// 3. Run all unit tests
run('Executing full monorepo test suite (184 tests)', 'pnpm test');

// 4. Run monorepo production build
run('Executing production build (turbo run build)', 'pnpm build');

// 5. Verify required cloud deployment assets exist
process.stdout.write('⏳ Verifying cloud deployment configuration files... ');
const requiredFiles = [
  'vercel.json',
  '.env.production.example',
  'apps/web/next.config.js',
  'packages/database/scripts/prepare-schema.js',
  'packages/database/scripts/switch-provider.js',
];

for (const file of requiredFiles) {
  const fullPath = path.join(__dirname, '..', file);
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ FAILED (missing ${file})`);
    process.exit(1);
  }
}
console.log('✅ PASSED\n');

console.log('================================================================');
console.log('🎉 POSIE IS 100% PRODUCTION READY FOR VERCEL + POSTGRESQL!');
console.log('================================================================');
console.log('Next Steps for Public Launch:');
console.log('1. Push latest code to GitHub main branch: git push origin main');
console.log('2. In Vercel (https://vercel.com/new): Import your GitHub repository.');
console.log('3. In Supabase (https://supabase.com) or Neon (https://neon.tech): Create a free PostgreSQL project.');
console.log('4. Add DATABASE_URL, DIRECT_URL, and JWT_SECRET to Vercel Environment Variables.');
console.log('5. Deploy! Vercel will build and assign your live public https URL.\n');
