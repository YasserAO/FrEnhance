import PropTypes from "prop-types";
import { useState } from "react";

export const DifficultyMenu = ({ selectedIndex, setSelectedIndex }) => {
  const dvalues = ["Basic", "Medium", "Advanced"];

  const [toggleMenu, setToggleMenu] = useState(false);
  const handlePick = (index) => {
    setSelectedIndex(index);
  };
  return (
    <div className="relative w-full">
      <div
        onClick={() => {
          setToggleMenu((prev) => !prev);
        }}
        className={`w-full cursor-pointer select-none bg-slate-700 py-1 pl-3 text-white`}
      >
        {dvalues[selectedIndex]}
      </div>

      <div
        className={`absolute top-full flex max-h-0 min-h-0 w-full translate-y-1 flex-col overflow-hidden bg-slate-700 text-white opacity-0 duration-300 ${toggleMenu && `max-h-[300px] opacity-100`} `}
      >
        {dvalues.map((value, index) => (
          <div
            onClick={() => {
              handlePick(index);
              setToggleMenu(false);
            }}
            key={index}
            className="cursor-pointer select-none border-b py-1 pl-3 last:border-none hover:bg-slate-500"
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

DifficultyMenu.propTypes = {
  selectedIndex: PropTypes.any,
  setSelectedIndex: PropTypes.func,
};
