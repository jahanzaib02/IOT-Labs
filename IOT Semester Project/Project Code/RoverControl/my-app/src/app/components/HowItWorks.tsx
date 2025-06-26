'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

const steps = [
  {
    title: 'Scan Environment',
    description: 'The robot uses LiDAR and cameras to map the surroundings in real-time.',
    image: '/scan-environment.jpeg',
  },
  {
    title: 'AI Route Planning',
    description: 'AI computes the safest and most efficient route based on live data.',
    image: '/route-planning.jpeg',
  },
  {
    title: 'Autonomous Delivery',
    description: 'The rover navigates autonomously, avoiding obstacles and delivering on time.',
    image: '/autonomous-delivery.jpeg',
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold text-blue-900 mb-8">How It Works</h2>
        <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
          Our rover technology combines cutting-edge sensors, AI, and autonomous mobility to deliver precise, real-world solutions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6"
            >
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-center mb-3">
                <CheckCircle className="text-blue-600 w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold text-blue-800">{step.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
