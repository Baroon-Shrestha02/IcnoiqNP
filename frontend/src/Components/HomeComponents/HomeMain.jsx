import React from "react";
import HomeHero from "./HomeHero";
import HomeCTA from "./HomeCTA";
import Intro from "./Intro";
import HomeServices from "./HomeServices";
import HomeProjects from "./HomeProjects";
import AnimatedMediaSection from "./AnimatedMediaSection";
import ParallaxEffect from "./ParallaxEffect";
import Parallax from "./Parallax";
import Testimonials from "./Testimonials";
import Clients from "./Clients";
import HeroSection from "./HeroSection";
import HeroSection2 from "./HeroSection2";
import HeroSection3 from "./HeroSection3";

export default function HomeMain() {
  return (
    <div className="">
      {/* <HomeHero /> */}

      {/* <HeroSection /> */}
      <HeroSection3 />
      {/* <HeroSection2 /> */}
      <Intro />
      <AnimatedMediaSection />
      <ParallaxEffect />

      <Clients />
      <Testimonials />
      {/* <HomeServices /> */}
      {/* <HomeProjects /> */}
      {/* <HomeCTA /> */}
      {/* <Parallax /> */}
    </div>
  );
}
