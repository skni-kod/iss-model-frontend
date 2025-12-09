import { motion } from "framer-motion";
import { heroItemVariants } from "../animations";

function HeroVisualization() {
  return (
    <motion.div
      className="relative max-w-md mx-auto lg:max-w-none"
      variants={heroItemVariants}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <div className="relative">
        {/* Home page image */}
        <img 
          src="/src/images/home-page-photo.png" 
          alt="ISS - Międzynarodowa Stacja Kosmiczna"
          className="aspect-square object-cover bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
        />

        {/* Decorative elements */}
        <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full opacity-20"></div>
        <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-gray-600 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 -left-4 sm:-left-8 w-3 h-3 sm:w-4 sm:h-4 bg-gray-500 rounded-full opacity-30"></div>
      </div>
    </motion.div>
  );
}

export default HeroVisualization;
