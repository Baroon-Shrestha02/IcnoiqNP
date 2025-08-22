import React from "react";
import {
  Monitor,
  Palette,
  Share2,
  TrendingUp,
  Video,
  Megaphone,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Social Media Marketing",
    description:
      "Boost your brand visibility with targeted campaigns and audience engagement strategies.",
    icon: <TrendingUp className="w-12 h-12" />,
    color: "bg-blue-100",
    iconColor: "text-blue-600",
    hoverColor: "hover:bg-blue-50",
  },
  {
    title: "Social Media Branding",
    description:
      "Craft a consistent and powerful identity across all digital platforms.",
    icon: <Share2 className="w-12 h-12" />,
    color: "bg-purple-100",
    iconColor: "text-purple-600",
    hoverColor: "hover:bg-purple-50",
  },
  {
    title: "Web Development",
    description:
      "Develop stunning, responsive websites tailored for performance and user experience.",
    icon: <Monitor className="w-12 h-12" />,
    color: "bg-green-100",
    iconColor: "text-green-600",
    hoverColor: "hover:bg-green-50",
  },
  {
    title: "Graphic Design",
    description:
      "Create visually stunning graphics that communicate your message effectively.",
    icon: <Palette className="w-12 h-12" />,
    color: "bg-pink-100",
    iconColor: "text-pink-600",
    hoverColor: "hover:bg-pink-50",
  },
  {
    title: "Video Production",
    description:
      "Produce engaging reels and motion graphics that captivate your audience.",
    icon: <Video className="w-12 h-12" />,
    color: "bg-orange-100",
    iconColor: "text-orange-600",
    hoverColor: "hover:bg-orange-50",
  },
  {
    title: "Digital Advertising",
    description:
      "Run targeted ad campaigns that drive conversions and maximize ROI.",
    icon: <Megaphone className="w-12 h-12" />,
    color: "bg-indigo-100",
    iconColor: "text-indigo-600",
    hoverColor: "hover:bg-indigo-50",
  },
];

export default function HomeServices() {
  return (
    <section className="w-full min-h-screen rouned-4xl bg-gradient-to-br from-[#C848C1] via-[#8B5CF6] to-[#54A6F9] py-20 px-4">
      <div className="container mx-auto text-center max-w-7xl">
        <h2 className="text-4xl text-white md:text-6xl font-extrabold mb-4 tracking-tight">
          One Stop Solution for You
        </h2>
        <p className="text-white/80 text-lg md:text-xl mb-16 max-w-2xl mx-auto">
          Comprehensive digital solutions to elevate your brand and drive growth
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-white/95 backdrop-blur-sm rounded-3xl p-8 hover:-translate-y-3 transition-all duration-300 hover:shadow-2xl ${service.hoverColor} border border-white/20`}
            >
              {/* Icon Background Circle */}
              <div
                className={`w-20 h-20 ${service.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className={service.iconColor}>{service.icon}</div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-gray-900 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="group">
          <Link to="/services">
            <button className="px-8 py-4 text-xl md:text-2xl font-bold bg-white text-[#C848C1] rounded-3xl hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105">
              Explore More About Our Services
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
