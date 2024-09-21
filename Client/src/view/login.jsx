import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";
import NavBar from "../partials/Navbar";
import { motion } from "framer-motion";
import { loginForm } from "../forms/loginForm.mjs";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [reserror, setReserror] = useState(true);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = await loginForm(username, password);
    if (data.status == 200) {
      setReserror(false);
      setTimeout(() => {
        setMessage(data.msg);
      }, 500);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      setTimeout(() => {
        setMessage(data.msg);
      }, 300);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <div className="flex h-screen flex-col bg-amber-200">
        <NavBar auth={true}></NavBar>
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
            Login
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
            <CiUser></CiUser>
            <input
              type="text"
              disabled={loading}
              className="text-md h-8 bg-transparent pl-2 text-black outline-none placeholder:text-gray-500"
              value={username}
              placeholder="Usernam"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div
            className={`mx-auto mb-5 flex h-10 w-56 items-center justify-center rounded-sm border border-gray-400 bg-gray-300 shadow-sm transition-all duration-150 ${loading ? `black` : `transparent`} `}
          >
            <RiLockPasswordFill></RiLockPasswordFill>
            <input
              autoComplete="on"
              type="password"
              disabled={loading}
              className="text-md h-8 bg-transparent pl-2 text-black outline-none placeholder:text-gray-500"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>

          <div className="mx-auto flex w-[80%] justify-between">
            <button
              type="submit"
              disabled={loading}
              className="flex h-8 w-20 flex-wrap content-center justify-center rounded-md bg-sky-700 text-white transition-all duration-150 disabled:bg-sky-900"
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <a
              href="/register"
              className="font-semibold text-blue-500 underline"
            >
              Sign up
            </a>
          </div>
        </motion.form>
      </div>
    </>
  );
}

export default Login;
