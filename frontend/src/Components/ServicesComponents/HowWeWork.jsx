import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Palette,
  Zap,
  Settings,
  Rocket,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
const steps = [
  {
    title: "Discovery & Planning",
    description:
      "We start by understanding your goals, target audience, and project requirements through detailed consultation sessions.",
    icon: <Search className="w-6 h-6" />,
    duration: "1-2 weeks",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    tags: ["Research", "Planning", "Strategy"],
  },
  {
    title: "Strategy & Design",
    description:
      "Our team creates a comprehensive strategy and develops initial designs that align with your brand vision.",
    icon: <Palette className="w-6 h-6" />,
    duration: "1-2 weeks",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
    tags: ["Design", "Branding", "UX/UI"],
  },
  {
    title: "Development & Build",
    description:
      "We bring your project to life with clean code, responsive design, and optimized performance.",
    icon: <Zap className="w-6 h-6" />,
    duration: "2-4 weeks",
    image:
      "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?auto=format&fit=crop&w=800&q=80",
    tags: ["Development", "Coding", "Performance"],
  },
  {
    title: "Testing & Refinement",
    description:
      "Rigorous testing ensures everything works perfectly across all devices and platforms.",
    icon: <Settings className="w-6 h-6" />,
    duration: "1-2 weeks",
    image:
      "https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=800&q=80",
    tags: ["Testing", "QA", "Optimization"],
  },
  {
    title: "Launch & Support",
    description:
      "We launch your project and provide ongoing support to ensure continued success and growth.",
    icon: <Rocket className="w-6 h-6" />,
    duration: "Free for half a year",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=80",
    tags: ["Launch", "Support", "Growth"],
  },
];

export default function HowWeWork() {
  const stepRefs = useRef([]);
  const timelineRef = useRef(null);
  const wrapperRef = useRef(null);
  const [progresses, setProgresses] = useState(new Array(steps.length).fill(0));
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  useEffect(() => {
    const updateHeight = () => {
      if (!wrapperRef.current) return;
      const totalHeight = wrapperRef.current.scrollHeight;
      setLineHeight(totalHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const newProgresses = stepRefs.current.map((el) => {
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const start = windowHeight * 0.3;
        const end = rect.height + start;
        if (rect.top > end) return 0;
        if (rect.bottom < start) return 1;
        const rawProgress = 1 - (rect.top - start) / (end - start);
        return Math.min(Math.max(rawProgress, 0), 1);
      });
      setProgresses(newProgresses);

      // Track completed steps
      const newCompletedSteps = new Set();
      newProgresses.forEach((progress, index) => {
        if (progress >= 0.9) {
          newCompletedSteps.add(index);
        }
      });
      setCompletedSteps(newCompletedSteps);

      const averageProgress =
        newProgresses.reduce((acc, val) => acc + val, 0) / newProgresses.length;
      setTimelineProgress(averageProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
          How We{" "}
          <span className="bg-gradient-to-r from-[#C848C1] to-[#54A6F9] bg-clip-text text-transparent logo">
            Work
          </span>
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed">
          Our streamlined process is crafted to deliver consistent, high-quality
          results with efficiency and precision every time.
        </p>
      </div>

      <div ref={wrapperRef} className="relative container mx-auto px-6">
        {/* Enhanced Timeline */}
        <div
          ref={timelineRef}
          className="absolute w-1 bg-gray-300 z-0 overflow-hidden left-8 md:left-1/2 md:-translate-x-1/2 rounded-full"
          style={{ height: `${lineHeight}px` }}
        >
          <div
            className="bg-gradient-to-b from-[#C848C1] to-[#54A6F9] w-full transition-all duration-500 ease-in-out rounded-full relative"
            style={{ height: `${timelineProgress * 100}%` }}
          >
            {/* Animated pulse effect */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#54A6F9] to-transparent opacity-50 animate-pulse" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-20">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            const progress = progresses[i];
            const isActive = progress >= 0.7;
            const isCompleted = completedSteps.has(i);

            return (
              <div
                key={i}
                ref={(el) => (stepRefs.current[i] = el)}
                className="relative flex flex-col md:flex-row w-full items-center justify-between"
              >
                {/* Image Section */}
                <div
                  className={`w-full md:w-5/12 px-4 my-6 md:mb-0 ${
                    isLeft ? "order-2 md:order-1" : "order-2 md:order-2"
                  }`}
                >
                  <div className="relative group">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full max-w-md rounded-2xl shadow-2xl mx-auto transition-all duration-500 ease-in-out hover:scale-105 group-hover:shadow-3xl"
                    />
                    {/* Image overlay with progress */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-2 flex-wrap">
                        {step.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Middle Step Icon */}
                <div className="absolute top-4 z-10 left-8 md:left-1/2 md:-translate-x-1/2">
                  <div className="relative">
                    <div
                      className={`md:w-16 md:h-16 w-14 h-14 -ml-12 md:ml-0 mb-10 rounded-full border-4 bg-white shadow-2xl transition-all duration-500 ease-in-out flex items-center justify-center ${
                        isCompleted
                          ? "border-[#54A6F9] scale-110 bg-gradient-to-r from-[#C848C1] to-[#54A6F9]"
                          : isActive
                          ? "border-[#C848C1] scale-105"
                          : progress > 0.3
                          ? "border-purple-400"
                          : "border-gray-300"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : (
                        <div
                          className={`transition-colors duration-500 ${
                            isActive ? "text-[#C848C1]" : "text-gray-600"
                          }`}
                        >
                          {step.icon}
                        </div>
                      )}
                    </div>

                    {/* Animated ring for active state */}
                    {isActive && !isCompleted && (
                      <div className="absolute inset-0 rounded-full border-2 border-[#C848C1] animate-ping opacity-20" />
                    )}

                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#C848C1] to-[#54A6F9] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {i + 1}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div
                  className={`w-full md:w-5/12 px-4 ${
                    isLeft ? "order-1 md:order-2" : "order-1 md:order-1"
                  }`}
                >
                  <div
                    className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transition-all duration-700 ease-out transform relative overflow-hidden ${
                      progress > 0.3
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-60 translate-y-8 scale-95"
                    } ${
                      isActive
                        ? "shadow-2xl border-[#C848C1]/20 bg-gradient-to-br from-white to-purple-50/30"
                        : ""
                    }`}
                  >
                    {/* Background Icon */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 opacity-30 text-gray-400">
                      <div className="w-full h-full flex items-center justify-center">
                        {React.cloneElement(step.icon, {
                          className: "w-full h-full",
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4 relative">
                      <h3
                        className={`text-2xl font-bold transition-colors duration-500 ${
                          isActive ? "text-[#C848C1]" : "text-gray-800"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      {step.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">
                          Step Duration
                        </span>
                        <span className="text-sm font-bold text-gray-700">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="text-center mt-20">
        <div className="relative inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#C848C1] to-[#54A6F9] rounded-full blur opacity-75 animate-pulse" />
          <Link to="/pricing">
            <button className="relative inline-flex items-center gap-3 bg-gradient-to-r from-[#C848C1] to-[#54A6F9] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
              <span>Ready to get started?</span>
              <Rocket className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
}
