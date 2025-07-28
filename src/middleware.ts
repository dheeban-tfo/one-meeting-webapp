/**
 * Authentication Middleware
 * 
 * This middleware protects routes and handles authentication redirects.
 * It ensures that unauthenticated users are redirected to the login page
 * while preserving URL parameters for post-login redirection.
 * 
 * Features:
 * - Route protection for all pages except auth pages
 * - URL parameter preservation across redirects
 * - Automatic redirection after successful login
 */

import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

/**
 * Middleware function to handle authentication and redirects
 */
export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Define public routes that don't require authentication
  const isAuthPage = nextUrl.pathname.startsWith('/auth')
  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth')
  const isPublicRoute = isAuthPage || isApiAuthRoute

  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    // Preserve the current URL and search params for post-login redirect
    const callbackUrl = nextUrl.pathname + nextUrl.search
    const signInUrl = new URL('/auth/signin', nextUrl.origin)
    signInUrl.searchParams.set('callbackUrl', callbackUrl)
    
    return NextResponse.redirect(signInUrl)
  }

  // User is authenticated, allow access
  return NextResponse.next()
})

/**
 * Matcher configuration to specify which routes the middleware should run on
 * Excludes static files, images, and Next.js internal routes
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 