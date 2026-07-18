# 🚀 DevLaunch AI

**Validate your startup ideas in seconds.**

DevLaunch AI is an AI-powered SaaS platform built for founders, indie hackers, and entrepreneurs. Simply enter your startup idea, and the AI generates a comprehensive validation report with market potential, strengths, weaknesses, risks, and competitor insights, helping you make informed decisions before investing time and money.

---

## ✨ Features

- 🚀 Beautiful, conversion-focused landing page
- 🎨 Modern UI built with Tailwind CSS
- ✨ Smooth animations powered by Framer Motion
- 🔐 Secure authentication with Clerk
- 📊 Interactive pricing page with Monthly/Annual billing toggle
- 📂 Protected dashboard with persistent sidebar navigation
- 👤 Account settings including Profile, Billing, Notifications, and Security
- 🌙 Fully responsive dark/light mode support
- 📱 Responsive design across desktop, tablet, and mobile
- ⚡ Built using the Next.js App Router architecture

---

## 🛠️ Tech Stack

| Category        | Technology           |
| --------------- | -------------------- |
| Framework       | Next.js (App Router) |
| Language        | TypeScript           |
| Styling         | Tailwind CSS         |
| Animations      | Framer Motion        |
| Authentication  | Clerk                |
| Icons           | Lucide React         |
| Theme           | next-themes          |
| UI Components   | shadcn/ui            |
| Package Manager | pnpm                 |

---

## 📂 Project Structure

```text
app/
│
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   └── settings/
│
├── api/
│   └── generate/
│
├── page.tsx
├── layout.tsx
└── globals.css

components/
├── ui/

lib/

public/

styles/
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Gtanvi5/devLaunch-ai.git
cd devlaunch-ai
```

### 2. Install Dependencies

Using **pnpm**

```bash
pnpm install
```

Or using npm

```bash
npm install
```

Or using Yarn

```bash
yarn install
```

---

### 3. Configure Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

---

### 4. Start the Development Server

```bash
pnpm dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 📸 Current Features

- ✅ Landing Page
- ✅ Hero Section
- ✅ Features Section
- ✅ Pricing Page
- ✅ Authentication (Clerk)
- ✅ Protected Dashboard
- ✅ Dashboard Sidebar
- ✅ User Settings
- ✅ Billing UI
- ✅ Notification Preferences
- ✅ Security Settings
- ✅ Dark Mode
- ✅ Responsive Design

---

## 🗺️ Roadmap

### AI Features

- [ ] AI startup validation engine
- [ ] Startup scoring system
- [ ] Competitor analysis
- [ ] SWOT analysis generation
- [ ] Business recommendations

### Backend

- [ ] OpenAI/Gemini integration
- [ ] PostgreSQL database
- [ ] Prisma ORM
- [ ] Save validation history
- [ ] User report management

### Payments

- [ ] Stripe Checkout
- [ ] Subscription management
- [ ] Credit-based usage
- [ ] Billing portal

### Security

- [ ] Next.js middleware protection
- [ ] Route authorization
- [ ] Rate limiting
- [ ] API security improvements

### Dashboard

- [ ] Report history
- [ ] Export reports as PDF
- [ ] Saved startup ideas
- [ ] Analytics dashboard

---

## 🎯 Future Improvements

- AI-powered pitch deck generation
- Business model canvas generation
- Investor readiness score
- Market trend analysis
- API access
- Email notifications

---

## 👨‍💻 Author

Built with ❤️ using **Next.js**, **Tailwind CSS**, **Framer Motion**, and **Clerk**.
