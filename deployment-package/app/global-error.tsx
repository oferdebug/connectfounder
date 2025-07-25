'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center px-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">🚨</div>
            <h2 className="text-2xl font-bold text-white mb-4">Critical Error</h2>
            <p className="text-white/80 mb-6">
              FounderConnect encountered a critical error. Please try refreshing the page.
            </p>
            <div className="space-y-3">
              <button
                onClick={reset}
                className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Try again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Refresh page
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="text-white/70 cursor-pointer">Error details</summary>
                <pre className="mt-2 text-xs text-white/60 bg-black/20 p-3 rounded overflow-auto">
                  {error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
