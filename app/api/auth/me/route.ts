import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return new NextResponse('Unauthorized', { status: 401 });
  const payload = verifyJwt(token);
  if (!payload) return new NextResponse('Unauthorized', { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: payload.userId }, select: { id: true, email: true, name: true, role: true } });
  return NextResponse.json(user);
}
export const runtime = 'nodejs';
