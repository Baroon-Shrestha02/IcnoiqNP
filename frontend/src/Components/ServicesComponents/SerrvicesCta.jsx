import { ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

// Variation 2: Minimalist Card Layout
function CTAVariation2() {
  const handleProjectClick = () => {
    console.log("Navigate to /project");
  };

  const handlePricingClick = () => {
    console.log("Navigate to /pricing");
  };

  return (
    <div className="my-12 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col lg:flex-row">
        {/* Left side - Content */}
        <div className="flex-1 p-8 lg:p-12">
          <div className="max-w-lg">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 leading-tight">
              Experience the
              <span className="text-purple-600"> difference</span>
              <br />
              that drives results
            </h3>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Stop settling for mediocre outcomes. Join 50+ forward-thinking
              brands who've already transformed their business trajectory.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/project">
                <button
                  onClick={handleProjectClick}
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  View Projects
                  <ChevronRight />
                </button>
              </Link>

              <Link to="/pricing">
                <button
                  onClick={handlePricingClick}
                  className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300"
                >
                  See Pricing
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right side - Visual element */}
        <div className="flex-1 relative bg-gradient-to-br from-purple-50 to-blue-50 p-8 lg:p-12 flex items-center justify-center">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-200 rounded-full opacity-60"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-pink-200 rounded-full opacity-60"></div>

            {/* Main visual */}
            <div className="relative bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  50+ Success Stories
                </h4>
                <p className="text-gray-600 text-sm">
                  Proven results across industries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo component to show both variations
export default function SerrvicesCta() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <div>
        <CTAVariation2 />
      </div>
    </div>
  );
}
