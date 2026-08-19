import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";
import { NavLink, useNavigate, useSearchParams, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { motion } from "framer-motion";
import { loginForm } from "../../forms/loginForm.mjs";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [reserror, setReserror] = useState(true);
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlGoogle = (import.meta.env.VITE_API_URL || "") + "/api/user/auth/google";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = await loginForm(username, password);
    if (data && data.status == 200) {
      setReserror(false);
      setMessage(data.msg || "Login Successful");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1200);
    } else {
      setMessage(data?.msg || "Invalid username or password");
      setReserror(true);
      setLoading(false);
    }
  };

  // Return LOOP at LOGIN
  const handleBack = () => {
    navigate("/");
  };
  useEffect(() => {
    const source = searchParams.get("source");

    if (source == "dashboard") {
      window.addEventListener("popstate", handleBack);
    }
    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [searchParams]);

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
            Welcome Back
          </h1>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative mb-4 flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium ${
                reserror
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

          <div className="mb-3 flex h-11 w-full items-center rounded-lg border border-slate-700 bg-slate-900/80 px-3 transition-all focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
            <CiUser className="text-lg text-slate-400" />
            <input
              autoComplete="username"
              type="text"
              disabled={loading}
              className="h-full w-full bg-transparent pl-2.5 text-sm text-white placeholder-slate-500 outline-none"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex h-11 w-full items-center rounded-lg border border-slate-700 bg-slate-900/80 px-3 transition-all focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
            <RiLockPasswordFill className="text-lg text-slate-400" />
            <input
              autoComplete="current-password"
              type="password"
              disabled={loading}
              className="h-full w-full bg-transparent pl-2.5 text-sm text-white placeholder-slate-500 outline-none"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <a
              href={urlGoogle}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-700/60 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              <FcGoogle size="1.4em" />
              Continue with Google
            </a>
          </div>

          <div className="mb-5 text-right">
            <Link
              className="text-xs text-sky-400 transition-colors hover:text-sky-300 hover:underline"
              to="/auth/password-reset-request"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="flex h-10 w-28 items-center justify-center rounded-lg bg-sky-600 font-semibold text-white shadow-md transition-all hover:bg-sky-500 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
            {!loading && (
              <NavLink
                to="/auth/register"
                className="text-sm font-medium text-sky-400 hover:underline"
              >
                Create account
              </NavLink>
            )}
          </div>
        </motion.form>
      </div>
    </>
  );
};

