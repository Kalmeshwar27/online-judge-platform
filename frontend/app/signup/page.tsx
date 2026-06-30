'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setAuth } from '@/lib/auth';

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

function getPasswordStrength(password: string): { label: string; color: string; score: number } {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: 'Weak', color: 'var(--fail)', score };
  if (score <= 2) return { label: 'Fair', color: 'var(--medium)', score };
  if (score === 3) return { label: 'Good', color: 'var(--accent)', score };
  return { label: 'Strong', color: 'var(--pass)', score };
}

export default function SignupPage() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const strength = password ? getPasswordStrength(password) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();

      if (data.success) {
        setAuth(data.token, data.user);
        router.push('/problems');
      } else {
        setError(data.message ?? 'Could not create your account. Try again.');
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
            Create your account
          </h1>
          <p className="text-sm text-[var(--text-muted)] text-center mt-1.5">
            Start solving problems in less than a minute.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="username" className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ada_lovelace"
                className="w-full bg-[var(--panel-raised)] border border-[var(--border-strong)] rounded-[var(--radius)] px-3 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-faint)] outline-none focus:border-[var(--accent)] transition"
              />
            </div>

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
              <label htmlFor="password" className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-[var(--panel-raised)] border border-[var(--border-strong)] rounded-[var(--radius)] px-3 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-faint)] outline-none focus:border-[var(--accent)] transition"
              />

              {strength && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="h-1 flex-1 rounded-full transition-colors"
                        style={{
                          background: i < strength.score ? strength.color : 'var(--border-strong)',
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-xs mt-1" style={{ color: strength.color }}>
                    {strength.label}
                  </div>
                </div>
              )}
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
              {submitting ? 'Creating account...' : 'Sign up'}
            </button>
          </form>

          <p className="text-sm text-[var(--text-muted)] text-center mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-[var(--accent)] font-medium hover:brightness-110">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}