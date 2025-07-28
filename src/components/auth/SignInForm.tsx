/**
 * Sign-In Form Component - shadcn/ui Version
 * 
 * This component provides the sign-in interface with Microsoft Azure AD using shadcn/ui.
 * It handles the authentication flow and loading states.
 * 
 * Features:
 * - Microsoft Azure AD sign-in button with shadcn/ui Button
 * - Loading states with proper feedback
 * - Error handling and user feedback
 * - Responsive design with shadcn/ui Card
 * - Accessibility features
 */

'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface SignInFormProps {
  callbackUrl?: string
}

/**
 * SignInForm Component
 * Renders the sign-in form with Microsoft Azure AD integration using shadcn/ui
 */
export default function SignInForm({ callbackUrl }: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Handle Microsoft Azure AD sign-in
   * Redirects to Azure AD authentication flow
   */
  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Initiate sign-in with Microsoft provider
      // For NextAuth.js v5, use redirectTo instead of callbackUrl
      await signIn('microsoft-entra-id', {
        redirectTo: callbackUrl || '/',
      })
    } catch (err) {
      console.error('Sign-in error:', err)
      setError('Failed to sign in. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome to OneMeeting</CardTitle>
        <CardDescription>
          Sign in with your Microsoft work or school account
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Error Display */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
            <div className="text-sm text-red-800 dark:text-red-200">
              {error}
            </div>
          </div>
        )}

        {/* Microsoft Sign-In Button */}
        <Button
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {/* Loading Spinner */}
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
              Signing in...
            </>
          ) : (
            <>
              {/* Microsoft Icon */}
              <svg className="w-5 h-5 mr-2" viewBox="0 0 23 23" fill="currentColor">
                <path d="M0 0h11v11H0V0z" fill="#f25022"/>
                <path d="M12 0h11v11H12V0z" fill="#00a4ef"/>
                <path d="M0 12h11v11H0V12z" fill="#ffb900"/>
                <path d="M12 12h11v11H12V12z" fill="#7fba00"/>
              </svg>
              Sign in with Microsoft
            </>
          )}
        </Button>

        {/* Additional Information */}
        <p className="text-center text-sm text-muted-foreground">
          By signing in, you agree to our terms of service and privacy policy.
        </p>
      </CardContent>
    </Card>
  )
} 