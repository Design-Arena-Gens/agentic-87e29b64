import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@eduportal.local';
  const adminPassword = 'Admin@12345';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin',
      role: 'ADMIN',
      passwordHash,
    },
  });

  await prisma.aIConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      apiBase: process.env.AI_API_BASE || 'https://api.openai.com/v1',
      apiKey: process.env.AI_API_KEY || '',
      modelName: process.env.AI_MODEL || 'gpt-4o-mini',
    },
  });

  console.log('Seeded admin:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
