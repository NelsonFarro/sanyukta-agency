---
name: sanyukta-website-build
description: Use this skill when building, editing, or reviewing the Sanyukta The Digital Hub marketing website. Covers file structure, coding conventions, the design-to-code workflow, and the definition of done for this project.
---

# Sanyukta Website Build — Working Conventions

## Before writing any code
1. Read `PRD.md` for scope/content requirements and `DESIGN.md` for the visual
   system (palette, type, layout, motion, signature waveform element, voice).
2. Do not deviate from the design tokens in `DESIGN.md` without flagging why —
   treat it as the source of truth for color/type/spacing decisions.
3. If real brand assets (logo, exact colors, real testimonials/portfolio) are
   not yet provided, use the placeholder content rules in the PRD — don't
   invent fake client names or fabricated results/numbers.

## File structure
```
/sanyukta-website
├── index.html
├── /css
│   └── styles.css
├── /js
│   └── main.js
├── /assets
│   ├── /images
│   └── /icons
└── README.md
```
Keep it a static site (no framework/build step) unless told otherwise — this
keeps handoff and future edits simple for a non-technical client.

## Coding conventions
- Semantic HTML5 (`<header>`, `<nav>`, `<section id="...">`, `<footer>`) — one `<h1>` per page
- CSS: use custom properties (`:root { --ink: #12131A; ... }`) mapped directly to the DESIGN.md token table — never hardcode hex values inline
- Mobile-first CSS: base styles for mobile, `min-width` media queries at 768px and 1024px
- JS: vanilla, no dependencies unless a CDN library is explicitly justified (e.g. AOS for scroll animation is acceptable; avoid pulling in a framework for a one-page static site)
- Watch selector specificity when styling shared classes like `.section` vs element-specific classes — don't let generic section padding rules get silently overridden

## Build loop
1. Build one section at a time, in page order (Hero → About → Services → ... → Footer)
2. After each section, take a screenshot / visually check against `DESIGN.md` layout concept before moving to the next
3. Check responsive behavior at 375px, 768px, 1440px widths for every section before moving on
4. Once all sections are built, do a full-page pass: verify the waveform divider motif appears consistently, spacing rhythm is even, and no orphaned/unused CSS remains

## Definition of done (per section and full page)
- [ ] Matches DESIGN.md palette/type — no off-token colors introduced
- [ ] Responsive at mobile/tablet/desktop breakpoints
- [ ] Keyboard focus visible on all interactive elements
- [ ] `prefers-reduced-motion` respected
- [ ] Lighthouse mobile performance ≥ 90
- [ ] Real contact details wired in (phone, WhatsApp link, email, map address) — no placeholder Lorem ipsum left in shipped copy
- [ ] Placeholder-only content (portfolio/testimonials) clearly marked in a code comment so it's easy to find and swap later

## What NOT to do
- Don't introduce a new color/font outside the DESIGN.md token system without calling it out
- Don't add generic AI-template patterns the design explicitly avoids: numbered 01/02/03 markers, cream+terracotta palette, equal-height 3-card grids for everything
- Don't add a backend, database, or CMS — this is a static MVP (see PRD out-of-scope list)
- Don't fabricate client logos, testimonial names, or result numbers for the portfolio/testimonials sections
