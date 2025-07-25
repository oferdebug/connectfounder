export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <div className="text-white font-medium">Loading FounderConnect...</div>
        <div className="text-white/70 text-sm mt-2">Please wait while we prepare your experience</div>
      </div>
    </div>
  );
}
