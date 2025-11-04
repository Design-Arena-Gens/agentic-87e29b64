import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signJwt } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return new NextResponse('Invalid credentials', { status: 401 });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return new NextResponse('Invalid credentials', { status: 401 });

  const token = signJwt({ userId: user.id, role: user.role });

  const res = NextResponse.json({ ok: true });
  res.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
export const runtime = 'nodejs';
