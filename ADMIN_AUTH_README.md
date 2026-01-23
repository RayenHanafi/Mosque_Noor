# 🔐 Secure Admin Authentication System

## Overview

This implements a secure server-side authentication system for the mosque website admin panel using:

- PostgreSQL `crypt()` function for password verification
- HTTP-only secure cookies for session management
- Server-side API routes with Supabase service role key

## 📁 Files Created/Modified

### Server-Side API Routes

- `app/api/admin/login/route.ts` - Login endpoint with bcrypt verification
- `app/api/admin/me/route.ts` - Session verification and logout endpoint

### Client-Side Updates

- `app/admin/page.tsx` - Secure login form (sends POST to API)
- `app/admin/dashboard/page.tsx` - Protected dashboard with server auth check

### Database Setup

- `database_functions.sql` - PostgreSQL function for secure login verification

## 🚀 Setup Instructions

### 1. Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- Enable pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create the verification function
CREATE OR REPLACE FUNCTION verify_admin_login(input_username TEXT, input_password TEXT)
RETURNS TABLE(id INTEGER, username TEXT, verified BOOLEAN) AS $$
BEGIN
  RETURN QUERY
  SELECT
    a.id,
    a.username,
    CASE
      WHEN a.password_hash = crypt(input_password, a.password_hash) THEN TRUE
      ELSE FALSE
    END as verified
  FROM admin a
  WHERE a.username = input_username
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN QUERY SELECT NULL::INTEGER, NULL::TEXT, FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 2. Environment Variables

#### Local Development (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

#### Production (Vercel)

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these variables:
   - `NEXT_PUBLIC_SUPABASE_URL` → Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY` → Your Supabase service role key ⚠️ **SECRET**

### 3. Test the System

#### Login Flow

1. Go to `/admin`
2. Enter credentials: `admin` / `Noor2026!`
3. Should redirect to `/admin/dashboard` on success
4. Invalid credentials show Arabic error message

#### Security Features

- ✅ Server-side password verification using PostgreSQL crypt()
- ✅ HTTP-only cookies (prevents XSS)
- ✅ Secure cookies in production (HTTPS only)
- ✅ SameSite=Strict (prevents CSRF)
- ✅ 8-hour session timeout
- ✅ Parameterized queries (prevents SQL injection)

## 🔒 Security Notes

### Environment Variables

- **NEVER** commit `SUPABASE_SERVICE_ROLE_KEY` to Git
- Service role key grants full database access
- Only use on server-side (API routes)

### Cookie Security

- HttpOnly: Prevents JavaScript access
- Secure: HTTPS only in production
- SameSite: Prevents cross-site requests
- 8-hour expiry for automatic logout

### Authentication Flow

1. Client sends credentials to `/api/admin/login`
2. Server verifies with PostgreSQL `crypt()` function
3. Server sets HTTP-only cookie on success
4. Dashboard checks cookie via `/api/admin/me`
5. Logout clears cookie via DELETE `/api/admin/me`

## 🛠️ API Endpoints

### POST /api/admin/login

**Request:**

```json
{ "username": "admin", "password": "Noor2026!" }
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "user": { "id": 1, "username": "admin" }
}
```

**Error Response (401):**

```json
{
  "success": false,
  "message": "اسم المستخدم أو كلمة المرور غير صحيحة"
}
```

### GET /api/admin/me

**Success Response (200):**

```json
{ "authenticated": true, "message": "مسجل الدخول" }
```

**Error Response (401):**

```json
{ "authenticated": false, "message": "غير مسجل الدخول" }
```

### DELETE /api/admin/me (Logout)

**Success Response (200):**

```json
{ "success": true, "message": "تم تسجيل الخروج بنجاح" }
```

## ✅ Next Steps

1. Run the database function in Supabase SQL Editor
2. Add `SUPABASE_SERVICE_ROLE_KEY` to your environment
3. Test login at `/admin`
4. Verify dashboard protection at `/admin/dashboard`
