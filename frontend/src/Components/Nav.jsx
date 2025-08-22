import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./Context/useAuth";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { admin, logout } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Check if a link is active
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if user has scrolled from top
      setHasScrolled(currentScrollY > 10);

      // Show/hide navbar based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or near top - show navbar
        setIsVisible(true);
      } else {
        // Scrolling down - hide navbar
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/project", label: "Work" },
    { path: "/services", label: "Services" },
    { path: "/pricing", label: "Pricing" },
    { path: "/blog", label: "Blogs" },

    ...(admin?.role === "admin" ? [{ path: "/chat", label: "Chat" }] : []),
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isVisible ? "transform translate-y-0" : "transform -translate-y-full"
        } ${
          hasScrolled
            ? "bg-white backdrop-blur-md shadow-lg border-b border-gray-200/20"
            : ""
        }`}
      >
        <div className="container mx-auto bg-white/80 backdrop-blur-md rounded-4xl">
          <div className="flex items-center justify-between lg:justify-around py-4 px-6 lg:px-0">
            {/* Logo */}
            <Link to="/">
              <div className="logo text-4xl">
                <p className="">IconiQ</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <div
                    className={`relative cursor-pointer transition-colors duration-300 text-lg font-medium group ${
                      isActiveLink(item.path)
                        ? "bg-gradient-to-l from-[#C848C1] to-[#54A6F9] text-transparent bg-clip-text"
                        : "text-gray-700 hover:bg-gradient-to-l hover:from-[#C848C1] to-[#54A6F9] hover:text-transparent bg-clip-text"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-l from-[#C848C1] to-[#54A6F9] transition-all duration-300 ease-out ${
                        isActiveLink(item.path)
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop Contact Button */}
            {admin?.role === "admin" ? (
              <button
                onClick={logout}
                className="hidden lg:block px-7 py-3 rounded-3xl logo transition-all duration-300 text-lg font-medium bg-gradient-to-r from-[#C848C1] to-[#54A6F9] text-white"
              >
                Logout
              </button>
            ) : (
              <Link to="/contact">
                <div className="hidden lg:block px-7 py-3 rounded-3xl logo transition-all duration-300 text-lg font-medium bg-gradient-to-r from-[#C848C1] to-[#54A6F9] text-white">
                  Contact
                </div>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md hover:bg-red-200 transition-colors z-60 relative"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`fixed inset-0 bg-white transform transition-all duration-500 ease-in-out z-40 lg:hidden ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex flex-col h-full min-h-screen">
          {/* Mobile Header - Fixed at top */}
          <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <Link to="/">
              <div className="logo text-2xl sm:text-3xl">
                <p className="">IconiQ</p>
              </div>
            </Link>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Navigation - Scrollable Content */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Main Navigation */}
            <div className="flex-1 py-4 sm:py-8">
              <nav className="flex flex-col space-y-2 sm:space-y-4 px-4 sm:px-8">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path}>
                    <div
                      className={`text-center py-4 sm:py-5 rounded-lg cursor-pointer transition-all duration-300 text-xl sm:text-2xl font-medium border-b border-gray-100 relative group ${
                        isActiveLink(item.path)
                          ? "bg-gradient-to-l from-[#C848C1] to-[#54A6F9] text-transparent bg-clip-text"
                          : "text-gray-700 hover:bg-gradient-to-l hover:from-[#C848C1] hover:to-[#54A6F9] hover:text-transparent hover:bg-clip-text"
                      }`}
                      onClick={closeSidebar}
                    >
                      {item.label}
                      {/* Mobile animated underline */}
                      <span
                        className={`absolute left-1/2 bottom-3 h-0.5 bg-gradient-to-l from-[#C848C1] to-[#54A6F9] transition-all duration-300 ease-out transform -translate-x-1/2 ${
                          isActiveLink(item.path)
                            ? "w-12 sm:w-16"
                            : "w-0 group-hover:w-12 group-hover:sm:w-16"
                        }`}
                      ></span>
                    </div>
                  </Link>
                ))}
              </nav>

              {/* Mobile Contact Button */}
              {admin?.role === "admin" ? (
                <button
                  onClick={() => {
                    logout();
                    closeSidebar();
                  }}
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300 text-lg sm:text-xl font-medium bg-gradient-to-r from-[#C848C1] to-[#54A6F9] text-white hover:shadow-lg transform hover:scale-105"
                >
                  Logout
                </button>
              ) : (
                <Link to="/contact">
                  <button
                    onClick={closeSidebar}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300 text-lg sm:text-xl font-medium bg-gradient-to-r from-[#C848C1] to-[#54A6F9] text-white hover:shadow-lg transform hover:scale-105"
                  >
                    Contact
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Footer - Always visible at bottom */}
            <div className="flex-shrink-0 border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="flex justify-center space-x-4 sm:space-x-6">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#C848C1] transition-colors text-sm sm:text-base"
                  >
                    Privacy
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#C848C1] transition-colors text-sm sm:text-base"
                  >
                    Terms
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#C848C1] transition-colors text-sm sm:text-base"
                  >
                    Support
                  </a>
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  © 2024 IconiQ. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
