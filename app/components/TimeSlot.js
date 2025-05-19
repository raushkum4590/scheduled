'use client';

import { useState } from 'react';
import { useBookings } from '../context/BookingContext';

export default function TimeSlot({ time, date, isAvailable }) {
  const [isBooking, setIsBooking] = useState(false);
  const [name, setName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { addBooking } = useBookings();
  
  const timeString = time.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  const handleClick = () => {
    if (isAvailable) {
      setShowForm(true);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsBooking(true);
    
    const booking = {
      name,
      date: date.toISOString(),
      time: time.toISOString(),
      status: 'confirmed'
    };
    
    addBooking(booking);
    setName('');
    setShowForm(false);
    setIsBooking(false);
  };
  
  return (
    <div className="relative">
      <button
        className={`w-full text-left p-3 rounded-md text-sm font-medium transition ${
          isAvailable 
            ? 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700' 
            : 'bg-gray-100 text-gray-400 dark:bg-gray-800/50 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-gray-700'
        }`}
        onClick={handleClick}
        disabled={!isAvailable || isBooking}
      >
        <div className="flex items-center justify-between">
          <span>{timeString}</span>
          {isAvailable ? (
            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              Available
            </span>
          ) : (
            <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
              Booked
            </span>
          )}
        </div>
      </button>
      
      {showForm && (
        <div className="absolute top-full left-0 right-0 mt-1 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium mb-1">
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full mt-1 p-2 border rounded text-sm"
                placeholder="Enter your name"
                autoFocus
              />
            </label>
            <div className="flex justify-end gap-2 mt-3">
              <button
                type="button"
                className="px-3 py-1 text-sm rounded border border-gray-300 dark:border-gray-600"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                disabled={isBooking}
              >
                {isBooking ? 'Booking...' : 'Book'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}