import React, { useEffect, useRef, useState } from "react";
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
} from "lucide-react";

const steps = [
  {
    title: "Discovery & Planning",
    description:
      "We begin with an in-depth consultation to understand your business objectives, target audience, and project scope. Our team conducts thorough market research, competitor analysis, and user persona development to create a solid foundation for your project.",
    icon: <Search className="w-6 h-6" />,
    duration: "1-2 weeks",
    deliverables: [
      "Project Brief",
      "User Research",
      "Technical Requirements",
      "Timeline",
    ],
    keyActivities: [
      "Stakeholder Interviews",
      "Market Analysis",
      "Goal Definition",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Strategy & Design",
    description:
      "Our creative team develops a comprehensive design strategy that aligns with your brand identity and user needs. We create wireframes, user journey maps, and high-fidelity prototypes that serve as the blueprint for your digital solution.",
    icon: <Palette className="w-6 h-6" />,
    duration: "2-3 weeks",
    deliverables: [
      "Design System",
      "Wireframes",
      "Prototypes",
      "Brand Guidelines",
    ],
    keyActivities: [
      "Information Architecture",
      "UI/UX Design",
      "Design Reviews",
    ],
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Development & Build",
    description:
      "Using modern technologies and best practices, we transform designs into fully functional, responsive applications. Our development process emphasizes clean code, scalability, and performance optimization to ensure your solution performs flawlessly across all devices.",
    icon: <Zap className="w-6 h-6" />,
    duration: "3-6 weeks",
    deliverables: [
      "Frontend Development",
      "Backend Architecture",
      "Database Setup",
      "API Integration",
    ],
    keyActivities: [
      "Agile Development",
      "Code Reviews",
      "Performance Optimization",
    ],
    image:
      "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Testing & Quality Assurance",
    description:
      "We conduct comprehensive testing across multiple devices, browsers, and scenarios to ensure perfect functionality. Our QA process includes automated testing, user acceptance testing, and performance audits to guarantee a flawless user experience.",
    icon: <Settings className="w-6 h-6" />,
    duration: "1-2 weeks",
    deliverables: [
      "Test Reports",
      "Bug Fixes",
      "Performance Audit",
      "Security Review",
    ],
    keyActivities: ["Cross-browser Testing", "Mobile Testing", "Load Testing"],
    image:
      "https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Launch & Ongoing Support",
    description:
      "We handle the complete deployment process and provide comprehensive training for your team. Our commitment extends beyond launch with continuous monitoring, regular updates, and dedicated support to ensure your solution continues to deliver value and grow with your business.",
    icon: <Rocket className="w-6 h-6" />,
    duration: "Ongoing",
    deliverables: [
      "Live Deployment",
      "Documentation",
      "Training",
      "Support Plan",
    ],
    keyActivities: ["Server Setup", "Domain Configuration", "Team Training"],
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=80",
  },
];

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY + windowHeight / 2;

      // Find which step is currently in view
      let currentStep = 0;
      stepRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            currentStep = index;
          }
        }
      });

      setActiveStep(currentStep);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            How We{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
            Our proven process transforms your vision into reality through
            strategic planning, creative design, and technical excellence.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Scrollable Steps - Left Side */}
          <div className="space-y-32">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                className="min-h-[80vh] flex items-center"
              >
                <div className="w-full">
                  <div className="mb-8">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-80 object-cover rounded-3xl shadow-xl"
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        {step.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-violet-600 mb-1">
                          STEP {index + 1}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xl text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Details - Right Side */}
          <div className="lg:sticky lg:top-6 lg:h-screen lg:flex lg:items-center">
            <div className="w-full bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="space-y-8">
                {/* Active Step Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {steps[activeStep].title}
                    </h3>
                    {/* <p className="text-gray-700 leading-relaxed">
                      {steps[activeStep].description}
                    </p> */}
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-violet-600" />
                      What You'll Receive
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {steps[activeStep].deliverables.map(
                        (deliverable, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm"
                          >
                            <CheckCircle className="w-4 h-4 text-violet-600 flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-700">
                              {deliverable}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* All Key Activities */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-violet-600" />
                      Our Process
                    </h4>
                    <div className="space-y-3">
                      {steps[activeStep].keyActivities.map(
                        (activity, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-violet-50 rounded-xl"
                          >
                            <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {index + 1}
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                              {activity}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-24">
          <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <span>Ready to Start Your Project?</span>
            <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <p className="text-gray-600 text-lg mt-4">
            Let's discuss your project and bring your vision to life
          </p>
        </div>
      </div>
    </section>
  );
}
