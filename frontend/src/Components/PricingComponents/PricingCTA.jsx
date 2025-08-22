import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Sparkles,
  Users,
  Trophy,
  Calendar,
  SparklesIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const PricingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Users, text: "Tailored Solutions" },
    { icon: Trophy, text: "Proven Results" },
    { icon: Sparkles, text: "Creative Excellence" },
  ];

  return (
    <div className="container mx-auto px-4 mt-20">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-center text-white shadow-2xl">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-bounce"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Animated icon */}
          <div className="mb-8 inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-30 animate-ping"></div>
              <div className="relative bg-white/20 bg-opacity-20 rounded-full p-4 backdrop-blur-sm">
                <SparklesIcon
                  className="w-8 h-8 text-wite animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              </div>
            </div>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent transition-all duration-1000 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Ready to Transform Your Business?
          </h2>

          <div className="max-w-5xl mx-auto mb-10">
            <p
              className={`text-lg md:text-xl mb-6 opacity-90 leading-relaxed transition-all duration-1000 delay-300 transform ${
                isVisible
                  ? "translate-y-0 opacity-90"
                  : "translate-y-8 opacity-0"
              }`}
            >
              We believe every brand has its own story and needs. That's why our
              service pricing is flexible and adaptable within reasonable
              limits. We're committed to working with you to align your vision
              with a price that feels fair, transparent, and comfortable.
            </p>

            <p
              className={`text-lg font-medium opacity-95 transition-all duration-1000 delay-500 transform ${
                isVisible
                  ? "translate-y-0 opacity-95"
                  : "translate-y-8 opacity-0"
              }`}
            >
              Let's connect and create something impactful—on terms that work
              for both of us.
            </p>
          </div>

          {/* Feature highlights */}
          <div
            className={`flex flex-wrap justify-center gap-6 mb-10 transition-all duration-1000 delay-700 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center space-x-2 bg-white/20 bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 transition-all duration-500 ${
                    activeFeature === index
                      ? "scale-110 bg-opacity-30"
                      : "scale-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-1000 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <Link to="/contact">
              <button className="group bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                <Calendar className="mr-2 w-5 h-5 group-hover:animate-bounce" />
                Schedule Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Trust indicator */}
          <div
            className={`mt-8 text-sm opacity-80 transition-all duration-1000 delay-1200 transform ${
              isVisible ? "translate-y-0 opacity-80" : "translate-y-8 opacity-0"
            }`}
          >
            <p className="flex items-center justify-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>
                Free consultation • No commitment required • Quick Response
                during office hours
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCTA;
