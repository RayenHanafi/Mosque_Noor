-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
-- Run this in your Supabase SQL Editor
-- 
-- Policy: Public visitors can READ public tables (prayer times, announcements,
-- settings). All WRITES go through server-side API routes using service_role 
-- key (which bypasses RLS). Sensitive tables (admin, admin_sessions) have NO
-- access for the anon role.
-- =============================================================================

-- =====================
-- 1) ADMIN TABLE
-- =====================
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;

-- No policies for anon = no access at all.
-- service_role bypasses RLS, so server API routes still work.

-- =====================
-- 2) ADMIN_SESSIONS TABLE
-- =====================
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- No policies for anon = no access at all.

-- =====================
-- 3) ADMIN_SETTINGS TABLE
-- =====================
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous visitors) to read settings
-- (used by contact section and prayer-times for jummah_time)
CREATE POLICY "Allow public read access on admin_settings"
  ON admin_settings
  FOR SELECT
  TO anon
  USING (true);

-- No INSERT/UPDATE/DELETE policy for anon.
-- Writes happen via API routes using service_role.

-- =====================
-- 4) ANNOUNCEMENTS TABLE
-- =====================
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read announcements (public website)
CREATE POLICY "Allow public read access on announcements"
  ON announcements
  FOR SELECT
  TO anon
  USING (true);

-- No INSERT/UPDATE/DELETE policy for anon.
-- Writes happen via API routes using service_role.

-- =============================================================================
-- REVOKE unnecessary privileges from anon on sensitive tables
-- =============================================================================
REVOKE ALL ON admin FROM anon;
REVOKE ALL ON admin_sessions FROM anon;

-- Grant only SELECT on public tables to anon
REVOKE INSERT, UPDATE, DELETE ON admin_settings FROM anon;
REVOKE INSERT, UPDATE, DELETE ON announcements FROM anon;

-- Ensure anon can still SELECT
GRANT SELECT ON admin_settings TO anon;
GRANT SELECT ON announcements TO anon;
