/**
 * Root Layout Component
 * 
 * This is the root layout that wraps all pages in the application.
 * It provides global styles, session management, and common providers.
 * 
 * Features:
 * - NextAuth.js session provider for authentication state
 * - Global CSS and font configuration
 * - Dark mode support
 * - Responsive design foundation
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";

// Configure fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Application metadata
export const metadata: Metadata = {
  title: "OneMeeting - Secure Video Conferencing",
  description: "OneMeeting provides secure video conferencing with Microsoft Azure AD authentication",
  keywords: ["video conferencing", "meetings", "Microsoft", "Azure AD", "authentication"],
  authors: [{ name: "OneMeeting Team" }],
  viewport: "width=device-width, initial-scale=1",
};

/**
 * Root Layout Component
 * Wraps all pages with providers and global configuration
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Session Provider for authentication state management */}
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
