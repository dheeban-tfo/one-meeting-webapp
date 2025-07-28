/**
 * Authentication Type Definitions
 * 
 * This file extends the default NextAuth.js types to include
 * custom properties for Azure AD integration.
 */

import { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

/**
 * Extend the default Session type to include access token
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string
    user: {
      id: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

/**
 * Extend the default JWT type to include access token and profile
 */
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string
    profile?: Record<string, unknown>
  }
} 