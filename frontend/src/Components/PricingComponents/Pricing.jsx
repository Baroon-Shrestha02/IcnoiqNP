import React, { useState } from "react";
import {
  FaFacebook,
  FaGlobe,
  FaPaintBrush,
  FaUsers,
  FaBullhorn,
  FaStar,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";
import PricingCTA from "./PricingCTA";

export default function Pricing() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      icon: <FaFacebook className="text-5xl text-blue-600 mb-6" />,
      title: "Social Media Complete Handling",
      subtitle: "End-to-End Management",
      price: "NPR 15,000",
      originalPrice: "",
      period: "/month",
      description:
        "End-to-end management of Facebook, Instagram, TikTok, including strategy, content planning, captions, hashtag strategy, and interaction.",
      features: [
        "All major platforms",
        "Content strategy & planning",
        "Caption writing & hashtags",
        "Community engagement",
        "Consistent branding",
      ],
      badge: "Popular",
      gradient: "from-blue-500 to-cyan-500",
      shadowColor: "shadow-blue-500/25",
    },
    {
      icon: <FaGlobe className="text-5xl text-emerald-600 mb-6" />,
      title: "Website Creation & Updates",
      subtitle: "Fully Responsive Websites",
      price: "NPR 30,000",
      originalPrice: "",
      period: "/project",
      description:
        "Professional website design with SEO optimization, regular updates, and ongoing maintenance.",
      features: [
        "Fully responsive design",
        "Regular updates",
        "6 months maintenance",
        "Content management system",
      ],
      badge: "Premium",
      gradient: "from-emerald-500 to-teal-500",
      shadowColor: "shadow-emerald-500/25",
    },
    {
      icon: <FaPaintBrush className="text-5xl text-purple-600 mb-6" />,
      title: "Complete Branding Package",
      subtitle: "Visual Identity Setup",
      price: "NPR 20,000",
      originalPrice: "",
      period: "/package",
      description:
        "Complete branding package including logo, brand colors, typography, tone, and brand guidelines.",
      features: [
        "Logo design",
        "Brand colors & typography",
        "Brand guideline document",
        "Visual identity setup",
      ],
      badge: "Best Value",
      gradient: "from-purple-500 to-pink-500",
      shadowColor: "shadow-purple-500/25",
    },
    {
      icon: <FaUsers className="text-5xl text-rose-600 mb-6" />,
      title: "Social Media Posting & Growth",
      subtitle: "Audience Engagement",
      price: "NPR 10,000",
      originalPrice: "",
      period: "/month",
      description:
        "High-quality post and reel creation, viral campaign planning, and audience engagement tactics.",
      features: [
        "Post & reel creation",
        "Audience targeting",
        "Engagement strategies",
        "Growth optimization",
      ],
      badge: "Trending",
      gradient: "from-rose-500 to-pink-500",
      shadowColor: "shadow-rose-500/25",
    },
    {
      icon: <FaBullhorn className="text-5xl text-amber-600 mb-6" />,
      title: "Boosting/Ad Service",
      subtitle: "Paid Ads Management",
      price: "As per usage",
      originalPrice: "",
      period: "/campaign",
      description:
        "Facebook/Instagram boosting. Charged per platform rate. Extra NPR 10 per USD applies if taken separately from a package.",
      features: [
        "Facebook & Instagram ads",
        "Campaign setup",
        "Budget optimization",
        "Performance tracking",
      ],
      badge: "Performance",
      gradient: "from-amber-500 to-orange-500",
      shadowColor: "shadow-amber-500/25",
    },
    {
      icon: <FaStar className="text-5xl text-yellow-500 mb-6" />,
      title: "All-in-One Growth Package",
      subtitle: "Complete Business Solution",
      price: "Custom Pricing",
      originalPrice: "",
      period: "/project or monthly",
      description:
        "A fully customized service package combining website creation, social media management, branding, advertising, and growth strategies tailored specifically for your business needs.",
      features: [
        "Website creation & maintenance",
        "Social media management",
        "Brand identity & guidelines",
        "Post & reel content creation",
        "Paid ads management",
        "Audience engagement & analytics",
      ],
      badge: "All-in-One",
      gradient: "from-yellow-500 to-amber-500",
      shadowColor: "shadow-yellow-500/25",
    },
  ];

  // WhatsApp message URL construction function
  const generateWhatsAppLink = (service) => {
    const message = `Hello! I'm interested in the "${service.title}" package. Could you provide more details?`;
    const phoneNumber = "9864687572"; // Your new WhatsApp business number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    return url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20">
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="flex items-center flex-col gap-6">
          <h1 className="text-4xl md:text-6xl text-center font-black text-gray-900 leading-tight">
            Pricing That
            <span className="bg-gradient-to-b from-[#C848C1] to-[#54A6F9] bg-clip-text text-transparent">
              {" "}
              Delivers Results
            </span>
          </h1>
          <p className="text-lg md:text-xl font-extralight text-center max-w-3xl text-gray-600 leading-relaxed">
            Choose the perfect package to elevate your brand and dominate your
            market. Every service is designed to deliver measurable results and
            exceptional ROI.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative group ${
                service.featured ? "xl:scale-105 z-10" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Featured Badge */}
              {service.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ {service.badge}
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`relative bg-white rounded-3xl p-8 h-full transition-all duration-500 ${
                  service.shadowColor
                } ${
                  hoveredIndex === index
                    ? "shadow-2xl -translate-y-2"
                    : "shadow-lg"
                } border border-gray-100 flex flex-col`}
              >
                {/* Top Badge */}
                {!service.featured && (
                  <div className="absolute -top-2 -right-2">
                    <div
                      className={`bg-gradient-to-r ${service.gradient} text-white px-3 py-1 rounded-full text-xs font-bold`}
                    >
                      {service.badge}
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className="text-center mb-6">{service.icon}</div>

                {/* Title & Subtitle */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">
                    {service.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-4xl font-black text-gray-900">
                      {service.price}
                    </span>
                    <span className="text-gray-500 ml-1">{service.period}</span>
                  </div>
                  {service.originalPrice && (
                    <div className="text-gray-400 line-through text-sm">
                      {service.originalPrice}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mb-8 flex-grow">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    What's Included:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <a
                    href={generateWhatsAppLink(service)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full bg-gradient-to-r ${service.gradient} text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 group-hover:shadow-xl flex items-center justify-center`}
                  >
                    Get Started Now
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PricingCTA />
    </div>
  );
}
