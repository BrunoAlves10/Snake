import { motion } from "framer-motion";

export const AnimatedEmoji = ({ children }: {"children": React.ReactNode}) => {
  return (
    <motion.span
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
};