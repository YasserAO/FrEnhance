import { motion } from "framer-motion";

// const location = useLocation();
const location = window.location.href;
export const Framer = ({ children }) => {
  return (
    <motion.div
      key={window.location.href}
      className="flex flex-1 flex-col overflow-hidden bg-mainBody"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
};
