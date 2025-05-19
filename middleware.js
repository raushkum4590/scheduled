// This middleware uses client-side authentication since we're using @react-oauth/google
// For more robust auth, you'd implement JWT or session-based server authentication

import { NextResponse } from 'next/server';

export function middleware(request) {
  // We're handling authentication client-side only in this MVP
  // This middleware simply allows all requests to continue
  
  // The actual protection happens in the ProtectedRoute component
  // which redirects unauthenticated users from the client side
  
  return NextResponse.next();
}

// If you want to add server-side protection in the future, you can
// uncomment and modify the config below to specify which routes to protect
/*
export const config = {
  matcher: [
    '/bookings/:path*',
    '/quick-book/:path*',
  ],
};
*/