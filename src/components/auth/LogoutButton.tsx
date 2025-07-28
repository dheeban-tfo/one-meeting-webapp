/**
 * Logout Button Component - shadcn/ui Version
 * 
 * This component provides a logout button with confirmation dialog using shadcn/ui.
 * It handles the sign-out process and user confirmation to prevent accidental logouts.
 * 
 * Features:
 * - shadcn/ui Dialog for confirmation
 * - Proper sign-out handling
 * - Loading states and user feedback
 * - Responsive design
 * - Accessibility features
 */

'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

/**
 * LogoutButton Component
 * Renders a logout button that triggers confirmation dialog using shadcn/ui
 */
export default function LogoutButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Handle logout confirmation
   * Signs out the user and redirects to login page
   */
  const handleLogout = async () => {
    console.log('🚀 shadcn/ui logout function called!')
    try {
      setIsLoading(true)
      console.log('Starting logout process with shadcn/ui...')
      
      // Use the working approach from SimpleLogoutButton
      await signOut({
        redirect: false, // Don't redirect automatically
      })
      
      console.log('SignOut completed, redirecting manually...')
      // Manual redirect after logout
      window.location.href = '/auth/signin'
      
    } catch (error) {
      console.error('Logout failed:', error)
      setIsLoading(false)
      setIsDialogOpen(false)
      alert('Logout failed: ' + error)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => {
            console.log('shadcn/ui logout button clicked, opening dialog')
            setIsDialogOpen(true)
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Sign Out</DialogTitle>
          <DialogDescription>
            Are you sure you want to sign out? You will need to sign in again to access your account.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              console.log('Dialog cancel clicked')
              setIsDialogOpen(false)
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => {
              console.log('🎯 Dialog confirm clicked, calling handleLogout...')
              handleLogout()
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Signing out...
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 