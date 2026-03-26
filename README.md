# جامع النور - Mosque Noor Website

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![React](https://img.shields.io/badge/React-19.2-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)

## 📖 Overview

**Mosque Noor** is a modern website for **جامع النور** located in Boumhel Ben Arous, Tunisia. It serves as a digital hub for the mosque community, providing prayer times, announcements, and a welcoming online presence for members and visitors.

Built with Next.js, TypeScript, and a Supabase PostgreSQL backend, the site includes a public-facing interface with Arabic/RTL support and a secure admin panel for managing content.

---

## 🎯 Features

**Public Website**

- Live prayer times via the Aladhan API
- Announcements with automatic expiration
- Jummah prayer time display
- About and Contact sections
- Fully responsive, Arabic/RTL interface

**Admin Panel**

- Secure login with session management
- Create, edit, and delete announcements
- Manage mosque settings (Jummah time, contact info)
- Change password functionality

---

## 🛠️ Tech Stack

| Layer         | Technology                |
| ------------- | ------------------------- |
| Framework     | Next.js 16.1 + React 19.2 |
| Language      | TypeScript 5              |
| Styling       | Tailwind CSS 4.1          |
| UI Components | Radix UI                  |
| Database      | Supabase (PostgreSQL)     |
| Forms         | React Hook Form + Zod     |
| Deployment    | Vercel                    |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A [Supabase](https://supabase.com) account

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

Get these values from your Supabase project under **Settings → API**.

### Database Setup

Run the provided SQL scripts in the Supabase SQL Editor:

1. `database_functions.sql`
2. `rls_policies.sql`

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 🚀 Deployment

**Deploy to Vercel (Recommended):**

1. Push the project to a GitHub repository
2. Import the repo on [vercel.com](https://vercel.com)
3. Add the environment variables under **Settings → Environment Variables**
4. Deploy

---

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Lint code
```

---

## 🎨 Customization

- **Mosque info:** Edit `app/layout.tsx`, `components/about.tsx`, `components/contact.tsx`
- **Prayer location:** Update the city/country parameters in `components/prayer-times.tsx`
- **Theme/colors:** Edit `tailwind.config.ts`

---

## 🐛 Troubleshooting

- **Prayer times not loading** – Check your internet connection and verify the Aladhan API is reachable
- **Announcements not showing** – Ensure announcements exist in the database and haven't expired
- **Admin login failing** – Clear browser cookies and verify your credentials are correct
- **Database connection issues** – Double-check your `.env.local` values and confirm the Supabase project is active

---

## 📄 License

MIT License — see the LICENSE file for details.

---

**Last Updated:** March 2026 | **Project:** Mosque Noor Website (جامع النور)
