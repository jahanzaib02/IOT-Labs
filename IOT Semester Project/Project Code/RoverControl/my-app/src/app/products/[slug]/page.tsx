'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
        image: '/camera.jpg',
        description: 'Captures live video feed for monitoring.',
      },
      {
        name: '4 DC Motors',
        image: '/motors.jpg',
        description: 'To drive each wheel independently.',
      },
      {
        name: 'Motor Shield',
        image: '/motorshield.jpg',
        description: 'Controls the motors via Raspberry Pi.',
      },
      {
        name: 'Lithium Battery',
        image: '/battery.jpg',
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
        image: '/tape.jpg',
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

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const product = components.find((p) => p.slug === params.slug);

  if (!product) {
    return <div className="p-10 text-red-500 text-xl">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-5xl font-bold text-center"
          >
            {product.title}
          </motion.h1>
        </div>
      </div>

      {/* Description */}
      <motion.div
        className="max-w-4xl mx-auto py-16 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p className="text-lg text-gray-700 mb-6">{product.description}</p>
      </motion.div>

      {/* Hardware Grid */}
      <motion.div
        className="bg-gray-50 py-12 px-6 lg:px-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h2 className="text-3xl font-semibold mb-10 text-gray-800 text-center">
          Related Hardware
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {product.hardware?.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden"
            >
              {/* Image container */}
              <div className="relative w-full aspect-[4/3] bg-white">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-3"
                />
              </div>

              {/* Text content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.back()}
            className="text-blue-600 font-semibold hover:underline"
          >
            ← Back to Products
          </button>
        </div>
      </motion.div>
    </div>
  );
}
