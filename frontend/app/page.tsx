import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';

const STEPS = [
  {
    n: '01',
    title: 'Pick a problem',
    body: 'Browse problems sorted by difficulty, from array basics to graph algorithms.',
  },
  {
    n: '02',
    title: 'Write your solution',
    body: 'Code in Python or Java in a full-featured editor, right in the browser.',
  },
  {
    n: '03',
    title: 'Get an instant verdict',
    body: 'Your code runs against every test case and you see exactly which ones pass.',
  },
];

const STATS = [
  { value: '500+', label: 'Problems' },
  { value: '1.2M+', label: 'Submissions' },
  { value: '50K+', label: 'Users' },
  { value: '200+', label: 'Contests' },
];

const FEATURES = [
  { title: 'Instant Judging', desc: 'Run solutions against hidden test cases.' },
  { title: 'Multi Language', desc: 'Python, Java, C++ and JavaScript.' },
  { title: 'Live Contests', desc: 'Compete with developers globally.' },
  { title: 'Leaderboards', desc: 'Track rankings and performance.' },
  { title: 'Analytics', desc: 'Visualize your learning progress.' },
  { title: 'Discussions', desc: 'Learn from community solutions.' },
];

// Side rail next to the code panel — Practice / Compete / Achieve
const HERO_RAIL = [
  {
    title: 'Practice',
    desc: 'Sharpen skills',
    icon: (
      <path
        d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    title: 'Compete',
    desc: 'Climb ranks',
    icon: (
      <path
        d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    title: 'Achieve',
    desc: 'Be the best',
    icon: (
      <path
        d="M8 4h8v3a4 4 0 01-8 0V4zM4 5h4M16 5h4M4 5a3 3 0 003 4M20 5a3 3 0 01-3 4M9 14h6v3H9v-3zM7 20h10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
];

// Pills under the hero copy/CTAs
const HERO_PILLS = [
  {
    title: 'Instant feedback',
    desc: 'See results in real-time',
    icon: (
      <path
        d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    title: 'Secure judge',
    desc: 'Anti-cheat protected',
    icon: (
      <path
        d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    title: 'Compete & rank',
    desc: 'Climb the leaderboard',
    icon: (
      <path
        d="M8 4h8v3a4 4 0 01-8 0V4zM4 5h4M16 5h4M4 5a3 3 0 003 4M20 5a3 3 0 01-3 4M9 14h6v3H9v-3zM7 20h10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
];

const TRUSTED_LOGOS = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'];

function Logo() {
  return (
    <div className="flex items-center gap-2">
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
    </div>
  );
}

function CodePanel() {
  return (
    <div className="w-full max-w-xl">
      <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="font-mono text-xs text-zinc-500">two_sum.py</span>
        </div>

        {/* code */}
        <pre className="p-6 text-sm font-mono leading-7 overflow-auto">
{`def twoSum(nums, target):
    seen = {}

    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target-n], i]

        seen[n] = i

    return []`}
        </pre>

        {/* terminal */}
        <div className="border-t border-zinc-800 bg-black p-5 font-mono text-sm">
          <div className="text-green-500">✓ Compilation Success</div>
          <div className="mt-2">Running test cases...</div>
          <div className="mt-2 w-full h-2 rounded bg-zinc-800 overflow-hidden">
            <div className="h-full w-full bg-green-500 animate-pulse" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-green-500 font-semibold">Accepted</span>
          </div>

          <div className="grid grid-cols-3 mt-5 gap-5">
            <div>
              <div className="text-zinc-500 text-xs">Runtime</div>
              <div>54 ms</div>
            </div>
            <div>
              <div className="text-zinc-500 text-xs">Memory</div>
              <div>14.2 MB</div>
            </div>
            <div>
              <div className="text-zinc-500 text-xs">Beats</div>
              <div>91.3%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* glow */}
      <div
        className="
        absolute
        left-1/2
        top-[-250px]
        -translate-x-1/2
        w-[700px]
        h-[700px]
        rounded-full
        bg-blue-600/10
        blur-[150px]
      "
      />

      {/* moving grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="grid-animation" />
      </div>

      {/* floating algorithms */}
      <div className="absolute top-32 left-[12%] text-zinc-700 font-mono float">O(log n)</div>
      <div className="absolute top-60 right-[15%] text-zinc-700 font-mono float2">DFS(node)</div>
      <div className="absolute bottom-40 left-[20%] text-zinc-700 font-mono float3">DP[i][j]</div>
      <div className="absolute top-96 right-[30%] text-zinc-700 font-mono float">Heap</div>
      <div className="absolute bottom-60 right-[10%] text-zinc-700 font-mono float2">Graph</div>
    </div>
  );
}


function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-black">
      {/* ROBOT — left edge */}
      <div className="absolute left-0 bottom-50 h-full w-75 md:w-95 lg:w-105">
        <div className="absolute bottom-0 left-0 h-full w-full">
          <Image
            src="/images/robot-hero.png"
            alt=""
            fill
            sizes="(max-width: 768px) 300px, (max-width: 1024px) 380px, 420px"
            style={{ objectFit: 'contain', objectPosition: 'bottom left' }}
            className="opacity-90"
            priority
          />
        </div>
        {/* fade subject edges into solid black */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to right, black 0%, transparent 55%), linear-gradient(to bottom, transparent 60%, black 100%)',
          }}
        />
      </div>

      {/* BRAIN IN JAR — right edge */}
      <div className="absolute right-10 bottom-50 h-full w-55 md:w-70 lg:w-[320px]">
        <div className="absolute bottom-0 right-0 h-[50%] w-full">
          <Image
            src="/images/brain-jar.png"
            alt=""
            fill
            sizes="(max-width: 768px) 220px, (max-width: 1024px) 280px, 320px"
            style={{ objectFit: 'contain', objectPosition: 'bottom right' }}
            className="opacity-90"
          />
        </div>
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to left, black 0%, transparent 55%), linear-gradient(to bottom, transparent 60%, black 100%)',
          }}
        />
      </div>

      {/* bottom fade so the hero sinks cleanly into the stats band */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: 'linear-gradient(to bottom, transparent, black)',
        }}
      />
    </div>
  );
}

