import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignIn from "./Buttons/singIn";
import SignUp from "./Buttons/singUp";
import LogoutButton from "./Buttons/logout";

const NavBar = ({ isLogged = false }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <header className="relative flex h-[60px] w-full flex-wrap content-center justify-between bg-sky-400 sm:px-3 md:px-[10%]">
      <div
        onClick={() => {
          window.location.href = "/";
        }}
        className="h-fit w-fit cursor-pointer select-none rounded-3xl bg-white px-2 py-1 font-semibold"
      >
        FrenchEnhance
      </div>
      <ul className="hidden w-fit gap-2 sm:flex">
        <li
          className="w-fit cursor-pointer select-none rounded-lg bg-slate-500 px-1 py-1 text-white active:bg-slate-950"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Home
        </li>
        <li
          className="w-fit cursor-pointer select-none rounded-lg bg-slate-500 px-1 py-1 text-white active:bg-slate-950"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Dashboard
        </li>
        <li
          className="w-fit cursor-pointer select-none rounded-lg bg-slate-500 px-1 py-1 text-white active:bg-slate-950"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Generate
        </li>
      </ul>
      {isLogged ? (
        <ul className="hidden gap-3 sm:flex">
          <li>
            <SignIn></SignIn>
          </li>
          <li>
            <SignUp></SignUp>
          </li>
        </ul>
      ) : (
        <div className="hidden gap-3 sm:flex">
          <div className="flex h-fit items-center gap-1">
            <div className="h-8 w-8 rounded-full bg-gray-300"></div>
            <p>Username</p>
          </div>
          <LogoutButton></LogoutButton>
        </div>
      )}
      <div
        onClick={() => {
          setToggleMenu((prev) => !prev);
        }}
        className={`absolute right-3 top-1/2 z-50 flex -translate-y-1/2 cursor-pointer flex-col gap-1 rounded-sm border border-white p-1 active:bg-[#3a3a3a3a] sm:hidden`}
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
      <AnimatePresence>
        {toggleMenu && (
          <motion.ul
            initial={{ width: 0 }}
            animate={{ width: `100%` }}
            exit={{ width: 0 }}
            className={`b absolute right-0 flex h-screen w-full max-w-[300px] flex-col overflow-hidden bg-[#f1f6f736] pt-[60px] sm:hidden`}
          >
            <div className="flex h-12 justify-between bg-slate-600 px-10">
              <div className="h-10 w-10 rounded-full bg-white"></div>
              <div className="flex content-center gap-2">
                <div
                  onClick={() => {
                    setToggleMenu((prev) => !prev);
                  }}
                  className="w-fit rounded-md bg-green-200 px-2 py-1 text-gray-900"
                >
                  Login
                </div>
                <div className="w-fit rounded-md bg-green-200 px-2 py-1 text-gray-900">
                  Register
                </div>
              </div>
            </div>
            <li
              className="h-11 bg-sky-500 text-xl"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Home
            </li>
            <li
              className="h-11 bg-sky-500 text-xl"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Dashboard
            </li>
            <li
              className="h-11 bg-sky-500 text-xl"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Generate
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
