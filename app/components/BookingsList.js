'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { useBookings } from '../context/BookingContext';

export default function BookingsList() {
  const { bookings, deleteBooking } = useBookings();
  const [filter, setFilter] = useState('all');
  
  // Sort bookings by date (newest first)
  const sortedBookings = [...bookings].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  
  // Filter bookings based on date
  const filteredBookings = sortedBookings.filter((booking) => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    
    switch(filter) {
      case 'upcoming':
        return bookingDate >= today;
      case 'past':
        return bookingDate < today;
      default:
        return true;
    }
  });
  
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-black p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Bookings</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded text-sm ${
              filter === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-3 py-1 rounded text-sm ${
              filter === 'upcoming' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-3 py-1 rounded text-sm ${
              filter === 'past' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            Past
          </button>
        </div>
      </div>
      
      {filteredBookings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No bookings found
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div 
              key={booking.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{booking.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {booking.email}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {format(new Date(booking.date), 'MMM d, yyyy')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {format(new Date(booking.time), 'h:mm a')}
                  </p>
                </div>
              </div>
              
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                <span className="font-medium">Purpose:</span> {booking.purpose}
              </p>
              
              <div className="flex justify-between items-center mt-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  new Date(booking.date) >= new Date()
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                }`}>
                  {new Date(booking.date) >= new Date() ? 'Upcoming' : 'Past'}
                </span>
                
                <button
                  onClick={() => deleteBooking(booking.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
