import LogoAvatar from "./Buttons/LogoAvatar";
import { LogoDash } from "./Buttons/Logo";
import { useContext, useRef, useState } from "react";
import UserDropDownMenu from "./menus/userDropDown";
import { AuthContext } from "../authProvider";
import { AnimatePresence, motion } from "framer-motion";
import { BurgerMenu } from "./Buttons/menuButton";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useClickOutside from "../utils/closeMenu";

const DNavBar = ({ children }) => {
  const [menuDropDown, setMenuDropDown] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const { userForm, coins } = useContext(AuthContext);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);
  useClickOutside(popupRef, () => setToggleMenu(false), buttonRef);
  return (
    <header
      className={`sticky top-0 z-40 flex h-14 items-center justify-between border-b border-gray-100 bg-gray-100 px-3 shadow-sm sm:relative sm:px-3 md:px-[10%]`}
    >
      <LogoDash></LogoDash>

      {/* Desktop Nav */}
      <div className="hidden w-full items-center md:flex">
        <div className="w-full select-none pl-5">
          <Link
            className="text-sm font-semibold text-slate-700 underline-offset-4 transition-colors hover:text-sky-700 hover:underline"
            to="/"
          >
            ← Home
          </Link>
        </div>

        <div className="flex w-full items-center justify-end gap-3">
          {/* Coins score */}
          <div className="flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-sm shadow-sm">
            <span className="font-bold text-amber-300">
              {coins?.quantity ?? 0}
            </span>
            <img
              className="inline-block h-4 w-4"
              src="/diamondIcon.png"
              alt="coins"
            />
          </div>

          {/* DropMenu  */}
          <div className="relative">
            <LogoAvatar setMenuDropDown={setMenuDropDown} />

            <AnimatePresence>
              {menuDropDown && <UserDropDownMenu userForm={userForm} />}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <BurgerMenu
        buttonRef={buttonRef}
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        d={true}
      />
      <AnimatePresence>
        {toggleMenu && (
          <motion.div
            ref={popupRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.2 }}
            className={`absolute right-0 top-0 z-50 flex h-svh w-full max-w-[300px] flex-col overflow-y-auto bg-slate-800 pt-[60px] shadow-2xl md:hidden`}
          >
            <div className="min-w-[300px]">
              <div className="flex flex-col items-start justify-start gap-2 px-6">
                <div className="flex items-center gap-3">
                  <LogoAvatar
                    user={userForm.firstName + " " + userForm.lastName}
                  />

                  <div className="flex flex-col justify-start gap-1">
                    <p className="font-semibold text-white">
                      {userForm.firstName}{" "}
                      <span className="uppercase">{userForm.lastName}</span>
                    </p>
                    <div className="flex h-6 w-fit items-center gap-1.5 rounded-full bg-slate-900 px-2.5 shadow-inner">
                      <span className="text-xs font-bold text-amber-300">
                        {coins?.quantity ?? 0}
                      </span>
                      <img
                        className="inline-block h-3.5 w-3.5"
                        src="/diamondIcon.png"
                        alt="coins"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {children}
              <div className="flex flex-col gap-2 px-5 py-6 text-base text-white">
                <Link
                  to="/"
                  className="cursor-pointer select-none rounded-lg bg-slate-700/80 px-4 py-2.5 font-medium transition-colors hover:bg-slate-700"
                >
                  ← Return to Home
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default DNavBar;

DNavBar.propTypes = {
  children: PropTypes.node,
};
