const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
let schemaContent = fs.readFileSync(schemaPath, 'utf8');

// Determine target provider
const explicitProvider = process.env.PRISMA_DATABASE_PROVIDER;
const dbUrl = process.env.DATABASE_URL || '';

let targetProvider = 'sqlite';

if (explicitProvider) {
  targetProvider = explicitProvider.toLowerCase();
} else if (dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://')) {
  targetProvider = 'postgresql';
} else if (dbUrl.startsWith('file:') || dbUrl === '') {
  // Check if schema is already sqlite or postgresql
  const match = schemaContent.match(/provider\s*=\s*"(sqlite|postgresql)"/);
  targetProvider = match ? match[1] : 'sqlite';
}

const sqliteBlock = `datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}`;

const postgresBlock = `datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}`;

const currentBlockMatch = schemaContent.match(/datasource\s+db\s+\{[\s\S]*?\}/);

if (currentBlockMatch) {
  const newBlock = targetProvider === 'postgresql' ? postgresBlock : sqliteBlock;
  if (currentBlockMatch[0] !== newBlock) {
    schemaContent = schemaContent.replace(currentBlockMatch[0], newBlock);
    fs.writeFileSync(schemaPath, schemaContent, 'utf8');
    console.log(`[posie-database] Updated datasource provider in schema.prisma to "${targetProvider}".`);
  } else {
    console.log(`[posie-database] Prisma schema already configured for "${targetProvider}".`);
  }
} else {
  console.warn('[posie-database] Could not find datasource db block in schema.prisma.');
}
