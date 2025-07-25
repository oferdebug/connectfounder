import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-white/80 mb-6">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="block w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