interface FeatureIconProps {
  icon?: ReactNode;
  title?: string;
  desc?: string;
  className?: string;
}

function FeatureIcon({ icon, title, desc, className = '' }: FeatureIconProps) {
  if (!title) return null;

  return (
    <div className={`flex items-start gap-2.5 ${className}`}>
      {icon && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[var(--accent)] mt-0.5 shrink-0"
        >
          {icon}
        </svg>
      )}
      <div>
        <div className="text-sm font-semibold text-[var(--text)] leading-tight">{title}</div>
        {desc && (
          <div className="text-xs text-[var(--text-muted)] leading-tight mt-0.5">{desc}</div>
        )}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="relative">
        <HeroBackground />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-10">
          {/* eyebrow badge */}
          <div className="flex justify-center md:justify-start">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              Built for Serious Problem Solvers
            </div>
          </div>

          <div className="mt-10 ml-8 md:ml-16 grid md:grid-cols-[1fr_auto_auto] gap-10 items-center">
            {/* copy */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-[-0.04em]">
                Master
                <br />
                Algorithms.
                <br />
                <span className="text-gradient">Get Instant Verdicts.</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg text-[var(--text-muted)] leading-8">
                Practice coding interviews, compete in contests, and improve your problem
                solving skills using a modern online judge platform.
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-[var(--text-muted)] max-w-md">
                Solve real problems, run against hidden test cases, and see exactly where your
                solution breaks. No setup, no waiting, just code and a verdict.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium bg-[var(--accent)] text-white px-5 py-2.5 rounded-[var(--radius)] hover:brightness-110 transition"
                >
                  Start solving
                </Link>
                <a
                  href="#how-it-works"
                  className="text-sm font-medium border border-[var(--border-strong)] text-[var(--text)] px-5 py-2.5 rounded-[var(--radius)] hover:bg-[var(--panel-raised)] transition"
                >
                  How it works
                </a>
              </div>
            </div>

            {/* vertical rail of mini-icons, between copy and code panel */}
            <div className="hidden lg:flex flex-col gap-7 px-2 ml-8 md:ml-16">
              {HERO_RAIL.map((item) => (
                <FeatureIcon key={item.title} {...item} />
              ))}
            </div>

            {/* code panel */}
            <div className="flex justify-center md:justify-end">
              <CodePanel />
            </div>
          </div>

          {/* pill row under everything */}
          <div className="mt-14 flex flex-wrap items-center justify-center md:justify-start gap-x-10 gap-y-4">
            {HERO_PILLS.map((item) => (
              <FeatureIcon key={item.title} {...item} />
            ))}
          </div>

          {/* trusted-by row */}
          <div className="mt-10 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span className="text-xs text-[var(--text-faint)] whitespace-nowrap">
              Trusted by developers from top companies
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-70">
              {TRUSTED_LOGOS.map((name) => (
                <span
                  key={name}
                  className="text-sm font-semibold tracking-tight text-[var(--text-muted)]"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[var(--border)] bg-[var(--panel)] relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
              <div className="text-sm text-[var(--text-muted)] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold tracking-tight text-center">How it works</h2>
        <p className="text-[var(--text-muted)] text-center mt-2 max-w-md mx-auto text-[15px]">
          Three steps between you and a verdict.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--panel)] p-6"
            >
              <div className="text-sm font-mono text-[var(--text-faint)]">{step.n}</div>
              <div className="font-semibold mt-3">{step.title}</div>
              <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--panel)] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-semibold text-lg">Ready to get a verdict on your code?</div>
            <div className="text-sm text-[var(--text-muted)] mt-1">
              Pick a problem and submit your first solution.
            </div>
          </div>
          <Link
            href="/problems"
            className="text-sm font-medium bg-[var(--accent)] text-white px-5 py-2.5 rounded-[var(--radius)] hover:brightness-110 transition whitespace-nowrap"
          >
            Start solving
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-[var(--text-faint)]">
          <span>Code Arena</span>
          <span>Built for practicing problem solving.</span>
        </div>
      </footer>
    </div>
  );
}