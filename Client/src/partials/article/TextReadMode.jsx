import { FaAnglesUp } from "react-icons/fa6";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { DeleteText } from "../Buttons/DeleteText";
import { SaveEditedText } from "../../forms/saveEditedText.mjs";

export const TextReadMode = () => {
  const { myTexts, emptyText, setDbupdateToggle } = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [myIndex, setMyIndex] = useState();

  useEffect(() => {
    const Index = myTexts
      .map((element, index) => ({
        id: element.id,
        idx: index,
      }))
      .filter((element) => element.id === id)[0];
    setMyIndex(Index);
  }, [myTexts, id]);

  const handleEdit = async () => {
    const setEditText = async () => {
      try {
        const response = await SaveEditedText(Text.title, Text.text);
        return response;
      } catch (err) {
        console.error(err.message);
      }
    };

    const response = await setEditText();
    if (!response) console.error("Error happened");
    if (response.status == 200) {
      console.log(response.msg);
      navigate("/dashboard/create");
    }
  };

  const handleURL = (theID) => {
    return `/dashboard/readmode/${theID}`;
  };

  const handlePrev = () => {
    if (myIndex.idx == 0) {
      navigate(handleURL(myTexts[myTexts.length - 1].id));
      return;
    }
    navigate(handleURL(myTexts[myIndex.idx - 1].id));
  };
  const handleNext = () => {
    if (myIndex.idx == myTexts.length - 1) {
      navigate(handleURL(myTexts[0].id));
      return;
    }
    navigate(handleURL(myTexts[myIndex.idx + 1].id));
  };

  const Text = myTexts.filter((element) => element.id === id)[0];

  if (!Text || emptyText)
    return (
      <div className="z-1 h-full p-3">
        <motion.div className="flex h-14 items-center justify-between rounded-md bg-white pl-3 pr-5 font-semibold text-green-700">
          <motion.h1
            key={id + 1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Text Was deleted Successfully
          </motion.h1>
        </motion.div>
        <button
          onClick={() => {
            navigate("/dashboard");
          }}
          to="/dashboard"
          className="mx-auto mt-2 block rounded-sm bg-slate-800 px-2 py-2 text-white shadow-md"
        >
          Go back to Dashboard
        </button>
      </div>
    );

  return (
    <div className="z-1 h-fit p-3">
      <motion.div className="flex h-14 items-center justify-between rounded-md bg-white pl-3 pr-5 font-semibold">
        <motion.h1
          key={id + 1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Text.title}
        </motion.h1>
        <DeleteText setDbupdateToggle={setDbupdateToggle} id={id}></DeleteText>
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
        <button className="btn bg-sky-500" onClick={handleEdit}>
          Edit
        </button>
        <div className="flex gap-7">
          <button onClick={handlePrev} className="-rotate-90">
            <FaAnglesUp></FaAnglesUp>
          </button>
          <button onClick={handleNext} className="rotate-90">
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
