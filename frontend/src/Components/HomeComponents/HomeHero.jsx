import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../Nav";

const initialCards = [
  {
    title: "Multo",
    subtitle: "Cup of Joe",
    image: "/Uploads/img1.jpeg",
  },
  {
    title: "Dulo",
    subtitle: "Cup of Joe",
    image: "/Uploads/img2.jpeg",
  },
  {
    title: "Tingin",
    subtitle: "Cup of Joe",
    image: "/Uploads/img3.jpeg",
  },
  {
    title: "Tatlong Buwan",
    subtitle: "Cup of Joe",
    image: "/Uploads/hero.jpeg",
  },
];

export default function HomeHero() {
  const [cards, setCards] = useState(initialCards);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-red-900 to-black min-h-[80vh] flex flex-col justify-end rounded-4xl text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-4xl"
        style={{
          backgroundImage: "url('Uploads/img.jpeg')",
        }}
      />
      <div className="container mx-auto pb-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-12">
          {/* Text Content */}
          <div className="col-span-3">
            <div className="mb-3 inline-block bg-white text-black text-xs px-3 py-1 rounded-full">
              Welcome
            </div>
            <h1 className="text-6xl font-bold logo">IconiQ</h1>
            <p className="text-sm font-light mt-4 max-w-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero a
              omnis voluptates nisi aut, assumenda eligendi odit! Eius ex
              aspernatur praesentium minus cumque minima quia.
            </p>
          </div>

          {/* Framer Motion Card Stack */}
          <div className="relative hidden md:block h-[260px] w-full">
            <AnimatePresence initial={false}>
              {cards.slice(0, 4).map((card, index) => (
                <motion.div
                  key={card.title + index}
                  initial={{ opacity: 0, scale: 0.9, x: 30 }}
                  animate={{ opacity: 1, scale: 1, x: index * 40 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{
                    zIndex: cards.length - index,
                    width: "180px",
                  }}
                  className="absolute top-0 left-0"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-[140px] object-cover m-2 rounded-lg"
                    />
                    <div className="p-3">
                      <h4 className="font-semibold">{card.title}</h4>
                      <p className="text-sm opacity-70">{card.subtitle}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="md:hidden overflow-x-auto flex gap-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="min-w-[160px] bg-white/10 rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-[140px] object-cover"
                />
                <div className="p-3">
                  <h4 className="font-semibold">{card.title}</h4>
                  <p className="text-sm opacity-70">{card.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
