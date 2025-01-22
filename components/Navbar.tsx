'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  theme?: string;
  changeTheme?: () => void;
  userType?: string;
  userId?: string;
  isSignedIn?: boolean;
  signInOrOut?: () => void;
}

const Navbar = ({
  theme,
  changeTheme,
  userType,
  userId,
  isSignedIn,
  signInOrOut,
}: NavbarProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Ensures client-side rendering after mount
  }, []);

  if (!isMounted) {
    return null; // Avoid rendering until the component is fully mounted
  }

  return (
    <nav className="bg-rose-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div
          className="text-lg md:text-2xl font-bold cursor-pointer"
          onClick={() => router.push('/')}
        >
          Make<span className="text-yellow-300">~</span>my
          <span className="text-yellow-300">~</span>Show
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            className="bg-rose-800 text-white px-4 py-2 rounded-lg hover:bg-rose-900 transition"
            onClick={changeTheme}
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
          <p
            className="cursor-pointer hover:text-yellow-300 transition"
            onClick={() => router.push('/')}
          >
            Home
          </p>
          {isSignedIn && (
            <p
              className="cursor-pointer hover:text-yellow-300 transition"
              onClick={() => router.push(`/${userType}/${userId}`)}
            >
              My Account
            </p>
          )}
          <p
            className="cursor-pointer hover:text-yellow-300 transition"
            onClick={signInOrOut}
          >
            {isSignedIn ? 'Sign Out' : 'Sign In'}
          </p>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            className="bg-rose-800 text-white px-4 py-2 rounded-lg hover:bg-rose-900 transition"
            onClick={changeTheme}
          >
            {theme === 'light' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      <div className="md:hidden bg-rose-400 text-white px-6 py-4">
        <div className="space-y-4">
          <p
            className="cursor-pointer hover:text-yellow-300 transition"
            onClick={() => router.push('/')}
          >
            Home
          </p>
          {isSignedIn && (
            <p
              className="cursor-pointer hover:text-yellow-300 transition"
              onClick={() => router.push(`/${userType}/${userId}`)}
            >
              My Account
            </p>
          )}
          <p
            className="cursor-pointer hover:text-yellow-300 transition"
            onClick={signInOrOut}
          >
            {isSignedIn ? 'Sign Out' : 'Sign In'}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
