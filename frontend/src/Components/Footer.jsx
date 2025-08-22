import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const pageLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/project" },
  ];

  const workAndServiceLinks = [
    { name: "Work", href: "/project" },
    { name: "Blog", href: "/blog" },
    { name: "Pricing", href: "/pricing" },
  ];

  const bottomLinks = [
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/policy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook />,
      href: "https://www.facebook.com/iconiqnp/?rdid=rNX7SW2qKqC4mgto",
      color: "hover:text-white",
      bgcolor: "hover:bg-blue-400",
    },
    {
      name: "Instagram",
      icon: <Instagram />,
      href: "https://www.instagram.com/iconiqnp/#",
      color: "hover:text-white",
      bgcolor: "hover:bg-pink-400",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin />,
      href: "https://www.linkedin.com/in/iconiq/",
      color: "hover:text-white",
      bgcolor: "hover:bg-blue-500",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#C848C1] via-[#8B5CF6] to-[#54A6F9] text-white mt-16 relative overflow-hidden rounded-t-4xl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 right-16 w-24 h-24 bg-yellow-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-300 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-cyan-300 rounded-full blur-lg animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top Section - Brand & CTA */}
        <div className="py-12 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Brand Section */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <div className="h-30 w-30 -mr-3">
                  <img
                    src="Uploads/logo_head.png"
                    alt="Iconiq Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="logo text-3xl font-bold bg-white bg-clip-text text-transparent">
                  iconiq
                </div>
              </div>
              <p className="text-white/80 text-xl max-w-md mx-auto lg:mx-0">
                Creating digital experiences that inspire and transform your
                business vision into reality.
              </p>
            </div>

            {/* Contact Highlight */}
            <div className="text-center lg:text-right">
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">
                Ready to start your project?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-end">
                <a
                  href="mailto:iconiqnp@gmail.com"
                  className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group"
                >
                  <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Get in Touch
                  <ExternalLink className="w-3 h-3 ml-2 opacity-70" />
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("+977 9864687572");
                    toast.success("Phone number copied!");
                  }}
                  className="inline-flex items-center px-4 py-2 bg-yellow-400/20 backdrop-blur-sm rounded-full hover:bg-yellow-400/30 transition-all duration-300 group"
                >
                  <Phone className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <ArrowRight className="w-5 h-5 mr-2 text-yellow-400" />
                Pages
              </h3>
              <ul className="space-y-3">
                {pageLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.href}
                      className="group flex items-center text-white/80 hover:text-yellow-300 transition-all duration-300 relative pl-4"
                    >
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-yellow-400 group-hover:w-3 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 text-base">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <ArrowRight className="w-5 h-5 mr-2 text-yellow-400" />
                Services
              </h3>
              <ul className="space-y-3">
                {workAndServiceLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.href}
                      className="group flex items-center text-white/80 hover:text-yellow-300 transition-all duration-300 relative pl-4"
                    >
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-yellow-400 group-hover:w-3 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 text-base">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
                Location
              </h3>
              <div className="space-y-4">
                {/* Address Card */}
                {/* <div className=" p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"> */}
                <div>
                  <a
                    href="https://www.google.com/maps?q=Sankhamul,+Kathmandu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-yellow-300 transition-colors duration-300"
                  >
                    <p className="font-semibold text-yellow-200 text-base">
                      Sankhamul, Naya Baneshwor
                    </p>
                    <p className="text-white/70 text-sm mt-1">
                      Kathmandu, Nepal
                    </p>
                  </a>
                </div>

                {/* Quick Contact */}
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-white hover:text-yellow-300 transition-colors cursor-pointer">
                    <Mail className="w-4 h-4 mr-2" />
                    <a href="mailto:iconiqnp@gmail.com">iconiqnp@gmail.com</a>
                  </div>
                  <div className="flex items-center text-sm text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText("+977 9864687572");
                          toast.success("Phone copied!");
                        }}
                        className="block hover:text-yellow-300 transition-colors"
                      >
                        +977 986‑4687572
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText("+977 9705337437");
                          toast.success("Phone copied!");
                        }}
                        className="block hover:text-yellow-300 transition-colors"
                      >
                        +977 970-5337437
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Stay Connected</h3>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} ${social.bgcolor} transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 p-2 rounded-full bg-white/10 backdrop-blur-sm`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-white text-md">
                  Follow us for latest updates and behind-the-scenes content
                  from our creative projects.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-xs text-white/60">
                &copy; {currentYear} Iconiq. All rights reserved.
              </p>
            </div>

            {/* Bottom Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {bottomLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.href}
                  className="group flex items-center text-xs text-white/60 hover:text-yellow-300 transition-all duration-300 relative pl-3"
                >
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-yellow-400 group-hover:w-2 transition-all duration-300"></span>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center text-xs text-white/60 hover:text-yellow-300 transition-all duration-300 group"
            >
              <span className="mr-2">Back to Top</span>
              <ArrowRight className="w-3 h-3 -rotate-90 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
