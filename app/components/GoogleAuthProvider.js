'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';

export default function GoogleAuthProvider({ children }) {
  // Get Google Client ID from environment variable
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // Return children if no client ID is available (development safety)
  if (!clientId) {
    console.warn('Google Client ID is not defined. Authentication will not work.');
    return <>{children}</>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}