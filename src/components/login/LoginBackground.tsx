import { motion } from "framer-motion";
import { useMemo } from "react";

interface Star {
  id: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
}

function FloatingStars() {
  const stars = useMemo<Star[]>(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
    })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: star.left,
            top: star.top,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
}

function OrbitalRings() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10">
      <div className="absolute inset-0 border border-white/20 rounded-full animate-[spin_60s_linear_infinite]" />
      <div className="absolute inset-8 border border-white/15 rounded-full animate-[spin_45s_linear_infinite_reverse]" />
      <div className="absolute inset-16 border border-white/10 rounded-full animate-[spin_30s_linear_infinite]" />
    </div>
  );
}

function GridPattern() {
  return (
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
  );
}

interface LoginBackgroundProps {
  children: React.ReactNode;
}

export function LoginBackground({ children }: LoginBackgroundProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden px-4 py-8">
      <GridPattern />
      <OrbitalRings />
      <FloatingStars />
      {children}
    </div>
  );
}

export default LoginBackground;
