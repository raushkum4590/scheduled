'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize user from localStorage on mount
  useEffect(() => {
    try {
      const token = localStorage.getItem('google_token');
      const userProfile = localStorage.getItem('user_profile');
      
      if (token && userProfile) {
        setUser(JSON.parse(userProfile));
      }
    } catch (err) {
      console.error('Error loading user profile:', err);
      setError('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user profile information using Google token
  const fetchUserProfile = async (accessToken) => {
    try {
      setLoading(true);
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const userProfile = await response.json();
      
      // Store user profile in state and localStorage
      setUser(userProfile);
      localStorage.setItem('user_profile', JSON.stringify(userProfile));
      
      return userProfile;
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('Failed to fetch user profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user with Google access token
  const login = async (accessToken) => {
    try {
      localStorage.setItem('google_token', accessToken);
      return await fetchUserProfile(accessToken);
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed');
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('google_token');
    localStorage.removeItem('user_profile');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        logout,
        fetchUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}