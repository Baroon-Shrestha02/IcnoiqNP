import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";

const tags = [
  { icon: "📝", label: "Writing" },
  { icon: "📸", label: "Photography" },
  { icon: "🏷️", label: "Marketing" },
  { icon: "🍽️", label: "Catering" },
  { icon: "💼", label: "Consulting" },
  { icon: "🎥", label: "Videography" },
  { icon: "🎨", label: "Design" },
  { icon: "💻", label: "Development" },
  { icon: "📦", label: "Contractor" },
  { icon: "🎶", label: "Entertainment" },
  { icon: "🎉", label: "Event Planning" },
  { icon: "🏠", label: "Venue Rentals" },
];

const Pill = ({ icon, label }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm font-medium text-gray-800 whitespace-nowrap">
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </div>
);

export default function ScrollingPills() {
  const containerRef = useRef(null);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 30,
    stiffness: 120,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * 50 * (delta / 1000); // base speed
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden w-full py-12">
      <motion.div
        ref={containerRef}
        className="flex gap-4"
        style={{
          x: useTransform(baseX, (v) => `${v % 1000}px`), // wrapping loop
        }}
      >
        {Array.from({ length: 3 }).flatMap((_, i) =>
          tags.map((tag, index) => <Pill key={`${i}-${index}`} {...tag} />)
        )}
      </motion.div>
    </div>
  );
}
