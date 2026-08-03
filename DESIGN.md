# DESIGN.md — Sanyukta The Digital Hub

## 1. Design Thesis
Sanyukta's own tagline is "ready to make some digital noise." That's the hook: this
agency sells *signal in a noisy market*. The design should feel like a broadcast —
a clean signal cutting through static — not a generic "growth chart + handshake"
marketing-agency template.

**Signature element:** A thin animated waveform/pulse line that runs through the
hero as a live "signal," then reappears as the section divider throughout the page
(flat line → spikes → flat line), visually tying every section back to the
"cutting through noise" idea. This is the one bold move — everything else stays quiet.

Avoid defaults: no cream-background+serif+terracotta combo, no black+neon-green
template, no numbered 01/02/03 markers (their services aren't a sequence).

## 2. Color Palette
| Token | Hex | Use |
|---|---|---|
| `ink` | `#12131A` | Primary background (dark sections, nav) |
| `paper` | `#F6F5F1` | Light background (alternating sections) |
| `signal` | `#FF4F3E` | Primary accent — the "pulse" color, CTAs, waveform |
| `gold` | `#E8B24B` | Secondary accent — used sparingly (highlights, hover states) |
| `ink-70` | `#4A4B57` | Body text on light background |
| `paper-90` | `#EDEBE4` | Card backgrounds on light sections |

Rule: `signal` (red-orange) is reserved for the waveform + primary CTA only —
it must stay rare so it reads as "the pulse," not decoration.

## 3. Typography
- **Display (headings):** "Archivo" or "Space Grotesk" — geometric, confident,
  slightly technical (broadcast/signal feel), used bold/tight tracking
- **Body:** "Inter" — neutral, highly legible, used at 16-18px base
- **Type scale:** H1 56/60px (mobile 34/38px) → H2 36px → H3 22px → Body 17px → Caption 13px, uppercase, letter-spacing 0.08em
- Headlines set in sentence case, not title case (feels less templated, more direct)

## 4. Layout Concept
```
┌─────────────────────────────────────┐
│  NAV (sticky, transparent→ink on scroll) │
├─────────────────────────────────────┤
│  HERO — ink bg, waveform animates in │
│  left-aligned headline + CTA         │
│  right: live-drawing pulse line      │
├─────────────────────────────────────┤
│  ~~~ waveform divider (flat→spike) ~~│
├─────────────────────────────────────┤
│  ABOUT — paper bg, two-column        │
│  (short copy + stat callout)         │
├─────────────────────────────────────┤
│  SERVICES — ink bg, asymmetric grid  │
│  (not equal cards — one large        │
│  featured service, rest smaller)     │
├─────────────────────────────────────┤
│  WHY US — paper bg, horizontal       │
│  scroll-snap strip of 4 points       │
├─────────────────────────────────────┤
│  PORTFOLIO — ink bg, marquee-style   │
│  logo/result strip                   │
├─────────────────────────────────────┤
│  TESTIMONIALS — paper bg, single     │
│  large quote at a time, not a grid   │
├─────────────────────────────────────┤
│  CONTACT — ink bg, waveform flattens │
│  to a line pointing at CTA + form    │
├─────────────────────────────────────┤
│  FOOTER                              │
└─────────────────────────────────────┘
```
Alternate `ink` / `paper` backgrounds section to section — this alone creates
strong visual rhythm without extra ornamentation.

## 5. Motion
- **Hero:** waveform draws itself in on load (SVG stroke-dashoffset animation), ~1.2s ease-out
- **Section dividers:** waveform "spikes" animate in via Intersection Observer as user scrolls to each section
- **Cards/services:** subtle fade + 8px translate-up on scroll entry, staggered 80ms apart
- **Hover states:** CTA buttons — signal-red fill slides in from left, no bounce/scale gimmicks
- Respect `prefers-reduced-motion`: disable waveform draw and stagger, use simple opacity fade instead

## 6. Voice & Copy Direction
Write from the visitor's side of the screen — what they get, not what Sanyukta does internally.
- Active voice, plain verbs: "Get found. Get chosen. Get contacted." not "We provide visibility solutions"
- Headline should reference the noise/signal idea once (in the hero) — don't repeat the metaphor everywhere, one strong hit is enough
- CTA button copy: "Start the conversation" (not generic "Submit" or "Learn More")
- Empty/placeholder portfolio state (until real case studies arrive): "Real results, coming to this space soon" — honest, not filled with fake specifics

## 7. Accessibility Floor (non-negotiable regardless of aesthetic)
- Color contrast AA minimum, check `signal` red-orange on `ink` background specifically
- Visible keyboard focus states on all interactive elements
- Waveform/motion must have a reduced-motion fallback
- Alt text on all images/logos; form fields properly labelled
