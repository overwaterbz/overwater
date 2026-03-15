export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-5xl animate-pulse">⚓</div>
        <p className="text-[#c9a55a]/70 text-sm tracking-widest uppercase">Loading...</p>
      </div>
    </div>
  );
}
