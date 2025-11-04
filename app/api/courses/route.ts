import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyJwt } from '@/lib/jwt';

export async function GET() {
  const courses = await prisma.course.findMany({
    include: { tutor: { select: { id: true, name: true } }, _count: { select: { sessions: true, enrollments: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const payload = token ? verifyJwt(token) : null;
  if (!payload || (payload.role !== 'TUTOR' && payload.role !== 'ADMIN')) {
    return new NextResponse('Forbidden', { status: 403 });
  }
  const { title, description } = await req.json();
  if (!title) return new NextResponse('Title required', { status: 400 });
  const course = await prisma.course.create({ data: { title, description: description || '', tutorId: payload.userId } });
  return NextResponse.json(course);
}
export const runtime = 'nodejs';
