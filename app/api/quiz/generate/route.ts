import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  const { sessionContent, numQuestions = 5 } = await req.json();
  if (!sessionContent || typeof sessionContent !== 'string') {
    return new NextResponse('Missing sessionContent', { status: 400 });
  }

  const cfg = await prisma.aIConfig.findUnique({ where: { id: 1 } });
  const apiBase = cfg?.apiBase || process.env.AI_API_BASE || 'https://api.openai.com/v1';
  const apiKey = cfg?.apiKey || process.env.AI_API_KEY || '';
  const model = cfg?.modelName || process.env.AI_MODEL || 'gpt-4o-mini';

  const prompt = `You are a tutor. Create ${numQuestions} multiple-choice questions (4 options each) based on the following lesson content. Return STRICT JSON with this TypeScript type: { questions: { question: string; options: string[]; answerIndex: number; explanation: string }[] }. No markdown, no backticks. Content:\n\n${sessionContent}`;

  try {
    const resp = await fetch(`${apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'You return strict JSON only.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return new NextResponse(text, { status: 500 });
    }

    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content?.trim() || '';
    const json = JSON.parse(content);
    return NextResponse.json(json);
  } catch (e: any) {
    return new NextResponse(e?.message || 'AI error', { status: 500 });
  }
}
export const runtime = 'nodejs';
