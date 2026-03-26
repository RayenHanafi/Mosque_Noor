# جامع النور - Mosque Noor Website

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![React](https://img.shields.io/badge/React-19.2-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)

## 📖 Project Overview

**Mosque Noor** is a modern, fully-featured website for **جامع النور** (Mosque Noor) located in **Boumhel Ben Arous, Tunisia**. The website serves as a digital hub for the mosque community, providing essential information about prayer times, announcements, and creating a welcoming online presence for members and visitors.

This is a **Next.js-based full-stack application** built with TypeScript, featuring a secure admin panel for managing mosque content, a beautiful public-facing website with Arabic/RTL support, and real-time data synchronization with Supabase PostgreSQL backend.

---

## 🎯 Key Features

### 👥 **Public Website Features**

- ✅ **Live Prayer Times** - Automatically fetches daily prayer times from Aladhan API with timezone support for Tunisia
- ✅ **Announcements Section** - Display latest mosque announcements with automatic expiration
- ✅ **About Section** - Information about the mosque and its mission
- ✅ **Contact Section** - Easy way for visitors to reach out
- ✅ **Jummah Prayer Times** - Special Friday prayer time management
- ✅ **Arabic/RTL Support** - Fully right-to-left interface with Arabic font (Cairo)
- ✅ **Responsive Design** - Mobile-optimized, works seamlessly on all devices
- ✅ **Islamic Design** - Beautiful Islamic patterns and calming color scheme

### 🔐 **Admin Panel Features**

- ✅ **Secure Authentication** - Server-side password verification with bcrypt
- ✅ **HTTP-Only Cookies** - Prevents XSS attacks
- ✅ **Session Management** - 8-hour session timeout with secure sessions
- ✅ **Admin Dashboard** - Manage all mosque content from one place
- ✅ **Announcement Management** - Create, edit, delete announcements
- ✅ **Settings Management** - Update mosque settings (Jummah time, contact info, etc.)
- ✅ **Change Password** - Secure password change functionality
- ✅ **Logout** - Secure session termination

### 🔒 **Security Features**

- ✅ **Database-Level Encryption** - Passwords stored with PostgreSQL crypt()
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **CSRF Protection** - SameSite=Strict cookies
- ✅ **XSS Prevention** - HTTP-only secure cookies
- ✅ **Row-Level Security (RLS)** - Fine-grained access control on database
- ✅ **Service Role Isolation** - Admin operations use service role key
- ✅ **Environment Variable Protection** - Secrets never committed to git

---

## 🛠️ Technology Stack

| Layer                  | Technology                          |
| ---------------------- | ----------------------------------- |
| **Frontend Framework** | Next.js 16.1 + React 19.2           |
| **Language**           | TypeScript 5                        |
| **Styling**            | Tailwind CSS 4.1                    |
| **UI Components**      | Radix UI (30+ components)           |
| **Database**           | Supabase (PostgreSQL)               |
| **Authentication**     | Custom Server-Side Auth with bcrypt |
| **Forms**              | React Hook Form + Zod               |
| **Charts & Tables**    | Recharts                            |
| **Icons**              | Lucide React                        |
| **Notification**       | Sonner Toast                        |
| **Font**               | Google Fonts (Cairo Arabic)         |
| **Analytics**          | Vercel Analytics                    |
| **Deployment**         | Vercel (Recommended)                |

---

## 📁 Project Structure

```
my-app/
├── app/                                  # Next.js App Router
│   ├── layout.tsx                       # Root layout with RTL support
│   ├── page.tsx                         # Home page (public website)
│   ├── globals.css                      # Global styles
│   ├── admin/                           # Admin area
│   │   ├── page.tsx                    # Admin login page
│   │   └── dashboard/
│   │       └── page.tsx                # Admin dashboard
│   └── api/                            # Server-side API routes
│       └── admin/
│           ├── login/route.ts          # POST /api/admin/login
│           ├── logout/route.ts         # POST /api/admin/logout
│           ├── me/route.ts             # GET /api/admin/me
│           ├── announcements/route.ts  # CRUD announcements
│           ├── settings/route.ts       # Update admin settings
│           └── change-password/route.ts # Change password
│
├── components/                          # React components
│   ├── header.tsx                       # Navigation header
│   ├── hero.tsx                         # Hero section
│   ├── prayer-times.tsx                 # Prayer times display
│   ├── announcements.tsx                # Announcements section
│   ├── about.tsx                        # About section
│   ├── contact.tsx                      # Contact form
│   ├── footer.tsx                       # Footer
│   └── ui/                              # Radix UI components
│       ├── button.tsx
│       ├── card.tsx
│       └── ... (other UI components)
│
├── lib/                                 # Utility functions
│   ├── supabaseClient.ts               # Supabase client initialization
│   ├── session.ts                      # Session management
│   └── utils.ts                        # Helper utilities
│
├── public/                              # Static assets
│   ├── logo.png
│   ├── hero-bg.jpg
│   ├── about-bg.png
│   └── ... (images, icons)
│
├── package.json                         # Dependencies
├── tsconfig.json                        # TypeScript config
├── next.config.ts                       # Next.js config
├── tailwind.config.ts                   # Tailwind CSS config
├── postcss.config.mjs                   # PostCSS config
│
├── database_functions.sql               # PostgreSQL functions
├── rls_policies.sql                     # Row-Level Security policies
└── ADMIN_AUTH_README.md                # Admin auth documentation
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and **npm** or **yarn**
- **Git**
- A **Supabase** account (free tier available)

### Step 1: Clone the Repository

```bash
cd "C:\Users\user\Desktop\Mosque noor website\V0_website"
cd my-app
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

**How to get these values:**

1. Go to [supabase.com](https://supabase.com)
2. Create a new project or use existing one
3. Go to **Settings** → **API**
4. Copy the values and paste into `.env.local`

### Step 4: Database Setup

Run the SQL scripts in your Supabase SQL Editor:

1. First, run [database_functions.sql](./database_functions.sql)
2. Then, run [rls_policies.sql](./rls_policies.sql)

Or manually create the required tables:

```sql
-- Admin users table
CREATE TABLE admin (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admin sessions table
CREATE TABLE admin_sessions (
  id SERIAL PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  admin_id INTEGER REFERENCES admin(id),
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Announcements table
CREATE TABLE announcements (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TEXT,
  time TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admin settings table
CREATE TABLE admin_settings (
  id SERIAL PRIMARY KEY,
  jummah_time TEXT DEFAULT '12:45',
  contact_email TEXT,
  contact_phone TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Create default admin user (Change password after first login!)
INSERT INTO admin (username, password_hash)
VALUES ('admin', crypt('Noor2026!', gen_salt('bf')))
ON CONFLICT (username) DO NOTHING;
```

### Step 5: Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

---

## 📖 Usage

### Public Website

The public website is automatically available at the root URL and includes:

- **Home Page** - Hero section with mosque introduction
- **Prayer Times** - Fetched automatically from Aladhan API
- **Announcements** - Managed by admin, displayed with dates
- **About Section** - Information about the mosque
- **Contact Form** - Visitors can send messages
- **Header/Navigation** - Quick links to sections
- **Footer** - Additional information and links

### Admin Panel

#### Login

1. Navigate to `/admin`
2. Username: `admin`
3. Password: `Noor2026!` (change this immediately after first login!)

#### Admin Dashboard (`/admin/dashboard`)

- View dashboard statistics
- Manage announcements
- Edit mosque settings
- Change password
- Logout

#### API Endpoints

All admin endpoints require authentication (valid session cookie).

| Method | Endpoint                       | Purpose                   |
| ------ | ------------------------------ | ------------------------- |
| POST   | `/api/admin/login`             | Admin login               |
| POST   | `/api/admin/logout`            | Admin logout              |
| GET    | `/api/admin/me`                | Get current admin session |
| GET    | `/api/announcements`           | Get all announcements     |
| POST   | `/api/admin/announcements`     | Create announcement       |
| PUT    | `/api/admin/announcements/:id` | Update announcement       |
| DELETE | `/api/admin/announcements/:id` | Delete announcement       |
| GET    | `/api/admin/settings`          | Get mosque settings       |
| PUT    | `/api/admin/settings`          | Update settings           |
| POST   | `/api/admin/change-password`   | Change admin password     |

---

## 🔐 Security & Authentication

### How Authentication Works

1. **Login Process:**
   - User submits credentials via `/api/admin/login`
   - Server verifies password using PostgreSQL `crypt()` function
   - On success, HTTP-only secure cookie is set with session ID
   - Cookie is valid for 8 hours

2. **Protected Routes:**
   - All admin endpoints check for valid session cookie
   - Server-side verification prevents client-side tampering
   - If session expired, user is automatically logged out

3. **Data Protection:**
   - Passwords never stored in plaintext
   - Database uses bcrypt hashing
   - All API routes use Supabase service role key (secure)
   - Public endpoints use anonymous key with RLS policies

4. **HTTPS in Production:**
   - Cookies marked as `Secure` (HTTPS only)
   - SameSite=Strict prevents CSRF attacks
   - X-Frame-Options set to prevent clickjacking

### Best Practices

✅ **DO:**

- Change admin password after first login
- Use strong, unique passwords
- Never share admin credentials
- Regularly backup the database
- Update dependencies for security patches

❌ **DON'T:**

- Commit `.env.local` to Git
- Share `SUPABASE_SERVICE_ROLE_KEY` publicly
- Use weak passwords
- Disable HTTPS in production
- Store sensitive data in client-side code

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/mosque-noor.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Add environment variables in **Settings** → **Environment Variables**
   - Deploy!

3. **Post-Deployment:**
   - Test login at `yourdomain.com/admin`
   - Verify prayer times are fetching correctly
   - Test announcements functionality

### Environment Variables for Production

In Vercel Settings, add:

- `NEXT_PUBLIC_SUPABASE_URL` → Your Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Your Supabase Anon Key
- `SUPABASE_SERVICE_ROLE_KEY` → Your Supabase Service Role Key

---

## 📊 Database Schema

### Tables

#### `admin`

Stores admin user credentials.

```sql
id: SERIAL PRIMARY KEY
username: TEXT UNIQUE NOT NULL
password_hash: TEXT NOT NULL (bcrypt)
created_at: TIMESTAMP
```

#### `admin_sessions`

Manages user sessions with 8-hour expiration.

```sql
id: SERIAL PRIMARY KEY
session_id: TEXT UNIQUE NOT NULL
admin_id: INTEGER (FK → admin)
expires_at: TIMESTAMP
created_at: TIMESTAMP
```

#### `announcements`

Stores mosque announcements.

```sql
id: SERIAL PRIMARY KEY
title: TEXT NOT NULL
description: TEXT
date: TEXT (ISO format, auto-filters if past)
time: TEXT
created_at: TIMESTAMP
```

#### `admin_settings`

Stores mosque configuration.

```sql
id: SERIAL PRIMARY KEY
jummah_time: TEXT (e.g., "12:45")
contact_email: TEXT
contact_phone: TEXT
updated_at: TIMESTAMP
```

---

## 🎨 Customization

### Change Mosque Information

Edit these files:

- `app/layout.tsx` - Website title and description (Arabic)
- `components/about.tsx` - About section content
- `components/contact.tsx` - Contact information

### Modify Prayer Times Location

The prayer times are currently fetched from Tunis, Tunisia. To change location:

1. Open `components/prayer-times.tsx`
2. Find this line:
   ```typescript
   const response = await fetch(
     `https://api.aladhan.com/v1/timingsByCity?city=Tunis&country=Tunisia&method=1&school=0`,
   );
   ```
3. Replace `city=Tunis` and `country=Tunisia` with your desired location

### Customize Theme/Colors

Edit `tailwind.config.ts` to change colors, fonts, and spacing:

```typescript
theme: {
  colors: {
    primary: '#your-color',
    // ... other colors
  },
}
```

---

## 🐛 Troubleshooting

### Prayer Times Not Loading

- Check internet connection (API requires external call)
- Verify Aladhan API is available
- Check browser console for CORS errors

### Announcements Not Showing

- Verify announcements table has data
- Check if announcements have past dates (they auto-expire)
- Ensure Supabase credentials are correct

### Admin Login Failing

- Verify admin user exists in database
- Check password is correct (case-sensitive)
- Clear browser cookies and try again
- Check browser console for error messages

### Database Connection Issues

- Verify `.env.local` has correct Supabase credentials
- Check Supabase project is active
- Test connection through Supabase dashboard

---

## 📝 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For questions or issues:

- Check the [ADMIN_AUTH_README.md](./ADMIN_AUTH_README.md) for admin-specific documentation
- Review the troubleshooting section above
- Open an issue in the repository

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Database & authentication
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Aladhan API](https://aladhan.com/api) - Prayer times
- [Vercel](https://vercel.com/) - Hosting

---

## 📋 Changelog

### Version 0.1.0 (Current)

- ✅ Initial release
- ✅ Public website with prayer times
- ✅ Announcements management
- ✅ Secure admin authentication
- ✅ Admin dashboard
- ✅ Arabic/RTL support
- ✅ Supabase integration
- ✅ Row-level security policies

---

**Last Updated:** March 2026  
**Project Name:** Mosque Noor Website (جامع النور)  
**Location:** Boumhel Ben Arous, Tunisia
