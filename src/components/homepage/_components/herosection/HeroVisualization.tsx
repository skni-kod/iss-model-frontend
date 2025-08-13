import { motion } from "framer-motion";
import { heroItemVariants } from "../animations";

function HeroVisualization() {
  return (
    <motion.div
      className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0"
      variants={heroItemVariants}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <div className="relative"
        
      >
        {/* Main placeholder */}
  <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-lg shadow-xl ring-1 ring-gray-500/40"></div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full opacity-20"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gray-600 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 -left-8 w-4 h-4 bg-gray-500 rounded-full opacity-30"></div>
      </div>
    </motion.div>
  );
}

export default HeroVisualization;
