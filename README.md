# Duncan D’Lima — Space Mission & Orbital Project Explorer

A cinematic, interactive personal portfolio website for **Duncan D’Lima** — Data Scientist, Applied AI Engineer, Software Developer, and CTO & Co-Founder at **Tekkloom**.

Re-engineered from a generic futuristic template into an **Interactive Space-Mission & Orbital Project Discovery Universe**.

---

## 🌟 Key Features & Redesign Architecture

1. **Opening Cinematic Experience: Rocket Launch Sequence**
   - Realistic launchpad at night with an umbilical tower, searchlights, and cryogenic boil-off steam venting.
   - Real-time launch telemetry strip (LOX/RP-1 Pressure, Inertial Guidance Alignment, Range Safety Armed).
   - `INITIATE LAUNCH SEQUENCE` command triggers a countdown, amber/orange engine plume, billowing smoke, acoustic camera shake, and Mach vapor cone during ascent into Low Earth Orbit.
   - Prominent **Skip to Orbit** button with session persistence (`sessionStorage.getItem('dd_launch_skipped')`).

2. **The Project Globe: Functional Orbital Discovery**
   - An interactive 3D Earth rendered on Canvas with continental landmasses, day/night rim terminator lighting, and an active beacon at Duncan's home station in Mumbai, India.
   - **4 Conceptual Orbital Bands:**
     - **Orbit 01: Machine Learning & Data Science** (*Deepfake Video Detector*, *Dementia Progression Model*)
     - **Orbit 02: Data Engineering & Analytics** (*SQL Job Market Analysis - DuckDB*)
     - **Orbit 03: Applied AI & Software Engineering** (*CompliSphere Pro*, *AI Resume Optimizer*)
     - **Orbit 04: Aerospace & Geospatial Research** (*Aerospace Event Classification Research*, *SatQueryAI*)
   - Interactive satellites orbiting each band with live telemetry beacons.
   - Direct toggle to a conventional, keyboard-accessible grid view via **"View All Projects (List)"**.

3. **Technical Project Dossiers**
   - Each project opens into a mission-grade case study containing:
     - 1. Mission Brief & Problem Statement
     - 2. Data Sources & Provenance
     - 3. System Architecture Flow
     - 4. Implementation Decisions & Specifications
     - 5. Evaluation & Observed Findings
     - 6. Known Limitations & Unresolved Constraints
     - 7. Syntax-Highlighted Code Snippet & Verified GitHub Link

4. **Automated GitHub Telemetry & Synchronization**
   - Server-side cached API route (`/api/github` via `lib/github.ts`) fetching Duncan's verified repositories from GitHub profile [DunD514](https://github.com/DunD514) with resilient fallback to the curated local catalog.

5. **Mission Record, Avionics & Communications**
   - **Academic Flight Rating:** 3.89 / 4.0 CGPA at SVKM's NMIMS MPSTME, Mumbai.
   - **Command Leadership:** CTO & Co-Founder at Tekkloom.
   - **Avionics & Toolkit:** Categorized technical skill matrix with live search filter.
   - **Mission Communications:** Validated message uplink form and one-click email copy button.
   - **Flight Manual (CV):** In-browser curriculum vitae viewer with print-to-PDF and direct download options.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 & Custom Mission Control Design Tokens
- **Typography:** Space Grotesk (Headings), Inter (Body), JetBrains Mono (Telemetry & Code)
- **Visuals:** Custom HTML5 3D Earth & Rocket Launch Canvas Simulations
- **Icons:** Lucide React & Custom Brand SVGs
- **Deployment:** Vercel-ready static/dynamic hybrid architecture

---

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local Turbopack dev server
npm run dev

# 3. Open in browser
# http://localhost:3000

# 4. Production build test
npm run build
npm start
```

---

## ⚙️ Central Data Configuration

All personal information, project dossiers, repository links, experience items, and skills are centrally configured in:
👉 `data/portfolioData.ts`

---

## 📄 License

Designed with intention. Built with curiosity.
All rights reserved © 2026 Duncan D’Lima.
