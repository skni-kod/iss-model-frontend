import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { heroItemVariants, heroButtonVariants } from "../animations";

function HeroButtons() {
  const buttons = [
    {
      to: "/telemetry",
      text: "Rozpocznij monitorowanie",
      className:
        "px-8 py-3 bg-white text-black hover:bg-gray-100 font-semibold transition-all duration-300 hover:scale-105 rounded-none",
    },
    {
      to: "/astronauts",
      text: "Informacje o załodze",
      variant: "outline" as const,
      className:
        "px-8 py-3 bg-white text-black hover:bg-gray-100 font-semibold transition-all duration-300 hover:scale-105 rounded-none",
    },
  ];

  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-4 pt-8"
      variants={heroItemVariants}
    >
      {buttons.map((button, index) => (
        <motion.div
          key={index}
          variants={heroButtonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            asChild
            variant={button.variant || "default"}
            className={button.className}
          >
            <Link to={button.to}>{button.text}</Link>
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default HeroButtons;
