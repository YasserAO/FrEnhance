import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignIn from "./Buttons/singIn";
import SignUp from "./Buttons/singUp";
import LogoutButton from "./Buttons/logout";
import LogoAvatar from "./Buttons/LogoAvatar";

const NavBar = ({ isLogged, auth }) => {
  const [UserForm, setUserForm] = useState({
    username: "Krenix",
    user: "Yasser AO",
    email: "email@gm.co",
  });
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigation = auth ? (
    <header className="relative flex h-[60px] w-full flex-wrap content-center justify-between bg-sky-800 sm:px-3 md:px-[10%]">
      <div
        onClick={() => {
          window.location.href = "/";
        }}
        className="h-fit w-fit cursor-pointer select-none rounded-3xl bg-white px-2 py-1 font-semibold"
      >
        FrenchEnhance
      </div>
    </header>
  ) : (
    <header className="relative flex h-[60px] w-full flex-wrap content-center justify-between bg-sky-800 sm:px-3 md:px-[10%]">
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
            window.location.href = "/dashboard";
          }}
        >
          Dashboard
        </li>
        <li
          className="text-md w-fit cursor-pointer select-none rounded-lg px-1 py-1 font-semibold text-white hover:underline hover:underline-offset-4"
          onClick={() => {
            window.location.href = "/generate";
          }}
        >
          Generate
        </li>
      </ul>
      {isLogged ? (
        <div className="hidden gap-3 sm:flex">
          <div className="flex h-fit items-center gap-1">
            <LogoAvatar user={UserForm.user}></LogoAvatar>
            <p className="font-semibold text-white">{UserForm.user}</p>
          </div>
          <LogoutButton></LogoutButton>
        </div>
      ) : (
        <ul className="hidden gap-3 sm:flex">
          <li>
            <SignIn></SignIn>
          </li>
          <li>
            <SignUp></SignUp>
          </li>
        </ul>
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

      {/* Mobile Navigation Menu */}

      <AnimatePresence>
        {toggleMenu && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `100%` }}
            exit={{ width: 0 }}
            className={`b absolute right-0 flex h-screen w-full max-w-[300px] flex-col overflow-hidden bg-slate-800 pt-[60px] sm:hidden`}
          >
            {isLogged ? (
              <div className="flex h-12 items-center justify-between px-10">
                <div className="flex items-center gap-1">
                  <LogoAvatar user={UserForm.user}></LogoAvatar>
                  <p className="text-white">{UserForm.user}</p>
                </div>
                <LogoutButton></LogoutButton>
              </div>
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
                  window.location.href = "/dashboard";
                }}
              >
                Dashboard
              </li>
              <li
                className="cursor-pointer select-none rounded-sm bg-slate-700 py-2 pl-2 hover:bg-slate-900 active:bg-slate-900"
                onClick={() => {
                  window.location.href = "/generate";
                }}
              >
                Generate
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
