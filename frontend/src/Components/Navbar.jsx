import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrolled(true); // Hide navbar on scroll down
      } else if (currentScrollY < lastScrollY) {
        setScrolled(false); // Show navbar on scroll up
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/project", label: "Projects" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 transition-transform duration-300 ${
        scrolled ? "-translate-y-full" : "translate-y-0"
      } bg-white/95 backdrop-blur-md shadow-lg`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[10vh]">
          {/* Logo */}
          <Link to="/" onClick={closeMenu}>
            <div className="text-4xl font-extrabold text-gray-800 hover:text-blue-600 transition-all duration-300 hover:scale-105">
              Omni
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center text-lg gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium group ${
                  currentPath === link.path ? "text-blue-600" : ""
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${
                    currentPath === link.path ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={closeMenu}
              className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105 ${
                currentPath === "/contact" ? "bg-blue-700 scale-105" : ""
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1 focus:outline-none group"
            aria-label="Toggle menu"
          >
            <div
              className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 group-hover:bg-blue-600 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 group-hover:bg-blue-600 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 group-hover:bg-blue-600 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="py-4 space-y-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-2 rounded-md hover:bg-blue-50 ${
                  currentPath === link.path ? "text-blue-600 bg-blue-50" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={closeMenu}
              className={`block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center shadow-md hover:shadow-lg mt-4 ${
                currentPath === "/contact" ? "bg-blue-700" : ""
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
