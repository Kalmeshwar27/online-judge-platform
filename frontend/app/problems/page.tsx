'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Problem } from '@/types';

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: 'text-[var(--easy)] bg-[var(--easy-soft)] border-[var(--easy)]/30',
  Medium: 'text-[var(--medium)] bg-[var(--medium-soft)] border-[var(--medium)]/30',
  Hard: 'text-[var(--hard)] bg-[var(--hard-soft)] border-[var(--hard)]/30',
};

const FILTERS = ['All', 'Easy', 'Medium', 'Hard'] as const;

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const [search, setSearch] = useState('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    let cancelled = false;

    fetch(`${apiUrl}/problems`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.success) setProblems(data.problems);
        else setLoadError(true);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  const filteredProblems = useMemo(() => {
    if (!problems) return [];
    return problems.filter((p) => {
      const matchesFilter = filter === 'All' || p.difficulty === filter;
      const matchesSearch = p.title.toLowerCase().includes(search.trim().toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [problems, filter, search]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold tracking-tight">Problems</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">
          Pick one and start writing your solution.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition ${
                  filter === f
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]/30'
                    : 'text-[var(--text-muted)] border-[var(--border-strong)] hover:text-[var(--text)]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problems..."
            className="w-full sm:w-56 bg-[var(--panel-raised)] border border-[var(--border-strong)] rounded-[var(--radius)] px-3 py-1.5 text-sm placeholder:text-[var(--text-faint)] outline-none focus:border-[var(--accent)] transition"
          />
        </div>

        <div className="mt-6 rounded-[var(--radius)] border border-[var(--border)] overflow-hidden">
          {loadError && (
            <div className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
              Could not load problems. Check that the API is running and try again.
            </div>
          )}

          {!loadError && problems === null && (
            <div className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
              Loading problems...
            </div>
          )}

          {!loadError && problems !== null && filteredProblems.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
              No problems match your filters.
            </div>
          )}

          {filteredProblems.map((problem, idx) => (
            <Link
              key={problem.id}
              href={`/problems/${problem.id}`}
              className={`flex items-center justify-between px-4 py-3.5 bg-[var(--panel)] hover:bg-[var(--panel-raised)] transition ${
                idx !== 0 ? 'border-t border-[var(--border)]' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--text-faint)] w-6">
                  {problem.id}
                </span>
                <span className="text-sm font-medium">{problem.title}</span>
              </div>

              <span
                className={`text-xs font-mono font-medium px-2 py-0.5 rounded-full border ${
                  DIFFICULTY_STYLES[problem.difficulty] ?? DIFFICULTY_STYLES.Easy
                }`}
              >
                {problem.difficulty}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}