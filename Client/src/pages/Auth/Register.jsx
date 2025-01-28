import { useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { CiUser } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resTypeErr, setResTypeErr] = useState(true);
  const navigate = useNavigate();
  const [responseToggle, setResponseToggle] = useState(false);

  function ClearDisableEntry() {
    if (responseToggle) {
      setEmail("");
      setPassword("");
      setUsername("");
      setLoading(true);
      console.log("Cleared ALl values");
    }
  }
  useEffect(() => {
    ClearDisableEntry();
  }, [responseToggle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const RegRequest = await fetch(
        import.meta.env.VITE_API_URL + "/api/user/reg",
        {
          credentials: "include",
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
          }),
        },
      );

      const res = await RegRequest.json();
      if (res.status !== 200) setMessage(res[0].msg);

      if (res.status == 200) {
        setMessage("Registered Successfully");
        setResTypeErr(false);
        setResponseToggle(true);
        setTimeout(() => {
          window.location.href = "/verify";
        }, 2000);
      } else {
        setResTypeErr(true);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen flex-col bg-amber-200">
        <motion.form
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
          onSubmit={handleSubmit}
          className="mx-auto mt-40 flex w-full max-w-80 flex-col rounded-md bg-white p-4 shadow-lg"
        >
          <h1 className="mx-auto mb-3 w-fit text-2xl font-bold text-slate-800">
            Sign Up
          </h1>
          <p
            className={`relative flex items-center rounded-sm bg-slate-300 pl-2 transition-all duration-150 ${resTypeErr ? `text-red-500` : `text-green-700`} mb-2 overflow-hidden ${message.length == 0 ? `max-h-0 min-h-0` : `max-h-10 min-h-10`} `}
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

          {/* Names */}

          <div className="flex gap-1">
            {/* First Name */}
            <div
              className={`mx-auto mb-2 flex h-10 w-56 items-center justify-center rounded-sm border border-gray-400 bg-gray-300 shadow-sm transition-all duration-150 ${loading ? `black` : `transparent`} `}
            >
              <input
                disabled={loading}
                value={firstName}
                className="text-md h-8 w-full bg-transparent pl-2 text-black outline-none placeholder:text-gray-500"
                type="text"
                required
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div
              className={`mx-auto mb-2 flex h-10 w-56 items-center justify-center rounded-sm border border-gray-400 bg-gray-300 shadow-sm transition-all duration-150 ${loading ? `black` : `transparent`} `}
            >
              <input
                disabled={loading}
                value={lastName}
                className="text-md h-8 w-full bg-transparent pl-2 text-black outline-none placeholder:text-gray-500"
                type="text"
                required
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* User Name */}
          <div
            className={`mx-auto mb-2 flex h-10 w-56 items-center justify-center rounded-sm border border-gray-400 bg-gray-300 shadow-sm transition-all duration-150 ${loading ? `black` : `transparent`} `}
          >
            <CiUser />
            <input
              disabled={loading}
              value={username}
              className="text-md h-8 bg-transparent pl-2 text-black outline-none placeholder:text-gray-500"
              type="text"
              required
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div
            className={`mx-auto mb-2 flex h-10 w-56 items-center justify-center rounded-sm border border-gray-400 bg-gray-300 shadow-sm transition-all duration-150 ${loading ? `black` : `transparent`} `}
          >
            <MdAlternateEmail />
            <input
              value={email}
              disabled={loading}
              className="text-md h-8 bg-transparent pl-2 text-black outline-none placeholder:text-gray-500"
              type="email"
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div
            className={`mx-auto mb-2 flex h-10 w-56 items-center justify-center rounded-sm border border-gray-400 bg-gray-300 shadow-sm transition-all duration-150 ${loading ? `black` : `transparent`} `}
          >
            <RiLockPasswordFill />
            <input
              value={password}
              disabled={loading}
              className="text-md h-8 bg-transparent pl-2 text-black outline-none placeholder:text-gray-500"
              type="password"
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mx-auto flex w-[80%] justify-between">
            <button
              type="submit"
              disabled={loading}
              className="flex h-8 w-20 items-center justify-center rounded-md bg-gray-600 text-white transition-all duration-150 disabled:bg-gray-500"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
            {!loading && (
              <NavLink
                to="/auth/login"
                className="font-semibold text-blue-500 underline"
              >
                Login
              </NavLink>
            )}
          </div>
        </motion.form>
      </div>
    </>
  );
};
