'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

const components = [
  {
    title: 'Vision Rover',
    slug: 'vision-rover',
    description:
      'Equipped with camera modules, the Vision Rover streams live video for real-time monitoring and ML-based perception.',
    image: '/vision.jpg',
    hardware: [
      {
        name: 'Raspberry Pi',
        image: '/raspberry.jpg',
        description: 'Acts as the brain of the rover (control + WiFi).',
      },
      {
        name: 'Camera Module',
        image: '/camera.jpeg',
        description: 'Captures live video feed for monitoring.',
      },
      {
        name: '4 DC Motors',
        image: '/motors.jpeg',
        description: 'To drive each wheel independently.',
      },
      {
        name: 'Motor Shield',
        image: '/motorshield.jpg',
        description: 'Controls the motors via Raspberry Pi.',
      },
      {
        name: 'Lithium Battery',
        image: '/battery.jpeg',
        description: 'Portable power supply for field operations.',
      },
      {
        name: 'Wheels',
        image: '/wheels.jpg',
        description: 'Provides movement and support for the rover.',
      },
      {
        name: 'Chassis',
        image: '/chassis.jpeg',
        description: 'Base frame for mounting components.',
      },
    ],
  },
  {
    title: 'Sensor Kit',
    slug: 'sensor-kit',
    description:
      'Includes ultrasonic, IR, and telemetry sensors — ideal for environmental awareness and logging.',
    image: '/sensor.jpg',
    hardware: [
      {
        name: 'Ultrasonic Sensor',
        image: '/ultrasonic.jpg',
        description: 'Detects obstacles based on sound wave reflection.',
      },
      {
        name: 'IR Sensor',
        image: '/ir.jpg',
        description: 'Infrared sensor used for path and obstacle detection.',
      },
      {
        name: 'Jumper Wires',
        image: '/wires.jpg',
        description: 'Used for connecting all sensors to the main board.',
      },
    ],
  },
  {
    title: 'Path Controller',
    slug: 'path-controller',
    description:
      'AI-trained control module powered by Unity + RL to autonomously follow complex paths.',
    image: '/controller.jpeg',
    hardware: [
      {
        name: 'Raspberry Pi',
        image: '/raspberry.jpg',
        description: 'Runs the control algorithm and path logic.',
      },
      {
        name: 'Black/Colored Tape',
        image: '/tape.jpeg',
        description: 'Defines the paths for AI navigation.',
      },
      {
        name: 'Camera Module',
        image: '/camera.jpg',
        description: 'Used by AI to recognize path and surroundings.',
      },
      {
        name: 'Jumper Wires',
        image: '/wires.jpg',
        description: 'Connects the path logic system together.',
      },
    ],
  },
];

export default function ProductsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* 🚀 Hero Section */}
      <section
        className="relative h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/rover.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold mb-4 tracking-wide"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              RoverPath Product Suite
            </motion.h1>
            <motion.p
              className="text-lg md:text-2xl font-light max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              Explore our full-stack autonomous rover system – powered by AI, IoT, and cloud connectivity.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 🧩 Product Modules */}
      <section className="py-20 px-4 sm:px-6 lg:px-20 bg-gray-50">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Rover Components
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {components.map((item, index) => (
            <motion.div
              key={item.slug}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-white shadow-md hover:shadow-xl transition-all duration-500 rounded-xl overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Link href={`/products/${item.slug}`}>
                  <span className="text-blue-600 font-semibold hover:underline">
                    Learn More →
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
