/**
 * Sign-In Form Component - Minimalist Design
 * 
 * This component provides a clean, minimalist sign-in interface matching
 * the design specification with centered layout and simple styling.
 * 
 * Features:
 * - Clean, left-aligned layout
 * - Minimalist design with simple typography
 * - Microsoft Azure AD integration
 * - Loading states and error handling
 * - Responsive design
 */

'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

interface SignInFormProps {
  callbackUrl?: string
}

/**
 * SignInForm Component
 * Renders the minimalist sign-in interface
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
    <div className="w-full">
      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
          <div className="text-sm text-red-800">
            {error}
          </div>
        </div>
      )}

      {/* Sign In Content */}
      <div className="space-y-6">
        {/* Heading */}
        <div className="space-y-3">
          <h2 className="text-2xl font-normal text-black">
            Sign in
          </h2>
          <p className="text-sm text-black leading-relaxed">
            Sign in using your company&apos;s email credentials<br />
            for enhanced security.
          </p>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white text-sm font-normal py-2 px-4 rounded border border-amber-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent mr-2" />
              Signing in...
            </span>
          ) : (
            'Sign in'
          )}
        </button>
      </div>
    </div>
  )
} 