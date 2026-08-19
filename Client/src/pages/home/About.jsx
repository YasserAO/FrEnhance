const About = () => {
  const content = {
    header: "The Story Behind FrenchEnhance",
    desc: "FrenchEnhance was created to make French language immersion accessible, engaging, and personalized. By blending generative AI with pedagogical reading tools, learners can read authentic French stories tailored to their exact proficiency level with instant contextual support.",
    blocks: [
      {
        title: "Responsible AI Learning",
        content:
          "Our AI generates contextual stories designed for vocabulary acquisition, reading fluency, and cultural discovery. All texts are crafted with safe, educational, and family-friendly standards.",
      },
      {
        title: "About the Creator",
      },
      {
        title: "Powered by Groq",
      },
    ],
  };

  const aboutCreator = () => (
    <>
      Developed by{" "}
      <a
        href="https://github.com/YasserAO"
        className="font-semibold text-amber-300 transition-colors hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        YasserAO
      </a>
      , a full-stack engineer and French learner. Created to eliminate the friction of switching between reading apps and dictionary tools during French language study.
    </>
  );

  const aboutGroq = () => (
    <>
      Powered by the ultra-fast{" "}
      <a
        href="https://groq.com/"
        className="font-semibold text-sky-400 transition-colors hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Groq LPU Engine
      </a>
      , providing near-instantaneous text generation, explanation parsing, and seamless learning interactions.
    </>
  );

  return (
    <div className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {content.header}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-300">
          {content.desc}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.blocks.map((feature, index) => (
          <div
            className="flex flex-col justify-start rounded-2xl border border-slate-700/60 bg-slate-800/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-500/50"
            key={index}
          >
            <h2 className="mb-3 text-base font-bold text-white">
              {feature.title}
            </h2>
            <div className="text-xs leading-relaxed text-slate-300">
              {index === 1
                ? aboutCreator()
                : index === 2
                ? aboutGroq()
                : feature.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

