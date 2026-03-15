export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-[#0a0a1a] text-[#e8e0d0]">
      <section className="py-20 px-6 text-center">
        <div className="animate-pulse">
          <div className="h-10 bg-[#1a1a2e] rounded w-64 mx-auto mb-4" />
          <div className="h-4 bg-[#1a1a2e] rounded w-96 mx-auto" />
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#1a1a2e] border border-[#c9a55a1a] rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-video bg-[#0d0d20]" />
              <div className="p-6 space-y-3">
                <div className="h-3 bg-[#0d0d20] rounded w-1/3" />
                <div className="h-5 bg-[#0d0d20] rounded w-3/4" />
                <div className="h-3 bg-[#0d0d20] rounded w-full" />
                <div className="h-3 bg-[#0d0d20] rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
