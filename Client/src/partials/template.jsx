import LeftSlide from "../partials/LeftSlide";
import RightSlide from "../partials/RightSlide";

const Template = ({ left, right }) => {
  return (
    <main className="flex h-screen flex-col gap-2 bg-gray-800 px-2 py-2 md:flex-row md:px-8 md:py-16">
      <LeftSlide>{left}</LeftSlide>
      <RightSlide>{right}</RightSlide>
    </main>
  );
};

export default Template;
