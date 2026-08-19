import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../authProvider";
import { motion, AnimatePresence } from "framer-motion";
import SignIn from "./Buttons/singIn";
import SignUp from "./Buttons/singUp";
import LogoutButton from "./Buttons/logout";
import LogoAvatar from "./Buttons/LogoAvatar";
import UserDropDownMenu from "./menus/userDropDown";
import { MdDashboardCustomize } from "react-icons/md";
import { Logo } from "./Buttons/Logo";
import { BurgerMenu } from "./Buttons/menuButton";
import { Link, NavLink } from "react-router-dom";
import useClickOutside from "../utils/closeMenu";

const NavBar = ({ auth }) => {
  const { userForm, isLogged } = useContext(AuthContext);
  const [menuDropDown, setMenuDropDown] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  useClickOutside(popupRef, () => setToggleMenu(false), buttonRef);

  // Prevent background scroll when mobile drawer is open
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

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/features", label: "Features" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  if (auth) {
    return (
      <header className="relative flex h-14 w-full items-center justify-between border-b border-slate-700/80 bg-slate-900 px-4 md:px-[10%]">
        <Logo />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-slate-800 bg-slate-900/95 px-4 shadow-md backdrop-blur-md md:px-[10%]">
      <Logo />

      {/* Desktop Navigation Links */}
      <nav className="hidden items-center gap-1 sm:flex">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                isActive
                  ? "bg-slate-800 text-amber-300"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Desktop Right User / Auth */}
      <div className="hidden items-center gap-3 sm:flex">
        {isLogged === null ? null : isLogged ? (
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow transition-all hover:from-sky-500 hover:to-sky-600 active:scale-95"
            >
              <span>Dashboard</span>
              <MdDashboardCustomize size="1.1rem" />
            </Link>

            <div className="relative">
              <LogoAvatar setMenuDropDown={setMenuDropDown} />
              <AnimatePresence>
                {menuDropDown && <UserDropDownMenu userForm={userForm} />}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <SignIn />
            <SignUp />
          </div>
        )}
      </div>

      {/* Mobile Burger Trigger */}
      <BurgerMenu
        buttonRef={buttonRef}
        setToggleMenu={setToggleMenu}
        toggleMenu={toggleMenu}
      />

      {/* Mobile Drawer & Backdrop */}
      <AnimatePresence>
        {toggleMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setToggleMenu(false)}
              className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs sm:hidden"
            />

            <motion.div
              ref={popupRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.2 }}
              className="fixed right-0 top-0 z-50 flex h-dvh w-72 max-w-[85vw] flex-col justify-between overflow-y-auto overscroll-contain border-l border-slate-700/80 bg-slate-900 p-6 shadow-2xl sm:hidden"
            >
              <div className="space-y-6">
                {/* Header with User Info or Auth */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  {isLogged ? (
                    <div className="flex items-center gap-3">
                      <LogoAvatar
                        user={userForm.firstName + " " + userForm.lastName}
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {userForm.firstName} {userForm.lastName}
                        </p>
                        <p className="truncate text-xs text-slate-400">
                          {userForm.email}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Menu
                    </span>
                  )}
                  <button
                    onClick={() => setToggleMenu(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                {isLogged && (
                  <Link
                    to="/dashboard"
                    onClick={() => setToggleMenu(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 py-2.5 text-xs font-semibold text-white shadow hover:bg-sky-500"
                  >
                    <span>Open Dashboard</span>
                    <MdDashboardCustomize size="1.1rem" />
                  </Link>
                )}

                {/* Nav Links */}
                <nav className="flex flex-col gap-1.5">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setToggleMenu(false)}
                      className={({ isActive }) =>
                        `rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-slate-800 text-amber-300 font-semibold"
                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* Bottom Actions */}
              <div className="border-t border-slate-800 pt-4">
                {isLogged ? (
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Log out</span>
                    <LogoutButton />
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <SignIn />
                    <SignUp />
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
