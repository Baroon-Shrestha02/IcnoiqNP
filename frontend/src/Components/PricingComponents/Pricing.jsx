import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaGlobe,
  FaPaintBrush,
  FaUsers,
  FaBullhorn,
  FaStar,
  FaArrowRight,
  FaCheck,
  FaTimes,
  FaUpload,
  FaLinkedin,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import api from "../Utils/api";
import { Newspaper } from "lucide-react";

export default function Pricing() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    platforms: [],
    projectFile: null,
  });

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add("overflow-hidden");
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [modalOpen]);

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
      type: "social-media",
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
      type: "website",
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
      type: "branding",
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
      type: "social-growth",
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
      type: "ads",
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
      type: "all-in-one",
    },
  ];

  const platformOptions = [
    { id: "facebook", name: "Facebook", icon: <FaFacebook /> },
    { id: "instagram", name: "Instagram", icon: <FaInstagram /> },
    { id: "tiktok", name: "TikTok", icon: <FaTiktok /> },
    { id: "linkedin", name: "LinkedIn", icon: <FaLinkedin /> },
    { id: "all", name: "All Platforms", icon: <FaStar /> },
  ];

  const openModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
    // Reset form data
    setFormData({
      name: "",
      email: "",
      phone: "",
      description: "",
      platforms: [],
      projectFile: null,
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlatformChange = (platformId) => {
    if (platformId === "all") {
      setFormData((prev) => ({
        ...prev,
        platforms: prev.platforms.includes("all") ? [] : ["all"],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        platforms: prev.platforms.includes(platformId)
          ? prev.platforms.filter((p) => p !== platformId && p !== "all")
          : [...prev.platforms.filter((p) => p !== "all"), platformId],
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      projectFile: e.target.files[0],
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.description
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const submissionData = new FormData();
      submissionData.append("name", formData.name);
      submissionData.append("email", formData.email);
      submissionData.append("phone", formData.phone);
      submissionData.append("description", formData.description);
      submissionData.append("service", selectedService.title);
      submissionData.append("price", selectedService.price);

      if (formData.platforms.length > 0) {
        submissionData.append("platforms", JSON.stringify(formData.platforms));
      }

      if (formData.projectFile) {
        submissionData.append("file", formData.projectFile);
      }

      // send to backend
      const res = await api.post(`/pricing-mail`, submissionData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("Your inquiry has been sent successfully ✅");
        closeModal();
      } else {
        alert("Failed to send inquiry ❌");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormFields = () => {
    if (!selectedService) return null;

    const serviceType = selectedService.type;

    return (
      <>
        {/* Basic Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your phone number"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Platform Selection for Social Media Services */}
        {(serviceType === "social-media" ||
          serviceType === "social-growth" ||
          serviceType === "ads" ||
          serviceType === "all-in-one") && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Platforms *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {platformOptions.map((platform) => (
                <label
                  key={platform.id}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    formData.platforms.includes(platform.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.platforms.includes(platform.id)}
                    onChange={() => handlePlatformChange(platform.id)}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{platform.icon}</span>
                    <span className="text-sm font-medium">{platform.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* File Upload for Website/Branding */}
        {(serviceType === "website" ||
          serviceType === "branding" ||
          serviceType === "all-in-one") && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Files (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
              <FaUpload className="mx-auto text-2xl text-gray-400 mb-2" />
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.zip"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-500">
                  Click to upload
                </span>
                <span className="text-gray-500"> or drag and drop</span>
                <p className="text-xs text-gray-400 mt-1">
                  PDF, DOC, images, or ZIP files
                </p>
              </label>
              {formData.projectFile && (
                <p className="text-sm text-green-600 mt-2">
                  File selected: {formData.projectFile.name}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Project Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent custom-scrollbar"
            placeholder={getDescriptionPlaceholder(serviceType)}
          />
        </div>
      </>
    );
  };

  const getDescriptionPlaceholder = (serviceType) => {
    switch (serviceType) {
      case "social-media":
        return "Tell us about your business, target audience, and social media goals...";
      case "website":
        return "Describe your website requirements, features needed, and any specific design preferences...";
      case "branding":
        return "Tell us about your business, industry, and the brand image you want to create...";
      case "social-growth":
        return "Describe your current social media presence and growth objectives...";
      case "ads":
        return "Tell us about your advertising goals, target audience, and budget expectations...";
      case "all-in-one":
        return "Describe your complete business needs and which services are most important to you...";
      default:
        return "Tell us about your project requirements and goals...";
    }
  };

  return (
    <>
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
              market. Every service is designed to deliver measurable results
              and exceptional ROI.
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
                      <span className="text-gray-500 ml-1">
                        {service.period}
                      </span>
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
                    <button
                      onClick={() => openModal(service)}
                      className={`w-full bg-gradient-to-r ${service.gradient} text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 group-hover:shadow-xl flex items-center justify-center`}
                    >
                      Get Started Now
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div
              className="absolute inset-0 bg-black/20"
              onClick={closeModal} // click outside to close
            ></div>
            <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 custom-scrollbar">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl z-20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedService?.title}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        {selectedService?.price} {selectedService?.period}
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
                    >
                      <FaTimes className="text-xl" />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="py-2 px-4">
                  {renderFormFields()}

                  {/* Submit Button */}
                  <div className="flex gap-4 sticky bottom-3 bg-white pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`flex-1 px-6 py-3 bg-gradient-to-r ${
                        selectedService?.gradient
                      } text-white rounded-lg transition-all duration-300 font-semibold flex items-center justify-center ${
                        isSubmitting
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:shadow-lg"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send via WhatsApp"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(
            45deg,
            rgba(59, 130, 246, 0.3),
            rgba(147, 51, 234, 0.3)
          );
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            45deg,
            rgba(59, 130, 246, 0.6),
            rgba(147, 51, 234, 0.6)
          );
          transform: scale(1.1);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: linear-gradient(
            45deg,
            rgba(59, 130, 246, 0.8),
            rgba(147, 51, 234, 0.8)
          );
        }

        /* Hide scrollbar for mobile devices */
        @media (max-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 0px;
            height: 0px;
          }

          .custom-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
        }

        /* Smooth scrolling behavior */
        .custom-scrollbar {
          scroll-behavior: smooth;
        }

        /* Custom focus styles for better accessibility */
        .custom-scrollbar:focus-within::-webkit-scrollbar-thumb {
          background: linear-gradient(
            45deg,
            rgba(59, 130, 246, 0.7),
            rgba(147, 51, 234, 0.7)
          );
        }
      `}</style>
    </>
  );
}
