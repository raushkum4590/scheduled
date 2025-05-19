'use client';

import BookingsList from '../components/BookingsList';
import ProtectedRoute from '../components/ProtectedRoute';

export default function BookingsPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">My Bookings</h1>
        <BookingsList />
      </div>
    </ProtectedRoute>
  );
}