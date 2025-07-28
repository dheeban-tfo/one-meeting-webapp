/**
 * Authentication Configuration
 * 
 * This file configures NextAuth.js with Microsoft Azure AD provider.
 * It handles authentication flow, session management, and JWT tokens.
 * 
 * Features:
 * - Microsoft Azure AD Single Sign-On (SSO)
 * - Persistent session management
 * - JWT token handling
 * - Automatic token refresh
 */

import NextAuth from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import type { NextAuthConfig } from "next-auth"
import "../types/auth" // Import type extensions

// Azure AD configuration - replace with your actual values
const azureAdConfig = {
  clientId: process.env.AZURE_AD_CLIENT_ID || "your-client-id",
  clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "your-client-secret",
  tenantId: process.env.AZURE_AD_TENANT_ID || "your-tenant-id",
}

/**
 * NextAuth.js configuration object
 * Defines providers, callbacks, session strategy, and pages
 */
export const authConfig: NextAuthConfig = {
  // Configure authentication providers
  providers: [
    MicrosoftEntraID({
      clientId: azureAdConfig.clientId,
      clientSecret: azureAdConfig.clientSecret,
      issuer: `https://login.microsoftonline.com/${azureAdConfig.tenantId}/v2.0`,
      // Request additional scopes for user information
      authorization: {
        params: {
          scope: "openid profile email User.Read",
        },
      },
    }),
  ],
  
  // Use JWT strategy for session management (better for serverless)
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  
  // Custom pages configuration
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    error: "/auth/error",   // Custom error page
  },
  
  // Callback functions for handling authentication flow
  callbacks: {
    /**
     * JWT callback - called whenever a JWT token is created, updated, or accessed
     * Used to persist user data in the token
     */
    async jwt({ token, account, profile }) {
      // Persist the Azure AD access token and profile information
      if (account && profile) {
        token.accessToken = account.access_token
        token.profile = profile
      }
      return token
    },
    
    /**
     * Session callback - called when a session is checked
     * Defines what data is exposed to the client
     */
    async session({ session, token }) {
      // Send properties to the client
      if (token.accessToken) {
        session.accessToken = token.accessToken as string
      }
      if (token.profile) {
        session.user = {
          ...session.user,
          ...token.profile,
        }
      }
      return session
    },
    
    /**
     * Authorized callback - determines if user is authorized to access a page
     * Used for protecting routes
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnLoginPage = nextUrl.pathname.startsWith('/auth')
      
      // Allow access to auth pages when not logged in
      if (isOnLoginPage) {
        return true
      }
      
      // Redirect to login if not authenticated and trying to access protected pages
      if (!isLoggedIn) {
        return false
      }
      
      return true
    },
  },
  
  // Additional configuration
  debug: process.env.NODE_ENV === "development",
  trustHost: true,
}

// Export the configured NextAuth handlers
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig) 