'use client';

import BookingCalendar from '../components/BookingCalendar';

export default function BookPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Book Your Session</h1>
      <BookingCalendar />
    </div>
  );
}