# IntelliROI — Product Requirements Document

## Original Problem Statement
"shape the landing page website in top notch scale looks like enterprise level" — based on the uploaded brief (`ai intelliroi.txt`): a premium, dark-first, executive-grade landing page for IntelliROI, an Enterprise AI Intelligence Platform ("AI ROI Operating System") that gives enterprises visibility into AI usage, token consumption, cost, governance, and ROI. Tagline: "Every AI token should create measurable business value."

## User Personas
- Primary: CEOs, CTOs, CIOs, Chief Digital Officers, VP Engineering, AI Transformation Leaders
- Secondary: Engineering Managers, AI Platform Teams, FinOps, Security Teams, Enterprise Architects

## Architecture
- Frontend: React 19 (Vite), Tailwind CSS, framer-motion (scroll reveals, masked hero, counting numbers), lenis (momentum scrolling), recharts (dashboard charts), lucide-react icons, sonner toasts
- Backend: FastAPI + Motor (async MongoDB), routes prefixed /api
- DB: MongoDB via MONGO_URL / DB_NAME env vars; collection `demo_requests`
- Design system: /app/design_guidelines.json — "executive intelligence terminal" art direction: #09090B canvas, #00E5A8 emerald accent, Inter + JetBrains Mono, hairline #2A2A2A borders, film grain, numbered chapters

## Core Requirements (static)
- Dark-first premium enterprise aesthetic (Stripe/Linear/Palantir/Bloomberg-terminal inspired)
- Sections: Hero, Trusted-By marquee, Problem, Solution pipeline, Features bento, Dashboard preview, ROI calculator, Enterprise architecture, Integrations, Security, Pricing, FAQ, Final CTA, Footer
- Working "Book Demo" form saving enquiries to the database
- Fully responsive (desktop/tablet/mobile), WCAG-conscious, data-testids on all interactive elements

## Implemented (2026-08-03)
- Kinetic hero: masked line-by-line H1 reveal ("Measure Every AI Dollar."), parallax live dashboard preview with counting metrics, recharts sparkline, realtime department spend rows
- Slow editorial trusted-by marquee (OpenAI, Anthropic, Google Cloud, Azure, AWS Bedrock, etc.)
- 10 numbered chapters (01 Problem → 10 FAQ) with scroll-reveal motion throughout
- Animated solution pipeline (Employee → AI Gateway → Providers → Engines → Executive Dashboard) with flowing data-packet dots
- 12-module features bento grid with terminal-style cards
- Full executive dashboard preview: KPI strip, cost-vs-value 12M area chart, provider distribution, department spend, AI recommendations
- Interactive ROI calculator: sliders → live animated cost/value/hours/ROI outputs
- Enterprise architecture vertical pipeline (Company → … → Executives) with animated pulse
- Integrations grid (12) with hover "CONNECTED" badges; Security grid (SOC2, SSO, audit logs, encryption, RBAC, compliance)
- Pricing (Starter $490 / Growth $1,900 / Enterprise custom, Enterprise highlighted)
- Executive FAQ accordion; final CTA with blinking terminal cursor; full footer with newsletter field
- Backend: POST /api/demo-requests (validated, stored in MongoDB), GET /api/demo-requests, GET /api/ health
- Demo modal: glass overlay, form → success state, Escape/scroll-lock handling, lenis pause

## Verified
- curl: health, POST demo request (persisted), GET list — all pass
- e2e screenshots: hero, dashboard, solution, ROI, pricing, CTA, mobile (390px), modal open → fill → submit → success state

## Backlog
- P0: None blocking
- P1: Wire newsletter subscribe to backend; "Watch Platform Tour" video modal; admin view for demo requests
- P2: Blog/resources section, customer logos with real marks, localized versions, Lighthouse performance pass, reduced-motion mode polish

## Next Tasks
1. Newsletter signup endpoint + storage
2. Platform tour video modal
3. Simple admin page listing demo requests (auth-gated)
