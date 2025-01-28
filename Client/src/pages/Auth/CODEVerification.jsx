import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { verifyCode } from "../../utils/validation/verificationCodeValidator.mjs";
import { codeVerification } from "../../forms/codeVerificationForm.mjs";
import SpinLoad from "../../partials/icons/spindLoader";
import { AuthContext } from "../../authProvider";
import { useNavigate } from "react-router-dom";
import { sendToken } from "../../forms/sendTokenForm.mjs";
import { cooldownForm } from "../../forms/verificationCooldown.mjs";
import { calculateTimeLeft } from "../../utils/calculateTimerLeft.mjs";
const Verify = () => {
  const { isLogged, userForm } = useContext(AuthContext);
  const timeRef = useRef(null);
  const inputRef = React.useRef([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [reserror, setReserror] = useState(true);
  const [loadingScreen, setLoadingScreen] = useState(true);

  // VerificationCOOLDOWN STATES
  const [sendAgain, setSendAgain] = useState(null);
  const [DisplayTimer, seDisplayTimer] = useState();
  const [timeLeft, setTimeLeft] = useState();

  const TimerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged == false) navigate("/auth/login");
  }, [isLogged]);

  useEffect(() => {
    // console.log("verified is : ", userForm.verified);
    if (userForm.verified === false) {
      setLoadingScreen(false);
    }
    if (timeRef.current) {
      console.log(timeRef.current, "Time Clearing");
      clearTimeout(timeRef.current);
      if (isLogged == false) navigate("/auth/login");
      if (userForm.verified == true) {
        // console.log("User is Verified");
        window.location.href = "/";
      }
      return;
    }

    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    if (userForm.verified == null) {
      timeRef.current = timer;
      // console.log("Timer was set to ", timeRef.current);
    }
  }, [userForm.verified, isLogged]);

  // verification Cooldown

  useEffect(() => {
    const getCooldown = async () => {
      if (TimerRef.current) clearInterval(TimerRef.current);
      const now = new Date();
      const response = await cooldownForm();

      if (response.cooldown == null || now > new Date(response.cooldown))
        return setSendAgain(true);
      console.log(new Date(response.cooldown) - now);
      setTimeLeft(new Date(response.cooldown) - now);

      TimerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1000);
      }, 1000);
    };
    getCooldown();
  }, [sendAgain]);

  useEffect(() => {
    seDisplayTimer(calculateTimeLeft(timeLeft));
  }, [timeLeft]);

  // Input Handlers
  const handleInput = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    e.target.value = value;
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };
  const handleBackspace = (e, index) => {
    if (e.target.value === "" && index > 0 && e.key === "Backspace") {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const splitData = paste.split("");
    splitData.forEach((value, index) => {
      if (inputRef.current[index]) {
        setTimeout(() => {
          inputRef.current[index].value = value;
          inputRef.current[index].focus();
        }, index * 50);
      }
    });
  };

  // Handle Submit
  const handleForm = async (e) => {
    setMessage("");
    e.preventDefault();
    const inputArray = inputRef.current;
    let CODEARRAY = [];
    inputArray.forEach((input, index) => {
      CODEARRAY[index] = input.value;
    });
    const CODE = CODEARRAY.join("");
    if (!verifyCode(CODE)) return;
    setLoading(true);
    const response = await codeVerification(parseInt(CODE));
    if (response.status === 200) {
      setReserror(false);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
    setMessage(response.msg);
    setLoading(false);
  };

  // Send Token Request
  const handleTokenUpdate = async () => {
    const cooldown = await codeVerification();
    const response = await sendToken();
    if (response) setSendAgain(false);
    console.log(response.msg);
  };

  return loadingScreen ? (
    <div className="flex flex-1 flex-col items-center justify-center bg-amber-200 px-3 md:block md:px-[10%] md:pt-20">
      <SpinLoad />
    </div>
  ) : (
    <div className="flex flex-1 flex-col items-center justify-center bg-amber-200 px-3 md:block md:px-[10%] md:pt-20">
      <motion.div
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
        className="mx-auto flex w-fit flex-col rounded-md bg-white px-3 py-5"
      >
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
        <h1 className="mb-3 text-2xl font-bold text-slate-800">
          Email Verification
        </h1>
        <p className="mb-3 text-center text-gray-500">
          Please Check your email for the verificaation Code
        </p>
        <form className="mx-auto" onSubmit={(e) => handleForm(e)}>
          <div
            className="mb-2 flex flex-wrap gap-1"
            onPaste={(e) => handlePaste(e)}
          >
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  disabled={loading}
                  maxLength={1}
                  key={index}
                  className="h-10 w-10 rounded-md border border-gray-400 bg-slate-300 text-center text-xl shadow-inner focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:transition"
                  type="text"
                  ref={(e) => (inputRef.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                />
              ))}
          </div>
          {loading ? (
            <div className="mx-auto mb-3 mt-2 h-8 w-fit">
              <SpinLoad />
            </div>
          ) : (
            <div className="mx-auto mb-3 mt-2 flex items-center justify-center gap-4">
              {sendAgain ? (
                <button
                  onClick={() => {
                    handleTokenUpdate();
                  }}
                  className="rounded-sm bg-emerald-800 px-2 py-1 text-white"
                >
                  Send
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    boxShadow: "inset 0 0 6px 1px  rgb(0,0,0,0.2) ",
                  }}
                  className="select-none rounded-md bg-emerald-50 px-2 py-1"
                >
                  <p className="text-emerald-700">
                    {DisplayTimer.m}:{DisplayTimer.s}
                  </p>
                </motion.div>
              )}
              <button
                className={`disabled:bg-sky-900" flex h-8 flex-wrap content-center justify-center rounded-md bg-gray-600 px-2 text-xl font-semibold text-white transition-all duration-150 active:scale-95`}
              >
                Verify
              </button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
};
export default Verify;
