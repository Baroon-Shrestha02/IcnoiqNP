import React from "react";

import { FaUsers, FaHeadset, FaHandshake, FaDollarSign } from "react-icons/fa";
import AboutHeroVideo from "./AboutHeroVideo";
import MissionSection from "./MissionSection";
import MeetTheTeam from "./MeetTheTeam";
import WhyChooseUs from "./WhyChooseUs";
import Vision from "./Vision";

export default function AboutMediaContent() {
  return (
    <>
      <AboutHeroVideo />
      <MissionSection />
      {/* <VisionSection /> */}
      {/* <Vision /> */}
      <MeetTheTeam />
      <WhyChooseUs />
    </>
  );
}
