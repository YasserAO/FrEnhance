import LogoAvatar from "./Buttons/LogoAvatar";
import { LogoDash } from "./Buttons/Logo";
import { useContext, useEffect, useRef, useState } from "react";
import UserDropDownMenu from "./menus/userDropDown";
import { AuthContext } from "../authProvider";
import { AnimatePresence, motion } from "framer-motion";
import { BurgerMenu } from "./Buttons/menuButton";
import LogoutButton from "./Buttons/logout";
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

  // Prevent background page scroll when drawer is open
  useEffect(() => {
    if (toggleMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [toggleMenu]);

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-slate-700/80 bg-slate-800 px-4 shadow-md md:px-8">
      <LogoDash />

      {/* Desktop Nav */}
      <div className="hidden w-full items-center md:flex">
        <div className="w-full select-none pl-6">
          <Link
            className="text-xs font-semibold uppercase tracking-wider text-slate-300 transition-colors hover:text-amber-300"
            to="/"
          >
            ← Home
          </Link>
        </div>

        <div className="flex w-full items-center justify-end gap-3">
          {/* Coins score */}
          <div className="flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-900 px-3 py-1 text-sm shadow-inner">
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

      {/* Mobile Nav Button */}
      <BurgerMenu
        buttonRef={buttonRef}
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        d={true}
      />

      {/* Mobile Drawer & Backdrop */}
      <AnimatePresence>
        {toggleMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setToggleMenu(false)}
              className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs md:hidden"
            />

            {/* Slide-in Drawer */}
            <motion.div
              ref={popupRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.2 }}
              className="fixed right-0 top-0 z-50 flex h-dvh w-80 max-w-[85vw] flex-col justify-between overflow-y-auto overscroll-contain border-l border-slate-700/80 bg-slate-900 p-5 shadow-2xl md:hidden"
            >
              <div className="space-y-5">
                {/* Header with user info & close button */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <LogoAvatar
                      user={userForm.firstName + " " + userForm.lastName}
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {userForm.firstName}{" "}
                        <span className="uppercase">{userForm.lastName}</span>
                      </p>
                      <div className="mt-0.5 flex h-5 w-fit items-center gap-1 rounded-full bg-slate-800 px-2">
                        <span className="text-[11px] font-bold text-amber-300">
                          {coins?.quantity ?? 0}
                        </span>
                        <img
                          className="inline-block h-3 w-3"
                          src="/diamondIcon.png"
                          alt="coins"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setToggleMenu(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>

                {/* Drawer Middle Content */}
                <div>{children}</div>
              </div>

              {/* Bottom Actions */}
              <div className="space-y-3 border-t border-slate-800 pt-4">
                <Link
                  to="/"
                  onClick={() => setToggleMenu(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-slate-800 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
                >
                  ← Return to Home
                </Link>
                <div className="flex items-center justify-between px-2 text-xs text-slate-400">
                  <span>Log out</span>
                  <LogoutButton />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DNavBar;

DNavBar.propTypes = {
  children: PropTypes.node,
};
