import { Link } from "react-router-dom";

export const Home = () => {
  const content = {
    header: "FrenchEnhance",
    desc: "Simplify and master your French learning with FrenchEnhance. Generate customized, level-adaptive French stories and articles with instant phrase explanations and interactive reading tools.",
    blocks: [
      {
        title: "What is FrenchEnhance?",
        content:
          "Welcome to FrEnhance, a modern educational platform crafted to elevate how you read and learn French. Whether you are practicing for DELF/DALF certifications, improving reading comprehension, or exploring everyday conversational French, FrEnhance adapts to your unique learning pace. Focus on your language growth while our AI crafts tailored texts.",
      },
      {
        title: "Why Choose Us?",
        content: [
          {
            title: "Simple & Powerful",
            content: "Generate compelling, natural French texts across CEFR levels (A1 to C2) effortlessly.",
          },
          {
            title: "Instant Explanations",
            content:
              "Select any French phrase or word to get instant contextual explanations and practical examples.",
          },
          {
            title: "Distraction-Free Reading",
            content:
              "Save your generated stories to your personal dashboard and read them at any time in Reader Mode.",
          },
          {
            title: "Interactive Editing",
            content:
              "Refine, regenerate, or customize specific paragraphs to fit your exact study goals.",
          },
        ],
      },
    ],
    conclusion:
      "FrEnhance is your dedicated French learning companion. Start reading, discovering new vocabulary, and mastering the French language today!",
  };
  return (
    <>
      {/* Hero Section */}
      <div className="relative flex min-h-[30rem] flex-col items-center justify-center gap-6 overflow-hidden bg-slate-950 bg-[url('/background.jpg')] bg-cover bg-center px-4 py-16 text-center md:px-[10%]">
        <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
            AI-Powered French Learning Platform
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
            {content.header}
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            {content.desc}
          </p>
        </div>
        <Link
          draggable={false}
          to="/dashboard"
          className="relative z-10 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-amber-400/20 transition-all duration-150 hover:bg-amber-300 hover:shadow-amber-400/30 active:scale-95"
        >
          <span>Get Started Free</span>
          <span>→</span>
        </Link>
      </div>

      <div className="bg-slate-900 py-12">
        {/* Sections */}
        {content.blocks.map((element, index) => (
          <div
            className="mx-auto max-w-6xl px-4 py-10 md:px-8"
            key={index}
          >
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {element.title}
            </h2>
            {Array.isArray(element.content) ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {element.content.map((card, index2) => (
                  <div
                    key={index2}
                    className="flex flex-col justify-start rounded-2xl border border-slate-700/60 bg-slate-800/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-500/50"
                  >
                    <h3 className="mb-2 text-base font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-300">
                      {card.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-3xl rounded-2xl border border-slate-700/60 bg-slate-800/60 p-6 text-center shadow-lg sm:p-8">
                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  {element.content}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Conclusion */}
        <div className="mx-auto max-w-2xl px-4 py-12 text-center">
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-8">
            <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
              {content.conclusion}
            </p>
            <div className="mt-6">
              <Link
                to="/dashboard"
                className="inline-block rounded-lg bg-sky-600 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-sky-500"
              >
                Go to Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
