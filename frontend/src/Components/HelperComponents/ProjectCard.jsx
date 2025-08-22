import React from "react";

export default function ProjectCard({ project, index, onHover, onLeave }) {
  const isRight = index % 2 !== 0;

  return (
    <div
      className={`group relative flex flex-col ${isRight ? "md:mt-[20%]" : ""}`}
    >
      <div
        className="relative overflow-hidden shadow-md cursor-none "
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/90 opacity-50 hover:opacity-25 group-hover:opacity-100 transition duration-300"></div>
      </div>

      <div>
        <h3 className="text-2xl font-bold">{project.title}</h3>
        <p className="text-gray-500 font-extralight idden grop-hover:block">
          {project.subtitle}
        </p>
      </div>
    </div>
  );
}
