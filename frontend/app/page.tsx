import Link from 'next/link';


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
  {
    value: "500+",
    label: "Problems",
  },
  {
    value: "1.2M+",
    label: "Submissions",
  },
  {
    value: "50K+",
    label: "Users",
  },
  {
    value: "200+",
    label: "Contests",
  },
];
const FEATURES = [
  {
    title: "Instant Judging",
    desc: "Run solutions against hidden test cases."
  },
  {
    title: "Multi Language",
    desc: "Python, Java, C++ and JavaScript."
  },
  {
    title: "Live Contests",
    desc: "Compete with developers globally."
  },
  {
    title: "Leaderboards",
    desc: "Track rankings and performance."
  },
  {
    title: "Analytics",
    desc: "Visualize your learning progress."
  },
  {
    title: "Discussions",
    desc: "Learn from community solutions."
  }
];

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

          <span className="font-mono text-xs text-zinc-500">
            two_sum.py
          </span>
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

          <div className="text-green-500">
            ✓ Compilation Success
          </div>

          <div className="mt-2">
            Running test cases...
          </div>

          <div className="mt-2 w-full h-2 rounded bg-zinc-800 overflow-hidden">
            <div className="h-full w-full bg-green-500 animate-pulse" />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-green-500 font-semibold">
              Accepted
            </span>
          </div>

          <div className="grid grid-cols-3 mt-5 gap-5">

            <div>
              <div className="text-zinc-500 text-xs">
                Runtime
              </div>
              <div>
                54 ms
              </div>
            </div>

            <div>
              <div className="text-zinc-500 text-xs">
                Memory
              </div>
              <div>
                14.2 MB
              </div>
            </div>

            <div>
              <div className="text-zinc-500 text-xs">
                Beats
              </div>
              <div>
                91.3%
              </div>
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
      <div className="absolute top-32 left-[12%] text-zinc-700 font-mono float">
        O(log n)
      </div>

      <div className="absolute top-60 right-[15%] text-zinc-700 font-mono float2">
        DFS(node)
      </div>

      <div className="absolute bottom-40 left-[20%] text-zinc-700 font-mono float3">
        DP[i][j]
      </div>

      <div className="absolute top-96 right-[30%] text-zinc-700 font-mono float">
        Heap
      </div>

      <div className="absolute bottom-60 right-[10%] text-zinc-700 font-mono float2">
        Graph
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Nav */}
      <header className="border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center gap-7 text-sm text-[var(--text-muted)]">
            <Link href="/problems" className="hover:text-[var(--text)] transition">
              Problems
            </Link>
            <a href="#how-it-works" className="hover:text-[var(--text)] transition">
              How it works
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-[var(--accent)] text-white px-3.5 py-1.5 rounded-[var(--radius)] hover:brightness-110 transition"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-6xl font-bold leading-[1.05] tracking-[-0.04em]">
            Master
            <br />
            Algorithms.
            <br />
            <span className="text-gradient">
              Get Instant Verdicts.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg text-[var(--text-muted)] leading-8">
            Practice coding interviews, compete in contests,
            and improve your problem solving skills using a
            modern online judge platform.
          </p>
          <p className="mt-5 text-[15px] leading-relaxed text-[var(--text-muted)] max-w-md">
            Solve real problems, run against hidden test cases, and see exactly where your
            solution breaks. No setup, no waiting, just code and a verdict.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/problems"
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

        <div className="flex justify-center md:justify-end">
          <CodePanel />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[var(--border)] bg-[var(--panel)]">
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