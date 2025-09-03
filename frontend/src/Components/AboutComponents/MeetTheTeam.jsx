import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import teamData from "./TeamData";

export default function MeetTheTeam() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Get visible cards (main + 3 small)
  const getVisibleCards = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      const index = (activeIndex + i) % teamData.length;
      visible.push({
        ...teamData[index],
        originalIndex: index,
        position: i, // 0 = main, 1-3 = small cards
      });
    }
    return visible;
  };

  const nextSlide = () =>
    setActiveIndex((prev) => (prev + 1) % teamData.length);

  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 + teamData.length) % teamData.length);

  const handleCardClick = (clickedPosition) => {
    if (clickedPosition === 0) return;
    const newActiveIndex = (activeIndex + clickedPosition) % teamData.length;
    setActiveIndex(newActiveIndex);
  };

  const visibleCards = getVisibleCards();
  const mainCard = visibleCards[0];
  const smallCards = visibleCards.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mb-12 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-light text-gray-900 mb-6"
          >
            Meet Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Our success stems from the diverse talents and passionate dedication
            of each team member. Together, we create extraordinary experiences.
          </motion.p>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevSlide}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">PREV</span>
            </button>

            <button
              onClick={nextSlide}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <span className="text-sm font-medium">NEXT</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Main Card with Smooth Crossfade */}
            <div className="relative w-full lg:w-96 h-96 lg:h-[500px] flex-shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mainCard.id}
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -20 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="absolute inset-0 rounded-xl overflow-hidden shadow-lg"
                >
                  <img
                    src={mainCard.img}
                    alt={mainCard.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description Section */}
            <div className="flex-1 lg:pt-8 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mainCard.id + "-text"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <h2 className="text-3xl font-light text-gray-900 mb-2">
                    {mainCard.name}
                  </h2>
                  <h3 className="text-lg text-gray-600 mb-8">
                    {mainCard.role}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-700 italic mb-12">
                    {mainCard.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Small Cards with Staggered Animation */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 },
                  },
                }}
                className="mt-auto"
              >
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {smallCards.map((member) => (
                    <motion.div
                      key={member.id}
                      variants={{
                        hidden: { opacity: 0, y: 20, scale: 0.95 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: { duration: 0.5, ease: "easeOut" },
                        },
                      }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleCardClick(member.position)}
                      className="cursor-pointer flex-shrink-0"
                    >
                      <div className="w-20 h-24 relative overflow-hidden rounded-lg shadow-md">
                        <img
                          src={member.img}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <div className="mt-2 text-center">
                        <h5 className="font-semibold text-gray-900 text-xs">
                          {member.name}
                        </h5>
                        <p className="text-xs text-gray-600">{member.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
