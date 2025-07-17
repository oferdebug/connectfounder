'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthState } from '@/lib/auth-state';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const authState = getAuthState();
    if (!authState.isAuthenticated) {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Dashboard</h1>
          <div className="mt-6">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <h2 className="text-base font-semibold leading-6 text-gray-900">Welcome to FounderConnect</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Your personal dashboard is being set up. Soon you&apos;ll be able to:
                </p>
                <ul className="mt-3 list-disc pl-5 text-sm text-gray-500">
                  <li>Connect with other founders</li>
                  <li>Share your experiences</li>
                  <li>Find mentorship opportunities</li>
                  <li>Discover networking events</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
