import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

// Server-side Supabase client (only use in API routes)
export const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Session configuration
const SESSION_DURATION_HOURS = 8;

/**
 * Generate a cryptographically secure random session token
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Create a new session for an admin user
 * Returns the session token to be stored in cookie
 */
export async function createSession(adminId: number): Promise<string | null> {
  const token = generateSessionToken();
  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000,
  );

  // Delete any existing sessions for this admin (single session policy)
  await supabaseServer.from("admin_sessions").delete().eq("admin_id", adminId);

  // Insert new session
  const { error } = await supabaseServer.from("admin_sessions").insert({
    token,
    admin_id: adminId,
    expires_at: expiresAt.toISOString(),
  });

  if (error) {
    console.error("Failed to create session:", error);
    return null;
  }

  return token;
}

/**
 * Validate a session token and return the admin info if valid
 * Also checks if the session has expired
 */
export async function validateSession(
  token: string,
): Promise<{ valid: boolean; adminId?: number; username?: string }> {
  if (!token) {
    return { valid: false };
  }

  const { data: session, error } = await supabaseServer
    .from("admin_sessions")
    .select("admin_id, expires_at, admin:admin_id(id, username)")
    .eq("token", token)
    .single();

  if (error || !session) {
    return { valid: false };
  }

  // Check if session has expired
  if (new Date(session.expires_at) < new Date()) {
    // Delete expired session
    await supabaseServer.from("admin_sessions").delete().eq("token", token);
    return { valid: false };
  }

  // Type assertion for the joined admin data
  const admin = session.admin as unknown as { id: number; username: string };

  return {
    valid: true,
    adminId: admin.id,
    username: admin.username,
  };
}

/**
 * Invalidate/delete a session (for logout)
 */
export async function invalidateSession(token: string): Promise<boolean> {
  const { error } = await supabaseServer
    .from("admin_sessions")
    .delete()
    .eq("token", token);

  return !error;
}

/**
 * Clean up all expired sessions (can be called periodically)
 */
export async function cleanupExpiredSessions(): Promise<number> {
  const { data, error } = await supabaseServer
    .from("admin_sessions")
    .delete()
    .lt("expires_at", new Date().toISOString())
    .select();

  if (error) {
    console.error("Failed to cleanup sessions:", error);
    return 0;
  }

  return data?.length || 0;
}
