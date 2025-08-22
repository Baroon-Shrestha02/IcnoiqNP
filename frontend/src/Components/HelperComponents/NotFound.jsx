import React, { useState, useEffect } from "react";
import { Home, RefreshCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");
  const [isGlitching, setIsGlitching] = useState(false);
  const navigate = useNavigate();
  const glitchChars = ["4", "0", "4", "@", "#", "$", "%", "&", "*", "!", "?"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);

      // Create glitch effect
      let iterations = 0;
      const glitchInterval = setInterval(() => {
        setGlitchText((prev) =>
          prev
            .split("")
            .map((char, index) => {
              if (iterations < 3) {
                return glitchChars[
                  Math.floor(Math.random() * glitchChars.length)
                ];
              }
              return "404"[index] || char;
            })
            .join("")
        );

        iterations++;
        if (iterations > 5) {
          clearInterval(glitchInterval);
          setGlitchText("404");
          setIsGlitching(false);
        }
      }, 100);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleGoHome = () => {
    return navigate("/");
  };

  return (
    <div className="min-h-screen bg-blak text-white flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="text-center z-10 max-w-2xl mx-auto px-6">
        {/* Glitchy 404 */}
        <div className="relative mb-8">
          <h1
            className={`text-8xl md:text-9xl font-black mb-4 relative ${
              isGlitching ? "animate-pulse" : ""
            }`}
            style={{
              fontFamily: "monospace",
              textShadow: isGlitching
                ? "2px 2px 0px #ff0000, -2px -2px 0px #00ff00, 4px 4px 0px #0000ff"
                : "2px 2px 0px #333",
            }}
          >
            <span className="relative z-10 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {glitchText}
            </span>

            {/* Glitch overlays */}
            {isGlitching && (
              <>
                <span
                  className="absolute top-0 left-0 text-red-500 opacity-70 animate-bounce"
                  style={{ transform: "translate(2px, 0px)" }}
                >
                  {glitchText}
                </span>
                <span
                  className="absolute top-0 left-0 text-cyan-500 opacity-70 animate-bounce delay-75"
                  style={{ transform: "translate(-2px, 2px)" }}
                >
                  {glitchText}
                </span>
              </>
            )}
          </h1>

          {/* Digital noise bars */}
          {isGlitching && (
            <div className="absolute inset-0 flex flex-col justify-center">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-2 bg-white opacity-80 animate-pulse mb-4"
                  style={{
                    width: `${Math.random() * 100}%`,
                    marginLeft: `${Math.random() * 50}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-red-400 glitch-text">
            PAGE NOT FOUND
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleGoHome}
            className="flex items-center space-x-2 text-black px-6 py-3 rounded-lg font-semibold "
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </button>
        </div>

        {/* Matrix-style falling code */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-70 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 font-mono text-xs animate-pulse"
              style={{
                left: `${i * 5}%`,
                top: "-20px",
                animation: `fall ${3 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {Math.random().toString(36).substring(7)}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }

        .glitch-text {
          animation: glitch 2s infinite;
        }

        @keyframes glitch {
          0%,
          100% {
            text-shadow: 0 0 5px #ff0000;
          }
          25% {
            text-shadow: -2px 0 5px #00ff00;
          }
          50% {
            text-shadow: 2px 0 5px #0000ff;
          }
          75% {
            text-shadow: 0 -2px 5px #ff00ff;
          }
        }
      `}</style>
    </div>
  );
}
