'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clearAuth, getUser, isAuthenticated } from '@/lib/auth';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated()) {
        setUser(getUser());
      } else {
        setUser(null);
      }
    };

    checkAuth();

    const handleAuthChange = () => checkAuth();
    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('auth-change', handleAuthChange);
    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, { method: 'POST' });
    } catch {
      // best-effort
    }
    clearAuth();
    setUser(null);
    window.location.href = '/login';
  };

  if (/^\/problems\/[^/]+$/.test(pathname ?? '')) {
    return null;
  }

  return (
    <header className="border-b border-[var(--border)] relative z-10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="6" fill="var(--accent)" />
            <path
              d="M9 8L6 12L9 16M15 8L18 12L15 16"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-semibold text-[15px] tracking-tight">Code Arena</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-[var(--text-muted)] text-xs">Hi, {user.username}</span>
              <Link
                href="#"
                onClick={handleLogout}
                className="text-xs font-medium border border-[var(--border-strong)] text-[var(--text)] px-3 py-1.5 rounded-[var(--radius)] hover:bg-[var(--panel-raised)] transition"
              >
                Log out
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-[var(--text-muted)] hover:text-[var(--text)] transition"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-xs font-medium bg-[var(--accent)] text-white px-3 py-1.5 rounded-[var(--radius)] hover:brightness-110 transition"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}