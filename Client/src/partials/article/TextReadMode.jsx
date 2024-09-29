import { FaAnglesUp } from "react-icons/fa6";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

export const TextReadMode = ({
  labelInHand,
  setLabelInHand,
  setReadMode,
  setDashMode,
  myTexts,
}) => {
  const handleLabelInHand = (dir) => {
    if (dir == 0) {
      if (labelInHand == 0) setLabelInHand(myTexts.length - 1);
      else setLabelInHand((prev) => prev - 1);
    } else if (dir == 1) {
      if (labelInHand < myTexts.length - 1) setLabelInHand((prev) => prev + 1);
      else setLabelInHand(0);
    }
  };

  return (
    <div className="z-1 h-fit p-3 md:w-[70%]">
      <motion.div className="flex h-14 items-center rounded-md bg-white py-1 pl-3 font-semibold">
        <motion.h1
          key={labelInHand + 1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {myTexts[labelInHand].title}
        </motion.h1>
      </motion.div>
      <div className="mt-2 h-[450px] overflow-y-auto rounded-md bg-white px-4 py-4 sm:h-[600px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={labelInHand + 2}
        >
          {myTexts[labelInHand].text.split("\n").map((txt, indx) => (
            <p key={indx} className="mb-3 last:mb-0">
              <span className="inline-block w-3"></span>
              {txt}
            </p>
          ))}
        </motion.div>
      </div>
      <div className="mt-2 flex justify-center gap-8">
        <button className="btn bg-sky-500">Edit</button>
        <div className="flex gap-7">
          <button onClick={() => handleLabelInHand(0)} className="-rotate-90">
            <FaAnglesUp></FaAnglesUp>
          </button>
          <button onClick={() => handleLabelInHand(1)} className="rotate-90">
            <FaAnglesUp></FaAnglesUp>
          </button>
        </div>
        <button
          onClick={() => {
            setReadMode(false);
            setDashMode(0);
          }}
          className="btn bg-red-600"
        >
          Exist
        </button>
      </div>
    </div>
  );
};

TextReadMode.propTypes = {
  labelInHand: PropTypes.number,
  setLabelInHand: PropTypes.func,
  myTexts: PropTypes.array,
  setDashMode: PropTypes.func,
  setReadMode: PropTypes.func,
};
