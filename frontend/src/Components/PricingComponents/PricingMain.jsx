import React from "react";
import PricingHero from "./PricingHero";
import Pricing from "./Pricing";
import PricingFAQ from "./PricingFAQ";

export default function PricingMain() {
  return (
    <div>
      <PricingHero />
      <Pricing />
      <PricingFAQ />
    </div>
  );
}
