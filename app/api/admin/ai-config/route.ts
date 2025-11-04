import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const cfg = await prisma.aIConfig.findUnique({ where: { id: 1 } });
  return NextResponse.json(cfg || {});
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { apiBase, apiKey, modelName } = body as { apiBase?: string; apiKey?: string; modelName?: string };
  const cfg = await prisma.aIConfig.upsert({
    where: { id: 1 },
    update: { apiBase: apiBase || '', apiKey: apiKey || '', modelName: modelName || '' },
    create: { apiBase: apiBase || '', apiKey: apiKey || '', modelName: modelName || '' },
  });
  return NextResponse.json(cfg);
}
export const runtime = 'nodejs';
