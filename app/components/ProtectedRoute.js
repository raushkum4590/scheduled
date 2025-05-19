'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '../context/UserContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // To handle client-side only code
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (isClient && !loading && !isAuthenticated) {
      // Store the current path to redirect back after login
      localStorage.setItem('redirectPath', pathname);
      router.push('/');
    }
  }, [isAuthenticated, loading, router, pathname, isClient]);

  // Show nothing while loading or if not authenticated
  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If authenticated, show children
  return children;
}