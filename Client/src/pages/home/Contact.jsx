const Contact = () => {
  return (
    <div className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-300">
          Have questions, feature suggestions, or feedback on FrenchEnhance? Feel free to connect directly on GitHub.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-slate-700/60 bg-slate-800/90 p-8 shadow-2xl backdrop-blur-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-900/60 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-2xl text-amber-300">
              💻
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                GitHub & Contributions
              </p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/YasserAO/FrEnhance"
                className="mt-1 inline-block text-base font-bold text-amber-300 transition-colors hover:underline"
              >
                github.com/YasserAO/FrEnhance →
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-md text-center text-xs text-slate-400">
        FrenchEnhance is an open-source project by YasserAO. Thank you for your support!
      </p>
    </div>
  );
};

export default Contact;
