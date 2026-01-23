-- Admin login verification function for secure authentication
-- Run this in your Supabase SQL Editor

-- Enable pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

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