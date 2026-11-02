const { execSync } = require('child_process');
const path = require('path');

const provider = process.argv[2] || 'sqlite';
if (!['sqlite', 'postgresql', 'postgres'].includes(provider.toLowerCase())) {
  console.error('Usage: node scripts/switch-provider.js <sqlite|postgresql>');
  process.exit(1);
}

const target = provider.toLowerCase() === 'postgres' ? 'postgresql' : provider.toLowerCase();
process.env.PRISMA_DATABASE_PROVIDER = target;

console.log(`[posie-database] Switching provider to ${target}...`);
require('./prepare-schema.js');

try {
  console.log('[posie-database] Running prisma generate...');
  execSync('npx prisma generate', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    env: { ...process.env, PRISMA_DATABASE_PROVIDER: target }
  });
  console.log(`[posie-database] Successfully switched and generated Prisma Client for ${target}!`);
} catch (err) {
  console.error('[posie-database] Error during prisma generate:', err.message);
  process.exit(1);
}
