# 🩸 LifeFlow — Blood Donation Platform

[![Live Demo](https://img.shields.io/badge/Demo-Live_on_Vercel-ff0044?style=for-the-badge&logo=vercel&logoColor=white)](https://life-flow-git-main-vishalvivek14332-9149s-projects.vercel.app/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **A futuristic, high-performance blood donation platform connecting lifesavers with patients in critical need.**  
> Built with interactive 3D vascular scroll animations, real-time blood stock telemetry, and streamlined emergency donor matching.

---

## 🌐 Live Deployment

🚀 **Explore the live platform:**  
### **[https://life-flow-git-main-vishalvivek14332-9149s-projects.vercel.app/](https://life-flow-git-main-vishalvivek14332-9149s-projects.vercel.app/)**

---

## ✨ Key Features

- **🩸 300-Frame Anatomical Scroll Canvas**
  - High-performance, edge-to-edge canvas frame-scrubbing animation tied to scroll progress.
  - Silk-smooth RequestAnimationFrame (60fps/120fps) lerp loop with custom velocity-damping physics.
  - Interactive arterial red light waves and pulse effects responding to scroll momentum.

- **📊 Real-Time Blood Availability Grid**
  - Instant visibility into blood reserves across all major groups (`A+`, `A-`, `B+`, `B-`, `O+`, `O-`, `AB+`, `AB-`).
  - Dynamic status indicators (*Critical*, *Optimal*, *Low Stock*) with direct one-click donation requests.

- **🧭 Central Compass & Vascular Flow Overlay**
  - Dynamic SVG arterial connection paths mapping active donor stations to emergency nodes.
  - Animated flowing blood particle streams highlighting the connection between donor and recipient.

- **⚡ Interactive Emergency Modals & Workflows**
  - **Quick Donate:** Streamlined donation appointment booking.
  - **Donor Registration:** Instant onboarding for volunteer lifesavers.
  - **Find Donors:** Geo-located matching by blood type and city.
  - **Donation Camps:** Discover nearby mobile drives and schedules.
  - **Emergency SOS:** Rapid response dispatch for critical hospital blood units.

- **🎨 Premium Dark Aesthetic & UI**
  - Sleek `#060103` biological dark background with arterial neon glows, glassmorphism, and responsive modern typography.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Core UI Component Architecture |
| **[TypeScript](https://www.typescriptlang.org/)** | Type-safe enterprise codebase |
| **[Vite 8](https://vitejs.dev/)** | Blazing-fast Next-Gen Frontend Tooling |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Modern styling engine & design tokens |
| **[Lucide React](https://lucide.dev/)** | Crisp, scalable medical and interface icons |
| **[Motion](https://motion.dev/)** | Smooth gesture and transition primitives |
| **[HTML5 Canvas API](https://developer.mozilla.org/)** | High-DPI frame scrubbing engine |

---

## 📁 Project Structure

```text
lifeflow---blood-donation-platform/
├── public/
│   └── frames/                 # 300 high-res rendered animation frames
├── src/
│   ├── components/
│   │   ├── BloodAvailabilitySection.tsx # Real-time blood stock telemetry
│   │   ├── CenterCompass.tsx            # Anatomical status hub
│   │   ├── HeroCard.tsx                 # Interactive quick-action action cards
│   │   ├── Modals.tsx                   # Donation, Request & Camp modals
│   │   ├── Navbar.tsx                   # Glassmorphic top navigation
│   │   ├── ScrollCanvas.tsx             # 300-frame canvas scrubbing engine
│   │   └── VascularFlowOverlay.tsx      # SVG arterial connections & pulse lines
│   ├── App.tsx                          # Main application layout & scroll physics
│   ├── index.css                        # Design system & Tailwind directives
│   └── main.tsx                         # React entrypoint
├── vercel.json                          # Vercel SPA routing configuration
├── vite.config.ts                       # Vite build & alias configuration
└── package.json                         # Dependencies & npm scripts
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (bundled with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vishalvivek14332-source/Life-Flow.git
   cd Life-Flow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to interact with LifeFlow.

---

## 📦 Production Build & Deployment

To generate an optimized production bundle:

```bash
npm run build
```

The output will be placed in the `dist/` directory, ready to be served by any static host or CDN.

### Deploying on Vercel
LifeFlow is pre-configured with [`vercel.json`](vercel.json) for instantaneous deployment:
1. Import `Life-Flow` directly into [Vercel](https://vercel.com/new).
2. The framework preset will automatically detect **Vite**.
3. Every commit pushed to `main` will automatically trigger a fresh production build.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
