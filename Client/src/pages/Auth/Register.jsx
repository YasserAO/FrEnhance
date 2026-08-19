import { useEffect, useState, useRef } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { CiUser } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
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

  const urlGoogle = (import.meta.env.VITE_API_URL || "") + "/api/user/auth/google";

  // Password Validation
  const [validPassword, setValidPassword] = useState(false);
  const passwordRef = useRef();

  useEffect(() => {
    if (password.length >= 12) {
      return setValidPassword(true);
    }
    setValidPassword(false);
  }, [password]);

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
        (import.meta.env.VITE_API_URL || "") + "/api/user/reg",
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
      if (res.status !== 200) setMessage(res.msg);

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
      <div className="flex min-h-[calc(100vh-60px)] flex-1 flex-col items-center justify-center bg-slate-900 px-4 py-12">
        <motion.form
          initial={{
            opacity: 0,
            y: 16,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.18,
            },
          }}
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-sm flex-col rounded-2xl border border-slate-700/60 bg-slate-800 p-6 shadow-2xl backdrop-blur-sm sm:p-8"
        >
          <h1 className="mx-auto mb-4 text-center text-2xl font-bold tracking-tight text-white">
            Create an Account
          </h1>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative mb-4 flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium ${
                resTypeErr
                  ? "border border-red-500/30 bg-red-500/10 text-red-400"
                  : "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              }`}
            >
              <span>{message}</span>
              <button
                onClick={() => setMessage("")}
                type="button"
                className="ml-2 font-bold opacity-70 hover:opacity-100"
              >
                ✕
              </button>
            </motion.div>
          )}

          {/* Names */}
          <div className="mb-3 flex gap-2">
            {/* First Name */}
            <div className="flex h-11 w-1/2 items-center rounded-lg border border-slate-700 bg-slate-900/80 px-2.5 transition-all focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
              <input
                autoComplete="given-name"
                disabled={loading}
                value={firstName}
                className="h-full w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none"
                type="text"
                required
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div className="flex h-11 w-1/2 items-center rounded-lg border border-slate-700 bg-slate-900/80 px-2.5 transition-all focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
              <input
                autoComplete="family-name"
                disabled={loading}
                value={lastName}
                className="h-full w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none"
                type="text"
                required
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* User Name */}
          <div className="mb-3 flex h-11 w-full items-center rounded-lg border border-slate-700 bg-slate-900/80 px-3 transition-all focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
            <CiUser className="text-lg text-slate-400" />
            <input
              autoComplete="username"
              disabled={loading}
              value={username}
              className="h-full w-full bg-transparent pl-2.5 text-sm text-white placeholder-slate-500 outline-none"
              type="text"
              required
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-3 flex h-11 w-full items-center rounded-lg border border-slate-700 bg-slate-900/80 px-3 transition-all focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
            <MdAlternateEmail className="text-lg text-slate-400" />
            <input
              autoComplete="email"
              value={email}
              disabled={loading}
              className="h-full w-full bg-transparent pl-2.5 text-sm text-white placeholder-slate-500 outline-none"
              type="email"
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div
            className={`mb-4 flex h-11 w-full items-center rounded-lg border bg-slate-900/80 px-3 transition-all ${
              document.activeElement === passwordRef.current
                ? validPassword
                  ? "border-emerald-500 ring-1 ring-emerald-500"
                  : "border-amber-500 ring-1 ring-amber-500"
                : "border-slate-700 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500"
            }`}
          >
            <RiLockPasswordFill className="text-lg text-slate-400" />
            <input
              autoComplete="new-password"
              ref={passwordRef}
              value={password}
              disabled={loading}
              className="h-full w-full bg-transparent pl-2.5 text-sm text-white placeholder-slate-500 outline-none"
              type="password"
              required
              placeholder="Password (12+ characters)"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <a
              href={urlGoogle}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-700/60 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              <FcGoogle size="1.4em" />
              Sign up with Google
            </a>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="flex h-10 w-28 items-center justify-center rounded-lg bg-sky-600 font-semibold text-white shadow-md transition-all hover:bg-sky-500 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
            {!loading && (
              <NavLink
                to="/auth/login"
                className="text-sm font-medium text-sky-400 hover:underline"
              >
                Already registered?
              </NavLink>
            )}
          </div>
        </motion.form>
      </div>
    </>
  );
};
