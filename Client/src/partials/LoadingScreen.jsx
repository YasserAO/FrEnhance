import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import SpinLoad from "./icons/spindLoader";
export const LoadingScreen = ({ isLogged }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isLogged == true &&
      setTimeout(() => {
        setLoading(false);
      }, 300);
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
