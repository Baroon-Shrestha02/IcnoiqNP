import React from "react";

export default function Cursor({ isVisible, position, text }) {
  return (
    <div
      className={`
        fixed pointer-events-none z-50 transition-all duration-300 ease-out
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}
      `}
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative">
        {/* <div className="w-30 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg"> */}
        <div className="w-30 h-10 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
          <span className="font-semibold text-xs text-center leading-tight">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}
