import { Link } from "react-router-dom";

export const Home = () => {
  const content = {
    header: "French Enhance",
    desc: "Simplify your French writing with FrenchEnhance, a practical and user-friendly tool. Bring your ideas to life with customized contentdesigned to meet your specific needs.",
    blocks: [
      {
        title: "What's French Enhance",
        content:
          "Welcome to frEnhance, a reliable platform crafted to elevate how you approach French writing. Whether you’re working on a project, writing an article, or delving into the complexities of the French language, frEnhance adapts to your unique requirements. Our tool is built to make writing straightforward and efficient, empowering you to focus on your ideas while we handle the details.",
      },
      {
        title: "Why Choose Us?",
        content: [
          {
            title: "Simple and Powerful",
            content: "Generate compelling and unique content effortlessl.",
          },
          {
            title: "Versatile Applications",
            content:
              "Perfect for students, writers, professionals, and anyone needing quality content.",
          },
          {
            title: "Save Time and Energy",
            content:
              "Focus on your ideas and goals while FrEnhance takes care of the text generation.",
          },
          {
            title: "Innovative Features",
            content:
              "Customize every aspect of your text, from tone to structure, ensuring results that align perfectly with your vision.",
          },
        ],
      },
    ],
    conclusion:
      "FrEnhance is not just a tool , it’s your creative assistant, ready to help at any moment. Join thousands of users who rely on us for their French writing needs",
  };
  return (
    <>
      {/* Intro */}
      <div className="relative flex min-h-[26rem] flex-col items-center justify-center gap-7 overflow-hidden bg-black bg-hero-pattern bg-cover bg-center px-3 py-10 md:px-[10%] md:pt-12">
        <div className="absolute left-0 top-0 h-full w-full bg-black opacity-50"></div>
        <div className="z-10">
          <h1 className="mb-3 text-center font-body text-4xl font-bold tracking-wide text-white drop-shadow-2xl sm:mb-10 md:text-5xl">
            {content.header}
          </h1>
          <p className="text-center text-white lg:text-xl">{content.desc}</p>
        </div>
        <Link
          draggable={false}
          to={"/dashboard"}
          className="z-10 rounded-md bg-amber-300 px-2 py-2 font-semibold transition-all duration-100 active:scale-95"
        >
          Create Now
        </Link>
      </div>
      <div className="bg-mainBody">
        {/* Descpretion */}
        {content.blocks.map((element, index) => (
          <div
            className="mx-auto px-3 py-10 md:px-[10%]"
            key={index + Math.random()}
          >
            <h1 className="mb-8 text-center text-2xl font-bold text-white">
              {element.title}
            </h1>
            {Array.isArray(element.content) ? (
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 px-5 sm:grid-cols-2 md:px-[10%] lg:grid-cols-4">
                {element.content.map((card, index2) => (
                  <div
                    key={index2 + Math.random()}
                    className="min-h-36 rounded-lg bg-white px-5 py-3"
                  >
                    <h2 className="mb-3 text-center font-semibold opacity-85 drop-shadow-lg">
                      {card.title}
                    </h2>
                    <p className="text-center">{card.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-white opacity-80">
                {element.content}
              </p>
            )}
          </div>
        ))}

        {/* Conclusion */}
        <div className="mx-auto max-w-[500px] px-3 py-20 text-center text-white">
          <p>{content.conclusion}</p>
        </div>
      </div>
    </>
  );
};
