import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const BodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['STUDENT', 'TUTOR', 'SUPPORT']).default('STUDENT'),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return new NextResponse('Invalid body', { status: 400 });
  }

  const { name, email, password, role } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return new NextResponse('Email already in use', { status: 400 });

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({ data: { name, email, passwordHash, role: role as any } });

  return NextResponse.json({ ok: true });
}
export const runtime = 'nodejs';
