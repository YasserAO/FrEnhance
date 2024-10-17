import PropTypes from "prop-types";
import { useState } from "react";

export const DifficultyMenu = ({ selectedIndex, setSelectedIndex }) => {
  const dvalues = ["A", "B", "C"];
  const ChosenValues = ["Basic", "Medium", "Advanced"];

  const [toggleMenu, setToggleMenu] = useState(false);
  const handlePick = (index) => {
    setSelectedIndex(index);
  };
  return (
    <div className="relative">
      <div
        onClick={() => {
          setToggleMenu((prev) => !prev);
        }}
        className={`flex h-8 w-8 cursor-pointer select-none items-center justify-center overflow-hidden rounded-lg bg-slate-700 py-1 text-sm font-semibold text-white`}
      >
        {dvalues[selectedIndex]}
      </div>

      <div
        className={`absolute bottom-full flex max-h-0 min-h-0 w-fit -translate-y-1 flex-col overflow-hidden bg-slate-700 px-3 text-white opacity-0 duration-300 ${toggleMenu && `max-h-[300px] py-1 opacity-100`} `}
      >
        {ChosenValues.map((value, index) => (
          <div
            onClick={() => {
              handlePick(index);
              setToggleMenu(false);
            }}
            key={index}
            className="cursor-pointer select-none border-b py-1 last:border-none hover:bg-slate-500"
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
