import React from "react";
import { Link } from "react-router-dom";

const projects = [
  {
    image: "/Uploads/momiji2.jpg",
    title: "Momiji International Academy",
    subtitle: "Japan-Focused Educational Consultancy",
  },
  {
    image: "/Uploads/ghar.jpg",
    title: "Ghar Sansar Pvt Ltd.",
    subtitle: "Hardware & Home Essentials Supplier",
  },
  {
    image: "/Uploads/ns.jpg",
    title: "NS Automobiles Pvt Ltd",
    subtitle: "Certified Auto Dealership – New & Pre-Owned",
  },
  {
    image: "/Uploads/navadevi.jpg",
    title: "Navadebi Jwellers",
    subtitle: "Jewelery Store",
  },
];

export default function HomeProjects() {
  return (
    <div className="w-full bg-gray-50 py-12 pt-[18rem] md:pt-[6rem]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrablod text-gray-800 mb-6 tracking-wide font-extrabold">
            Our{" "}
            <span className="logo text-transparent bg-clip-text bg-gradient-to-b from-[#C848C1] to-[#54A6F9] ">
              Projects
            </span>
          </h2>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Discover our innovative solutions and creative endeavors that shape
            the future
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-gray-200">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  {/* Hover Content */}
                  <div className="absolute bottom-6 left-6 right-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="w-12 h-0.5 bg-white mb-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-300"></div>
                    <p className="text-white text-sm font-light leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Project Info */}
                <div className="pt-6 pb-2">
                  <h3 className="text-xl font-medium text-gray-800 mb-2 transition-colors duration-300 group-hover:text-gray-600">
                    {project.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-gray-300 group-hover:bg-gray-800 group-hover:w-12 transition-all duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/project">
            <button className="group relative inline-flex items-center gap-3 text-gray-800 font-medium text-lg tracking-wide hover:text-gray-600 transition-colors duration-300">
              <div className="flex items-center flex-col">
                <span>View All Projects</span>
                <div className="w-20 h-0.5 bg-gray-400 group-hover:w-12 group-hover:bg-gray-800 transition-all duration-300"></div>
              </div>{" "}
              <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
