'use client';

import { useState, useEffect } from 'react';
import { format, addDays, setHours, setMinutes, isSameDay } from 'date-fns';
import { useBookings } from '../context/BookingContext';
import TimeSlot from './TimeSlot';

export default function MinimalistBookingCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const { getBookingsForDate } = useBookings();
  
  // Generate time slots from 9 AM to 5 PM with 30-minute intervals
  useEffect(() => {
    const slots = [];
    const existingBookings = getBookingsForDate(selectedDate);
    
    // Create slots from 9 AM to 5 PM
    for (let hour = 9; hour < 17; hour++) {
      for (let minute of [0, 30]) {
        const slotTime = setHours(setMinutes(new Date(selectedDate), minute), hour);
        
        // Check if this slot is already booked
        const isBooked = existingBookings.some((booking) => {
          const bookingTime = new Date(booking.time);
          return isSameDay(bookingTime, selectedDate) && 
                 bookingTime.getHours() === hour &&
                 bookingTime.getMinutes() === minute;
        });
        
        slots.push({
          time: slotTime,
          isAvailable: !isBooked
        });
      }
    }
    
    setTimeSlots(slots);
  }, [selectedDate, getBookingsForDate, refreshKey]);
  
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
  
  // Generate next 7 days for date selection
  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(new Date(), i);
    return {
      date,
      label: i === 0 ? 'Today' : format(date, 'EEE, MMM d')
    };
  });
  
  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-black rounded-lg shadow p-6">
      <div className="flex mb-6 overflow-x-auto pb-2">
        {dateOptions.map((option) => (
          <button
            key={option.date.toISOString()}
            onClick={() => setSelectedDate(option.date)}
            className={`px-4 py-2 whitespace-nowrap rounded-full mr-2 text-sm font-medium transition-colors ${
              isSameDay(selectedDate, option.date)
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      
      <h2 className="text-lg font-semibold mb-4">
        {format(selectedDate, 'EEEE, MMMM d, yyyy')}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {timeSlots.map((slot) => (
          <TimeSlot
            key={slot.time.toISOString()}
            time={slot.time}
            date={selectedDate}
            isAvailable={slot.isAvailable}
          />
        ))}
      </div>
    </div>
  );
}