import { Link } from "react-router";

export const Footer = () => {
  const content = {
    links: ["Home", "Features", "About", "Contact"],
    linkUrl: ["", "features", "about", "contact"],
    copyright: `© ${new Date().getFullYear()} French Enhance. All rights reserved.`,
  };

  return (
    <footer className="absolute bottom-0 w-full translate-y-full bg-gray-800 px-3 pb-5 pt-10 md:px-[10%]">
      <div className="mx-auto mb-3 flex w-fit flex-wrap gap-2 font-semibold text-gray-400 md:gap-10 lg:gap-20">
        {content.links.map((element, index) => (
          <Link key={index + Math.random()} to={`/${content.linkUrl[index]}`}>
            {element}
          </Link>
        ))}
      </div>
      <p className="pb-5 text-center text-gray-300 sm:pb-0">
        {content.copyright}
      </p>
      <p className="text-right text-white">
        Powered by{" "}
        <a
          href="http://www.groq.com"
          target="_blank"
          className="font-semibold text-orange-400"
        >
          Groq
        </a>
      </p>
    </footer>
  );
};
