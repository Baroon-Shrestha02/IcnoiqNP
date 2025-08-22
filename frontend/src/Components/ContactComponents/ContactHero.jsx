import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactHero() {
  return (
    <div className="relative min-h-[60vh] md:min-h-[80vh]  flex flex-col justify-end rounded-4xl text-white overflow-hidden shadow-2xl shadow-slate-500">
      {/* Background Carousel with Enhanced Fade */}
      <div>
        <AnimatePresence mode="wait">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-4xl">
            <img src="Uploads/contact.jpg" alt="" className="object-cover" />
          </div>
        </AnimatePresence>
      </div>

      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent rounded-4xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 rounded-4xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40 rounded-4xl" />

      {/* Content Container */}
      <div className="container mx-auto pb-16 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-12">
          <div className="col-span-3 pl-4">
            <h1 className="text-6xl font-bold logo mb-4 drop-shadow-lg">
              Contact Us
            </h1>

            <motion.p className="text-base md:text-xl font-light mt-4 max-w-3xl leading-relaxed text-white/90 drop-shadow-sm">
              We’re here to help you bring your ideas to life. Whether you have
              questions, project inquiries, or just want to connect—reach out
              and let’s start a conversation that moves your brand forward.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}
