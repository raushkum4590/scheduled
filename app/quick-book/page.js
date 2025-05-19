'use client';

import MinimalistBookingCalendar from '../components/MinimalistBookingCalendar';
import UpcomingBookings from '../components/UpcomingBookings';
import ProtectedRoute from '../components/ProtectedRoute';

export default function QuickBookPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">Quick Booking</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MinimalistBookingCalendar />
          </div>
          
          <div>
            <UpcomingBookings />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}