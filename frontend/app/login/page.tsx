'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 justify-center">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="var(--accent)" />
        <path
          d="M9 8L6 12L9 16M15 8L18 12L15 16"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-semibold text-[15px] tracking-tight text-[var(--text)]">
        Code Arena
      </span>
    </Link>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        router.push('/problems');
      } else {
        setError(data.message ?? 'Could not log in. Check your details and try again.');
      }
    } catch {
      setError('Something went wrong. Try again in a moment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Logo />

          <h1 className="text-xl font-semibold tracking-tight text-center mt-8">
            Log in to your account
          </h1>
          <p className="text-sm text-[var(--text-muted)] text-center mt-1.5">
            Pick up where you left off.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[var(--panel-raised)] border border-[var(--border-strong)] rounded-[var(--radius)] px-3 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-faint)] outline-none focus:border-[var(--accent)] transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-medium text-[var(--text-muted)]">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[var(--panel-raised)] border border-[var(--border-strong)] rounded-[var(--radius)] px-3 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-faint)] outline-none focus:border-[var(--accent)] transition"
              />
            </div>

            {error && (
              <div
                className="text-sm rounded-[var(--radius)] border px-3 py-2"
                style={{ color: 'var(--fail)', background: 'var(--fail-soft)', borderColor: 'var(--fail)' }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[var(--accent)] text-white text-sm font-medium px-4 py-2.5 rounded-[var(--radius)] disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition"
            >
              {submitting ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="text-sm text-[var(--text-muted)] text-center mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[var(--accent)] font-medium hover:brightness-110">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}