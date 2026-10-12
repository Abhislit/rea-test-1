# rea-test-1

A retro terminal-style portfolio page — green-on-black CRT, a boot sequence that
types itself out, and a dashboard sidebar. Built as a layout study after
[reverse-engineering a live Vite/React/Tailwind portfolio](https://aayushgid.vercel.app/)
with [REA](https://github.com/morluto/rea).

## Stack

Vite 8 · React 19 · Tailwind CSS 4 · lucide-react · JetBrains Mono Variable
(self-hosted via `@fontsource`, no CDN).

## Run

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # -> dist/
```

## Colour

The palette is OKLCH, defined as Tailwind `@theme` tokens in `src/index.css`.
Every foreground/background pair is measured against WCAG AA:

| Token | Role | Contrast on panel |
|---|---|---|
| `--color-ink` | body text | 13.86:1 |
| `--color-ink-dim` | secondary text | 8.43:1 |
| `--color-accent` | headings, labels, focus rings | 11.28:1 |
| `--color-warn` | `[OK]`, `RUNNING`, warnings | 10.69:1 |
| `--color-proj` | project names | 8.22:1 |

`--color-rule` is a decorative separator (2.53:1) and carries no meaning on its
own, so WCAG 1.4.11 does not bind it.

**Don't eyeball edits to these values** — change them, re-measure, keep the
comment block above them in sync.

## Content

Every value in `App.jsx` is placeholder data. The content objects at the top of
the file — `PROFILE`, `SKILLS`, `EXPERIENCE`, `PROJECTS`, `ACHIEVEMENTS` — are
the only thing you need to edit.

The `PROCESSES`, `STATUS`, `LOGS`, `NETWORK` and `SECURITY` arrays are
**hardcoded strings, not live telemetry**. They exist to exercise the layout.

## Accessibility

- Boot typewriter, scanline sweep and caret all respect
  `prefers-reduced-motion: reduce`
- Focus rings, text selection and scrollbars are themed from the palette
- All figures use `font-variant-numeric: tabular-nums`
- Network meters expose `role="meter"` with `aria-valuenow`

## License

MIT