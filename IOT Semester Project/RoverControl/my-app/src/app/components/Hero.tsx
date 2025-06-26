'use client';

import React from 'react';

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-startf"
      style={{
        backgroundImage: 'url("/rover.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >

      {/* Text Content */}
      <div className="relative z-20 px-8 max-w-3xl">
        <h1 className="text-white text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Changing your idea <br /> what robots can do.
        </h1>
        <p className="text-white text-lg md:text-xl mb-8 font-medium">
          Discover practical robotics solutions designed<br />
          to tackle today’s—and tomorrow’s—toughest<br />
          automation challenges.
        </p>
        <a
          href="/products"
          className="inline-flex items-center bg-white text-blue-800 font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-100 transition duration-300"
        >
          Explore Products
          <span className="ml-2 text-xl">→</span>
        </a>
      </div>
    </section>
  );
}
