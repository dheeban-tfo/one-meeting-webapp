/**
 * Home Page Component - shadcn/ui Version
 * 
 * This is the main dashboard page that users see after successful authentication.
 * It displays user information and provides access to main application features using shadcn/ui.
 * 
 * Features:
 * - User profile information display with shadcn/ui components
 * - Logout functionality with confirmation dialog
 * - Responsive design for all screen sizes
 * - Session management integration
 * - Welcome message and navigation
 */

import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import UserProfile from '@/components/user/UserProfile'
import LogoutButton from '@/components/auth/LogoutButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CalendarDays, Video } from 'lucide-react'

/**
 * Home Page Component
 * Main dashboard after user authentication
 */
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // Await the searchParams promise
  const params = await searchParams
  
  // Get the current session
  const session = await auth()

  // Redirect to login if not authenticated (shouldn't happen due to middleware)
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo/Title */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-foreground">
                OneMeeting
              </h1>
            </div>

            {/* User Profile and Logout */}
            <div className="flex items-center space-x-4">
              <UserProfile user={session.user} />
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="space-y-6">
            {/* Welcome Card */}
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">
                  Welcome back, {session.user?.name || 'User'}!
                </CardTitle>
                <CardDescription className="text-lg">
                  You have successfully signed in to OneMeeting.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* User Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Account Information</CardTitle>
                <CardDescription>
                  Your profile details from Microsoft Azure AD
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Name
                    </label>
                    <p className="text-sm text-foreground">
                      {session.user?.name || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <p className="text-sm text-foreground">
                      {session.user?.email || 'Not provided'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* URL Parameters Display (for debugging) */}
            {Object.keys(params).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">URL Parameters (preserved)</CardTitle>
                  <CardDescription>
                    These parameters were preserved across the authentication flow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto">
                    {JSON.stringify(params, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Start a meeting or manage your calendar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="flex-1">
                    <Video className="w-4 h-4 mr-2" />
                    Start Meeting
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    View Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

/**
 * Metadata for the home page
 */
export const metadata = {
  title: 'Dashboard - OneMeeting',
  description: 'OneMeeting dashboard for authenticated users',
}
