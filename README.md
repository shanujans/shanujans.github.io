# 🚀 Shanujan Suresh — Personal Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Status-Live-00ff9d?style=for-the-badge&logo=vercel)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-7700ff?style=for-the-badge)

**[🌐 Live Site](https://shanujan.is-a.dev)** &nbsp;|&nbsp; **[📧 Contact](mailto:shanujansh@gmail.com)** &nbsp;|&nbsp; **[💼 LinkedIn](https://www.linkedin.com/in/shanujansuresh/)**

</div>

---

## ✨ Features

- 🌀 **Matrix Rain Loading Screen** — animated boot sequence on every visit
- 🖱️ **Custom Neon Cursor** — glowing dot with lagging trail effect
- 🌐 **Interactive Particle Network** — canvas particles with mouse repulsion
- 💻 **Live Terminal Background** — real commands typing on the left side
- 🔢 **Floating Binary/Hex Effect** — ambient code symbols drifting on the right side
- ✍️ **Typewriter Hero** — cycles through 5 roles with blinking cursor
- 👾 **CSS Glitch Animation** — cyberpunk name glitch on the hero section
- 📊 **Scroll Progress Bar** — gradient indicator at the top of the page
- 🗂️ **Experience Timeline** — alternating work & education timeline
- 🎴 **3D Tilt Project Cards** — mouse-tracked perspective tilt effect
- 🔍 **Project Filter Tabs** — filter by Python, ML, Security, PyPI and more
- 🤖 **Shanu AI Chatbot** — Gemini 2.0 Flash Lite powered by a secure Cloudflare Worker proxy
- 🔐 **Security Hardened** — API keys stored as Cloudflare Secrets, email obfuscated, Formspree endpoint encrypted
- 📱 **Fully Responsive** — mobile-first design across all screen sizes

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS |
| Animations | Pure CSS + Canvas API |
| AI Chatbot | Google Gemini Flash Latest |
| API Proxy | Cloudflare Workers |
| Contact Form | Formspree |
| Deployment | GitHub Pages via gh-pages |
| Fonts | JetBrains Mono + Rajdhani |
| Icons | Font Awesome 6 |

---

## 📁 Project Structure

```
shanujans.github.io/
├── components/
│   ├── AIChatBot.tsx          # Gemini AI assistant (Cloudflare Worker proxy)
│   ├── About.tsx              # Skills, stats, tech stack
│   ├── BackToTopButton.tsx    # Animated back to top
│   ├── Contact.tsx            # Obfuscated email + encrypted Formspree
│   ├── CursorGlow.tsx         # Custom neon cursor with trail
│   ├── Experience.tsx         # Work & education timeline
│   ├── Footer.tsx             # Links, status, credits
│   ├── Header.tsx             # Active section nav + hamburger
│   ├── Hero.tsx               # Typewriter, glitch text, stats
│   ├── LoadingScreen.tsx      # Matrix rain boot screen
│   ├── ParticleNetwork.tsx    # Interactive canvas particles
│   ├── Projects.tsx           # 3D tilt cards + filter tabs
│   ├── RightSideEffect.tsx    # Floating binary/hex ambient effect
│   ├── ScrollProgress.tsx     # Top gradient scroll bar
│   ├── Services.tsx           # Service cards with glow
│   └── TerminalBackground.tsx # Animated terminal (left side)
├── hooks/
│   └── useOnScreen.ts         # Intersection Observer hook
├── worker/
│   └── gemini-proxy.js        # Cloudflare Worker — deploy separately
├── public/
│   ├── favicon.png
│   └── Shanujan-CV.pdf
├── App.tsx
├── index.html                 # All CSS animations & variables
├── index.tsx
├── types.ts
├── vite.config.ts
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) v18 or higher
- npm (comes with Node.js)

### Run Locally

```bash
# Clone the repo
git clone https://github.com/shanujans/shanujans.github.io.git
cd shanujans.github.io

# Install dependencies
npm install

# Start dev server
npm run dev
# → Opens at http://localhost:5173
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `vite build` then pushes the `dist/` folder to the `gh-pages` branch automatically.

---

## 🤖 AI Chatbot Setup

The chatbot uses **Google Gemini 2.0 Flash Lite** via a **Cloudflare Worker proxy** so your API key is never exposed in the browser or GitHub.

### 1. Get a free Gemini API key
Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) — no credit card needed.

### 2. Deploy the Cloudflare Worker
1. Go to [workers.cloudflare.com](https://workers.cloudflare.com) → free account
2. Create Worker → paste contents of `worker/gemini-proxy.js`
3. Settings → Variables & Secrets → Add Secret:
   - Name: `GEMINI_API_KEY`
   - Value: your key from step 1
4. Copy your Worker URL: `https://your-worker.workers.dev`

### 3. Update the Worker URL
In `components/AIChatBot.tsx` line 18:
```ts
const WORKER_URL = 'https://your-worker-name.workers.dev'; // ← paste here
```

Then redeploy:
```bash
npm run deploy
```

---

## 🔐 Security

| Protection | Implementation |
|---|---|
| API key never in source | Stored as Cloudflare Secret |
| API key never in browser | Requests proxied via Worker |
| Rate limiting | 20 requests / 60s per IP |
| CORS locked | Worker only accepts requests from portfolio domain |
| Email obfuscated | Split base64, decoded only on copy click |
| Formspree URL encrypted | Split base64 chunks, decoded at fetch time |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙋 About Me

**Shanujan Suresh** — IT Professional & Developer based in Sri Lanka 🇱🇰, transitioning into AI/ML.

Passionate about Python, Cybersecurity, Quantum Computing, and Blockchain.

[![GitHub](https://img.shields.io/badge/GitHub-shanujans-181717?style=flat&logo=github)](https://github.com/shanujans)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-shanujansuresh-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/shanujansuresh/)
[![Telegram](https://img.shields.io/badge/Telegram-@Revmatrix-26A5E4?style=flat&logo=telegram)](https://t.me/Revmatrix)

---

<div align="center">
  <sub>Built with ❤️ using React + TypeScript + Vite</sub>
</div>
