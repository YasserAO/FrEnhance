import PropTypes from "prop-types";

export function BurgerMenu({ setToggleMenu, toggleMenu, d }) {
  if (d)
    return (
      <div
        onClick={() => {
          setToggleMenu((prev) => !prev);
        }}
        className={`absolute right-3 top-1/2 z-[100] flex -translate-y-1/2 cursor-pointer flex-col gap-1 rounded-sm border border-black p-1 active:bg-[#3a3a3a3a] sm:hidden`}
      >
        <span
          className={`block h-[2px] w-7 bg-black ${toggleMenu && `translate-y-[6px] rotate-45`} transition-all duration-200`}
        ></span>
        <span
          className={`block h-[2px] w-7 bg-black ${toggleMenu && `opacity-0`} transition-all duration-200`}
        ></span>
        <span
          className={`block h-[2px] w-7 bg-black ${toggleMenu && `-translate-y-[6px] -rotate-45`} transition-all duration-200`}
        ></span>
      </div>
    );
  return (
    <div
      onClick={() => {
        setToggleMenu((prev) => !prev);
      }}
      className={`absolute right-3 top-1/2 z-[100] flex -translate-y-1/2 cursor-pointer flex-col gap-1 rounded-sm border border-white p-1 active:bg-[#3a3a3a3a] sm:hidden`}
    >
      <span
        className={`block h-[2px] w-7 bg-white ${toggleMenu && `translate-y-[6px] rotate-45`} transition-all duration-200`}
      ></span>
      <span
        className={`block h-[2px] w-7 bg-white ${toggleMenu && `opacity-0`} transition-all duration-200`}
      ></span>
      <span
        className={`block h-[2px] w-7 bg-white ${toggleMenu && `-translate-y-[6px] -rotate-45`} transition-all duration-200`}
      ></span>
    </div>
  );
}

BurgerMenu.propTypes = {
  toggleMenu: PropTypes.any,
  setToggleMenu: PropTypes.func,
  d: PropTypes.bool,
};
