export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] animate-pulse">
      <div className="h-16 bg-[#111118]" />
      <div className="h-[60vh] bg-[#111118]" />
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center space-y-3">
          <div className="h-8 w-64 bg-[#111118] rounded mx-auto" />
          <div className="h-4 w-96 bg-[#0d0d15] rounded mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-48 bg-[#111118] rounded-xl" />
              <div className="h-5 w-3/4 bg-[#111118] rounded" />
              <div className="h-4 w-full bg-[#0d0d15] rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
