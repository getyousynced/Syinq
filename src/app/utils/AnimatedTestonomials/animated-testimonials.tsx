"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  designation: string;
  src: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Raunak Shukla, the founder of Sync, is a cybersecurity specialist with a strong background in startups and entrepreneurship. He leads the team with expertise in UI/UX design and a focus on innovation.",
    name: "Raunak Shukla",
    designation: "Founder",
    src: "/Team_members/Raunak.jpg",
  },
  {
    id: 2,
    quote:
      "Rupesh Shandillya, a co-founder of Sync, specializes in development. He is responsible for ensuring the app's technical excellence and seamless performance.",
    name: "Rupesh Shandillya",
    designation: "Co Founder",
    src: "/Team_members/Rupesh.jpg",
  },
  {
    id: 3,
    quote:
      "Abhi Tailor, a co-founder of Sync, excels in marketing, analysis, and media. He drives the app's visibility, user engagement, and strategic growth.",
    name: "Abhi Taylor",
    designation: "Co Founder",
    src: "/Team_members/Abhi.jpg",
  },
];

export const AnimatedTestimonials = ({
  autoplay = false,
}: {
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-2xl font-bold">
              {testimonials[active].name}
            </h3>
            <p className="text-sm ">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-lg mt-8">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center group/button"
            >
              <IconArrowLeft className="h-5 w-5 text-black group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center group/button"
            >
              <IconArrowRight className="h-5 w-5 text-black group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
