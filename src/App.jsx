import { useEffect, useState } from 'react'
import { Activity, AlertCircle, Cpu, ShieldCheck, Terminal, Wifi } from 'lucide-react'

// ---------------------------------------------------------------------------
// All content below is random placeholder data for testing the layout.
// Swap these objects for real content; nothing else needs to change.
// ---------------------------------------------------------------------------

const PROFILE = {
  name: 'Kai Mercer',
  role: 'PORTFOLIO',
  education: 'B.Tech in Computer Engineering',
  school: 'Northgate Institute of Technology',
  schoolYears: '2021 - Present',
  location: 'Rotterdam, Netherlands',
  email: 'kai.mercer@example.com',
  phone: '+31 6 1234 5678',
  github: 'github.com/kaimercer',
  linkedin: 'linkedin.com/in/kai-mercer',
}

const SKILLS = {
  'FRONTEND': 'React • TypeScript • Next.js • TailwindCSS • Vite',
  'BACKEND': 'Node.js • Express • FastAPI (Python) • RESTful APIs • JWT Auth',
  'DATABASES': 'PostgreSQL • MongoDB • SQLite • Redis',
  'AI SYSTEMS': 'LangChain • RAG Pipelines • Vector Stores • Guardrail Evals',
  'DEPLOYMENT': 'Docker • GitHub Actions • CI/CD • Vercel • Linux',
}

const EXPERIENCE = [
  { role: 'Backend Engineer Intern', org: 'Helix Logistics', period: 'Jun 2025 - Aug 2025' },
  { role: 'ML Engineer Intern', org: 'Corvus Analytics', period: 'Feb 2025 - Mar 2025' },
  { role: 'Data Analyst Intern', org: 'Brightpath Labs', period: 'Jan 2025 - Feb 2025' },
]

const PROJECTS = [
  {
    name: 'SentryMesh',
    desc: 'Distributed rate-limiting gateway with per-tenant quotas and live traffic dashboards.',
    stack: 'Go • Redis • gRPC • React',
  },
  {
    name: 'DocuParse',
    desc: 'Layout-aware PDF extractor that turns scanned invoices into structured JSON.',
    stack: 'Python • PyMuPDF • Tesseract • FastAPI',
  },
  {
    name: 'Pulse',
    desc: 'Real-time voice agent for call summarisation with streaming transcripts.',
    stack: 'TypeScript • WebRTC • Whisper • Node.js',
  },
]

const ACHIEVEMENTS = [
  'Winner — National Hackathon 2025, "Best Applied AI"',
  'Published 2 papers on efficient retrieval augmentation',
  'Maintainer of an open-source log parser, 1.4k stars',
  'Google Summer of Code 2024 — accepted contributor',
]

const BOOT = [
  'Loading profile',
  'Mounting /personal_info',
  'Mounting /skills',
  'Mounting /experience',
  'Mounting /projects',
  'System ready',
]

const STATUS = [
  { label: 'CPU', value: '34.2%' },
  { label: 'MEM', value: '58.7%' },
  { label: 'NET', value: '2.4 GB/s' },
  { label: 'REQ', value: '904' },
]

// Decorative only — these are hardcoded strings, not live telemetry.
const PROCESSES = [
  { name: 'api_gateway', cpu: 12, mem: 31 },
  { name: 'auth_service', cpu: 4, mem: 18 },
  { name: 'llm_guardrails', cpu: 47, mem: 62 },
  { name: 'job_scheduler', cpu: 8, mem: 24 },
  { name: 'redis_cache', cpu: 2, mem: 41 },
]

const LOGS = [
  { level: 'info', text: 'Build pipeline completed — all stages green' },
  { level: 'warn', text: 'Stale cache key purged from edge (ttl 0)' },
]

const NETWORK = [
  { label: 'API OUT', value: '4.2 MB/s', width: 72 },
  { label: 'API IN', value: '11.8 MB/s', width: 94 },
  { label: 'P95 LATENCY', value: '142 ms', width: 38 },
]

const SECURITY = [
  { label: 'AUTH', value: 'JWT / OAuth2' },
  { label: 'ENCRYPTION', value: 'TLS 1.3' },
  { label: 'RATE LIMIT', value: 'ACTIVE' },
  { label: 'DATA SCOPE', value: 'ISOLATED' },
]

// ---------------------------------------------------------------------------

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* The one authored moment on the page: a boot log that types itself out.
   Once it finishes the caller collapses it, so the interface recedes. */
