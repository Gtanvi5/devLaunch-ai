<h1 align="center">🚀 DevLaunch AI</h1>

<p align="center">
  <strong>Validate startup ideas with AI before you build them.</strong>
</p>

<p align="center">
  DevLaunch AI is an AI-powered SaaS platform that helps founders, entrepreneurs, and indie hackers evaluate startup ideas in seconds. Simply describe your business idea, and the AI generates a comprehensive validation report covering market opportunity, SWOT analysis, competitor research, business risks, revenue potential, and actionable recommendations, helping you make informed decisions before investing time and money.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI"/>
  <img src="https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge" alt="Clerk"/>
  <img src="https://img.shields.io/badge/Razorpay-0C4BFF?style=for-the-badge" alt="Razorpay"/>
</p>

---

## ✨ Features

### 🤖 AI Powered

- AI Startup Validation
- SWOT Analysis
- Market Opportunity Analysis
- Competitor Research
- Revenue Potential Estimation
- Risk Assessment
- Actionable Business Recommendations
- Professional Report Generation

### 💼 Dashboard

- Secure Authentication with Clerk
- Protected Dashboard
- Validation History
- Detailed Report Viewer
- PDF Report Export
- User Profile Management
- Billing Management
- Team Management
- API Settings

### 💳 Payments

- Razorpay Subscription Integration
- Secure Checkout
- Billing Management
- Subscription Plans

### 🎨 User Experience

- Modern Landing Page
- Fully Responsive Design
- Dark / Light Theme
- Beautiful Animations
- Loading Skeletons
- SEO Friendly
- Fast Performance
- Mobile Optimized

---

# 🛠 Tech Stack

| Category        | Technology              |
| --------------- | ----------------------- |
| Framework       | Next.js 16 (App Router) |
| Language        | TypeScript              |
| Styling         | Tailwind CSS            |
| UI Library      | shadcn/ui               |
| Authentication  | Clerk                   |
| Database        | PostgreSQL              |
| ORM             | Prisma                  |
| AI              | Google Gemini AI SDK    |
| Payments        | Razorpay                |
| Charts          | Recharts                |
| PDF             | @react-pdf/renderer     |
| Animations      | Framer Motion           |
| Icons           | Lucide React            |
| Theme           | next-themes             |
| Deployment      | Vercel                  |
| Package Manager | pnpm                    |

---

# 📂 Project Structure

```text
devlaunch-ai/
├── prisma/                 # Database schema & Prisma
├── public/                 # Images, fonts & static assets
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── dashboard/      # User dashboard
│   │   ├── tools/          # AI tools
│   │   ├── about/
│   │   ├── blog/
│   │   ├── docs/
│   │   ├── pricing/
│   │   └── ...
│   │
│   ├── components/         # Shared React components
│   │   └── ui/             # shadcn/ui components
│   │
│   ├── data/               # Static data
│   ├── lib/                # Utilities & Prisma
│   └── types/              # TypeScript types
│
├── middleware.ts           # Route protection
├── prisma.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Install the following:

- Node.js **18.18+**
- pnpm (Recommended)

or

- npm
- yarn

---

## 1. Clone the Repository

```bash
git clone https://github.com/Gtanvi5/devLaunch-ai.git

cd devLaunch-ai
```

---

## 2. Install Dependencies

Using pnpm

```bash
pnpm install
```

or

```bash
npm install
```

or

```bash
yarn
```

---

## 3. Configure Environment Variables

Create a `.env.local` file.

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database
DATABASE_URL=

# Gemini
GOOGLE_GENERATIVE_AI_API_KEY=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Webhooks
CLERK_WEBHOOK_SECRET=
RAZORPAY_WEBHOOK_SECRET=
```

---

## 4. Push Prisma Schema

```bash
pnpm prisma db push
```

---

## 5. Run Development Server

```bash
pnpm dev
```

Visit

```
http://localhost:3000
```

---

## 🚀 Current Progress

### Core Platform

- [x] Landing Page
- [x] Authentication
- [x] Dashboard
- [x] Responsive UI
- [x] Dark Mode

### AI

- [x] Gemini Integration
- [x] AI Startup Validation
- [x] Report Generation
- [x] PDF Export

### Backend

- [x] PostgreSQL
- [x] Prisma ORM
- [x] Razorpay Integration
- [x] User History

---

# 🛣 Roadmap

## AI

- [ ] Multi-model AI Support
- [ ] AI Pitch Deck Generator
- [ ] Business Model Canvas Generator
- [ ] Investor Readiness Score
- [ ] Industry Trend Analysis
- [ ] Startup Name Generator

## Dashboard

- [ ] Team Collaboration
- [ ] Report Sharing
- [ ] Saved Templates
- [ ] Custom Branding
- [ ] Analytics Dashboard

## Infrastructure

- [ ] API Rate Limiting
- [ ] Background Jobs
- [ ] Email Notifications
- [ ] Audit Logs
- [ ] Multi-language Support

---

# 🎯 Future Improvements

- AI-powered Pitch Deck Generator
- Financial Projection Generator
- Startup Valuation Estimator
- Business Model Canvas Generator
- Customer Persona Generator
- Go-to-Market Strategy Generator
- Investor Report Generator
- Public REST API
- Chrome Extension
- Mobile App

---

# 👨‍💻 Author

**Tanvi Gupta**

Built with ❤️ using Next.js, TypeScript, Prisma, PostgreSQL, Gemini AI, Clerk, Razorpay, Tailwind CSS, and deployed on Vercel.

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

Your support motivates continued development and helps others discover the project.

---

## Made for Founders 🚀

**Build smarter. Validate faster. Launch with confidence.**
