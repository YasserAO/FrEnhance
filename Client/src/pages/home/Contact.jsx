const Contact = () => {
  return (
    <div className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-300">
          Have questions, suggestions, or feedback on FrenchEnhance? We'd love to hear from you.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-slate-700/60 bg-slate-800/90 p-8 shadow-2xl backdrop-blur-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-900/60 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-xl text-sky-400">
              ✉️
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Email Support</p>
              <a
                href="mailto:contact@frenhance.com"
                className="text-sm font-semibold text-sky-400 transition-colors hover:underline"
              >
                contact@frenhance.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-900/60 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-xl text-amber-300">
              💻
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">GitHub Repository</p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/YasserAO"
                className="text-sm font-semibold text-amber-300 transition-colors hover:underline"
              >
                github.com/YasserAO
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-md text-center text-xs text-slate-400">
        Our team is committed to continuous improvements. Thank you for being part of the FrEnhance community!
      </p>
    </div>
  );
};

export default Contact;

