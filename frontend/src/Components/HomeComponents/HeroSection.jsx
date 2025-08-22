import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const resetAnimation = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsAnimating(true);
    }, 100);
  };

  return (
    <div className="relative w-full h-[80vh] bg-gradient-to-t from-[#1E293B] to-[#22C55E] overflow-hidden rounded-4xl">
      {/* Background elements that spread out */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Main service cards/elements */}
        <div
          className={`absolute transition-all duration-2000 ease-out ${
            isAnimating
              ? "transform translate-x-[-250px] md:translate-x-[-475px] translate-y-[-150px] md:translate-y-[-150px] scale-100 opacity-100"
              : "transform translate-x-0 translate-y-0 scale-0 opacity-0"
          }`}
        >
          <div className="w-20 h-20 md:w-50 md:h-50 rounded-full bg-gradient-to-b from-purple-500 to-purple-700 shadow-2xl transform rotate-12 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop&crop=center"
              alt="Branding"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-white font-bold text-center">
                <div className="text-2xl ">BRANDING</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute transition-all duration-2000 ease-out ${
            isAnimating
              ? "transform translate-x-[280px] md:translate-x-[400px] translate-y-[-100px] md:translate-y-[-150px] scale-100 opacity-100"
              : "transform translate-x-0 translate-y-0 scale-0 opacity-0"
          }`}
        >
          <div className="w-20 h-20 md:w-50 md:h-50 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 shadow-2xl transform -rotate-12 overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1547658719-da2b51169166?w=200&h=200&fit=crop&crop=center"
              alt="Web Development"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-white font-bold text-center">
                <div className="text-2xl">WEB DEV</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute transition-all duration-2000 ease-out ${
            isAnimating
              ? "transform translate-x-[-220px] md:translate-x-[-280px] translate-y-[180px] md:translate-y-[80px] scale-100 opacity-100"
              : "transform translate-x-0 translate-y-0 scale-0 opacity-0"
          }`}
        >
          <div className="w-20 h-20 md:w-50 md:h-50 rounded-full bg-gradient-to-b from-teal-500 to-teal-700 shadow-2xl transform rotate-6 overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=200&h=200&fit=crop&crop=center"
              alt="Graphics Design"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-white font-bold text-center">
                <div className="text-2xl">GRAPHICS</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute transition-all duration-2000 ease-out ${
            isAnimating
              ? "transform translate-x-[240px] md:translate-x-[250px] translate-y-[160px] md:translate-y-[150px] scale-100 opacity-100"
              : "transform translate-x-0 translate-y-0 scale-0 opacity-0"
          }`}
        >
          <div className="w-20 h-20 md:w-50 md:h-50 bg-gradient-to-b from-indigo-500 to-indigo-700 rounded-full shadow-2xl transform -rotate-8 overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&h=200&fit=crop&crop=center"
              alt="Motion Graphics"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-white font-bold text-center flex flex-col items-center justify-center h-full">
                <div className="text-2xl">MOTION</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute transition-all duration-2000 ease-out ${
            isAnimating
              ? "transform translate-x-[0px] translate-y-[-200px] md:translate-y-[-160px] scale-100 opacity-100"
              : "transform translate-x-0 translate-y-0 scale-0 opacity-0"
          }`}
        >
          <div className="w-20 h-20 md:w-50 md:h-50 rounded-full bg-gradient-to-b from-pink-500 to-pink-700 shadow-2xl transform rotate-3 overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop&crop=center"
              alt="Marketing"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-white font-bold text-center">
                <div className="text-2xl">MARKETING</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements with enhanced timing */}
        <div
          className={`absolute transition-all duration-2500 ease-out ${
            isAnimating
              ? "transform translate-x-[-300px] md:translate-x-[-500px] translate-y-[-220px] md:translate-y-[-350px] scale-100 opacity-80"
              : "transform translate-x-0 translate-y-0 scale-0 opacity-0"
          }`}
        >
          <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-300 rounded-full blur-sm animate-pulse"></div>
        </div>

        <div
          className={`absolute transition-all duration-2500 ease-out delay-100 ${
            isAnimating
              ? "transform translate-x-[320px] md:translate-x-[520px] translate-y-[-200px] md:translate-y-[-320px] scale-100 opacity-60"
              : "transform translate-x-0 translate-y-0 scale-0 opacity-0"
          }`}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-300 rounded-full blur-sm animate-pulse"></div>
        </div>

        <div
          className={`absolute transition-all duration-2500 ease-out delay-200 ${
            isAnimating
              ? "transform translate-x-[-290px] md:translate-x-[-480px] translate-y-[240px] md:translate-y-[380px] scale-100 opacity-70"
              : "transform translate-x-0 translate-y-0 scale-0 opacity-0"
          }`}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-300 rounded-full blur-sm animate-pulse"></div>
        </div>

        <div
          className={`absolute transition-all duration-2500 ease-out delay-300 ${
            isAnimating
              ? "transform translate-x-[310px] md:translate-x-[500px] translate-y-[230px] md:translate-y-[360px] scale-100 opacity-50"
              : "transform translate-x-0 translate-y-0 scale-0 opacity-0"
          }`}
        >
          <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-300 rounded-full blur-sm animate-pulse"></div>
        </div>

        {/* Additional spread elements with staggered delays */}
        <div
          className={`absolute transition-all duration-2300 ease-out delay-150 ${
            isAnimating
              ? "transform translate-x-[0px] translate-y-[-250px] md:translate-y-[-400px] scale-100 opacity-60"
              : "transform translate-x-0 translate-y-0 scale-0 opacity-0"
          }`}
        >
          <div className="w-14 h-14 md:w-18 md:h-18 bg-yellow-300 rounded-full blur-sm animate-pulse"></div>
        </div>

        <div
          className={`absolute transition-all duration-2400 ease-out delay-250 ${
            isAnimating
              ? "transform translate-x-[0px] translate-y-[250px] md:translate-y-[400px] scale-100 opacity-65"
              : "transform translate-x-0 translate-y-0 scale-0 opacity-0"
          }`}
        >
          <div className="w-12 h-12 md:w-16 md:h-16 bg-green-300 rounded-full blur-sm animate-pulse"></div>
        </div>

        <div
          className={`absolute transition-all duration-2600 ease-out delay-350 ${
            isAnimating
              ? "transform translate-x-[-380px] md:translate-x-[-600px] translate-y-[0px] scale-100 opacity-55"
              : "transform translate-x-0 translate-y-0 scale-0 opacity-0"
          }`}
        >
          <div className="w-16 h-16 md:w-22 md:h-22 bg-red-300 rounded-full blur-sm animate-pulse"></div>
        </div>

        <div
          className={`absolute transition-all duration-2700 ease-out delay-400 ${
            isAnimating
              ? "transform translate-x-[380px] md:translate-x-[600px] translate-y-[0px] scale-100 opacity-45"
              : "transform translate-x-0 translate-y-0 scale-0 opacity-0"
          }`}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-cyan-300 rounded-full blur-sm animate-pulse"></div>
        </div>
      </div>

      <div className="relative h-full flex items-end justify-between px-6 md:px-12 pb-20 z-30">
        <div>
          <div className="uppercase logo flex flex-wrap justify-start -gap-2 z-20 text-white text-3xl md:text-5xl font-black leading-tight transition-all">
            {["I", "C", "O", "N", "I", "Q"].map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-1000 ease-out ${
                  isAnimating
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-20 scale-50"
                }`}
                style={{
                  transitionDelay: `${800 + index * 100}ms`,
                  textShadow: "0 4px 12px rgba(0,0,0,0.25)",
                }}
              >
                {letter}
              </span>
            ))}
            <span className="mx-2 md:mx-4"></span>
            {["S", "O", "L", "U", "T", "I", "O", "N", "S"].map(
              (letter, index) => (
                <span
                  key={index + 6}
                  className={`inline-block transition-all duration-1000 ease-out ${
                    isAnimating
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-20 scale-50"
                  }`}
                  style={{
                    transitionDelay: `${1400 + index * 100}ms`,
                    textShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  }}
                >
                  {letter}
                </span>
              )
            )}
          </div>
          <div className="max-w-2xl text-white text-lg md:text-lg font-extralight">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit et
            ipsa tempore magni natus perspiciatis, dolorum eveniet neque
            aliquid.
          </div>
        </div>
        <div className="flex items-center">
          <button className="px-6 py-2 bg-white rounded-full hover:scale-105 transition-transform">
            <div className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-[#4b0082] to-[#54A6F9] text-transparent bg-clip-text">
              Hire Us Now!
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
