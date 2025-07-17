"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "../app/components/ui/Badge";
import { Card, CardContent, CardHeader } from "../app/components/ui/Card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Connect with Fellow Founders
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build meaningful relationships with other entrepreneurs, share
            experiences, and grow together in your startup journey.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Why FounderConnect?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to build your startup network
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card hover className="text-center">
            <CardContent>
              <div className="h-12 w-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                <Image src="/globe.svg" alt="Network" width={24} height={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Global Network - Connect with Founders from Around the World
              </h3>
              <p className="text-gray-600">
                Connect with founders from around the world, expanding your
                reach and opportunities.
              </p>
            </CardContent>
          </Card>

          <Card hover className="text-center">
            <CardContent>
              <div className="h-12 w-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
                <Image src="/window.svg" alt="Events" width={24} height={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Exclusive Events
              </h3>
              <p className="text-gray-600">
                Join virtual and in-person events designed specifically for
                founders.
              </p>
            </CardContent>
          </Card>

          <Card hover className="text-center">
            <CardContent>
              <div className="h-12 w-12 mx-auto mb-4 bg-purple-100 rounded-lg flex items-center justify-center">
                <Image src="/file.svg" alt="Resources" width={24} height={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Resource Sharing
              </h3>
              <p className="text-gray-600">
                Share and access valuable resources, insights, and best
                practices.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                5,000+
              </div>
              <div className="text-gray-600">Active Founders</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Countries - WorldWide</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                1,000+
              </div>
              <div className="text-gray-600">Connections Made</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Monthly Events</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
