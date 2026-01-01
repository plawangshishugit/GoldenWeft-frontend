// src/lib/auth.ts

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export type AdminSession = {
  role: "admin";
  email: string;
  iat?: number;
  exp?: number;
};

/**
 * Verify a JWT token string and return session payload
 */
export function verifyAdminToken(token: string): AdminSession | null {
  try {
    const secret = process.env.ADMIN_JWT_SECRET!;
    return jwt.verify(token, secret) as AdminSession;
  } catch {
    return null;
  }
}

/**
 * Read admin session from HTTP-only cookie
 */
export function getAdminSession(): AdminSession | null {
  const cookieStore = cookies();
  const token =
    cookieStore.get("admin_session")?.value ||
    cookieStore.get("admin_token")?.value; // backward compatibility

  if (!token) return null;
  return verifyAdminToken(token);
}

/**
 * Simple boolean helper for guards
 */
export function isAdminAuthenticated(): boolean {
  return !!getAdminSession();
}
