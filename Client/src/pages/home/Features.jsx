const Features = () => {
  const content = {
    header: "Features",
    desc: "Explore powerful tools to generate, customize, and save French texts tailored to your needs. From simplicity to sophistication, frEnhance adapts to every user.",
    features: [
      {
        title: "Theme-Based Text Generation",
        content:
          "Provide a theme, title, or idea to instantly generate structured content with a title and paragraphs.",
      },
      {
        title: "Adjustable Difficulty Levels",
        content:
          "Customize text complexity, from beginner-friendly simplicity to advanced, detailed narratives.",
      },
      {
        title: "Word Explanation",
        content:
          "Select any word within the generated text to receive definitions and contextual examples, aiding in comprehension and learning.",
      },
      {
        title: "Save and Read Later",
        content:
          "Securely save generated texts for future reference, with an optimized read mode for distraction-free review.",
      },
    ],
  };
  return (
    <>
      {/* Intro */}
      <div className="relative min-h-56 bg-mainBody py-10 lg:min-h-72 lg:py-20">
        <h1 className="mb-5 text-center text-4xl font-bold text-white">
          {content.header}
        </h1>
        <p className="mx-auto max-w-72 text-center text-white md:max-w-[500px] lg:max-w-[800px]">
          {content.desc}
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 bg-mainBody px-5 py-10 sm:grid-cols-2 md:px-[10%] lg:grid-cols-4">
        {content.features.map((feature, index) => (
          <div
            className="min-h-36 rounded-lg bg-white px-5 py-3"
            key={index + Math.random()}
          >
            <h2 className="py-2 text-center font-semibold">{feature.title}</h2>
            <p className="text-center">{feature.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Features;
