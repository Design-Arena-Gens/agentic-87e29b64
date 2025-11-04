import './globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'EduPortal',
  description: 'AI-powered education portal',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <nav className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="font-semibold text-primary-700">EduPortal</Link>
              <div className="hidden gap-4 sm:flex">
                <Link href="/student" className="text-sm text-gray-700 hover:text-primary-700">Student</Link>
                <Link href="/tutor" className="text-sm text-gray-700 hover:text-primary-700">Tutor</Link>
                <Link href="/support" className="text-sm text-gray-700 hover:text-primary-700">Support</Link>
                <Link href="/admin" className="text-sm text-gray-700 hover:text-primary-700">Admin</Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="btn btn-outline text-sm">Login</Link>
              <Link href="/auth/register" className="btn btn-primary text-sm">Sign up</Link>
            </div>
          </nav>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="border-t py-8 text-center text-sm text-gray-500">? {new Date().getFullYear()} EduPortal</footer>
      </body>
    </html>
  );
}
