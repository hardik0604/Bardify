# SpeakShakespeare — Premium AI Shakespeare Translator

> *Transform your modern words into the timeless poetry of the Bard.*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-speakshakespeare.vercel.app-purple?style=for-the-badge)](https://speakshakespeare.vercel.app)
[![Built with React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini%20AI-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

---

## ✨ About

**SpeakShakespeare** is a premium AI-powered web application that translates modern English text into authentic Elizabethan Shakespearean prose. Powered by Google Gemini AI, it offers multiple tone presets — from *Dramatic* to *Romantic* — wrapped in a stunning dark glassmorphism UI.

---

## 🚀 Features

- 🎭 **AI Translation** — Powered by Google Gemini for authentic Shakespearean output
- 🎨 **Multiple Tones** — Choose from Dramatic, Romantic, Comedic, Tragic, and more
- 📜 **Translation History** — Browse and restore previous translations
- 📋 **One-Click Copy** — Instantly copy the Shakespearean output
- 🔒 **Secure by Design** — API key is stored server-side via a Vercel Serverless Function
- ⚡ **Blazing Fast** — Built with Vite 8, code-split for optimal loading
- 📱 **Fully Responsive** — Works beautifully on mobile, tablet and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| AI | Google Gemini (`gemini-3.6-flash`) |
| Backend | Vercel Serverless Functions |
| Deployment | Vercel |

---

## 🏃 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/hardik0604/SpeakShakespeare.git
cd SpeakShakespeare
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your API key

Create a `.env` file in the root of the project:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 4. Start the dev server

```bash
npm run dev
```

The app will launch at `http://localhost:5173`.

---

## ☁️ Deploying to Vercel

1. Fork or import this repository on [Vercel](https://vercel.com/new)
2. Add the environment variable in Vercel project settings:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** your Gemini API key
3. Click **Deploy** — Vercel handles the rest!

---

## 📁 Project Structure

```
SpeakShakespeare/
├── api/
│   └── gemini.js          # Vercel Serverless Function (secure API route)
├── public/
│   ├── favicon.svg        # Custom quill icon
│   ├── sitemap.xml        # Sitemap for SEO
│   └── robots.txt         # Crawler instructions
├── src/
│   ├── components/        # UI components (Navbar, Hero, Translator, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── services/          # API service layer
│   └── utils/             # Helper utilities
├── index.html             # App entry point
└── vite.config.js         # Vite build configuration
```

---

## 📄 License

© 2026 Hardik. All rights reserved.
