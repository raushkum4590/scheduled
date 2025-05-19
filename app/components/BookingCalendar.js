'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format, addDays, setHours, setMinutes, isSameDay } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { useBookings } from '../context/BookingContext';

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  const { addBooking, getBookingsForDate } = useBookings();
  
  // Generate available time slots (9 AM to 5 PM, 1-hour slots)
  const getAvailableTimeSlots = (date) => {
    const slots = [];
    const existingBookings = getBookingsForDate(date);
    
    // Create slots from 9 AM to 5 PM
    for (let i = 9; i < 17; i++) {
      const slotTime = setHours(setMinutes(new Date(date), 0), i);
      
      // Check if this slot is already booked
      const isBooked = existingBookings.some((booking) => {
        const bookingTime = new Date(booking.time);
        return isSameDay(bookingTime, date) && 
               bookingTime.getHours() === i;
      });
      
      if (!isBooked) {
        slots.push({
          time: slotTime,
          label: format(slotTime, 'h:mm a')
        });
      }
    }
    
    return slots;
  };
  
  const availableTimeSlots = getAvailableTimeSlots(selectedDate);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedTime) {
      alert('Please select a time slot');
      return;
    }
    
    addBooking({
      name,
      email,
      purpose,
      date: selectedDate.toISOString(),
      time: selectedTime.toISOString(),
      status: 'confirmed'
    });
    
    // Reset form
    setName('');
    setEmail('');
    setPurpose('');
    setSelectedTime(null);
    setBookingSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setBookingSuccess(false);
    }, 3000);
  };
  
  // Limit selectable dates to next 30 days and exclude weekends
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 is Sunday, 6 is Saturday
  };
  
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-black p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Book a Session</h2>
      
      {bookingSuccess && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded">
          Booking successful! Your session has been scheduled.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setSelectedTime(null); // Reset time when date changes
            }}
            minDate={new Date()}
            maxDate={addDays(new Date(), 30)}
            filterDate={isWeekday}
            className="w-full p-2 border rounded"
            dateFormat="MMMM d, yyyy"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Select Time</label>
          {availableTimeSlots.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {availableTimeSlots.map((slot) => (
                <button
                  key={slot.time.toString()}
                  type="button"
                  onClick={() => setSelectedTime(slot.time)}
                  className={`p-2 rounded text-center ${
                    selectedTime && selectedTime.toString() === slot.time.toString()
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-red-500">No available slots for this date</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="purpose">
            Purpose of Meeting
          </label>
          <textarea
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Book Session
        </button>
      </form>
    </div>
  );
}
