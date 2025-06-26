'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext'; // ✅ import useAuth

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth(); // ✅ get user + logout

  const getHoverUnderlineClass = (isDropdown = false) =>
    `relative flex items-center px-3 py-1.5 font-semibold text-black transition duration-200 ${
      isDropdown ? 'group' : ''
    } hover:text-sky-600 hover:after:absolute hover:after:-bottom-1 hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:w-full hover:after:h-[2px] hover:after:bg-sky-600`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo + Nav */}
          <div className="flex items-center space-x-16">
            <a href="/" className="text-2xl font-bold text-gray-900 tracking-wide">
              <span className="text-blue-600">UNIVERSAL</span>DYNAMICS
            </a>

            <nav className="hidden md:flex space-x-10 text-sm font-semibold">
              <Link href="/products" className={getHoverUnderlineClass()}>
                Products
              </Link>

              {/* Solutions Dropdown */}
              <div className="relative group">
                <Link href="/" className={getHoverUnderlineClass(true)}>
                  Solutions
                </Link>
                <div className="absolute left-0 mt-2 w-48 bg-blue-50 text-blue-900 shadow-lg border border-blue-100 rounded opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-500 z-50">
                  <a href="/autodrive" className="block px-5 py-3 hover:bg-blue-100 hover:text-blue-700">Auto Driving</a>
                  <a href="/usercontrol" className="block px-5 py-3 hover:bg-blue-100 hover:text-blue-700">User Control</a>
                </div>
              </div>
            </nav>
          </div>

          {/* Profile Dropdown */}
          <div className="relative hidden md:flex items-center group">
            <div className="flex items-center space-x-2 hover:text-blue-800 transition duration-300 cursor-pointer">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200 transition duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-700 group-hover:text-blue-900 transition duration-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A6.003 6.003 0 0112 15c1.657 0 3.156.672 4.243 1.757M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-blue-700 group-hover:text-blue-900 transition duration-300">
                Profile
              </span>
            </div>

            {/* Dropdown Panel */}
            <div className="absolute right-0 top-full mt-2 w-80 bg-white text-black rounded-2xl shadow-xl border border-gray-200 z-50 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">

              {/* Email or Greeting */}
              <div className="p-5 border-b border-gray-100">
                {user ? (
                  <>
                    <p className="text-sm text-gray-500 mb-1">Signed in as</p>
                    <div className="text-lg font-semibold">{user.displayName || user.email}</div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-500 mb-1">Not signed in</p>
                    <div className="text-lg font-semibold">Sign in with your account</div>
                  </>
                )}
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1">
                {user ? (
                  <button
                    onClick={logout}
                    className="flex items-center justify-center py-4 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-100 w-full"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/sign-in"
                    className="flex items-center justify-center py-4 text-sm text-blue-700 hover:bg-blue-50 transition border-t border-gray-100 w-full"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Sign In
                  </Link>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 flex justify-between text-xs text-gray-400 border-t border-gray-100">
                <a href="#" className="hover:text-blue-600 hover:underline">
                  Privacy policy
                </a>
                <a href="#" className="hover:text-blue-600 hover:underline">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
