import React from "react";
import { Link } from "react-router-dom";

export default function ProjectsCTA() {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mt-8 p-8 rounded-4xl shadow-[0_20px_50px_-12px_rgba(200,72,193,0.5)]">
          <h3 className="text-3xl font-bold mb-4 ">
            Grow Your Business Transformation With Us.
          </h3>
          <p className=" mb-4 max-w-3xl mx-auto ">
            Stop settling for mediocre results. Join with 50+ brands who've
            already experienced the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing">
              <button className="rounded-full hover:scale-105   transition-all duration-300">
                <p className="bg-gradient-to-r from-[#C848C1] to-[#54A6F9] text-lg font-bold px-6 py-2 text-white rounded-2xl">
                  View Our Pricing
                </p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
