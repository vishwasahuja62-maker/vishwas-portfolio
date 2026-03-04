# Vishwas Ahuja - Portfolio Website | 2.1 🚀

<div align="center">
  <h3>Engineering Over Tutorials • Production-Grade Infrastructure • AI-Augmented Developer Experience</h3>
  <p><strong>A high-performance, cinematic engineering portfolio built for the 2026 Kuberns AI Hackathon.</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Vite-5.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/GSAP-3.14-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
    <img src="https://img.shields.io/badge/Groq-Llama_3-f34f29?style=for-the-badge&logo=ai&logoColor=white" alt="Groq" />
    <img src="https://img.shields.io/badge/Infrastructure-Kuberns_AI-blue?style=for-the-badge&logo=kubernetes&logoColor=white" alt="Kuberns AI" />
  </p>
</div>

---

## 🏗️ System Overview

This repository represents more than a landing page—it is a live **architecture demonstration**. Every interaction, from the pre-loader system check to the real-time AI assistant, is engineered to demonstrate **systems thinking** and **applied software craftsmanship**.

### 🤖 The Hybrid AI Brain (Flagship Feature)
The portfolio features an integrated **AI Portfolio Guide** designed to help recruiters evaluate my technical resonance.
- **Agentic Logic**: Uses multi-turn instruction chaining to explain complex project architectures.
- **Fail-Safe Fallback**: Implemented a **Local Rule-Based Knowledge Engine** that takes over if the primary LLM (Llama-3 via Groq) is unavailable or if the VITE_GEMINI_API_KEY is not provided.
- **Cinematic Orchestration**: Revealed using a custom GSAP spring-physics animation with dynamic blur filters and staggered child reveals.

---

## 🛠️ Technical Deep-Dives

### 1. GitHub Profile Analyzer (The Logic Layer)
> **Problem**: Raw GitHub profiles fail to communicate a developer's true consistency and weighted skill level.
- **Engineering Solution**: Developed a multi-weighted scoring engine using a Node.js/Express backend.
- **The Algorithm**:
  - `BaseScore = (Stars * 3) + (Repos * 2) + (Followers * 2)`
  - `Bonus = (ActivityMultiplier * 1.2) + (OrganizationLoyalty * 50)`
- **Optimization**: Normalizes high-throughput data from the GitHub REST API into a 1-1000 score with radar-map visualization using Chart.js.

### 2. Real-Time Kanban Board (The Persistence Layer)
> **Problem**: State drift in collaborative task managers due to high-latency database sync.
- **Engineering Solution**: Leveraged **PostgreSQL Real-time Channels** via Supabase for sub-100ms synchronization across instances.
- **State Management**: Implemented optimistic UI updates to ensure the interface remains fluid while background sync handles persistence and Row-Level Security (RLS).

### 3. Neon Snake PWA (The Performance Layer)
> **Problem**: High-input lag and lack of offline support in traditional browser-based games.
- **Engineering Solution**: A zero-dependency JavaScript game engine under 50KB.
- **Features**:
  - **Illegal Turn Protection**: Logical gate preventing 180-degree self-collisions.
  - **Frame-Perfect Loop**: Optimized game loop resulting in <1ms input latency.
  - **Connectivity**: Full offline capability via custom PWA Service Worker implementation and Web App Manifest.

---

## 🎨 Design & Motion Philosophy

The UI is built on a **HUD (Heads-Up Display)** design system, prioritizing information density without visual clutter.
- **GSAP & ScrollTrigger**: Every section reveal is orchestrated via a timeline, ensuring that motion feels meaningful and signals "System Loading" or "Data Insight."
- **Framer Motion**: Handles complex layout transitions, specifically in the mobile view where elements transform between lists and expanded case studies.
- **Glassmorphism**: Uses `backdrop-filter: blur()` and HSL-based translucency to create depth tiers, suggesting a layered software stack.

---

## 🚀 Infrastructure & Deployment

This portfolio is a production showcase of the **Kuberns AI Ecosystem**.
- **Edge Delivery**: Deployed on globally distributed edge nodes for sub-500ms initial page load.
- **CI/CD Pipeline**: Automated deployment triggers on `main` branch push, with automatic SSL provisioning and asset compression.
- **Observability**: Features a live "System Architecture" HUD in the hero section signaling the health of the connection to the AI nodes.

---

## 💻 Local Development Setup

To replicate this environment locally:

1. **Clone and Enter**:
   ```bash
   git clone https://github.com/vishwasahuja62-maker/vishwas-portfolio.git
   cd vishwas-portfolio
   ```

2. **Environment Configuration**:
   Create a `.env.local` to enable the AI Brain:
   ```env
   VITE_GEMINI_API_KEY=your_groq_or_gemini_key
   ```

3. **Install & Run**:
   ```bash
   npm install
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   ```

---

<div align="center">
  <sub>Built with 💻 by Vishwas Ahuja | "Engineering Over Tutorials"</sub>
</div>