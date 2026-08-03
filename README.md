# Sanyukta The Digital Hub — Marketing & Pitch Website

Welcome to the static single-page website built for **Sanyukta The Digital Hub** — Digital Marketing Agency, Thane.

This website is designed specifically around the **"Signal in a Noisy Market"** thesis: cutting through market clutter with animated broadcast waveform motifs, sharp copywriting, and an interactive **Cold Call Pitch Mode & ROI Calculator**.

---

## 🚀 Quick Start / How to View

Since this is a clean, static HTML5/CSS3/JS website with zero external build dependencies:

1. Double-click `index.html` to open it in any web browser (Chrome, Edge, Safari, Firefox).
2. Alternatively, run a lightweight local dev server (e.g. `npx serve` or VS Code Live Server extension).

---

## 🎨 Key Features & Design System Compliance

- **Design Tokens (`DESIGN.md`)**:
  - Ink (`#12131A`): Primary dark section background
  - Paper (`#F6F5F1`): Light section background for natural visual rhythm
  - Signal (`#FF4F3E`): Primary accent reserved exclusively for the signature waveform line & primary CTAs
  - Gold (`#E8B24B`): Secondary accent for highlights & interactive pitch badges
  - Ink-70 (`#4A4B57`) & Paper-90 (`#EDEBE4`)
- **Typography**: Space Grotesk (headings, geometric broadcast aesthetic) & Inter (body). Headlines set in sentence case.
- **Signature Waveform Dividers**: SVG paths (`flat → spike → flat`) that animate as the user scrolls into each section via `IntersectionObserver`.
- **Interactive Hero Canvas**: Live signal pulse animation responding to mouse movements to demonstrate digital signal strength.
- **Cold Call Pitch Mode & ROI Calculator**:
  - Click the **"Pitch Mode"** badge in the navbar or launch button to open the live ROI calculator modal.
  - Enter candidate ad budgets & deal sizes during a cold call to calculate instant projected lead numbers and ROI for your prospect.
- **WhatsApp Integration**: Deep linked to `+91 98333 12656` with floating action button and auto-formatted message payloads from the contact form.
- **Location Map**: Embedded map centered on Khopat, Thane.

---

## 📁 File Structure

```
/sanyukta
├── index.html            # Main semantic HTML5 single-page application
├── css/
│   └── styles.css        # CSS Tokens, layout, waveform dividers & media queries
├── js/
│   └── main.js          # Interactive waveform canvas, pitch mode calculator & form validation
├── DESIGN.md             # Visual design system & token specification
├── Sanyukta-PRD-TRD.md   # Product & Technical Requirements Document
├── SKILL.md              # Project conventions & definition of done
└── README.md             # Handoff & presentation instructions
```

---

## 📞 Handoff & Client Details
- **Phone / WhatsApp**: +91 98333 12656
- **Email**: info@sanyukta.co.in
- **Location**: Khopat, Thane (West), Maharashtra 400601
