import { useMemo } from "react";
import { motion } from "framer-motion";

interface StarFieldProps {
  density?: "low" | "medium" | "high";
  opacity?: number;
  animated?: boolean;
  showFloatingElements?: boolean;
  className?: string;
}

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  color: string;
  animation: "pulse" | "ping";
  opacity: number;
  delay?: number;
}

function StarField({
  density = "medium",
  opacity = 0.4,
  animated = true,
  showFloatingElements = true,
  className = "",
}: StarFieldProps) {
  // Generate stars based on density
  const getStarsCount = () => {
    switch (density) {
      case "low":
        return 12;
      case "medium":
        return 16;
      case "high":
        return 24;
      default:
        return 16;
    }
  };

  // Colors palette for stars
  const starColors = [
    "bg-white",
    "bg-blue-200",
    "bg-cyan-300",
    "bg-purple-200",
    "bg-cyan-200",
    "bg-blue-300",
    "bg-purple-300",
  ];

  // Generate random stars (memoized to prevent re-generation on each render)
  const stars = useMemo(() => {
    const generateStars = (): Star[] => {
      const starsCount = getStarsCount();
      const stars: Star[] = [];

      for (let i = 0; i < starsCount; i++) {
        stars.push({
          id: i,
          top: `${Math.random() * 90 + 5}%`,
          left: `${Math.random() * 90 + 5}%`,
          size: Math.random() > 0.7 ? 1.5 : Math.random() > 0.4 ? 1 : 0.5,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          animation: Math.random() > 0.5 ? "pulse" : "ping",
          opacity: Math.random() * 0.4 + 0.5,
          delay: Math.random() > 0.5 ? Math.random() * 2 : 0,
        });
      }

      return stars;
    };

    return generateStars();
  }, [density]); // Re-generate only when density changes

  // Floating elements data (memoized for stable positions)
  const floatingElements = useMemo(() => {
    const colors = [
      "bg-blue-400",
      "bg-cyan-300",
      "bg-purple-400",
      "bg-white",
      "bg-cyan-400",
    ];
    const shadows = [
      "shadow-blue-400/50",
      "shadow-cyan-300/60",
      "shadow-purple-400/50",
      "shadow-white/70",
      "shadow-cyan-400/60",
    ];

    return Array.from({ length: 5 }, (_, index) => {
      const isTopBottom = Math.random() > 0.5;
      const isLeftRight = Math.random() > 0.5;

      return {
        ...(isTopBottom
          ? { top: `${Math.random() * 40 + 20}px` }
          : { bottom: `${Math.random() * 40 + 80}px` }),
        ...(isLeftRight
          ? { left: `${Math.random() * 80 + 40}px` }
          : { right: `${Math.random() * 80 + 40}px` }),
        size: Math.random() > 0.6 ? 2 : Math.random() > 0.3 ? 1.5 : 1,
        color: colors[index % colors.length],
        shadow: shadows[index % shadows.length],
      };
    });
  }, []); // Generate only once

  // Nebula positions (memoized for stable positions)
  const nebulaPositions = useMemo(
    () => [
      {
        top: `${Math.random() * 30}%`,
        left: `${Math.random() * 30}%`,
        size: "w-96 h-96",
        color: "bg-blue-500/5",
        delay: "0s",
      },
      {
        bottom: `${Math.random() * 30}%`,
        right: `${Math.random() * 30}%`,
        size: "w-80 h-80",
        color: "bg-purple-500/5",
        delay: "1s",
      },
      {
        top: `${Math.random() * 40 + 30}%`,
        left: `${Math.random() * 40 + 30}%`,
        size: "w-64 h-64",
        color: "bg-cyan-500/5",
        delay: "2s",
      },
    ],
    []
  );

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1.5 }}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>

      {/* Nebula Effect */}
      <div className="absolute inset-0">
        {nebulaPositions.map((nebula, index) => (
          <div
            key={index}
            className={`absolute ${nebula.size} ${nebula.color} rounded-full blur-3xl animate-pulse`}
            style={{
              ...nebula,
              animationDelay: nebula.delay,
            }}
          />
        ))}
      </div>

      {/* Dynamic Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute ${star.color} rounded-full ${
              animated ? `animate-${star.animation}` : ""
            }`}
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size * 4}px`,
              height: `${star.size * 4}px`,
              opacity: star.opacity,
              animationDelay: star.delay ? `${star.delay}s` : "0s",
            }}
          />
        ))}
      </div>

      {/* Floating Elements - Larger celestial bodies */}
      {showFloatingElements && (
        <div className="absolute inset-0">
          {floatingElements.map((element, index) => (
            <div
              key={index}
              className={`absolute ${element.color} rounded-full ${
                animated
                  ? index % 2 === 0
                    ? "animate-pulse"
                    : "animate-ping"
                  : ""
              } shadow-lg ${element.shadow}`}
              style={{
                ...element,
                width: `${element.size * 8}px`,
                height: `${element.size * 8}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Shooting Star Effect (rare) */}
      {animated && Math.random() > 0.7 && (
        <div className="absolute top-1/4 left-0 w-1 h-0.5 bg-white rounded-full opacity-80 animate-ping">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent blur-sm"></div>
        </div>
      )}
    </motion.div>
  );
}

export default StarField;
