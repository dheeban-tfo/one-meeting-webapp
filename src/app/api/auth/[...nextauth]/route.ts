/**
 * NextAuth.js API Route Handler
 * 
 * This file creates the dynamic API routes for NextAuth.js authentication.
 * It handles all authentication-related endpoints:
 * - /api/auth/signin
 * - /api/auth/signout
 * - /api/auth/callback
 * - /api/auth/session
 * - etc.
 */

import { handlers } from "@/lib/auth"

// Export the NextAuth handlers for GET and POST requests
export const { GET, POST } = handlers 