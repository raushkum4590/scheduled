'use client';

import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useUser } from '../context/UserContext';
import Image from 'next/image';

export default function GoogleLoginButton() {
  const { user, login, logout, loading: userLoading } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle Google login
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        await login(codeResponse.access_token);
      } catch (error) {
        console.error('Login Failed:', error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
      setIsLoading(false);
    }
  });

  // Handle logout
  const handleLogout = () => {
    logout();
  };

  if (userLoading || isLoading) {
    return (
      <button
        disabled
        className="flex items-center px-4 py-2 bg-gray-200 text-gray-500 rounded-md"
      >
        <span className="ml-2">Loading...</span>
      </button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center space-x-3">
        {user.picture && (
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image 
              src={user.picture} 
              alt="Profile" 
              width={32} 
              height={32}
              className="rounded-full"
            />
          </div>
        )}
        <div className="hidden md:block text-sm font-medium">{user.name || 'User'}</div>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        setIsLoading(true);
        googleLogin();
      }}
      className="flex items-center px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 rounded-md border border-gray-300 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"        />
      </svg>
      <span className="ml-2">Sign in with Google</span>
    </button>
  );
}