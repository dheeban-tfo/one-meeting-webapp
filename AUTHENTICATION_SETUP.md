# OneMeeting Authentication Setup

This document provides comprehensive instructions for setting up and using the Microsoft Azure AD authentication system in the OneMeeting application.

## 🏗️ Architecture Overview

The authentication system is built with a modular architecture:

```
src/
├── lib/
│   └── auth.ts                    # NextAuth.js configuration
├── middleware.ts                  # Route protection middleware
├── types/
│   └── auth.ts                   # TypeScript type definitions
├── app/
│   ├── api/auth/[...nextauth]/   # Authentication API routes
│   ├── auth/signin/              # Sign-in page
│   └── page.tsx                  # Protected home page
└── components/
    ├── auth/
    │   ├── SignInForm.tsx        # Sign-in form component
    │   ├── LogoutButton.tsx      # Logout button component
    │   └── LogoutModal.tsx       # Logout confirmation modal
    ├── user/
    │   └── UserProfile.tsx       # User profile display
    └── providers/
        └── SessionProvider.tsx   # Session context provider
```

## 🔧 Setup Instructions

### 1. Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Configure:
   - **Name**: OneMeeting
   - **Supported account types**: Choose based on your needs
   - **Redirect URI**: `http://localhost:3000/api/auth/callback/microsoft-entra-id`
5. Note down the **Application (client) ID** and **Directory (tenant) ID**
6. Create a **Client Secret** in **Certificates & secrets**

### 2. Environment Configuration

1. Copy `env.example` to `.env.local`
2. Update the values:

```env
AZURE_AD_CLIENT_ID=your-actual-client-id
AZURE_AD_CLIENT_SECRET=your-actual-client-secret
AZURE_AD_TENANT_ID=your-actual-tenant-id
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-secure-random-string
```

### 3. Install Dependencies

All required dependencies are already included:

```bash
npm install
```

### 4. Run the Application

```bash
npm run dev
```

## 🔐 Authentication Flow

### 1. User Access Flow
- User visits any protected route
- Middleware checks authentication status
- If not authenticated → redirects to `/auth/signin`
- User clicks "Sign in with Microsoft"
- Redirected to Azure AD for authentication
- After successful auth → redirected back to original URL

### 2. Session Management
- Sessions are managed using JWT tokens
- Session duration: 24 hours
- Automatic refresh on window focus
- Session data persisted across page refreshes

### 3. Logout Flow
- User clicks logout button
- Confirmation modal appears
- Upon confirmation → session cleared
- User redirected to sign-in page

## 🛡️ Security Features

### Route Protection
- All routes are protected by default (except auth pages)
- Middleware handles authentication checks
- URL parameters preserved across redirects

### Session Security
- JWT tokens with secure configuration
- Automatic session expiration
- Secure token storage
- CSRF protection

### Input Validation
- TypeScript type safety
- Proper error handling
- Sanitized user inputs

## 📱 Responsive Design

The authentication system is fully responsive:

- **Mobile-first design** with Tailwind CSS
- **Accessible components** with ARIA labels
- **Dark mode support** 
- **Touch-friendly interface**

## 🎨 UI Components

### SignInForm
- Microsoft branding and icon
- Loading states
- Error handling
- Responsive design

### LogoutModal
- Confirmation dialog
- Keyboard navigation (ESC to close)
- Loading states
- Backdrop blur effect

### UserProfile
- Avatar display with fallback initials
- User information display
- Online status indicator
- Responsive visibility

## 🔄 State Management

### Client-Side
- `useSession()` hook for component state
- Automatic session updates
- Real-time authentication status

### Server-Side
- `auth()` function for server components
- Middleware integration
- Route-level protection

## 🧪 Testing the System

### Manual Testing Checklist

1. **Authentication Flow**
   - [ ] Visit homepage → redirected to sign-in
   - [ ] Click "Sign in with Microsoft"
   - [ ] Complete Azure AD authentication
   - [ ] Redirected back to homepage
   - [ ] User information displayed correctly

2. **Session Persistence**
   - [ ] Refresh page → still authenticated
   - [ ] Close/reopen browser → still authenticated
   - [ ] Wait for session expiry → redirected to sign-in

3. **Logout Flow**
   - [ ] Click logout button
   - [ ] Confirmation modal appears
   - [ ] Cancel → modal closes, still logged in
   - [ ] Confirm → signed out and redirected

4. **URL Preservation**
   - [ ] Visit `/some-page?param=value` while not authenticated
   - [ ] Sign in → redirected back to `/some-page?param=value`

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot find module" errors**
   - Ensure all dependencies are installed: `npm install`
   - Check file paths and imports

2. **Authentication not working**
   - Verify Azure AD configuration
   - Check environment variables
   - Ensure correct redirect URI in Azure Portal

3. **Session not persisting**
   - Check NEXTAUTH_SECRET is set
   - Verify session configuration in auth.ts

4. **Redirect URI mismatch**
   - Ensure Azure AD redirect URI matches exactly
   - Check for trailing slashes and protocol (http vs https)

### Debug Mode

Enable debug logging in development:
```env
NODE_ENV=development
```

This will show detailed authentication logs in the browser console.

## 🚀 Production Deployment

### Environment Variables for Production

```env
AZURE_AD_CLIENT_ID=prod-client-id
AZURE_AD_CLIENT_SECRET=prod-client-secret
AZURE_AD_TENANT_ID=prod-tenant-id
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=secure-production-secret
NODE_ENV=production
```

### Azure AD Production Setup

1. Update redirect URI to production URL
2. Configure production domain
3. Update CORS settings if needed
4. Test thoroughly before going live

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Azure AD Provider Guide](https://next-auth.js.org/providers/azure-ad)
- [Next.js Middleware Documentation](https://nextjs.org/docs/middleware)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow component documentation patterns
- Include comprehensive comments
- Implement proper error handling

### Component Structure
- Keep components small and focused (<200 lines)
- Use proper TypeScript interfaces
- Include accessibility features
- Implement responsive design

### Testing
- Test authentication flows manually
- Verify responsive design
- Check accessibility compliance
- Validate error handling 