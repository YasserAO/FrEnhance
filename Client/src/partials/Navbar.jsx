import { useState, useContext } from "react";
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

const NavBar = ({ auth }) => {
  const { userForm, isLogged } = useContext(AuthContext);
  const [menuDropDown, setMenuDropDown] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const LogoHeaderOnly = () => (
    <header className="relative flex h-full max-h-[60px] w-full items-center justify-between bg-sky-800 px-3 sm:px-3 md:px-[10%]">
      <Logo></Logo>
    </header>
  );
  const navigation = auth ? (
    LogoHeaderOnly()
  ) : (
    <header className="sticky top-0 flex h-full max-h-[60px] w-full items-center justify-between bg-sky-800 px-3 sm:relative sm:px-3 md:px-[10%]">
      <Logo></Logo>
      <ul className="hidden w-1/2 gap-2 sm:flex">
        <li
          className="text-md w-fit cursor-pointer select-none rounded-lg px-1 py-1 font-semibold text-white hover:underline hover:underline-offset-4"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Home
        </li>
        <li
          className="text-md w-fit cursor-pointer select-none rounded-lg px-1 py-1 font-semibold text-white hover:underline hover:underline-offset-4"
          onClick={() => {
            window.location.href = "/features";
          }}
        >
          Features
        </li>
        <li
          className="text-md w-fit cursor-pointer select-none rounded-lg px-1 py-1 font-semibold text-white hover:underline hover:underline-offset-4"
          onClick={() => {
            window.location.href = "/about";
          }}
        >
          About
        </li>
        <li
          className="text-md w-fit cursor-pointer select-none rounded-lg px-1 py-1 font-semibold text-white hover:underline hover:underline-offset-4"
          onClick={() => {
            window.location.href = "/contact";
          }}
        >
          Contact
        </li>
      </ul>
      <div className="flex min-w-[150px] justify-end">
        {isLogged == null ? (
          <></>
        ) : isLogged ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="hidden h-fit items-center gap-2 sm:flex"
          >
            <div
              onClick={() => {
                window.location.href = "/dashboard";
              }}
              className="flex h-8 cursor-pointer select-none items-center gap-1 rounded-sm bg-[#f8e8c581] px-1"
            >
              <p className="font-semibold text-white">Dashboard</p>
              <MdDashboardCustomize
                size={"1.5rem"}
                color="#fff"
              ></MdDashboardCustomize>
            </div>
            <LogoAvatar setMenuDropDown={setMenuDropDown}></LogoAvatar>

            <AnimatePresence>
              {menuDropDown && <UserDropDownMenu userForm={userForm} />}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="hidden gap-3 sm:flex"
          >
            <li>
              <SignIn></SignIn>
            </li>
            <li>
              <SignUp></SignUp>
            </li>
          </motion.ul>
        )}
      </div>

      <BurgerMenu
        setToggleMenu={setToggleMenu}
        toggleMenu={toggleMenu}
      ></BurgerMenu>

      {/* Mobile Navigation Menu */}

      <AnimatePresence>
        {toggleMenu && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `100%` }}
            exit={{ width: 0 }}
            className={`b absolute right-0 top-0 flex h-svh w-full max-w-[300px] flex-col overflow-hidden bg-slate-800 pt-[60px] sm:hidden`}
          >
            {isLogged ? (
              <>
                <div
                  onClick={() => {
                    window.location.href = "/dashboard";
                  }}
                  className="mx-auto flex w-fit cursor-pointer select-none items-center gap-1 rounded-md bg-[#f8e8c581] px-3 py-2"
                >
                  <p className="font-semibold text-white">Dashboard</p>
                  <MdDashboardCustomize
                    size={"1.5rem"}
                    color="#fff"
                  ></MdDashboardCustomize>
                </div>

                <div className="absolute bottom-0 flex h-12 w-full -translate-y-1/2 items-center justify-center gap-3">
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
              </>
            ) : (
              <div className="flex h-12 items-center justify-center gap-4 bg-slate-600 px-10">
                <SignIn></SignIn>
                <SignUp></SignUp>
              </div>
            )}
            <ul className="flex h-full flex-col gap-4 px-5 py-10 text-xl text-white">
              <li
                className="cursor-pointer select-none rounded-sm bg-slate-700 py-2 pl-2 hover:bg-slate-900 active:bg-slate-900"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Home
              </li>
              <li
                className="cursor-pointer select-none rounded-sm bg-slate-700 py-2 pl-2 hover:bg-slate-900 active:bg-slate-900"
                onClick={() => {
                  window.location.href = "/features";
                }}
              >
                Features
              </li>
              <li
                className="cursor-pointer select-none rounded-sm bg-slate-700 py-2 pl-2 hover:bg-slate-900 active:bg-slate-900"
                onClick={() => {
                  window.location.href = "/about";
                }}
              >
                About
              </li>
              <li
                className="cursor-pointer select-none rounded-sm bg-slate-700 py-2 pl-2 hover:bg-slate-900 active:bg-slate-900"
                onClick={() => {
                  window.location.href = "/contact";
                }}
              >
                Contact Us
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );

  return navigation;
};

export default NavBar;
