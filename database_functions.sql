-- Admin login verification function for secure authentication
-- Run this in your Supabase SQL Editor

-- Enable pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =============================================================================
-- ADMIN SESSIONS TABLE (Secure Session Management)
-- =============================================================================
-- This table stores cryptographically secure session tokens instead of
-- using predictable static values. Each session is tied to an admin user
-- and has an expiration time.

CREATE TABLE IF NOT EXISTS admin_sessions (
  id SERIAL PRIMARY KEY,
  token VARCHAR(64) NOT NULL UNIQUE,  -- 32 bytes hex = 64 chars
  admin_id INTEGER NOT NULL REFERENCES admin(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast token lookups
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token);

-- Index for cleanup of expired sessions
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);

-- Function to automatically clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM admin_sessions WHERE expires_at < NOW();
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Optional: Schedule cleanup (call this periodically or via cron)
-- SELECT cleanup_expired_sessions();

-- =============================================================================

-- Function to verify admin login credentials
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
  
  -- If no user found, return a row with verified = false
  IF NOT FOUND THEN
    RETURN QUERY SELECT NULL::INTEGER, NULL::TEXT, FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Also create a function to auto-delete expired announcements
-- This can be called periodically or triggered
CREATE OR REPLACE FUNCTION delete_expired_announcements()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM announcements 
  WHERE date IS NOT NULL 
    AND date < CURRENT_DATE - INTERVAL '1 day';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to auto-delete expired announcements
-- This runs after any insert/update on announcements table
CREATE OR REPLACE FUNCTION trigger_cleanup_announcements()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM delete_expired_announcements();
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to the announcements table
DROP TRIGGER IF EXISTS cleanup_announcements ON announcements;
CREATE TRIGGER cleanup_announcements
AFTER INSERT OR UPDATE ON announcements
FOR EACH STATEMENT
EXECUTE FUNCTION trigger_cleanup_announcements();

-- You can also manually call this periodically, or set up a cron job in Supabase
-- Manual call: SELECT delete_expired_announcements();

-- =============================================================================
-- CHANGE ADMIN PASSWORD FUNCTION
-- =============================================================================
-- Function to change admin password with current password verification
-- Uses PostgreSQL's pgcrypto extension for secure password hashing

CREATE OR REPLACE FUNCTION change_admin_password(
  input_username TEXT,
  input_current_password TEXT,
  input_new_password TEXT
)
RETURNS TABLE(success BOOLEAN, message TEXT) AS $$
DECLARE
  admin_record RECORD;
  password_valid BOOLEAN;
BEGIN
  -- Find the admin by username
  SELECT a.id, a.password_hash
  INTO admin_record
  FROM admin a
  WHERE a.username = input_username
  LIMIT 1;
  
  -- Check if admin exists
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 'المستخدم غير موجود'::TEXT;
    RETURN;
  END IF;
  
  -- Verify current password
  password_valid := admin_record.password_hash = crypt(input_current_password, admin_record.password_hash);
  
  IF NOT password_valid THEN
    RETURN QUERY SELECT FALSE, 'كلمة المرور الحالية غير صحيحة'::TEXT;
    RETURN;
  END IF;
  
  -- Update to new password (hash using pgcrypto's crypt with bf algorithm - bcrypt)
  UPDATE admin
  SET password_hash = crypt(input_new_password, gen_salt('bf', 10))
  WHERE id = admin_record.id;
  
  RETURN QUERY SELECT TRUE, 'تم تغيير كلمة المرور بنجاح'::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;