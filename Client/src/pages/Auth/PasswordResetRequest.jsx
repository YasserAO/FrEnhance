import { useState } from "react";
import { motion } from "framer-motion";
import { MdAlternateEmail } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { passwordRequest } from "../../forms/passwordReset/passwordRequestForm.mjs";
export const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [reserror, setReserror] = useState(true);
  const [loading, setLoading] = useState(false);

  //   Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const resetRequest = await passwordRequest(email);
    if (resetRequest.status == 200) setReserror(false);
    else setReserror(true);
    setMessage(resetRequest.msg);
    setLoading(false);
  };

  return (
    <div className="flex h-screen flex-col bg-amber-200">
      <motion.form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        initial={{
          opacity: 0,
          y: 10,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.1,
          },
        }}
        className="mx-auto mt-40 flex w-full max-w-80 flex-col rounded-md bg-white p-4 shadow-lg"
      >
        <h1 className="mx-auto mb-3 w-fit text-2xl font-bold text-slate-800">
          Password Reset
        </h1>
        <p
          className={`relative flex flex-wrap content-center rounded-sm bg-slate-300 pl-2 transition-all duration-150 ${reserror ? `text-red-500` : `text-green-700`} mb-2 overflow-hidden ${message.length == 0 ? `max-h-0 min-h-0` : `max-h-10 min-h-10`} `}
        >
          <button
            onClick={() => {
              setMessage("");
            }}
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 font-semibold"
          >
            x
          </button>
          {message}
        </p>
        <div
          className={`mx-auto mb-2 flex h-10 w-56 items-center justify-center rounded-sm border border-gray-400 bg-gray-300 shadow-sm transition-all duration-150 ${loading ? `black` : `transparent`} `}
        >
          <MdAlternateEmail />
          <input
            type="email"
            disabled={loading}
            className="text-md h-8 bg-transparent pl-2 text-black outline-none placeholder:text-gray-500"
            value={email}
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mx-auto flex w-[80%] justify-between">
          <button
            type="submit"
            disabled={loading}
            className="flex h-8 w-20 flex-wrap content-center justify-center rounded-md bg-sky-700 text-white transition-all duration-150 disabled:bg-sky-900"
          >
            {loading ? "Loading..." : "Send"}
          </button>
          {!loading && (
            <NavLink
              to="/auth/login"
              className="font-semibold text-blue-500 underline"
            >
              Cancel
            </NavLink>
          )}
        </div>
      </motion.form>
    </div>
  );
};
