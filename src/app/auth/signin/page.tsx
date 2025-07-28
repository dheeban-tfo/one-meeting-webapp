/**
 * Sign-In Page Component - shadcn/ui Version
 * 
 * This page provides the user interface for authentication using shadcn/ui.
 * It integrates with Microsoft Azure AD for Single Sign-On (SSO).
 * 
 * Features:
 * - Microsoft Azure AD sign-in with shadcn/ui components
 * - Responsive design for all screen sizes
 * - Loading states and error handling
 * - Automatic redirect after successful authentication
 * - URL parameter preservation for post-login navigation
 */

import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import SignInForm from '@/components/auth/SignInForm'
import { Card, CardContent } from '@/components/ui/card'

/**
 * Sign-In Page Component
 * Handles authentication flow and redirects authenticated users
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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Error Display */}
        {params.error && (
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
                <div className="text-sm text-red-800 dark:text-red-200">
                  Authentication failed. Please try again.
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sign-In Form */}
        <Suspense fallback={
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">Loading...</div>
            </CardContent>
          </Card>
        }>
          <SignInForm callbackUrl={params.callbackUrl} />
        </Suspense>
      </div>
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