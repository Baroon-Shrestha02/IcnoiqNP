import React from "react";
import AboutMediaContent from "./AboutMediaContent";
import AboutHero from "./AboutHero";
import WhoAreWe from "./WhoAreWe";
import CTA from "./CTA";

export default function AboutMain() {
  return (
    <div>
      <AboutHero />
      {/* <WhoAreWe /> */}
      <AboutMediaContent />
      <CTA />
    </div>
  );
}
