import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import { BookingProvider } from "./context/BookingContext";
import GoogleAuthProvider from "./components/GoogleAuthProvider";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Schedulo Lite",
  description: "Smart Session Booking MVP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAuthProvider>
          <UserProvider>
            <BookingProvider>
              <Navigation />
              <main className="min-h-screen bg-background text-foreground">
                {children}
              </main>
            </BookingProvider>
          </UserProvider>
        </GoogleAuthProvider>
      </body>
    </html>
  );
}
