import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import SpinLoad from "../../partials/icons/spindLoader";
import { useNavigate, useParams } from "react-router-dom";
import { passwordCheck } from "../../forms/passwordReset/passwordCheckFrom.mjs";
import { RiLockPasswordFill } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { motion } from "framer-motion";
import { passwordReset } from "../../forms/passwordReset/passwordResetForm.mjs";

export const URLPasswordReset = () => {
  // Validation Function

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [reserror, setReserror] = useState(true);
  const timeOutRef = useRef();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading == false) {
      setTimeout(() => {
        setSpinner(false);
      }, 300);
    }
  }, [loading]);
  useEffect(() => {
    const validateToken = (token) => {
      const hexRegex = /^[a-f0-9]{64}$/i;

      if (!hexRegex.test(token) || token.length !== 64) {
        return false;
      }

      return true;
    };

    const validation = validateToken(id);
    if (validation == false) navigate("/NotFound");

    const postVerification = async () => {
      const response = await passwordCheck(id);
      if (!response) {
        console.log("Failed");
      }
      if (response.status !== 200) {
        navigate("/NotFound");
      }
      if (response) {
        setLoading(false);
      }
    };
    postVerification();
  }, []);

  // ErrorMessage Clearing
  useEffect(() => {
    if (reserror && message.length !== 0)
      timeOutRef.current = setTimeout(() => {
        setMessage("");
      }, 3000);
  }, [message]);

  // Handle Submits
  const handleSubmit = async (e) => {
    setMessage("");
    e.preventDefault();
    setLoading(true);

    clearTimeout(timeOutRef.current);

    if (!(password1 === password2)) {
      setTimeout(() => {
        setLoading(false);
        setMessage("Passwords Don't match");
      }, 1000);
      return;
    }
    const resetPassword = await passwordReset(id, password1);
    if (resetPassword.status == 200) {
      setTimeout(() => {
        setReserror(false);
        setMessage(resetPassword.msg);
      }, 2000);
      setTimeout(() => {
        window.location.href = "/";
      }, 4000);
    } else {
      setTimeout(() => {
        setLoading(false);
        if (resetPassword.content) {
          setMessage(resetPassword.content[0].msg);
        }
      }, 1000);
      return;
    }
  };

  return (
    <div className="flex h-screen flex-col bg-amber-200">
      {spinner ? (
        <div className="mx-auto w-fit items-center py-20">{SpinLoad()}</div>
      ) : (
        <>
          <div>
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
                <RiLockPasswordFill></RiLockPasswordFill>
                <input
                  type="password"
                  disabled={loading}
                  className="text-md h-8 bg-transparent pl-2 text-black outline-none placeholder:text-gray-500"
                  value={password1}
                  placeholder="Password"
                  onChange={(e) => setPassword1(e.target.value)}
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
                  value={password2}
                  placeholder="Confirmation"
                  onChange={(e) => {
                    setPassword2(e.target.value);
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
                  {loading ? "Loading..." : "Confirme"}
                </button>
                {!loading && (
                  <NavLink
                    to="/"
                    className="font-semibold text-blue-500 underline"
                  >
                    Cancel
                  </NavLink>
                )}
              </div>
            </motion.form>
          </div>
        </>
      )}
    </div>
  );
};
