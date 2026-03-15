export default function BlogPostLoading() {
  return (
    <main className="min-h-screen bg-[#0a0a1a] text-[#e8e0d0]">
      <article className="max-w-3xl mx-auto px-6 py-16 animate-pulse">
        <div className="h-4 bg-[#1a1a2e] rounded w-24 mb-8" />
        <div className="space-y-3 mb-10">
          <div className="h-3 bg-[#1a1a2e] rounded w-32" />
          <div className="h-8 bg-[#1a1a2e] rounded w-3/4" />
          <div className="h-4 bg-[#1a1a2e] rounded w-24" />
        </div>
        <div className="aspect-video bg-[#1a1a2e] rounded-xl mb-10" />
        <div className="space-y-4">
          <div className="h-4 bg-[#1a1a2e] rounded w-full" />
          <div className="h-4 bg-[#1a1a2e] rounded w-5/6" />
          <div className="h-4 bg-[#1a1a2e] rounded w-full" />
          <div className="h-4 bg-[#1a1a2e] rounded w-3/4" />
        </div>
      </article>
    </main>
  );
}
