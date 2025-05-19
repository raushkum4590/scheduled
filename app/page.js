import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">
              Schedule Smarter with <span className="text-blue-600">Schedulo Lite</span>
            </h1>
            <p className="text-xl mb-6 text-gray-600 dark:text-gray-300">
              The simple and smart session booking tool for professionals, consultants, and teams.
            </p>
            <p className="mb-8 text-gray-600 dark:text-gray-300">
              Streamline your scheduling process, eliminate back-and-forth emails, and take control of your calendar with our intuitive booking system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/book" 
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-center font-medium"
              >
                Book a Session
              </Link>
              <Link 
                href="/bookings" 
                className="rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 text-center font-medium"
              >
                View My Bookings
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative h-[350px] w-full rounded-lg overflow-hidden shadow-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
              <div className="absolute inset-0 bg-white dark:bg-gray-900 opacity-10 rounded-lg"></div>
              <div className="relative z-10 h-full">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg mb-4">
                  <h3 className="font-bold text-lg mb-2">Your Next Meeting</h3>
                  <p className="text-sm mb-1">Client Consultation</p>
                  <p className="text-sm font-medium">May 20, 2025 • 10:00 AM</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-white/20 dark:bg-gray-800/30 rounded p-3 h-16"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-center mb-12">Why Choose Schedulo Lite?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eliminate back-and-forth emails and messages trying to find the perfect time for a meeting.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Stay Organized</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Keep all your appointments in one place with our intuitive dashboard and booking system.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Experience</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Provide your clients and team members with a seamless and professional booking experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
