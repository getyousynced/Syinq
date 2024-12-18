"use client";
import React from "react";
import { AnimatedTooltipDemo } from "./ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Raunak Shukla",
    designation: "Founder",
    image: "/assets/raunak.jpeg",
  },
  {
    id: 2,
    name: "Rupesh Shandilya",
    designation: "Co-Founder",
    image: "/assets/rupesh.jpeg",
  },
  {
    id: 3,
    name: "Abhi Tailor",
    designation: "Co-Founder",
    image: "/assets/abhi.jpeg",
  },
];

export function AnimatedTooltip() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltipDemo items={people} />
    </div>
  );
}
