"use client";
import { useState } from 'react';

export default function QuizPage() {
  const [content, setContent] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onGenerate = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionContent: content, numQuestions: 5 }),
      });
      if (!res.ok) throw new Error(await res.text());
      setResult(await res.json());
    } catch (e: any) {
      setError(e?.message || 'Failed to generate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">AI Quiz Generator</h1>
      <textarea className="input h-40" placeholder="Paste your session notes or content here..." value={content} onChange={(e) => setContent(e.target.value)} />
      <button className="btn btn-primary w-fit" onClick={onGenerate} disabled={!content || loading}>{loading ? 'Generating...' : 'Generate Quiz'}</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result?.questions && (
        <div className="grid gap-4">
          {result.questions.map((q: any, i: number) => (
            <div className="card" key={i}>
              <p className="font-medium">Q{i + 1}. {q.question}</p>
              <ol className="mt-2 grid gap-1 text-sm list-decimal pl-5">
                {q.options.map((opt: string, j: number) => (
                  <li key={j}>{opt}</li>
                ))}
              </ol>
              <p className="mt-2 text-sm text-green-700">Answer: option {q.answerIndex + 1}</p>
              {q.explanation && <p className="text-xs text-gray-600">{q.explanation}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
