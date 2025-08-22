import React from "react";

import ServicesHero from "./ServicesHero";
import ServicesTestimonials from "./ServicesTestimonials";
import HowWeWork from "./HowWeWork";
import CoreServices from "./CoreServices";
import SerrvicesCta from "./SerrvicesCta";

export default function ServicesHome() {
  return (
    <>
      <ServicesHero />
      <CoreServices />
      <HowWeWork />
      <SerrvicesCta />
      <ServicesTestimonials />
    </>
  );
}
