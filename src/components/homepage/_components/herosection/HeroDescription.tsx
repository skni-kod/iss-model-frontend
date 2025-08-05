import { motion } from "framer-motion";
import { heroItemVariants } from "../animations";

function HeroDescription() {
  return (
    <motion.p
      className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl"
      variants={heroItemVariants}
    >
      Profesjonalne narzędzie do śledzenia położenia ISS na orbicie,
      monitorowania załogi oraz analizy danych telemetrycznych. Precyzyjne
      informacje dla entuzjastów i profesjonalistów.
    </motion.p>
  );
}

export default HeroDescription;
