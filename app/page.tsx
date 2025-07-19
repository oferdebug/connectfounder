"use client";

import React, { useState } from "react";
import {
  Search,
  Users,
  MapPin,
  Calendar,
  Globe,
  MessageSquare,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { value: "5000+", label: "Active Founders" },
  { value: "50+", label: "Cities Covered" },
  { value: "100%", label: "Digital Platform" },
];

const locations = [
  "All Locations",
  "San Francisco",
  "New York",
  "London",
  "Berlin",
  "Singapore",
  "Toronto",
  "Tel Aviv",
  "Remote",
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                FounderConnect
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex space-x-6">
                <Link
                  href="/discover"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Discover
                </Link>
                <Link
                  href="/events"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Events
                </Link>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contact
                </Link>
              </nav>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Globe className="w-4 h-4" />
                  <span>English</span>
                </div>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 w-full">
            <div className="px-4 py-4 space-y-4">
              <Link href="/discover" className="block text-gray-600">
                Discover
              </Link>
              <Link href="/events" className="block text-gray-600">
                Events
              </Link>
              <Link href="/about" className="block text-gray-600">
                About
              </Link>
              <Link href="/contact" className="block text-gray-600">
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-100">
                <Link href="/login" className="block text-gray-600 mb-2">
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="w-full bg-white">
        <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Content */}
          <div className="w-full text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Find Your Perfect{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Co-Founder
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-12"
            >
              Connect with ambitious entrepreneurs worldwide. Modern, digital
              platform for founders and innovators to network and collaborate.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-12"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full max-w-5xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 w-full">
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by founder name, company, industry..."
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="relative min-w-[200px]">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 appearance-none bg-white"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Link href="/search">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 font-medium whitespace-nowrap">
                      <Search className="w-5 h-5" />
                      Search
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Available Founders Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full px-4 sm:px-6 lg:px-8 py-12"
        >
          <div className="max-w-[92rem] mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Featured Founders
            </h2>

            {/* Empty State */}
            <div className="bg-gray-50 rounded-2xl p-12 text-center w-full">
              <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Discover Amazing Founders
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or explore different
                locations to find your perfect co-founder.
              </p>
              <Link href="/discover">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all inline-flex items-center gap-2">
                  Browse All Founders
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="w-full px-4 sm:px-6 lg:px-8 py-12"
        >
          <div className="max-w-[92rem] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Global Network
                </h3>
                <p className="text-gray-600">
                  Connect with founders from around the world, expanding your
                  reach and opportunities.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Exclusive Events
                </h3>
                <p className="text-gray-600">
                  Join virtual and in-person events designed specifically for
                  founders and entrepreneurs.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Smart Matching
                </h3>
                <p className="text-gray-600">
                  Our AI-powered platform matches you with founders who
                  complement your skills and vision.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
