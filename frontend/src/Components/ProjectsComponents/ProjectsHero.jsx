import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const initialCards = [
  {
    title: "E-Commerce Platform",
    subtitle: "Design • Development",
    description:
      "We crafted a high-conversion fashion e-commerce site with a custom user experience, seamless checkout, and integrated SEO strategies.",
    bgImage: "/Uploads/newWork.jpeg",
  },
  {
    title: "Social Media Growth Campaign",
    subtitle: "Instagram • Reels • Ads",
    description:
      "Our reels and motion graphics content helped a local brand triple its engagement, gaining over 15K organic followers in 3 months.",
    bgImage: "/Uploads/newWork2.jpeg",
  },
  {
    title: "Brand Identity for Startups",
    subtitle: "Logo • Visuals",
    description:
      "We delivered a complete branding kit including logo, color palette, and social assets—helping the startup stand out in a crowded market.",
    bgImage: "/Uploads/newWork3.jpeg",
  },
  {
    title: "Poster and Motion Graphics",
    subtitle: "Poster • Brochure • Visuals",
    description:
      "We produced polished explainer videos and product animations for enterprise clients, simplifying complex processes through motion design.",
    bgImage: "/Uploads/reels.jpg",
  },
];

export default function ProjectsHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const transitionRef = useRef(false);

  const changeSlide = (newIndex, direction = "next") => {
    if (transitionRef.current || newIndex === currentIndex) return;

    transitionRef.current = true;

    // Reset progress immediately
    setProgress(0);

    // Smooth transition to new slide
    setTimeout(() => {
      setCurrentIndex(newIndex);
      transitionRef.current = false;
    }, 50); // Very quick to avoid visual lag
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % initialCards.length;
    changeSlide(newIndex, "next");
  };

  const prevSlide = () => {
    const newIndex =
      (currentIndex - 1 + initialCards.length) % initialCards.length;
    changeSlide(newIndex, "prev");
  };

  const goToSlide = (index) => {
    changeSlide(index);
  };

  useEffect(() => {
    let interval;
    let progressInterval;

    if (isPlaying && !transitionRef.current) {
      interval = setInterval(() => {
        nextSlide();
      }, 4000);

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 0.5;
        });
      }, 25);
    }

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isPlaying, currentIndex]);

  const currentCard = initialCards[currentIndex];

  return (
    <div className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col justify-end rounded-b-4xl text-white overflow-hidden group shadow-2xl shadow-slate-500">
      {/* Background Images - Single layer with smooth transitions */}
      <div className="absolute inset-0">
        {initialCards.map((card, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
            style={{
              backgroundImage: `url('${card.bgImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50" />
          </div>
        ))}
      </div>

      {/* Main overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      {/* Content Layer */}
      <div className="container mx-auto relative z-10 px-6 md:px-12 pb-16">
        <div className="max-w-4xl">
          {/* Single content container with smooth transitions */}
          <div key={currentIndex} className="animate-slideUp">
            <div className="text-xs md:text-sm uppercase tracking-[0.2em] mb-4 text-gray-300 font-medium">
              {currentCard.subtitle}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] drop-shadow-2xl mb-6 text-white">
              {currentCard.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-100 max-w-2xl leading-relaxed font-light opacity-90">
              {currentCard.description}
            </p>
          </div>
        </div>
      </div>

      {/* Subtle floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-2000" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-700" />
      </div>

      <style>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        /* Smooth backdrop blur for better performance */
        @supports (backdrop-filter: blur(12px)) {
          .backdrop-blur-md {
            backdrop-filter: blur(12px) saturate(180%);
          }
        }

        /* Ensure smooth transitions */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
}
