"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "./components/ui/icons";

interface Feature {
  title: string;
  description: string;
  icon: string;
  stat: string;
  statLabel: string;
}

const features: Feature[] = [
  {
    title: "Global Network",
    description:
      "Connect with founders from around the world, expanding your reach and opportunities.",
    icon: "/globe.svg",
    stat: "5,000+",
    statLabel: "Active Members",
  },
  {
    title: "Exclusive Events",
    description:
      "Join virtual and in-person events designed specifically for founders.",
    icon: "/window.svg",
    stat: "50+",
    statLabel: "Monthly Events",
  },
  {
    title: "Resource Sharing",
    description:
      "Share and access valuable resources, insights, and best practices.",
    icon: "/file.svg",
    stat: "1,000+",
    statLabel: "Shared Resources",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full bg-white py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">FounderConnect</span>
            <div className="flex items-center gap-x-8">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          >
            Connect with Fellow
            <br />
            Founders
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg leading-8 text-gray-600"
          >
            Build meaningful relationships with other entrepreneurs, share
            experiences,
            <br />
            and grow together in your startup journey.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center gap-x-4"
          >
            <Link
              href="/get-started"
              className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Get Started
            </Link>
            <Link
              href="/learn-more"
              className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900"
            >
              Why FounderConnect?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg text-gray-600"
            >
              Everything you need to build your startup network
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="flex justify-center mb-4">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={48}
                    height={48}
                    className="text-blue-500"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {feature.description}
                </p>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {feature.stat}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    {feature.statLabel}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
