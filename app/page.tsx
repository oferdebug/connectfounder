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
    <div className="min-h-screen bg-white w-screen overflow-x-hidden">
      {/* Navbar - Edge to Edge */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 w-full">
        <div className="flex justify-between items-center h-16 px-8 w-full">
          <div className="flex items-center space-x-2">
            <Logo className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900">
              FounderConnect
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Edge to Edge */}
      <section className="pt-24 pb-16 w-full text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 px-4"
        >
          Connect with Fellow
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Founders
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed px-4"
        >
          Build meaningful relationships with other entrepreneurs, share
          experiences, and grow together in your startup journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 px-4"
        >
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-base font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg text-base font-semibold border border-gray-300 transition-all transform hover:scale-105"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Stats - Full Width Edge to Edge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full px-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">5,000+</div>
            <div className="text-sm text-gray-600">Active Founders</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">50+</div>
            <div className="text-sm text-gray-600">Events Monthly</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">1,000+</div>
            <div className="text-sm text-gray-600">Resources Shared</div>
          </div>
        </motion.div>
      </section>

      {/* Features Section - Edge to Edge */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white w-full">
        <div className="text-center mb-16 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Why FounderConnect?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            Everything you need to build your startup network and accelerate
            your entrepreneurial journey.
          </motion.p>
        </div>

        {/* Feature Cards - Edge to Edge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={32}
                    height={32}
                    className="text-blue-600"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
              <div className="border-t border-gray-100 pt-4">
                <span className="text-2xl font-bold text-blue-600">
                  {feature.stat}
                </span>
                <span className="ml-2 text-sm text-gray-500 font-medium">
                  {feature.statLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section - Edge to Edge */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 w-full text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4 px-4"
        >
          Ready to Connect?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-blue-100 mb-8 px-4"
        >
          Join thousands of founders who are already building meaningful
          connections and growing their startups together.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="px-4"
        >
          <Link
            href="/register"
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg inline-block"
          >
            Start Connecting Today
          </Link>
        </motion.div>
      </section>

      {/* Footer - Edge to Edge */}
      <footer className="bg-gray-900 text-white py-12 w-full">
        <div className="text-center px-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Logo className="w-8 h-8" />
            <span className="text-xl font-bold">FounderConnect</span>
          </div>
          <p className="text-gray-400 mb-4">
            Building the future of entrepreneurship, one connection at a time.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-sm text-gray-400">
            © 2025 FounderConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}