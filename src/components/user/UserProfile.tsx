/**
 * User Profile Component - shadcn/ui Version
 * 
 * This component displays user profile information in the header using shadcn/ui.
 * It shows the user's avatar, name, and email in a compact format.
 * 
 * Features:
 * - User avatar with fallback initials using shadcn/ui Avatar
 * - Responsive design for different screen sizes
 * - Accessible user information display
 * - Clean and modern UI with shadcn/ui components
 */

'use client'

import { User } from 'next-auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface UserProfileProps {
  user: User
}

/**
 * UserProfile Component
 * Displays user information in the application header using shadcn/ui
 */
export default function UserProfile({ user }: UserProfileProps) {
  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="flex items-center space-x-3">
      {/* User Avatar with Online Status */}
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage 
            src={user.image || undefined} 
            alt={`${user.name || 'User'} avatar`} 
          />
          <AvatarFallback className="bg-blue-600 text-white">
            {user.name ? getInitials(user.name) : 'U'}
          </AvatarFallback>
        </Avatar>
        
        {/* Online Status Badge */}
        <Badge 
          variant="secondary" 
          className="absolute -bottom-1 -right-1 h-3 w-3 p-0 bg-green-500 border-2 border-background"
        >
          <span className="sr-only">Online</span>
        </Badge>
      </div>

      {/* User Information */}
      <div className="hidden sm:block">
        <p className="text-sm font-medium text-foreground">
          {user.name || 'User'}
        </p>
        <p className="text-xs text-muted-foreground">
          {user.email || 'No email'}
        </p>
      </div>
    </div>
  )
} 