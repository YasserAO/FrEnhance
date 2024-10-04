import { FaAnglesUp } from "react-icons/fa6";
import PropTypes from "prop-types";
import { MdDeleteOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

export const TextReadMode = () => {
  const { myTexts, emptyText } = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const Text = myTexts.filter((element) => element.id === id)[0];
  
  if (myTexts.length == 0) {
    if (emptyText) return <div>Empty Field</div>;
    else return <div>Loading</div>;
  }
  if (!Text)
    return (
      <div>
        <h1 className="font-semibold">Text Not Found</h1>
        <Link to="/dashboard" className="btn bg-purple-400">
          Return To Dashboard
        </Link>
      </div>
    );
  return (
    <div className="z-1 h-fit p-3">
      <motion.div className="flex h-14 items-center justify-between rounded-md bg-white py-1 pl-3 pr-5 font-semibold">
        <motion.h1
          key={id + 1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Text.title}
        </motion.h1>
        <button className={`hover:scale-105 active:scale-95`}>
          <MdDeleteOutline color="red" size={"1.5rem"} />
        </button>
      </motion.div>
      <div className="mt-2 h-[450px] overflow-y-auto rounded-md bg-white px-4 py-4 sm:h-[600px]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {Text.text.split("\n").map((txt, indx) => (
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
          <button className="-rotate-90">
            <FaAnglesUp></FaAnglesUp>
          </button>
          <button className="rotate-90">
            <FaAnglesUp></FaAnglesUp>
          </button>
        </div>
        <button
          onClick={() => {
            navigate("/dashboard");
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
  setDbupdateToggle: PropTypes.func,
  labelInHand: PropTypes.number,
  setLabelInHand: PropTypes.func,
  myTexts: PropTypes.array,
  setDashMode: PropTypes.func,
  setReadMode: PropTypes.func,
};
