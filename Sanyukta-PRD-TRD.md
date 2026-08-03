# Sanyukta The Digital Hub — Website Build
## Product & Technical Requirements Document

---

## 1. PRD — Product Requirements Document

### 1.1 Overview
**Client:** Sanyukta The Digital Hub — Digital Marketing Agency, Thane
**Project:** One-page marketing website (v1 / MVP)
**Goal:** Give the agency a credible, conversion-focused website that showcases their services and drives leads via contact form / WhatsApp, since they currently only have a placeholder GoDaddy page.

### 1.2 Problem Statement
A digital marketing agency without a real website undermines its own credibility when pitching clients. The site needs to demonstrate the same quality of digital presence they sell to others.

### 1.3 Target Users
- **Primary:** Small/mid-sized local business owners in Thane/Mumbai researching marketing agencies
- **Secondary:** Agency's own team (for sharing during pitches, on business cards, social bios)

### 1.4 Goals & Success Metrics
| Goal | Metric |
|---|---|
| Establish credibility | Professional, modern design comparable to top agency sites |
| Generate leads | Working contact form + WhatsApp click-to-chat |
| Fast load, mobile-friendly | Lighthouse score 90+ on mobile |
| Easy to hand off | Clean code, easy for client to request future edits |

### 1.5 Scope (v1 — MVP)
**In scope:**
- Single-page site with anchor-linked navigation
- Sections: Hero, About, Services, Why Choose Us, Portfolio (placeholder), Testimonials (placeholder), Contact
- Responsive design (mobile/tablet/desktop)
- Contact form (front-end only, mailto or form UI — no backend/DB)
- WhatsApp click-to-chat, Instagram link, embedded Google Map
- Smooth scroll navigation + on-scroll animations

**Out of scope (v1):**
- CMS / admin panel
- Blog functionality
- Backend, database, or form-to-email integration
- Multi-language support
- Payment integration

### 1.6 Content Requirements
- Placeholder/dummy content to be used for Portfolio and Testimonials until client provides real case studies and logos
- Real business details: address (Khopat, Thane), phone (+91 98333 12656), email (info@sanyukta.co.in), Instagram handle

### 1.7 User Stories
1. As a visitor, I want to quickly understand what services the agency offers, so I can decide if they fit my needs.
2. As a visitor, I want to see proof of results (case studies/testimonials), so I trust the agency.
3. As a visitor, I want a fast way to contact them (form or WhatsApp), so I can start a conversation without friction.
4. As a visitor on mobile, I want the site to look and function just as well as on desktop.

### 1.8 Assumptions
- Client will provide logo, brand colors, real testimonials, and case study data post-launch (v1.1 update)
- Hosting/domain handled separately (client may reuse existing GoDaddy domain)

### 1.9 Timeline
- Design + build: 5–7 days
- Revisions: 1–2 days
- Total: ~1 week turnaround

---

## 2. TRD — Technical Requirements Document

### 2.1 Tech Stack
| Layer | Choice | Notes |
|---|---|---|
| Structure | HTML5 | Semantic tags for SEO/accessibility |
| Styling | CSS3 (or Tailwind CSS) | Utility-first if using Tailwind for speed |
| Interactivity | Vanilla JS (or React if iterating heavily in Antigravity) | Keep MVP dependency-light |
| Animations | CSS transitions + Intersection Observer (or AOS library) | On-scroll fade/slide-in effects |
| Icons | Lucide or Font Awesome (CDN) | For service cards, value props |
| Fonts | Google Fonts (e.g., Poppins/Inter for headings, system sans for body) | |
| Hosting target | Static hosting (Netlify/Vercel/GitHub Pages) or client's existing GoDaddy | No server-side rendering needed |

### 2.2 Architecture
- **Single HTML page**, sectioned via `<section id="...">` for anchor navigation
- No routing/framework needed for MVP — keep it a static site for fast load and easy handoff
- If React is used (for easier future iteration), structure as:
  - `App.jsx` → imports section components (`Hero`, `About`, `Services`, `WhyUs`, `Portfolio`, `Testimonials`, `Contact`)
  - All styling co-located (Tailwind classes or single CSS file)

### 2.3 Page Structure & Components
```
Navbar (sticky, smooth-scroll links)
├── Hero
├── About
├── Services (card grid)
├── Why Choose Us (icon + text grid)
├── Portfolio (placeholder cards)
├── Testimonials (carousel or static cards)
├── Contact (form + map + socials)
Footer (copyright, quick links, socials)
```

### 2.4 Functional Requirements
- **Navbar:** Sticky on scroll, smooth-scroll to section anchors, mobile hamburger menu below 768px
- **Contact form:** Fields — Name (required), Email (required, validated), Phone (optional), Message (required). Submit action: `mailto:info@sanyukta.co.in` link or visual-only submit (no backend in v1)
- **WhatsApp button:** `https://wa.me/919833312656` deep link, floating or in Contact section
- **Google Map:** Embedded iframe centered on Khopat, Thane address
- **Animations:** Fade/slide-in on scroll for each section (Intersection Observer API or AOS.js via CDN)

### 2.5 Non-Functional Requirements
| Requirement | Target |
|---|---|
| Performance | Lighthouse Performance score ≥ 90 (mobile) |
| Responsiveness | Breakpoints at 768px (tablet), 480px (mobile) |
| Accessibility | Semantic HTML, alt text on images, sufficient color contrast (WCAG AA) |
| SEO | Meta title/description, Open Graph tags, proper heading hierarchy (single H1) |
| Browser support | Latest 2 versions of Chrome, Safari, Firefox, Edge |
| Load time | < 2.5s on 4G |

### 2.6 Design Tokens (starting point — adjust once brand assets received)
- **Primary:** Navy `#0B1F3A`
- **Accent:** Vibrant orange `#FF6B35` or teal `#00B4A6`
- **Background:** Off-white `#FAFAFA`
- **Text:** Dark gray `#1A1A1A` (body), Navy (headings)
- **Font:** Poppins (headings), Inter (body)
- **Border radius:** 12px for cards/buttons (soft, modern feel)

### 2.7 File/Folder Structure (if HTML/CSS/JS)
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

### 2.8 Deployment
- Build as static site → deploy to Netlify/Vercel for preview link during client review
- Final handoff: either transfer to client's GoDaddy hosting or provide zipped source files

### 2.9 Future Considerations (v1.1+, not in current scope)
- Replace placeholder portfolio/testimonials with real client data
- Add blog section for SEO content marketing
- Optional: lightweight CMS (e.g., Netlify CMS) if client wants to self-edit content
- Form-to-email backend (e.g., Formspree, EmailJS) instead of mailto link
