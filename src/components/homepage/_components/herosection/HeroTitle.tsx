import { motion } from "framer-motion";
import { heroTitleVariants, heroItemVariants } from "../animations";

function HeroTitle() {
  return (
    <motion.div className="space-y-8" variants={heroItemVariants}>
      {/* Main Heading */}
      <motion.div className="space-y-6" variants={heroTitleVariants}>
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="block text-white">Międzynarodowa</span>
          <span className="block text-white">Stacja Kosmiczna</span>
          <span className="block text-xl sm:text-2xl lg:text-3xl font-normal text-gray-400 mt-4">
            Monitorowanie w czasie rzeczywistym
          </span>
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}

export default HeroTitle;
