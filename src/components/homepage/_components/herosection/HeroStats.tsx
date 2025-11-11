import { motion } from "framer-motion";
import { heroItemVariants, heroStatsVariants } from "../animations";

function HeroStats() {
  const stats = [
    { value: "408 km", label: "Wysokość orbity" },
    { value: "28,000", label: "km/h prędkość" },
    { value: "90 min", label: "Okres orbitalny" },
  ];

  return (
    <motion.div
      className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 py-4 md:py-6 lg:py-8 mt-4 md:mt-6"
      variants={heroItemVariants}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-left border-l-2 border-gray-600 pl-2 sm:pl-3 md:pl-4"
          variants={heroStatsVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            {stat.value}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default HeroStats;
