'use client';

import BookingsList from '../components/BookingsList';
import ProtectedRoute from '../components/ProtectedRoute';
import Link from 'next/link';

export default function BookingsPage() {
  return (
    <ProtectedRoute>
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              My Bookings
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              View and manage all your scheduled sessions in one place
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Your Scheduled Sessions</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Manage your upcoming and past bookings
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link
                  href="/quick-book"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Book New Session
                </Link>
              </div>
            </div>
            
            <BookingsList />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}