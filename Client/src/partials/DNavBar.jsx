import LogoAvatar from "./Buttons/LogoAvatar";
import { LogoDash } from "./Buttons/Logo";
import { useContext, useState } from "react";
import UserDropDownMenu from "./menus/userDropDown";
import { AuthContext } from "../authProvider";
import { AnimatePresence, motion } from "framer-motion";
import LogoutButton from "./Buttons/logout";
import { BurgerMenu } from "./Buttons/menuButton";
import PropTypes from "prop-types";

const DNavBar = ({ children }) => {
  const [menuDropDown, setMenuDropDown] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const { userForm } = useContext(AuthContext);
  return (
    <header
      className={`sticky top-0 z-40 flex h-14 items-center justify-between border-b border-gray-100 bg-gray-100 px-3 shadow-sm sm:relative sm:px-3 md:px-[10%]`}
    >
      <LogoDash></LogoDash>

      {/* Desktop Nav */}
      <div className="hidden w-full items-center md:flex">
        <div className="w-full select-none pl-5">
          <a
            className="font-semibold underline-offset-2 hover:underline active:underline"
            href="/"
          >
            Home
          </a>
        </div>
        <div className="">
          <LogoAvatar setMenuDropDown={setMenuDropDown}></LogoAvatar>

          <AnimatePresence>
            {menuDropDown && <UserDropDownMenu userForm={userForm} />}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Nav */}
      <BurgerMenu
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        d={true}
      ></BurgerMenu>
      <AnimatePresence>
        {toggleMenu && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `100%` }}
            exit={{ width: 0 }}
            className={`b absolute right-0 top-0 z-50 flex h-svh w-full max-w-[300px] flex-col overflow-hidden bg-gray-600 pt-[60px] md:hidden`}
          >
            <div className="flex flex-col items-start justify-start gap-2 px-10">
              <div className="flex h-12 w-full items-center justify-between">
                <div className="flex items-center gap-1">
                  <LogoAvatar
                    user={userForm.firstName + " " + userForm.lastName}
                  ></LogoAvatar>
                  <p className="text-white">
                    {userForm.firstName + " " + userForm.lastName}
                  </p>
                </div>
                <LogoutButton></LogoutButton>
              </div>
            </div>
            {children}
            <ul className="flexflex-col gap-4 px-5 py-10 text-xl text-white">
              <li
                className="cursor-pointer select-none rounded-sm bg-slate-700 py-2 pl-2 hover:bg-slate-900 active:bg-slate-900"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Home
              </li>
            </ul>
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
