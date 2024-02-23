import { motion } from "framer-motion";

const pageEffect = {
  initial: {
    opacity: 0,
    x: "-10vw"
  },
  in: {
    opacity: 1,
    x: 0 ,
    transition: {
        type: "spring",
        damping: 12,
      },
  },
  out: {
    opacity: 0,
    x: "10vw"
  }
};

const MotionWrapper = ({ children, ...rest }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      transition={{ duration: 0.5 }}
      variants={pageEffect}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
