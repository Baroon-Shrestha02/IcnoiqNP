import React, { useState, useEffect, useRef } from "react";

const clientsData = [
  {
    id: 1,
    title: "Momiji",
    description:
      "Japanese language training center specializing in comprehensive language education",
    image: "Uploads/img1.jpeg",
    category: "Education",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 2,
    title: "Kansai",
    description:
      "Premier Japanese language training center with modern teaching methodologies",
    category: "Education",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "Nisani",
    description:
      "Japanese language training center focused on cultural immersion and practical skills",
    category: "Education",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: 4,
    title: "Kings Motor",
    description:
      "Premium vehicles reconditioning and comprehensive automotive services",
    category: "Automotive",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 5,
    title: "NS Motors",
    description:
      "Vehicles reconditioning and complete automotive services with expert technicians",
    category: "Automotive",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 6,
    title: "Omni Global",
    description:
      "Japanese language training center with innovative learning approaches",
    category: "Education",
    color: "from-teal-500 to-blue-500",
  },
  {
    id: 7,
    title: "Ghar Sansar",
    description: "Complete home solutions and interior design services",
    category: "Home & Design",
    color: "from-amber-500 to-yellow-500",
  },
  {
    id: 8,
    title: "Sanskar Academy",
    description:
      "Professional automotive industry consulting and training services",
    category: "Consulting",
    color: "from-violet-500 to-purple-500",
  },
];

const AnimatedCounter = ({
  target,
  suffix = "",
  duration = 2000,
  startAnimation = false,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutCubic * target);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, startAnimation]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export default function Clients() {
  const [hoveredClient, setHoveredClient] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const categories = [
    "All",
    "Education",
    "Automotive",
    "Consulting",
    "Home & Design",
  ];

  const filteredClients =
    selectedCategory === "All"
      ? clientsData
      : clientsData.filter((client) => client.category === selectedCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStatsVisible) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [isStatsVisible]);

  return (
    <section className="py-14 my-12 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Enhanced Heading */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-4 relative">
            Our{" "}
            <span className="bg-gradient-to-r from-[#C848C1] via-[#8B5CF6] to-[#54A6F9] text-transparent bg-clip-text logo relative">
              Clients
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#C848C1] to-[#54A6F9] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by innovative companies across various industries
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#C848C1] to-[#54A6F9] text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-[#C848C1]/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Enhanced Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredClients.map((client, index) => (
            <div
              key={client.id}
              className={`group relative cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                hoveredClient === null
                  ? "opacity-100"
                  : hoveredClient === client.id
                  ? "opacity-100 z-20"
                  : "opacity-40 scale-95"
              }`}
              onMouseEnter={() => setHoveredClient(client.id)}
              onMouseLeave={() => setHoveredClient(null)}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${client.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                ></div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium bg-gradient-to-r ${client.color} text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}
                  >
                    {client.category}
                  </span>
                </div>

                {/* Client Logo/Title */}
                <div className="relative z-10">
                  <h3
                    className={`text-lg md:text-2xl font-bold logo transition-all duration-300 ${
                      hoveredClient === client.id
                        ? `bg-gradient-to-r ${client.color} text-transparent bg-clip-text`
                        : "text-gray-700 group-hover:text-gray-900"
                    }`}
                  >
                    {client.title}
                  </h3>
                </div>

                {/* Hover Effects */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C848C1] to-[#54A6F9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
              </div>

              {/* Enhanced Tooltip */}
              {hoveredClient === client.id && (
                <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-80 max-w-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                    {/* Image Section */}
                    {client.image && (
                      <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                        <img
                          src={client.image}
                          alt={client.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4
                          className={`text-lg font-bold bg-gradient-to-r ${client.color} text-transparent bg-clip-text`}
                        >
                          {client.title}
                        </h4>
                        <span
                          className={`px-2 py-1 text-xs font-medium bg-gradient-to-r ${client.color} text-white rounded-full`}
                        >
                          {client.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {client.description}
                      </p>
                    </div>
                  </div>

                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats Section with Animated Counters */}
        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 md:grid-cols-2 gap-8"
        >
          <div className="text-center group cursor-pointer">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#C848C1] to-[#54A6F9] text-transparent bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
              <AnimatedCounter
                target={15}
                suffix="+"
                startAnimation={isStatsVisible}
              />
            </div>
            <p className="text-gray-600 font-medium">Happy Clients</p>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#54A6F9] to-[#C848C1] text-transparent bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
              <AnimatedCounter
                target={100}
                suffix="%"
                startAnimation={isStatsVisible}
              />
            </div>
            <p className="text-gray-600 font-medium">Satisfaction</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
