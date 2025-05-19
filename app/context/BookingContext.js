'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  
  // Get the storage key for the current user
  const getStorageKey = () => {
    return user ? `bookings_${user.sub || user.email}` : 'bookings_guest';
  };
  
  // Load bookings from localStorage on mount or when user changes
  useEffect(() => {
    try {
      const storageKey = getStorageKey();
      const savedBookings = localStorage.getItem(storageKey);
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error('Error loading bookings:', err);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, [user]);
  
  // Save bookings to localStorage when they change
  useEffect(() => {
    if (bookings.length >= 0) {
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(bookings));
      // Dispatch a custom event to notify other tabs/windows of changes
      const event = new CustomEvent('bookings-updated', { detail: { bookings, storageKey } });
      window.dispatchEvent(event);
    }
  }, [bookings, user]);

  // Listen for booking updates from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'bookings') {
        try {
          const newBookings = JSON.parse(e.newValue);
          setBookings(newBookings || []);
        } catch (err) {
          console.error('Error parsing bookings from storage:', err);
        }
      }
    };

    const handleCustomEvent = (e) => {
      setBookings(e.detail.bookings || []);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('bookings-updated', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('bookings-updated', handleCustomEvent);
    };
  }, []);
    // Add a new booking
  const addBooking = (booking) => {
    try {
      setLoading(true);
      const newBooking = {
        id: Date.now().toString(),
        ...booking,
        createdAt: new Date().toISOString(),
      };
      
      // Simulate network delay for real-world behavior
      setTimeout(() => {
        setBookings((prevBookings) => [...prevBookings, newBooking]);
        setLoading(false);
      }, 500);
      
      return newBooking;
    } catch (err) {
      setError('Failed to create booking');
      setLoading(false);
      throw err;
    }
  };
  
  // Delete a booking
  const deleteBooking = (id) => {
    try {
      setLoading(true);
      
      // Simulate network delay for real-world behavior
      setTimeout(() => {
        setBookings((prevBookings) => 
          prevBookings.filter((booking) => booking.id !== id)
        );
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to delete booking');
      setLoading(false);
      throw err;
    }
  };
  
  // Get bookings for a specific date
  const getBookingsForDate = (date) => {
    const dateString = new Date(date).toDateString();
    return bookings.filter(
      (booking) => new Date(booking.date).toDateString() === dateString
    );
  };
  
  // Check if a specific time slot is available
  const isTimeSlotAvailable = (date, time) => {
    const existingBookings = getBookingsForDate(date);
    const timeHour = time.getHours();
    const timeMinutes = time.getMinutes();
    
    return !existingBookings.some((booking) => {
      const bookingTime = new Date(booking.time);
      return bookingTime.getHours() === timeHour && 
             bookingTime.getMinutes() === timeMinutes;
    });
  };
  
  return (
    <BookingContext.Provider 
      value={{ 
        bookings, 
        addBooking, 
        deleteBooking, 
        getBookingsForDate 
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
}
