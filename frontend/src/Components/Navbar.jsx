import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./Context/useAuth";
import { motion, AnimatePresence } from "framer-motion";

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

  const isActiveLink = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHasScrolled(currentScrollY > 10);

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
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

  // Updated Animation variants for new design
  const sidebarVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        opacity: { duration: 0.3 },
        scale: { duration: 0.4, delay: 0.1 },
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
        opacity: { duration: 0.2 },
      },
    },
  };

  const listVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    }),
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, delay: 0.1 },
    },
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          hasScrolled
            ? "bg-white backdrop-blur-md shadow-lg border-b border-gray-200/20"
            : ""
        }`}
      >
        <div className="container mx-auto bg-white/80 backdrop-blur-md md:rounded-4xl">
          <div className="flex items-center justify-between lg:justify-around py-4 px-6 lg:px-0">
            {/* Logo */}
            <Link to="/">
              <div className="logo text-4xl">
                <p>IconiQ</p>
              </div>
            </Link>

            {/* Desktop Nav */}
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
                      className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-l from-[#C848C1] to-[#54A6F9] transition-all duration-300 ${
                        isActiveLink(item.path)
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop Button */}
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
              className="lg:hidden p-2 rounded-md cursor-pointer transition-colors z-60 relative"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay with blur effect */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeSidebar}
            />

            {/* Sidebar with new design */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 sm:w-96 z-50 flex flex-col"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Glass morphism background */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95 backdrop-blur-xl shadow-2xl rounded-l-3xl border-l border-t border-b border-gray-200/30"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Header with close button */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/20">
                  <motion.div
                    className="logo text-2xl font-bold bg-gradient-to-r from-[#C848C1] to-[#54A6F9] text-transparent bg-clip-text"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    IconiQ
                  </motion.div>
                  <motion.button
                    onClick={closeSidebar}
                    className="p-2 rounded-full hover:bg-gray-100/50 transition-colors duration-200"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={24} className="text-gray-600" />
                  </motion.button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-3">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.path}
                      custom={i}
                      variants={listVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link to={item.path} onClick={closeSidebar}>
                        <motion.div
                          className={`relative block py-4 px-6 rounded-2xl text-lg font-medium transition-all duration-300 group ${
                            isActiveLink(item.path)
                              ? "bg-gradent-to-r from-[#C848C1]/10 to-[#54A6F9]/10  "
                              : "hover:bg-gradient-to-r hover:from-[#C848C1]/5 hover:to-[#54A6F9]/5 "
                          }`}
                          whileHover={{ x: 8, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Active indicator */}
                          {isActiveLink(item.path) && (
                            <motion.div
                              className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-[#C848C1] to-[#54A6F9]"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                delay: 0.2 + i * 0.08,
                                duration: 0.3,
                              }}
                            />
                          )}
                          <span
                            className={`ml-4 ${
                              isActiveLink(item.path)
                                ? "bg-gradient-to-r from-[#C848C1] to-[#54A6F9] text-transparent bg-clip-text font-semibold"
                                : "text-gray-700 group-hover:bg-gradient-to-r group-hover:from-[#C848C1] group-hover:to-[#54A6F9] group-hover:text-transparent group-hover:bg-clip-text"
                            }`}
                          >
                            {item.label}
                          </span>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Footer with enhanced button */}
                <motion.div
                  className="p-6 border-t border-gray-200/20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {admin?.role === "admin" ? (
                    <motion.button
                      onClick={() => {
                        logout();
                        closeSidebar();
                      }}
                      className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-[#C848C1] to-[#54A6F9] text-white text-lg font-semibold shadow-xl hover:shadow-2xl transform transition-all duration-300 relative overflow-hidden"
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Logout</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.button>
                  ) : (
                    <Link to="/contact" onClick={closeSidebar}>
                      <motion.button
                        className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-[#C848C1] to-[#54A6F9] text-white text-lg font-semibold shadow-xl hover:shadow-2xl transform transition-all duration-300 relative overflow-hidden"
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">Contact</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.button>
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
