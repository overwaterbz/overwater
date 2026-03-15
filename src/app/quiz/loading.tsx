export default function QuizLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full animate-pulse">
        <div className="h-8 bg-[#1a1a2e] rounded w-1/2 mx-auto mb-4" />
        <div className="h-4 bg-[#1a1a2e] rounded w-2/3 mx-auto mb-10" />
        <div className="bg-[#1a1a2e] border border-[#c9a55a1a] rounded-xl p-8 space-y-6">
          <div className="h-6 bg-[#0d0d20] rounded w-3/4" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 bg-[#0d0d20] rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
