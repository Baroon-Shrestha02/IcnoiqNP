import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaUsers,
  FaCheck,
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../Utils/api";
import { LucideCircleCheckBig, Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      // Send data to your backend (Axios already parses response)
      const response = await api.post("/send-mail", formData);

      const result = response.data; // ✅ Axios stores data here

      if (result.success) {
        toast.success("Email sent successfully!");

        // Optional: also send to WhatsApp
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          number: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Failed to send email. Try again!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="max-w-7xl w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-1 bg-gradient-to-br from-gray-900 to-gray-800 p-8 lg:p-10 text-white relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#C848C1]/10 to-[#54A6F9]/10"></div>
            <div className="relative z-10">
              <motion.h2
                className="text-3xl font-bold mb-8 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Get In Touch
              </motion.h2>
              {/* Contact Details */}
              <motion.div
                className="space-y-6 mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                <div className="flex items-center space-x-4 group">
                  <div className="bg-gradient-to-r from-[#C848C1] to-[#54A6F9] p-3 rounded-full group-hover:scale-110 transition-transform">
                    <FaMapMarkerAlt className="text-white" />
                  </div>
                  <div>
                    <a
                      href="https://www.google.com/maps?q=Sankhamul,+Kathmandu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block space-y-1 hover:text-yellow-400 transition-colors duration-300"
                    >
                      <p className="text-gray-300 text-sm">Location</p>
                      <p className="text-white font-medium">
                        Sankhamul, Kathmandu
                      </p>
                      <p className="text-gray-300 text-sm">Naya Baneshwor</p>
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="bg-gradient-to-r from-[#C848C1] to-[#54A6F9] p-3 rounded-full group-hover:scale-110 transition-transform">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div>
                    <a href="mailto:info@iconiq.com">
                      <p className="text-gray-300 text-sm">Email</p>
                      <p className="text-white font-medium">
                        Iconiqnp@gmail.com
                      </p>
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="bg-gradient-to-r from-[#C848C1] to-[#54A6F9] p-3 rounded-full group-hover:scale-110 transition-transform">
                    <FaPhone className="text-white rotate-90" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Phone</p>
                    <button
                      className="text-white font-medium"
                      onClick={() => {
                        navigator.clipboard.writeText("+977 986-4687572");
                        toast.success("Phone number copied to clipboard!");
                      }}
                    >
                      +977 986-4687572
                    </button>
                    <button
                      className="text-white font-medium"
                      onClick={() => {
                        navigator.clipboard.writeText("+977 9705337437");
                        toast.success("Phone number copied to clipboard!");
                      }}
                    >
                      +977 970-5337437
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="bg-gradient-to-r from-[#C848C1] to-[#54A6F9] p-3 rounded-full group-hover:scale-110 transition-transform">
                    <FaClock className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Office Hours</p>
                    <p className="text-white font-medium">
                      Sun - Fri: 10:00 AM - 6:00 PM
                    </p>
                    <p className="text-gray-300 font-medium">Sat: Closed</p>
                  </div>
                </div>
              </motion.div>
              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Follow Us
                </h3>
                <div className="flex space-x-3">
                  {[
                    {
                      href: "https://www.facebook.com/iconiqnp/?rdid=rNX7SW2qKqC4mgto",
                      icon: <FaFacebookF />,
                      color: "hover:bg-blue-600",
                    },
                    {
                      href: "https://www.instagram.com/iconiqnp/#",
                      icon: <FaInstagram />,
                      color: "hover:bg-pink-600",
                    },
                    {
                      href: "https://www.linkedin.com/in/iconiq/",
                      icon: <FaLinkedinIn />,
                      color: "hover:bg-blue-700",
                    },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 ${social.color}`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2 p-8 lg:p-10 bg-white"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Send us a Message
              </h2>
              <p className="text-gray-600 text-lg">
                Fill out the form below and we'll get back to you within 24
                hours. We're excited to hear about your Queries!
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
                Please provide valid and accurate details. We will use your
                contact information to respond to your inquiry.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div whileFocus={{ scale: 1.02 }} className="group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#C848C1] focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white group-hover:border-gray-300"
                    required
                  />
                </motion.div>
                <motion.div whileFocus={{ scale: 1.02 }} className="group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#C848C1] focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white group-hover:border-gray-300"
                    required
                  />
                </motion.div>
              </div>

              <motion.div whileFocus={{ scale: 1.02 }} className="group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#C848C1] focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white group-hover:border-gray-300"
                  required
                />
              </motion.div>
              <motion.div whileFocus={{ scale: 1.02 }} className="group">
                <input
                  type="number"
                  name="number"
                  placeholder="Phone Number"
                  value={formData.number}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#C848C1] focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white group-hover:border-gray-300"
                  required
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }} className="group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#C848C1] focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white group-hover:border-gray-300"
                  required
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }} className="group">
                <textarea
                  name="message"
                  placeholder="Tell us about your Queries..."
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#C848C1] focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white group-hover:border-gray-300 resize-none"
                  required
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-8 bg-gradient-to-r from-[#C848C1] to-[#54A6F9] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center space-x-2"
                disabled={submitted}
              >
                {submitted ? (
                  <>
                    <LucideCircleCheckBig className="text-white" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="text-white" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
        <motion.div
          className="rounded-b-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.070157023264!2d85.33520141506262!3d27.700769982795407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190da659c7a9%3A0x7e5a8f2b8c26c0b7!2sSankhamul%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1687181234567!5m2!1sen!2snp"
            width="100%"
            height="300"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            className="w-full h-[300px] rounded-b-2xl"
          ></iframe>
        </motion.div>
        ;
      </motion.div>
    </div>
  );
}
