import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const avatarData = [
  {
    id: 1,
    src: "Uploads/ae.png",
  },
  {
    id: 2,
    src: "Uploads/react.png",
  },
  {
    id: 3,
    src: "Uploads/digi.png",
  },
  {
    id: 4,
    src: "Uploads/ollustrator.png",
  },
  {
    id: 5,
    src: "Uploads/photoshop.png",
  },
  {
    id: 6,
    src: "Uploads/premier.png",
  },
  {
    id: 7,
    src: "Uploads/vs.jpg",
  },
];

const OrbitingAvatars = ({ className = "" }) => {
  const totalAvatars = avatarData.length;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [initialAnimationDone, setInitialAnimationDone] = useState(false);
  const avatarAnimatedRef = useRef({});

  const getCircleRadius = () =>
    typeof window !== "undefined"
      ? window.innerWidth < 768
        ? 120
        : window.innerWidth < 1024
        ? 160
        : 200
      : 200;

  const getAvatarSize = () =>
    typeof window !== "undefined"
      ? window.innerWidth < 768
        ? 50
        : window.innerWidth < 1024
        ? 70
        : 90
      : 90;

  const [circleRadius, setCircleRadius] = useState(getCircleRadius());
  const [avatarSize, setAvatarSize] = useState(getAvatarSize());

  useEffect(() => {
    const resizeHandler = () => {
      setCircleRadius(getCircleRadius());
      setAvatarSize(getAvatarSize());
    };

    const mouseHandler = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
      });
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("mousemove", mouseHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("mousemove", mouseHandler);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialAnimationDone(true);
    }, 2000 + totalAvatars * 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Central Logo */}
        <motion.div
          className="w-18 h-18 md:w-25 md:h-25 border-2 border-white rounded-full overflow-hidden relative z-20 bg-white flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          whileHover={{ scale: 1.1 }}
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${
              mousePosition.y * 10
            }px)`,
          }}
        >
          <div className="text-lg md:text-xl lg:text-2xl font-bold text-purple-600">
            <img src="Uploads/logo_iconiq_final.png" alt="" />
          </div>
        </motion.div>

        {/* Orbit container */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            width: circleRadius * 2,
            height: circleRadius * 2,
          }}
        >
          <div
            className="absolute border border-white/20 rounded-full"
            style={{
              width: circleRadius * 2,
              height: circleRadius * 2,
              top: 0,
              left: 0,
            }}
          />

          <AnimatePresence>
            {avatarData.map((avatar, index) => {
              const angle = (index * 360) / totalAvatars;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * circleRadius;
              const y = Math.sin(rad) * circleRadius;

              const animatedBefore = avatarAnimatedRef.current[avatar.id];

              if (!animatedBefore && initialAnimationDone) {
                avatarAnimatedRef.current[avatar.id] = true;
              }

              return (
                <motion.div
                  key={avatar.id}
                  className="absolute rounded-full overflow-hidden cursor-pointer border-2 border-white/20 hover:border-purple-400 transition-all duration-300"
                  style={{
                    width: `${avatarSize}px`,
                    height: `${avatarSize}px`,
                    left: x + circleRadius - avatarSize / 2,
                    top: y + circleRadius - avatarSize / 2,
                    transform: `translate(${
                      mousePosition.x * (index + 1) * 2
                    }px, ${mousePosition.y * (index + 1) * 2}px)`,
                  }}
                  initial={
                    !animatedBefore ? { opacity: 0, scale: 0 } : undefined
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: !animatedBefore ? 1 + index * 0.1 : 0,
                  }}
                  whileHover={{
                    scale: 1.2,
                    zIndex: 30,
                    boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
                  }}
                >
                  <motion.div
                    className="w-full h-full"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <img
                      src={avatar.src}
                      alt={`Avatar ${avatar.id}`}
                      className="w-full h-full object-cover bg-white"
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default OrbitingAvatars;
