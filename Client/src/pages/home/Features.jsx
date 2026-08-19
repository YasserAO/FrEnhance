const Features = () => {
  const content = {
    header: "Powerful Learning Features",
    desc: "Explore intelligent tools to generate, customize, and save French texts tailored to your learning goals. From beginner simplicity to advanced fluency, FrEnhance adapts to your journey.",
    features: [
      {
        icon: "✨",
        title: "Theme-Based Text Generation",
        content:
          "Provide any topic, title, or interest to instantly generate structured French stories with titles and formatted paragraphs.",
      },
      {
        icon: "📊",
        title: "CEFR Difficulty Levels",
        content:
          "Easily adjust text complexity from beginner (A1/A2) to intermediate (B1/B2) and advanced (C1/C2) vocabulary.",
      },
      {
        icon: "💡",
        title: "Instant Word & Phrase Explanation",
        content:
          "Highlight any French word or sentence in real time to get French explanations and clear contextual usage examples.",
      },
      {
        icon: "📖",
        title: "Personal Library & Reader Mode",
        content:
          "Save your generated articles to your account to practice reading in a clean, distraction-free environment.",
      },
    ],
  };
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

      {/* Feature Cards Grid */}
      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {content.features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col justify-start rounded-2xl border border-slate-700/60 bg-slate-800/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-500/50 hover:shadow-sky-500/10"
          >
            <div className="mb-4 text-3xl">{feature.icon}</div>
            <h2 className="mb-2 text-base font-bold text-white">
              {feature.title}
            </h2>
            <p className="text-xs leading-relaxed text-slate-300">
              {feature.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;

