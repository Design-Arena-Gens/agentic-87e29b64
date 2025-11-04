"use client";
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function TutorPortal() {
  const { data: courses, mutate } = useSWR('/api/courses', fetcher);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionContent, setSessionContent] = useState('');
  const [courseId, setCourseId] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [error, setError] = useState('');

  const createCourse = async () => {
    setError('');
    const res = await fetch('/api/courses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, description }) });
    if (!res.ok) { setError(await res.text()); return; }
    setTitle(''); setDescription('');
    mutate();
  };

  const createSession = async () => {
    setError('');
    const res = await fetch('/api/sessions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ courseId, title: sessionTitle, content: sessionContent, scheduledAt }) });
    if (!res.ok) { setError(await res.text()); return; }
    setSessionTitle(''); setSessionContent(''); setScheduledAt('');
  };

  return (
    <div className="grid gap-8">
      <h1 className="text-2xl font-semibold">Tutor Portal</h1>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card grid gap-2">
          <h3 className="font-semibold">Create Course</h3>
          <input className="input" placeholder="Course title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="input h-24" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button className="btn btn-primary w-fit" onClick={createCourse} disabled={!title}>Create</button>
        </div>

        <div className="card grid gap-2">
          <h3 className="font-semibold">Create Session</h3>
          <select className="input" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
            <option value="">Select course</option>
            {(courses || []).map((c: any) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
          <input className="input" placeholder="Session title" value={sessionTitle} onChange={(e) => setSessionTitle(e.target.value)} />
          <textarea className="input h-24" placeholder="Session content/notes" value={sessionContent} onChange={(e) => setSessionContent(e.target.value)} />
          <input className="input" type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
          <button className="btn btn-primary w-fit" onClick={createSession} disabled={!courseId || !sessionTitle || !sessionContent || !scheduledAt}>Create</button>
        </div>
      </div>

      <div className="grid gap-3">
        <h3 className="font-semibold">Your Courses</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {(courses || []).map((c: any) => (
            <div className="card" key={c.id}>
              <h4 className="font-medium">{c.title}</h4>
              <p className="text-sm text-gray-600">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
