export default function BlueprintLoading() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="text-center py-20">
          <div className="h-12 w-12 bg-[#1a1a2e] rounded-full mx-auto mb-6" />
          <div className="h-10 bg-[#1a1a2e] rounded w-2/3 mx-auto mb-4" />
          <div className="h-4 bg-[#1a1a2e] rounded w-1/2 mx-auto" />
        </div>
        <div className="space-y-8 mt-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="h-16 w-16 bg-[#1a1a2e] rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-[#1a1a2e] rounded w-1/3" />
                <div className="h-4 bg-[#1a1a2e] rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
