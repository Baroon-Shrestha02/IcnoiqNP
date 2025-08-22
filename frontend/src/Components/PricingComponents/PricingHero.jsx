import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PricingHero() {
  const backgroundImage = "Uploads/newPricing.jpg";

  return (
    <div className="relative min-h-[60vh] md:min-h-[80vh]  flex flex-col justify-end rounded-b-4xl text-white overflow-hidden shadow-2xl shadow-slate-500">
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent " />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 " />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40 " />

      {/* Content */}
      <div className="container mx-auto pb-16 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-12">
          <div className="col-span-3 pl-4">
            <AnimatePresence mode="wait">
              <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-bold logo mb-4 drop-shadow-lg">
                Our Pricing
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p className="text-lg md:text-xl font-light mt-4 max-w-2xl leading-relaxed text-white/90 drop-shadow-sm">
                Transparent, flexible pricing tailored to fit your brand’s
                unique needs and goals.
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
