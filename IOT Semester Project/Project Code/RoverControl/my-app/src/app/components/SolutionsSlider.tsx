'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const solutions = [
  {
    title: 'Automated Food Delivery',
    description: 'Robots deliver meals autonomously across campus or city zones.',
    roverWork: 'The rover navigates streets using GPS & avoids obstacles in real time.',
    image: '/food-delivery.jpg',
  },
  {
    title: 'Automated Cleaning',
    description: 'Smart robots keep spaces spotless without human input.',
    roverWork: 'Rover uses AI to identify dirt zones and adapt to surfaces dynamically.',
    image: '/cleaning.jpg',
  },
  {
    title: 'Warehouse Automation',
    description: 'Boost logistics speed with autonomous loading & sorting.',
    roverWork: 'The rover coordinates with inventory systems for smooth operation.',
    image: '/warehouse.jpg',
  },
  {
    title: 'Construction Support',
    description: 'Robots perform repetitive or dangerous construction tasks.',
    roverWork: 'It carries tools and maps terrain for worker safety and speed.',
    image: '/construction.jpg',
  },
  {
    title: 'Medical Supply Delivery',
    description: 'Fast robotic delivery of critical hospital items.',
    roverWork: 'The rover uses secure routes and avoids human traffic efficiently.',
    image: '/medical.jpg',
  },
];

export default function SolutionsSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % solutions.length);
    }, 4000); // 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-white py-20">
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <h2 className="text-6xl font-bold text-blue-900">
          Solutions for the real <br />world
        </h2>
        <p className="text-lg text-gray-600 mt-4">
          Give your team the tools to make work better: find solutions to keep your operations <br />
          productive and keep your people safe.
        </p>
      </div>

      {/* Slider */}
      <div className="relative w-full h-[80vh] overflow-hidden">
        <AnimatePresence mode = "popLayout">
          <motion.div
            key={solutions[index].title}
            className="absolute inset-0 w-full h-full"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Rover description above */}
            <div className="absolute top-8 left-10 right-10 z-30 bg-white/80 p-4 rounded-md shadow-md">
              <p className="text-gray-700 font-medium">
                <strong></strong> {solutions[index].roverWork}
              </p>
            </div>

            {/* Image */}
            <Image
              src={solutions[index].image}
              alt={solutions[index].title}
              fill
              className="object-cover"
              priority
            />

            {/* Text overlay */}
            <div className="absolute bottom-0 bg-black/50 w-full px-10 py-6 text-white z-20">
              <h3 className="text-3xl font-bold mb-2">{solutions[index].title}</h3>
              <p className="text-lg">{solutions[index].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
