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
      className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 py-6 sm:py-8"
      variants={heroItemVariants}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-left border-l-2 border-gray-600 pl-3 sm:pl-4"
          variants={heroStatsVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default HeroStats;
