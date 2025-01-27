import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SpinLoad from "./icons/spindLoader";
import { useNavigate } from "react-router-dom";
export const LoadingScreen = ({ isLogged }) => {
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      // console.log("TimeOut Cleared");
    }
    if (isLogged == true) {
      setLoading(false);
      return;
    }
    timerRef.current = setTimeout(() => {
      if (isLogged == null) window.location.href = "/";
    }, 3000);
    // console.log("a Timer hasBeen Aded:", timerRef.current);
  }, [isLogged]);
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          animate={{ opacity: 200 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute left-0 top-0 z-[100] flex min-h-svh w-full items-center justify-center bg-amber-100`}
        >
          <SpinLoad></SpinLoad>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
