import React from "react";
import { motion } from "framer-motion";

export default function MissionVisionSections() {
  return (
    <div className=" px-4 py-20">
      {/* Mission Section */}
      <motion.section
        className="mb-32 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering businesses with{" "}
              <span className="text-pink-500">innovative solutions</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At Iconiq, we drive growth and success through cutting-edge
              technology and creative solutions that transform how businesses
              operate.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: "🚀",
                  title: "Innovation",
                  desc: "Constantly evolving with the latest trends and technologies",
                },
                {
                  icon: "💎",
                  title: "Quality",
                  desc: "Delivering exceptional services that exceed expectations",
                },
                {
                  icon: "📈",
                  title: "Growth",
                  desc: "Helping businesses scale and reach new heights",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-3xl blur-xl opacity-30"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
                alt="Mission"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-[#C848C1] to-[#54A6F9] py-12 rounded-4xl px-4"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            className="relative lg:order-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Shaping the <span className="">future of business</span>
            </h2>
            <p className="text-lg text-white mb-8 leading-relaxed">
              To become the global leader in digital transformation, creating
              innovative solutions that define tomorrow's business landscape.
            </p>

            <div className="space-y-6 ">
              {[
                {
                  icon: "🌍",
                  title: "Global Impact",
                  desc: "Transforming industries and markets worldwide",
                },
                {
                  icon: "🔮",
                  title: "Future-Ready",
                  desc: "Building tomorrow's solutions with today's vision",
                },
                {
                  icon: "⭐",
                  title: "Excellence",
                  desc: "Setting new standards in technology and innovation",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative lg:order-1"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-teal-200 rounded-3xl blur-xl opacity-30"></div>
            <div className="relative  rounded-2xl p-8 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
                alt="Vision"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
