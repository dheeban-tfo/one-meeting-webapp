/**
 * Session Provider Component
 * 
 * This component wraps the NextAuth.js SessionProvider to provide
 * authentication state to all client components in the application.
 * 
 * Features:
 * - Client-side session management
 * - Automatic session updates
 * - Context for authentication state
 * - Optimized re-renders
 */

'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface SessionProviderProps {
  children: ReactNode
}

/**
 * SessionProvider Component
 * Wraps children with NextAuth session context
 */
export default function SessionProvider({ children }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider
      // Enable automatic session refetch on window focus
      refetchOnWindowFocus={true}
      // Refetch session every 5 minutes
      refetchInterval={5 * 60}
    >
      {children}
    </NextAuthSessionProvider>
  )
} 