"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Download,
  Smartphone,
  User,
  Gift,
  Wallet,
  Users,
  Leaf,
  ArrowDown,
} from "lucide-react";
import SpinWheel from "@/components/spin/SpinWheel";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/appLinks";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50 },
  },
};

export default function SpinPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="road-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#1F2937" />
            <line x1="0" y1="10" x2="20" y2="10" stroke="#1F2937" strokeWidth="0.5" strokeDasharray="4 2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#road-pattern)" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 text-balance"
          >
            Still commuting alone?{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Spin your way to a smarter ride.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Install Syinq, split your fuel cost, and get a chance to win rewards.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-8">
            <a
              href="#spin-wheel"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-yellow-400 font-semibold text-lg rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-100"
            >
              <Gift className="w-5 h-5" />
              Download Syinq & Unlock Your Spin
            </a>
          </motion.div>

          {/* App Store Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5649 12.3664C17.5077 9.71861 19.6909 8.21003 19.7785 8.15272C18.6266 6.42874 16.8136 6.18516 16.175 6.15772C14.6239 5.99949 13.1299 7.03974 12.3425 7.03974C11.5414 7.03974 10.3209 6.17617 9.01344 6.20361C7.35146 6.23104 5.81609 7.14646 4.96891 8.59132C3.22435 11.5357 4.52736 15.8511 6.18934 18.224C7.02765 19.3731 8.02084 20.6682 9.32385 20.6133C10.5991 20.5584 11.0629 19.7904 12.5865 19.7904C14.0964 19.7904 14.5328 20.6133 15.8494 20.5858C17.2073 20.5584 18.0593 19.4367 18.866 18.2767C19.8181 16.9542 20.2134 15.6592 20.2271 15.5906C20.1972 15.5768 17.6258 14.5913 17.5649 12.3664Z" />
                <path d="M15.585 4.42178C16.2647 3.58566 16.7285 2.44139 16.6127 1.28271C15.64 1.32456 14.4332 1.94537 13.7261 2.76707C13.1024 3.48967 12.5451 4.68463 12.6746 5.78261C13.7671 5.86736 14.8777 5.2466 15.585 4.42178Z" />
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-80">Download on the</div>
                <div className="font-semibold">App Store</div>
              </div>
            </a>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27m3.35-4.31c.34.27.56.69.56 1.19s-.22.92-.56 1.19l-2.29 1.32-2.5-2.5 2.5-2.5 2.29 1.3M6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" />
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-80">Get it on</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Spin Wheel Section */}
      <section id="spin-wheel" className="relative py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
              Spin & Win
            </h2>
            <p className="text-gray-600 mb-10 text-center">
              Try your luck and win amazing rewards!
            </p>
            
            <SpinWheel />
          </motion.div>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-16 md:py-20 px-6 bg-gray-900">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-700"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-8 text-center">
              How to Get Your Free Spin
            </h2>

            <div className="grid gap-6 md:gap-8">
              {[
                {
                  step: 1,
                  icon: Download,
                  title: "Download the Syinq app",
                  desc: "Available on iOS and Android",
                },
                {
                  step: 2,
                  icon: User,
                  title: "Create your profile",
                  desc: "Takes less than a minute",
                },
                {
                  step: 3,
                  icon: Smartphone,
                  title: "Show your profile screen at the Syinq booth",
                  desc: "Find us on campus",
                },
                {
                  step: 4,
                  icon: Gift,
                  title: "Get 1 free spin and win rewards",
                  desc: "Everyone wins something!",
                },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-yellow-400 font-bold text-sm">
                        Step {item.step}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-lg">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              variants={itemVariants}
              className="mt-8 text-center text-gray-400 text-sm italic"
            >
              {"\"Because commuting alone is expensive... and slightly embarrassing.\""}
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Syinq Section */}
      <section className="py-16 md:py-24 px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center"
          >
            Why Syinq?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 mb-12 text-center max-w-2xl mx-auto"
          >
            Join thousands of students making their commute smarter
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Wallet,
                title: "Save Money",
                description:
                  "Split fuel costs with ride partners. Your wallet will thank you.",
                color: "bg-yellow-400",
                textColor: "text-gray-900",
              },
              {
                icon: Users,
                title: "Find Ride Partners",
                description:
                  "Students from your route are already commuting. Why not together?",
                color: "bg-gray-900",
                textColor: "text-yellow-400",
              },
              {
                icon: Leaf,
                title: "Smarter Campus Mobility",
                description:
                  "Reduce traffic and fuel waste. Be the change.",
                color: "bg-yellow-400",
                textColor: "text-gray-900",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <card.icon className={`w-7 h-7 ${card.textColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* QR Download Section */}
      <section className="py-16 md:py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-300/50 rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-300/50 rounded-full -ml-16 -mb-16" />

            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Ready to start carpooling?
                </h2>
                <p className="text-gray-800 text-lg mb-6">
                  Scan to download Syinq in 30 seconds.
                </p>
                
                {/* Animated Arrow */}
                <motion.div
                  className="hidden md:flex items-center gap-2 text-gray-900"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="font-medium">Scan here</span>
                  <ArrowDown className="w-5 h-5 rotate-[-90deg]" />
                </motion.div>
              </div>

              <div className="flex-shrink-0">
                <div className="bg-white p-4 rounded-2xl shadow-lg">
                  <Image
                    src="/images/spin/qr-code.jpg"
                    alt="Scan to download Syinq"
                    width={160}
                    height={160}
                    className="rounded-xl"
                  />
                </div>
                <p className="text-center text-gray-800 text-sm mt-3 font-medium">
                  Syinq App
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-gray-500 text-sm">
            Made with love for students everywhere.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
