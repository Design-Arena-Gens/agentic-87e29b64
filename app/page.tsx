import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="grid gap-8">
      <section className="grid gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Learn anything. Teach anywhere.</h1>
        <p className="max-w-3xl text-gray-600">A modern, AI-powered education portal for students, tutors, support, and admins. Take courses, run sessions, and auto-generate quizzes after each session using your preferred AI model.</p>
        <div className="flex gap-3">
          <Link href="/student" className="btn btn-primary">Go to Student Portal</Link>
          <Link href="/tutor" className="btn btn-outline">Go to Tutor Portal</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="card">
          <h3 className="mb-2 font-semibold">Student Portal</h3>
          <p className="text-sm text-gray-600">Browse courses, attend sessions, and take AI-generated quizzes.</p>
        </div>
        <div className="card">
          <h3 className="mb-2 font-semibold">Tutor Portal</h3>
          <p className="text-sm text-gray-600">Create courses, schedule sessions, and manage quizzes.</p>
        </div>
        <div className="card">
          <h3 className="mb-2 font-semibold">Admin & Support</h3>
          <p className="text-sm text-gray-600">Configure AI models, manage users, and help students succeed.</p>
        </div>
      </section>
    </div>
  );
}
