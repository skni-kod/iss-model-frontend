import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StarField from "./StarField";
import { motion } from "framer-motion";
import {
  heroContainerVariants,
  heroItemVariants,
  heroTitleVariants,
  heroStatsVariants,
  heroButtonVariants,
} from "./animations";

function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <StarField density="high" opacity={0.6} />

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32"
        initial="hidden"
        animate="visible"
        variants={heroContainerVariants}
      >
        <motion.div
          className="text-center space-y-8"
          variants={heroItemVariants}
        >
          {/* Main Heading */}
          <motion.div className="space-y-4" variants={heroTitleVariants}>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Międzynarodowa
              </span>
              <span className="block">Stacja Kosmiczna</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-300 mt-2">
                w czasie rzeczywistym
              </span>
            </motion.h1>
          </motion.div>

          {/* Description */}
          <motion.p
            className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed"
            variants={heroItemVariants}
          >
            Śledź położenie ISS na orbicie, poznaj astronautów na pokładzie i
            zgłębiaj fascynującą wiedzę o eksploracji kosmosu. Wszystko w jednym
            miejscu.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 py-8"
            variants={heroItemVariants}
          >
            <motion.div
              className="text-center"
              variants={heroStatsVariants}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl font-bold text-cyan-400">408 km</div>
              <div className="text-sm text-slate-400">Wysokość orbity</div>
            </motion.div>
            <motion.div
              className="text-center"
              variants={heroStatsVariants}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl font-bold text-blue-400">
                28,000 km/h
              </div>
              <div className="text-sm text-slate-400">Prędkość</div>
            </motion.div>
            <motion.div
              className="text-center"
              variants={heroStatsVariants}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl font-bold text-purple-400">90 min</div>
              <div className="text-sm text-slate-400">Czas obiegu</div>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
            variants={heroItemVariants}
          >
            <motion.div
              variants={heroButtonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                asChild
                className="group relative px-10 py-4 bg-transparent border-2 border-cyan-400/80 text-cyan-400 hover:text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 hover:border-cyan-300"
              >
                <Link
                  to="/telemetry"
                  className="relative z-10 flex items-center gap-3 font-semibold text-base"
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                  Śledź ISS na żywo
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/90 to-blue-500/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-10 rounded-md"></div>
                </Link>
              </Button>
            </motion.div>
            <motion.div
              variants={heroButtonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                asChild
                className="group relative px-10 py-4 bg-gradient-to-r from-slate-700 to-slate-600 text-white border-2 border-slate-500/50 hover:border-slate-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link
                  to="/astronauts"
                  className="relative z-10 flex items-center gap-3 font-semibold text-base"
                >
                  <div className="w-2 h-2 bg-slate-300 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                  Poznaj astronautów
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-md"></div>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroSection;
