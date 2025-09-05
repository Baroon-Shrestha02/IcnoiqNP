import React, { useState } from "react";
import {
  Search,
  Palette,
  Zap,
  Settings,
  Rocket,
  CheckCircle,
  Clock,
  Users,
  Target,
  ArrowRight,
  ChevronDown,
  PlayCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    id: 1,
    title: "Discovery & Planning",
    fullTitle: "Discovery & Planning",
    description: "Understanding your vision and mapping the perfect strategy",
    longDescription:
      "We start by diving deep into your business goals, target audience, and project requirements. Through collaborative workshops and detailed analysis, we create a comprehensive roadmap that ensures every decision aligns with your objectives.",
    icon: <Search className="w-6 h-6" />,
    duration: "1-2 weeks",
    deliverables: [
      "Project Brief",
      "User Research",
      "Strategy Document",
      "Project Timeline",
    ],
    activities: [
      "Stakeholder Workshop",
      "Market Research",
      "Competitor Analysis",
      "Requirements Gathering",
    ],
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    id: 2,
    title: "Strategy & Design",
    fullTitle: "Strategy & Design",
    description: "Crafting beautiful experiences that users love",
    longDescription:
      "Our design team creates stunning, user-centered interfaces that not only look amazing but also provide intuitive experiences. Every pixel is purposefully placed to guide users toward their goals while reflecting your brand identity.",
    icon: <Palette className="w-6 h-6" />,
    duration: "2-3 weeks",
    deliverables: [
      "Design System",
      "UI/UX Mockups",
      "Interactive Prototypes",
      "Style Guide",
    ],
    activities: ["Wireframing", "Visual Design", "Prototyping", "User Testing"],
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-600",
    borderColor: "border-purple-200",
  },
  {
    id: 3,
    title: "Development & Build",
    fullTitle: "Development & Build",
    description: "Bringing designs to life with clean, scalable code",
    longDescription:
      "Using cutting-edge technologies and best practices, we transform your designs into powerful, responsive applications. Our code is clean, documented, and built to scale with your growing business needs.",
    icon: <Zap className="w-6 h-6" />,
    duration: "3-6 weeks",
    deliverables: [
      "Frontend App",
      "Backend System",
      "Database",
      "API Integration",
    ],
    activities: [
      "Frontend Development",
      "Backend Development",
      "Database Design",
      "Third-party Integration",
    ],
    color: "bg-green-500",
    lightColor: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-200",
  },
  {
    id: 4,
    title: "Testing & QA",
    fullTitle: "Testing & QA",
    description: "Ensuring everything works perfectly across all scenarios",
    longDescription:
      "We rigorously test every feature, interaction, and edge case to guarantee flawless performance. From automated testing to manual QA across devices, we ensure your solution is rock-solid before launch.",
    icon: <Settings className="w-6 h-6" />,
    duration: "1-2 weeks",
    deliverables: [
      "Test Suite",
      "Bug Reports",
      "Performance Audit",
      "Security Review",
    ],
    activities: [
      "Automated Testing",
      "Manual QA",
      "Performance Testing",
      "Security Audit",
    ],
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    textColor: "text-orange-600",
    borderColor: "border-orange-200",
  },
  {
    id: 5,
    title: "Launch & Support",
    fullTitle: "Launch & Support",
    description: "Going live and supporting your continued success",
    longDescription:
      "We handle the complete launch process and provide ongoing support to ensure your success. From deployment to training your team, we're committed to your long-term growth and satisfaction.",
    icon: <Rocket className="w-6 h-6" />,
    duration: "Ongoing",
    deliverables: ["Live Application", "Documentation", "Training", "Support"],
    activities: [
      "Deployment",
      "Team Training",
      "Monitoring Setup",
      "Ongoing Support",
    ],
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50",
    textColor: "text-indigo-600",
    borderColor: "border-indigo-200",
  },
];

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-center mb-16 relative">
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight relative z-10">
              How We Turn{" "}
              <span className="logo bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Ideas
              </span>{" "}
              into{" "}
              <span className="logo bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                Results
              </span>
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed z-10 relative">
              A proven methodology that transforms ideas into exceptional
              digital experiences
            </p>
            {/* Decorative Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 via-blue-200 to-green-200 opacity-20 rounded-3xl -z-10" />
          </div>
        </div>

        {/* Desktop: Horizontal Step Cards */}
        <div className="hidden lg:block mb-16">
          <div className="flex justify-between items-center mb-12">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setActiveStep(index)}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                  aria-label={`Step ${index + 1}: ${step.fullTitle} (${
                    step.duration
                  })`}
                  title={`${step.fullTitle} • ${step.duration}`}
                  className={`relative group transition-all duration-300 ${
                    activeStep === index
                      ? "transform scale-110"
                      : "hover:scale-105"
                  }`}
                >
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white transition-all duration-300 ${
                      activeStep === index
                        ? step.color + " shadow-xl shadow-black/20"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="text-center mt-4">
                    <div
                      className={`font-bold text-lg transition-colors duration-300 ${
                        activeStep === index ? step.textColor : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{step.duration}</span>
                    </div>
                  </div>

                  {/* Tooltip */}
                  {hoveredStep === index && hoveredStep !== activeStep && (
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap z-10">
                      {step.description}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
                    </div>
                  )}
                </button>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 rounded-full transition-all duration-700 ${
                      activeStep > index ? step.color : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Active Step Details */}
          <div
            className={`p-10 rounded-3xl border-2 transition-all duration-500 ${
              steps[activeStep].lightColor + " " + steps[activeStep].borderColor
            } shadow-xl`}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-8 h-8 rounded-2xl flex items-center justify-center text-white ${steps[activeStep].color} shadow-lg`}
                  >
                    {steps[activeStep].icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {steps[activeStep].fullTitle}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {steps[activeStep].duration}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {steps[activeStep].longDescription}
                </p>

                <button
                  onClick={() => setShowDetails(true)}
                  className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 text-white ${steps[activeStep].color}`}
                >
                  <PlayCircle className="w-5 h-5" />
                  View Details
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      showDetails ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-8">
                {/* Deliverables */}
                <div>
                  <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-3">
                    <Target
                      className={`w-6 h-6 ${steps[activeStep].textColor}`}
                    />
                    Deliverables
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {steps[activeStep].deliverables.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activities */}
                <div>
                  <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-3">
                    <Users
                      className={`w-6 h-6 ${steps[activeStep].textColor}`}
                    />
                    Key Activities
                  </h4>
                  <div className="space-y-3">
                    {steps[activeStep].activities.map((activity, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-xl ${steps[activeStep].lightColor}`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${steps[activeStep].color}`}
                        >
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-700">
                          {activity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Swipeable Cards */}
        <div className="lg:hidden">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  activeStep === index
                    ? step.lightColor + " " + step.borderColor + " shadow-lg"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setActiveStep(activeStep === index ? -1 : index)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                        activeStep === index ? step.color : "bg-gray-400"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.fullTitle}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{step.duration}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      activeStep === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <p className="text-gray-700 mb-4">{step.description}</p>

                {/* Expanded Content */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    activeStep === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-6 pt-4 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {step.longDescription}
                    </p>

                    {/* Mobile Deliverables */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Target className={`w-4 h-4 ${step.textColor}`} />
                        What You Get
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {step.deliverables.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Activities */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb- flex items-center gap-2">
                        <Users className={`w-4 h-4 ${step.textColor}`} />
                        Our Approach
                      </h4>
                      <div className="space-y-2">
                        {step.activities.map((activity, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold ${step.color}`}
                            >
                              {idx + 1}
                            </div>
                            <span className="text-gray-700">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <div className="inline-block p-8 bg-white rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Ideas?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Let's discuss your project and create something extraordinary
              together
            </p>
            <Link to="/pricing">
              <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showDetails && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowDetails(false)}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-[90vw] max-w-4xl aspect-video overflow-hidden">
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full px-3 py-1 text-sm"
              aria-label="Close video"
            >
              Close
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/ysz5S6PUM-U?autoplay=1&rel=0`}
              title="How We Work Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
