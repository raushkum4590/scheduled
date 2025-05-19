import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Schedulo Lite
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
            Simple, efficient booking system for managing your schedule
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Link
              href="/quick-book"
              className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Quick Book
            </Link>
            <Link
              href="/bookings"
              className="flex-1 py-3 px-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 rounded-lg text-center font-medium transition-all shadow hover:shadow-md"
            >
              My Bookings
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">See Available Slots</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Browse through available time slots with a clean, easy-to-read interface
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Book Instantly</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Book a time slot in seconds by simply entering your name
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Easy Cancellation</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Cancel a booking when your plans change with a single click
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Get Started Now</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              See how easy it is to manage your schedule with our minimalist booking system.
            </p>
            <Link
              href="/quick-book"
              className="inline-block py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Try Quick Booking
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
