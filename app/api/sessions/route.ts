import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyJwt } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const payload = token ? verifyJwt(token) : null;
  if (!payload || (payload.role !== 'TUTOR' && payload.role !== 'ADMIN')) {
    return new NextResponse('Forbidden', { status: 403 });
  }
  const { courseId, title, content, scheduledAt } = await req.json();
  if (!courseId || !title || !content || !scheduledAt) return new NextResponse('Missing fields', { status: 400 });
  const session = await prisma.session.create({
    data: {
      courseId,
      title,
      content,
      scheduledAt: new Date(scheduledAt),
    },
  });
  return NextResponse.json(session);
}

export async function GET(req: NextRequest) {
  const courseId = req.nextUrl.searchParams.get('courseId');
  if (!courseId) return new NextResponse('courseId required', { status: 400 });
  const sessions = await prisma.session.findMany({ where: { courseId }, orderBy: { scheduledAt: 'asc' } });
  return NextResponse.json(sessions);
}
export const runtime = 'nodejs';
