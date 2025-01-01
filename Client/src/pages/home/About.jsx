const About = () => {
  const content = {
    header: "The Story Behind FrenchEnhance",
    desc: "FrenchEnhance was born from the idea of simplifying learning French through reading. The goal was to create a tool that generates customized French texts to improve reading skills while offering instant explanations for selected words or phrases without needing third-party translation tools.",
    blocks: [
      {
        title: "Responsible AI Usage",
        content:
          "While you can use the generated texts anywhere, keep in mind that the information provided is AI-generated. For specific individuals or subjects where precision is crucial, ensure accuracy by consulting additional trusted sources.",
      },
      {
        title: "About the Creator",
      },
      {
        title: "Powered by Innovation",
      },
    ],
  };
  const aboutCreator = () => (
    <>
      FrenchEnhance was developed by{" "}
      <a
        href="https://github.com/YasserAO"
        className="font-semibold text-gray-600"
        target="_blank"
      >
        YasserAO
      </a>
      , a web developer who initially created the project to support his own
      journey of learning French. Seeing its potential to benefit others, he
      chose to share the tool with anyone seeking to improve their command of
      the French language.
    </>
  );
  const AboutGroq = () => (
    <>
      This project leverages the{" "}
      <a
        href="https://groq.com/"
        className="font-semibold text-orange-400"
        target="_blank"
      >
        Groq API
      </a>
      , a cutting-edge AI text generation tool. Groq empowers developers to
      build creative and user-friendly applications, ensuring a seamless
      experience for all.
    </>
  );

  return (
    <>
      {/* Intro */}
      <div className="relative min-h-56 bg-mainBody py-10 lg:min-h-72 lg:py-20">
        <h1 className="mb-5 text-center text-4xl font-bold text-white">
          {content.header}
        </h1>
        <p className="mx-auto max-w-80 text-center text-white md:max-w-[500px] lg:max-w-[800px]">
          {content.desc}
        </p>
      </div>

      {/* Features */}
      <div className="grid- grid grid-cols-1 gap-x-8 gap-y-8 bg-mainBody px-5 py-10 sm:grid-cols-2 md:px-[10%] lg:grid-cols-3">
        {content.blocks.map((feature, index) => (
          <div
            className={`${index == 2 && "sm:col-span-2 lg:col-span-1"} min-h-36 rounded-lg bg-white px-5 py-3`}
            key={index + Math.random()}
          >
            <h2 className="py-2 text-center font-semibold">{feature.title}</h2>
            <p className="text-center">
              {" "}
              {index == 1
                ? aboutCreator()
                : index == 2
                  ? AboutGroq()
                  : feature.content}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default About;
