'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <img src="/logo.png" alt="Company Logo" className="h-40 mb-4 ml-10" />
            <p className="text-sm text-gray-600">
              Building the future of robotics. Creating agile, mobile robots to navigate the world.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              {[
                { title: 'X', icon: 'x' },
                { title: 'LinkedIn', icon: 'linkedin' },
                { title: 'YouTube', icon: 'youtube' },
                { title: 'Instagram', icon: 'instagram' },
                { title: 'TikTok', icon: 'tiktok' },
              ].map(({ title, icon }) => (
                <a
                  key={title}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={title}
                  className="transition duration-300 transform hover:scale-110 hover:text-blue-600"
                >
                  <img
                    src={`https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${icon}.svg`}
                    alt={title}
                    className="h-6 w-6 hover:filter hover:drop-shadow-md"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-sm font-semibold text-blue-700 uppercase mb-4">Navigation</h2>
            <ul className="space-y-2 text-sm">
              {['Home', 'Products', 'Solutions', 'Industries', 'About Us', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Helpful Links */}
          <div>
            <h2 className="text-sm font-semibold text-blue-700 uppercase mb-4">Helpful Links</h2>
            <ul className="space-y-2 text-sm">
              {['FAQ', 'Support', 'Partners', 'Press', 'Developers', 'Merchandise', 'Security'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-sm font-semibold text-blue-700 uppercase mb-4">Resources</h2>
            <ul className="space-y-2 text-sm">
              {['Case Studies', 'Webinars', 'Blog', 'Whitepapers', 'Events', 'Videos', 'Downloads'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="mb-2 md:mb-0">&copy; 2024 Company Name. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {['Privacy Policy', 'Terms of Service', 'Accessibility', 'Ethics Commitment'].map((item) => (
              <a key={item} href="#" className="hover:text-blue-600 transition">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
