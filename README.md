# 🚀 Shanujan Suresh — Personal Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Status-Live-00ff9d?style=for-the-badge&logo=vercel)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-7700ff?style=for-the-badge)

**[🌐 Live Site](https://shanujan.is-a.dev)** &nbsp;|&nbsp; **[📧 Contact](mailto:shanujansh@gmail.com)** &nbsp;|&nbsp; **[💼 LinkedIn](https://www.linkedin.com/in/shanujansuresh/)** &nbsp;|&nbsp; **[🏢 RevMatrix AI](https://revmatrixai.github.io)**

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
- 🗺️ **Active Section Navigation** — header highlights current section while scrolling
- 🗂️ **Experience Timeline** — alternating work and education timeline
- 🎴 **3D Tilt Project Cards** — mouse-tracked perspective tilt effect
- 🔍 **Project Filter Tabs** — filter by Python, ML, Security, PyPI and more
- 🤖 **ARIA AI Chatbot** — powered by Llama 3 via Groq, proxied securely through Cloudflare Workers
- 🔐 **Security Hardened** — API keys stored as Cloudflare Secrets, email obfuscated, Formspree endpoint encrypted
- 📱 **Fully Responsive** — mobile-first design across all screen sizes
- ⚡ **Auto Deploy** — GitHub Actions builds and deploys on every push to main

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS |
| Animations | Pure CSS + Canvas API |
| AI Chatbot | Llama 3.1 8B via Groq API |
| API Proxy | Cloudflare Workers (free tier) |
| Contact Form | Formspree |
| CI/CD | GitHub Actions |
| Deployment | GitHub Pages |
| Fonts | JetBrains Mono + Rajdhani |
| Icons | Font Awesome 6 |

---

## 📁 Project Structure

```
shanujans.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml             # Auto deploy on push to main
├── components/
│   ├── AIChatBot.tsx              # ARIA — Llama 3 via Groq + Cloudflare proxy
│   ├── About.tsx                  # Animated counters, skills, tech stack
│   ├── BackToTopButton.tsx        # Smooth back to top
│   ├── Contact.tsx                # Obfuscated email + encrypted Formspree
│   ├── CursorGlow.tsx             # Custom neon cursor with trail
│   ├── Experience.tsx             # Work & education timeline
│   ├── Footer.tsx                 # Links, status, credits
│   ├── Header.tsx                 # Active section nav + hamburger menu
│   ├── Hero.tsx                   # Typewriter, glitch text, stats strip
│   ├── LoadingScreen.tsx          # Matrix rain boot screen
│   ├── ParticleNetwork.tsx        # Interactive canvas particle network
│   ├── Projects.tsx               # 3D tilt cards + filter tabs
│   ├── RightSideEffect.tsx        # Floating binary/hex ambient effect
│   ├── ScrollProgress.tsx         # Top gradient scroll bar
│   ├── Services.tsx               # Service cards with color glow
│   └── TerminalBackground.tsx     # Animated terminal left side
├── hooks/
│   └── useOnScreen.ts             # Intersection Observer hook
├── worker/
│   └── gemini-proxy.js            # Cloudflare Worker — deploy separately
├── public/
│   ├── favicon.png
│   └── Shanujan-CV.pdf
├── App.tsx
├── index.html                     # All CSS animations and variables
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
# Opens at http://localhost:5173
```

### Deploy to GitHub Pages

Deployment is fully automated via GitHub Actions. Every push to `main` triggers a build and deploy automatically.

To deploy manually:
```bash
npm run deploy
```

---

## 🤖 ARIA Chatbot Setup

ARIA uses **Llama 3.1 8B** via **Groq API** (free, no credit card) proxied through a **Cloudflare Worker** so the API key is never exposed in the browser or GitHub.

### 1. Get a free Groq API key
Go to [console.groq.com](https://console.groq.com) → Sign up free → API Keys → Create API Key

**Free limits:** 30 requests/min · 14,400 requests/day · Zero cost

### 2. Deploy the Cloudflare Worker
1. Go to [workers.cloudflare.com](https://workers.cloudflare.com) → free account
2. Create Worker → name it `gemini-proxy` → Deploy
3. Edit Code → paste contents of `worker/gemini-proxy.js` → Save and Deploy
4. Settings → Variables and Secrets → Add Secret:
   - Name: `GROQ_API_KEY`
   - Value: your key from step 1
5. Save and Deploy

### 3. Worker URL is already set
`components/AIChatBot.tsx` already has the Worker URL configured. No changes needed unless you rename your worker.

---

## 🔐 Security

| Protection | Implementation |
|---|---|
| API key never in source code | Stored as Cloudflare Secret |
| API key never in browser | All requests proxied via Cloudflare Worker |
| Rate limiting | 20 requests per 60 seconds per IP |
| CORS locked | Worker only accepts requests from portfolio domain |
| Email obfuscated | Base64 encoded, decoded only on copy click |
| Formspree URL encrypted | Base64 encoded, decoded only at fetch time |
| No secrets in GitHub | Zero environment variables needed in GitHub |

---

## 📬 Contact

**Shanujan Suresh** — IT Professional & Developer · Sri Lanka 🇱🇰

| Platform | Link |
|---|---|
| 🌐 Portfolio | [shanujan.is-a.dev](https://shanujan.is-a.dev) |
| 🏢 Startup | [RevMatrix AI](https://revmatrixai.github.io) |
| 💼 LinkedIn | [shanujansuresh](https://www.linkedin.com/in/shanujansuresh/) |
| 🐙 GitHub | [shanujans](https://github.com/shanujans) |
| ✈️ Telegram | [@Revmatrix](https://t.me/Revmatrix) |
| 📸 Instagram | [shanujan_29](https://www.instagram.com/shanujan_29/) |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ using React + TypeScript + Vite · Deployed on GitHub Pages</sub>
</div>
