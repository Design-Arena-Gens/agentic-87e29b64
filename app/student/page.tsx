"use client";
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function StudentPortal() {
  const { data: courses } = useSWR('/api/courses', fetcher);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Student Portal</h1>
        <Link href="/student/quiz" className="btn btn-primary">Take Quick Quiz</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {(courses || []).map((c: any) => (
          <div key={c.id} className="card">
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-sm text-gray-600">{c.description}</p>
            <p className="mt-2 text-xs text-gray-500">Tutor: {c.tutor?.name || '?'} ? Sessions: {c._count?.sessions || 0}</p>
          </div>
        ))}
        {!courses?.length && (
          <div className="text-sm text-gray-500">No courses yet. Tutors can create courses in the Tutor portal.</div>
        )}
      </div>
    </div>
  );
}
