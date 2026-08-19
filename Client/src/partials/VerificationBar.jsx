export const VerifictionBar = () => {
  return (
    <div className="flex items-center justify-center gap-3 bg-amber-500/95 px-4 py-2.5 text-slate-900 shadow-sm md:px-[10%]">
      <p className="text-sm font-medium">
        ⚠️ Please verify your email address to unlock all daily AI credits.
      </p>
      <a
        href="/verify"
        className="rounded-md bg-slate-900 px-3 py-1 text-xs font-semibold text-white transition-all hover:bg-slate-800"
      >
        Verify Now →
      </a>
    </div>
  );
};