function Boot({ onDone }) {
  const target = BOOT.join('\n')
  const [n, setN] = useState(reduceMotion ? target.length : 0)

  useEffect(() => {
    if (reduceMotion) {
      onDone()
      return
    }
    const id = setInterval(() => {
      setN((v) => {
        if (v >= target.length) {
          clearInterval(id)
          onDone()
          return v
        }
        return v + 1
      })
    }, 16)
    return () => clearInterval(id)
  }, [target, onDone])

  const partial = target.slice(0, n).split('\n').pop() ?? ''
  const done = target.slice(0, n).split('\n').slice(0, -1)
  const last = done.length - 1

  return (
    <div className="panel p-5">
      <h2 className="text-[0.75rem] tracking-[0.25em] text-accent">
        PORTFOLIO SYSTEM INITIALIZATION
      </h2>
      <div className="mt-4 max-w-[68ch] text-[0.8125rem] leading-7">
        {done.length === 0 && <div className="caret">█</div>}
        {done.map((line, i) => (
          <div key={i}>
            <span className="text-warn">[OK]</span>{' '}
            <span className="text-ink-dim">{line}</span>
            {i === last && !partial && <span className="caret">█</span>}
          </div>
        ))}
        {partial && (
          <div>
            <span className="text-warn">[OK]</span>{' '}
            <span className="text-ink-dim">{partial}</span>
            <span className="caret">█</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* After boot the log is history, not content — it collapses to one line. */
function BootComplete({ count }) {
  return (
    <p className="panel flex items-center gap-3 px-5 py-2.5 text-[0.6875rem]">
      <span className="text-warn">[OK]</span>
      <span className="text-ink-dim">
        System ready — <span className="tnum">{count}</span> subsystems mounted
      </span>
    </p>
  )
}

function Panel({ title, children }) {
  return (
    <section className="panel p-5">
      <h2 className="mb-5 text-[0.75rem] tracking-[0.25em] text-accent">{title}</h2>
      <div className="max-w-[68ch] text-[0.8125rem] leading-7 text-ink-dim">
        {children}
      </div>
    </section>
  )
}

/* label reads as structure, value carries the weight */
function Row({ label, children }) {
  return (
    <div className="flex flex-col gap-0.5 py-1 sm:flex-row sm:gap-3">
      <dt className="shrink-0 text-[0.6875rem] tracking-[0.2em] text-accent sm:w-40">
        {label}
      </dt>
      <dd className="text-ink">{children}</dd>
    </div>
  )
}

function Meter({ label, value, width }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between text-[0.6875rem] text-ink-dim">
        <span>{label}</span>
        <span className="tnum text-ink">{value}</span>
      </div>
      <div
        className="mt-1.5 h-1 w-full bg-canvas"
        role="meter"
        aria-label={label}
        aria-valuenow={width}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-1 bg-accent" style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}

function Sidebar() {
  return (
    <aside className="hidden w-80 shrink-0 space-y-4 overflow-y-auto border-l border-rule p-4 lg:block">
      <section className="panel p-4">
        <h3 className="mb-4 flex items-center gap-2 text-[0.75rem] tracking-[0.25em] text-accent">
          <Activity size={13} aria-hidden /> SYSTEM LOGS
        </h3>
        <ul className="space-y-2">
          {LOGS.map((l) => (
            <li key={l.text} className="flex gap-2 text-[0.6875rem] leading-5">
              <AlertCircle
                size={11}
                aria-hidden
                className={`mt-1 shrink-0 ${l.level === 'warn' ? 'text-warn' : 'text-accent'}`}
              />
              <span className="text-ink-dim">{l.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel p-4">
        <h3 className="mb-4 flex items-center gap-2 text-[0.75rem] tracking-[0.25em] text-accent">
          <Cpu size={13} aria-hidden /> PROCESSES
        </h3>
        <ul className="space-y-2">
          {PROCESSES.map((p) => (
            <li
              key={p.name}
              className="grid grid-cols-[minmax(0,1fr)_auto_4.5rem] items-baseline gap-x-3 text-[0.6875rem]"
            >
              <span className="truncate text-ink">{p.name}</span>
              <span className="tnum text-ink-dim">
                {p.cpu}% / {p.mem}%
              </span>
              <span className="text-right text-warn">RUNNING</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel p-4">
        <h3 className="mb-4 flex items-center gap-2 text-[0.75rem] tracking-[0.25em] text-accent">
          <Wifi size={13} aria-hidden /> NETWORK
        </h3>
        {NETWORK.map((n) => (
          <Meter key={n.label} {...n} />
        ))}
      </section>

      <section className="panel p-4">
        <h3 className="mb-4 flex items-center gap-2 text-[0.75rem] tracking-[0.25em] text-accent">
          <ShieldCheck size={13} aria-hidden /> SECURITY
        </h3>
        <ul className="space-y-2">
          {SECURITY.map((s) => (
            <li key={s.label} className="flex justify-between gap-3 text-[0.6875rem]">
              <span className="text-ink-dim">{s.label}</span>
              <span className="tnum text-ink">{s.value}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}

export default function App() {
  const [booted, setBooted] = useState(reduceMotion)

  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas text-ink">
      <div className="backdrop" aria-hidden />
      <div className="crt" aria-hidden />

      <div className="relative z-10 flex h-screen">
        <main className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-panel px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-warn" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink-dim" />
                <span className="h-2.5 w-2.5 rounded-full bg-proj" />
              </span>
              <Terminal size={14} className="text-accent" aria-hidden />
              <h1 className="text-sm tracking-[0.3em] text-accent">
                {PROFILE.role} v0.0.1
              </h1>
            </div>
            <dl className="flex flex-wrap gap-x-5 gap-y-1 text-[0.6875rem]">
              {STATUS.map((s) => (
                <div key={s.label} className="flex gap-1.5">
                  <dt className="tracking-[0.15em] text-ink-dim">{s.label}</dt>
                  <dd className="tnum text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </header>

          <div className="flex-1 overflow-y-auto p-5">
            <div className="mx-auto max-w-3xl space-y-4">
              {booted ? (
                <BootComplete count={BOOT.length} />
              ) : (
                <Boot onDone={() => setBooted(true)} />
              )}

              {booted && (
                <>
                <Panel title="PERSONAL INFORMATION">
                  <dl>
                    <Row label="NAME">{PROFILE.name}</Row>
                    <Row label="EDUCATION">
                      {PROFILE.education}, {PROFILE.school} ({PROFILE.schoolYears})
                    </Row>
                    <Row label="LOCATION">{PROFILE.location}</Row>
                  </dl>
                </Panel>

                <Panel title="SKILLS">
                  <dl>
                    {Object.entries(SKILLS).map(([k, v]) => (
                      <Row key={k} label={k}>
                        {v}
                      </Row>
                    ))}
                  </dl>
                </Panel>

                <Panel title="EXPERIENCE">
                  <ul className="space-y-5">
                    {EXPERIENCE.map((e) => (
                      <li key={e.org} className="grid grid-cols-[auto_1fr] gap-x-3">
                        <span className="text-accent" aria-hidden>
                          ▸
                        </span>
                        <div>
                          <p className="text-ink">{e.role}</p>
                          <p className="text-ink-dim">
                            {e.org} <span className="text-rule">|</span>{' '}
                            <span className="tnum">{e.period}</span>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Panel>

                <Panel title="PROJECTS">
                  <ul className="space-y-6">
                    {PROJECTS.map((p) => (
                      <li key={p.name}>
                        <p className="text-proj text-[0.9375rem]">{p.name}</p>
                        <p className="mt-1.5">{p.desc}</p>
                        <p className="mt-1.5 text-ink-dim/70">{p.stack}</p>
                      </li>
                    ))}
                  </ul>
                </Panel>

                <Panel title="ACHIEVEMENTS & PUBLICATIONS">
                  <ul className="space-y-2">
                    {ACHIEVEMENTS.map((a) => (
                      <li key={a} className="grid grid-cols-[auto_1fr] gap-x-3">
                        <span className="text-accent" aria-hidden>
                          ◆
                        </span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </Panel>

                <Panel title="CONTACT INFORMATION">
                  <dl>
                    <Row label="EMAIL">
                      <a className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent" href="mailto:kai.mercer@example.com">
                        {PROFILE.email}
                      </a>
                    </Row>
                    <Row label="PHONE">
                      <a className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent" href="tel:+31612345678">
                        <span className="tnum">{PROFILE.phone}</span>
                      </a>
                    </Row>
                    <Row label="GITHUB">
                      <a className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent" href="https://github.com/kaimercer">
                        {PROFILE.github}
                      </a>
                    </Row>
                    <Row label="LINKEDIN">
                      <a className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent" href="https://linkedin.com/in/kai-mercer">
                        {PROFILE.linkedin}
                      </a>
                    </Row>
                  </dl>
                </Panel>
              </>
            )}
            </div>
          </div>
        </main>

        <Sidebar />
      </div>
    </div>
  )
}