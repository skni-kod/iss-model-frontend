import { motion } from "framer-motion";
import { heroContainerVariants } from "./animations";
import { HeroContent, HeroVisualization } from "./herosection/index";
import React from "react";

function HeroSection(): React.ReactElement {
  return (
    <div className="relative min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 lg:flex lg:items-center"
        initial="hidden"
        animate="visible"
        variants={heroContainerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 lg:items-center w-full">
          {/* Left side - Content */}
          <div className="order-1">
            <HeroContent />
          </div>

          {/* Right side - Visualization */}
          <div className="order-2 mt-8 lg:mt-0 lg:justify-self-end w-full">
            <HeroVisualization />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default HeroSection;
