/**
 * Sign-In Page Component - Minimalist Design
 * 
 * This page provides a clean, minimalist authentication interface
 * matching the design specification with centered layout.
 * 
 * Features:
 * - Minimalist centered design
 * - OneMeeting branding
 * - Clean typography and spacing
 * - Responsive layout
 * - Footer with copyright
 */

import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import SignInForm from '@/components/auth/SignInForm'

/**
 * Sign-In Page Component
 * Handles authentication flow with minimalist design
 */
export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>
}) {
  // Await the searchParams promise
  const params = await searchParams
  
  // Check if user is already authenticated
  const session = await auth()
  
  if (session) {
    // User is already authenticated, redirect to callback URL or home
    const redirectUrl = params.callbackUrl || '/'
    redirect(redirectUrl)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content - Centered Layout */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-12">
          {/* Logo/Brand */}
          <div className="text-left">
            <div className="flex items-center mb-12">
              <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
              <h1 className="text-base font-normal text-black">onemeeting</h1>
            </div>
          </div>

          {/* Error Display */}
          {params.error && (
            <div className="mb-8">
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <div className="text-sm text-red-800 text-center">
                  Authentication failed. Please try again.
                </div>
              </div>
            </div>
          )}

          {/* Sign-In Form */}
          <div>
            <Suspense fallback={
              <div className="text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-black mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Loading...</p>
              </div>
            }>
              <SignInForm callbackUrl={params.callbackUrl} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pb-8 px-4">
        <div className="text-left max-w-sm mx-auto">
          <p className="text-xs text-gray-600">
            © 2025 The Family Office. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

/**
 * Metadata for the sign-in page
 */
export const metadata = {
  title: 'Sign In - OneMeeting',
  description: 'Sign in to your OneMeeting account',
} 