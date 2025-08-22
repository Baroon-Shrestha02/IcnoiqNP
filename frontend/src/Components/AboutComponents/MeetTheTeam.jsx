import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Linkedin,
  Twitter,
  Github,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaBehance, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function MeetTheTeam() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0);
  const autoplayRef = useRef();

  const team = [
    {
      name: "Roshan KC",
      role: "Founder & CEO",
      img: "Uploads/defaultpp.jpg",
      description:
        "Roshan KC is the visionary founder behind our organization. With a strong focus on leadership and innovation, he has been instrumental in shaping the company's mission, building strong partnerships, and guiding the team toward sustainable growth.",
      socialLinks: [
        {
          icon: Linkedin,
          url: "#",
          label: "LinkedIn",
          color: "hover:bg-blue-600",
          color2: "hover:text-white",
        },
        {
          icon: FaWhatsapp,
          url: "#",
          label: "Whatsapp",
          color: "hover:bg-green-500",
          color2: "hover:text-white",
        },
        {
          icon: Mail,
          url: "#",
          label: "Email",
          color: "hover:bg-red-500",
          color2: "hover:text-white",
        },
      ],
    },
    {
      name: "----",
      role: "Co-founder & COO",
      img: "Uploads/defaultpp.jpg",
      description:
        "*** leads the team as Manager, ensuring day-to-day operations run smoothly. His expertise lies in team coordination, project management, and ensuring client satisfaction through efficient workflow and clear communication.",
      socialLinks: [
        {
          icon: Linkedin,
          url: "#",
          label: "LinkedIn",
          color: "hover:bg-blue-600",
          color2: "hover:text-white",
        },
        {
          icon: FaWhatsapp,
          url: "#",
          label: "Whatsapp",
          color: "hover:bg-green-500",
          color2: "hover:text-white",
        },
        {
          icon: Mail,
          url: "#",
          label: "Email",
          color: "hover:bg-red-500",
          color2: "hover:text-white",
        },
      ],
    },
    {
      name: "Niroj Maharjan",
      role: "Sr. Graphics Designer",
      img: "Uploads/Niraj.jpg",
      description:
        "Niraj Maharjan Poudel is a creative Graphics Designer, bringing visual ideas to life through thoughtful design and branding. His skills cover everything from digital illustrations to UI assets, maintaining visual consistency across all platforms.",
      socialLinks: [
        {
          icon: Linkedin,
          url: "#",
          label: "LinkedIn",
          color: "hover:bg-blue-600",
          color2: "hover:text-white",
        },
        {
          icon: FaBehance,
          url: "#",
          label: "Behance",
          color: "hover:bg-blue-500",
          color2: "hover:text-white",
        },
        {
          icon: Mail,
          url: "#",
          label: "Email",
          color: "hover:bg-red-500",
          color2: "hover:text-white",
        },
      ],
    },
    {
      name: "Abhay Shrestha",
      role: "Graphics Designer",
      img: "Uploads/abhay.jpg",
      description:
        "Abhay Shrestha specializes in crafting engaging graphic designs for both digital and print media. His attention to detail and creativity helps our brand stand out through impactful visuals and well-crafted marketing materials.",
      socialLinks: [
        {
          icon: Linkedin,
          url: "#",
          label: "LinkedIn",
          color: "hover:bg-blue-600",
          color2: "hover:text-white",
        },
        {
          icon: Mail,
          url: "#",
          label: "Email",
          color: "hover:bg-red-500",
          color2: "hover:text-white",
        },
      ],
    },
    {
      name: "Baroon Shrestha",
      role: "Web Developer",
      img: "Uploads/Barun.png",
      description:
        "Baroon Shrestha is a skilled Web Developer specializing in modern frontend and backend technologies. From building responsive interfaces to integrating APIs, Baroon ensures a smooth and efficient web experience for all our users.",
      socialLinks: [
        {
          icon: Linkedin,
          url: "#",
          label: "LinkedIn",
          color: "hover:bg-blue-600",
          color2: "hover:text-white",
        },
        {
          icon: Github,
          url: "#",
          label: "GitHub",
          color: "hover:bg-gray-700",
          color2: "hover:text-white",
        },
        {
          icon: Mail,
          url: "#",
          label: "Email",
          color: "hover:bg-red-500",
          color2: "hover:text-white",
        },
      ],
    },
    {
      name: "Sara Lamichhane",
      role: "Web Developer",
      img: "/Uploads/sara.jpeg",
      description:
        "Sara Lamichhane is a dedicated Web Developer focused on creating user-friendly web applications. Her strengths include front-end development, responsive design, and collaborating closely with designers and project managers.",
      socialLinks: [
        {
          icon: Linkedin,
          url: "#",
          label: "LinkedIn",
          color: "hover:bg-blue-600",
          color2: "hover:text-white",
        },
        {
          icon: Github,
          url: "#",
          label: "GitHub",
          color: "hover:bg-gray-700",
          color2: "hover:text-white",
        },
        {
          icon: Mail,
          url: "#",
          label: "Email",
          color: "hover:bg-red-500",
          color2: "hover:text-white",
        },
      ],
    },
  ];

  const openModal = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % team.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + team.length) % team.length);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Autoplay effect
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % team.length);
      setIsAnimating(true);
    }, 4000);

    return () => clearInterval(autoplayRef.current);
  }, [team.length]);

  // Reset animation state
  useEffect(() => {
    if (!isAnimating) return;
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [isAnimating]);

  const getVisibleCards = () => {
    const cards = [];
    if (!team || team.length === 0) return cards;

    for (let i = -2; i <= 2; i++) {
      const base = currentSlide ?? 0;
      const index = (base + i + team.length) % team.length;
      const member = team[index];
      if (!member) continue;

      cards.push({
        ...member,
        position: i,
        index,
        key: `${index}-${member.name}`,
      });
    }

    return cards;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Meet Our{" "}
            <span className="bg-gradient-to-b from-[#C848C1] to-[#54A6F9] text-transparent bg-clip-text logo">
              Team
            </span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl font-extralight max-w-2xl mx-auto">
            Passionate innovators dedicated to your success
          </p>
        </motion.div>

        {/* Small Screen: Grid Layout */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="team-card bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden"
                onClick={() => openModal(member)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Profile Image - Top */}
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Name and Role - Bottom */}
                <h3 className="text-xl font-semibold text-center mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-center mb-4">{member.role}</p>

                {/* Social Links - Bottom */}
                <div className="social-links flex justify-center space-x-3 transition-all duration-300">
                  {member.socialLinks.map((social, socialIndex) => (
                    <a
                      key={socialIndex}
                      href={social.url}
                      onClick={(e) => e.stopPropagation()}
                      className={`p-3 rounded-full bg-gray-100 transition-colors duration-300 ${social.color} ${social.color2}`}
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Large Screen: Carousel Layout */}
        <div className="hidden lg:block">
          <div className=" rounded-4xl pt-12 mb-16 mx-6">
            <div className=" relative">
              {/* Navigation Buttons */}
              <div className="flex justify-end items-center gap-2 mb-4 pr-8 relative z-20">
                <button
                  onClick={prevSlide}
                  disabled={isAnimating}
                  className={`bg-white hover:bg-gray-50 shadow-xl rounded-full p-3 transition-all duration-300 border border-gray-100 ${
                    isAnimating
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-110 hover:shadow-2xl active:scale-95"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>

                <button
                  onClick={nextSlide}
                  disabled={isAnimating}
                  className={`bg-white hover:bg-gray-50 shadow-xl rounded-full p-3 transition-all duration-300 border border-gray-100 ${
                    isAnimating
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-110 hover:shadow-2xl active:scale-95"
                  }`}
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Cards Container */}
              <div className="flex items-center justify-center h-[30rem] px-8 relative overflow-hidden">
                {getVisibleCards().map((member) => {
                  const isCenter = member.position === 0;
                  const isVisible = Math.abs(member.position) <= 1;
                  const isClickable = !isCenter && !isAnimating && isVisible;

                  return (
                    <div
                      key={member.key}
                      className={`absolute transition-all duration-700 ease-in-out ${
                        isClickable
                          ? "cursor-pointer hover:scale-105"
                          : "cursor-default"
                      }`}
                      style={{
                        width: isCenter ? "90vw" : "80vw",
                        maxWidth: isCenter ? "600px" : "480px",
                        height: isCenter ? "380px" : "240px",
                        transform: `translateX(${
                          member.position * 320
                        }px) scale(${isCenter ? 1 : 0.9})`,
                        opacity: isVisible ? (isCenter ? 1 : 0.7) : 0,
                        filter: isCenter
                          ? "brightness(1) saturate(1.1)"
                          : "brightness(0.9) saturate(0.8)",
                        zIndex: isCenter ? 20 : isVisible ? 10 : 1,
                      }}
                      onClick={() => openModal(member)}
                    >
                      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
                        <div className="flex h-full">
                          {/* Image Section */}
                          <div className="relative w-2/5 overflow-hidden">
                            <img
                              src={member.img}
                              alt={`${member.name} - ${member.role}`}
                              className="w-full h-full object-cover object-top transition-all duration-700 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10"></div>
                          </div>

                          {/* Content Section */}
                          <div className="w-3/5 p-3 flex flex-col h-full">
                            <div className="flex-shrink-0 space-y-3 mb-4">
                              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                                {member.name}
                              </h3>
                              <div className="">
                                <span className="bg-gradient-to-r from-[#C848C1] to-[#54A6F9]  text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                                  {member.role}
                                </span>
                              </div>
                              <div className="w-12 h-0.5 bg-gradient-to-b from-[#C848C1] to-[#54A6F9]  rounded-full"></div>
                            </div>

                            <div className="flex-1 overflow-hidden">
                              <div
                                className="h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-gray-100 hover:scrollbar-thumb-amber-400"
                                style={{
                                  scrollbarWidth: "thin",
                                  scrollbarColor: "#C848C1 #54A6F9",
                                }}
                              >
                                <p className="text-gray-600 leading-relaxed text-[12px] md:text-sm">
                                  {member.description}
                                </p>
                              </div>
                            </div>

                            {/* Social Links in Card */}
                            <div className="flex justify-start space-x-2 mt-2 pt-2 border-t border-gray-100">
                              {member.socialLinks
                                .slice(0, 3)
                                .map((social, socialIndex) => (
                                  <a
                                    key={socialIndex}
                                    href={social.url}
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-2 rounded-full flex items-center bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                                    aria-label={social.label}
                                  >
                                    <social.icon
                                      size={18}
                                      className="text-gray-600"
                                    />
                                  </a>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="py-6 text-base md:text-xl capitalize text-center">
                Click to learn more about our team members
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedMember && (
        <motion.div
          className="modal-backdrop fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-content bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img
                      src={selectedMember.img}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {selectedMember.name}
                    </h3>
                    <p className="text-gray-600">{selectedMember.role}</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">About</h4>
                <p className="text-gray-700 leading-relaxed">
                  {selectedMember.description}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">Connect</h4>
                <div className="flex space-x-3 space-y-3 flex-wrap">
                  {selectedMember.socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 transition-colors duration-300 ${social.color} ${social.color2}`}
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                      <span className="text-sm font-medium">
                        {social.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Styles */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #fbbf24;
          border-radius: 3px;
          transition: background-color 0.2s ease;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #f59e0b;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #fbbf24 #f3f4f6;
        }
      `}</style>
    </section>
  );
}
