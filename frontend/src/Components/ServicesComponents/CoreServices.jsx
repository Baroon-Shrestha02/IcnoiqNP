import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CoreServicesData = [
  {
    id: 1,
    title: "Digital Marketing",
    subtitle: "We strategize content that converts.",
    description:
      "Our digital marketing services focus on creating data-driven strategies that deliver measurable results. We combine creative content with advanced analytics to build campaigns that not only engage your audience but drive conversions. From social media management to performance advertising, we ensure your brand reaches the right people at the right time with compelling messages that inspire action.",
    title2: "What we provide",
    points: [
      "Social media ads and organic posts",
      "Instagram reels and TikTok videos",
      "Email marketing and digital content",
    ],
    image: "Uploads/marketing.avif",
  },
  {
    id: 2,
    title: "Digital Branding",
    subtitle: "Crafting your visual identity.",
    description:
      "We create cohesive brand identities that resonate with your target audience and differentiate you from competitors. Our branding process involves deep market research, competitor analysis, and collaborative design sessions to develop a visual language that authentically represents your values and mission. Every element from logo to color palette is carefully crafted to create lasting brand recognition.",
    title2: "What we provide",
    points: [
      "Custom logo design and brand identity",
      "Comprehensive brand guidelines and style guides",
      "Strategic color systems and typography",
    ],
    image: "Uploads/branding.png",
  },
  {
    id: 3,
    title: "Web Development",
    subtitle: "Building scalable websites.",
    description:
      "We develop modern, responsive websites that provide exceptional user experiences across all devices. Our development approach emphasizes performance, security, and scalability, ensuring your website can grow with your business. Using cutting-edge technologies and best practices, we create websites that not only look great but also rank well in search engines and convert visitors into customers.",
    title2: "What we provide",
    points: [
      "Mobile-first responsive websites",
      "Custom eCommerce platforms and online stores",
    ],
    image: "Uploads/webdev.jpg",
  },
  {
    id: 4,
    title: "Poster and Motion Graphics",
    subtitle: "Short-form video that sells.",
    description:
      "Our video production services specialize in creating engaging short-form content optimized for social media platforms. We understand the nuances of different platforms and create videos that capture attention within the first few seconds. From concept development to final delivery, we handle every aspect of video production to ensure your content stands out in crowded feeds.",
    title2: "What we provide",
    points: [
      "Professional reels editing and post-production",
      "Custom motion graphics and animations",
    ],
    image: "Uploads/reels.jpg",
  },
];

export default function CoreServices() {
  const wrapperRefs = useRef([]);

  useEffect(() => {
    // Only apply ScrollTrigger on medium screens and larger (md: 768px+)
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const setupScrollTrigger = () => {
      if (mediaQuery.matches) {
        wrapperRefs.current.forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "85% center",
            pin: el.querySelector(".left-side"),
            pinSpacing: false,
          });
        });
      }
    };

    setupScrollTrigger();

    // Listen for screen size changes
    const handleResize = () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      setupScrollTrigger();
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <>
      <div className="container mx-auto py-12 ">
        <div className="flex items-center justify-center flex-col gap-6">
          <div className="text-4xl md:text-6xl text-center">
            Our{" "}
            <span className="bg-gradient-to-r from-[#C848C1] to-[#54A6F9] bg-clip-text text-transparent logo">
              Core{" "}
            </span>
            Services{" "}
          </div>
          <div className="text-lg md:text-xl font-extralight max-w-3xl text-center">
            At Iconiq, we craft stunning designs, build powerful websites and
            launch digital campaigns that drive results.
          </div>
        </div>
        <section className=" px-4 py-16 space-y-[8vh] md:space-y-[20vh]">
          {CoreServicesData.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
              ref={(el) => (wrapperRefs.current[index] = el)}
            >
              {/* Left (pinned per section on desktop, normal flow on mobile) */}
              <div className="left-side relative">
                <div className="md:sticky md:top-[15%] space-y-4 flex flex-col md:items-end items-center mb-4 md:mb-0">
                  <h2 className="text-3xl md:text-5xl font-bold text-center md:text-right">
                    {item.title}
                  </h2>
                  <p className="text-base md:text-xl text-gray-500 font-extralight text-center md:text-right">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-6 ">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full rounded-xl object-cover"
                />
                <p className="text-gray-700 text-lg text-justify leading">
                  {item.description}
                </p>
                <div>
                  <h4 className="text-xl font-semibold underline mb-2">
                    <b>{item.title2}</b>
                  </h4>
                  <ul className="list-disc pl-5 text-lg space-y-1 text-gray-800">
                    {item.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
