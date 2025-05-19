'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useBookings } from '../context/BookingContext';

export default function UpcomingBookings() {
  const { bookings, deleteBooking } = useBookings();
  const [refreshKey, setRefreshKey] = useState(0);
  const [isDeleting, setIsDeleting] = useState(null);
  
  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = () => {
      setRefreshKey(prevKey => prevKey + 1);
    };
    
    window.addEventListener('bookings-updated', handleStorageChange);
    window.addEventListener('storage', (event) => {
      if (event.key === 'bookings') {
        handleStorageChange();
      }
    });
    
    return () => {
      window.removeEventListener('bookings-updated', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  // Filter and sort bookings (only upcoming ones)
  const upcomingBookings = bookings
    .filter((booking) => new Date(booking.date) >= new Date())
    .sort((a, b) => new Date(a.time) - new Date(b.time));
  
  const handleCancelBooking = async (id) => {
    setIsDeleting(id);
    try {
      await deleteBooking(id);
    } finally {
      setIsDeleting(null);
    }
  };
  
  if (upcomingBookings.length === 0) {
    return (
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <p className="text-gray-500 dark:text-gray-400">No upcoming bookings</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold">Your Upcoming Bookings</h3>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {upcomingBookings.map((booking) => {
          const bookingDate = new Date(booking.date);
          const bookingTime = new Date(booking.time);
          
          return (
            <li key={booking.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{booking.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {format(bookingDate, 'MMMM d, yyyy')} at {format(bookingTime, 'h:mm a')}
                  </p>
                </div>
                <button
                  onClick={() => handleCancelBooking(booking.id)}
                  disabled={isDeleting === booking.id}
                  className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400"
                >
                  {isDeleting === booking.id ? 'Canceling...' : 'Cancel'}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}