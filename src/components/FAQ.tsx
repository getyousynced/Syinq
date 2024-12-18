"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does ride matching work in Sync?",
    answer:
      "Sync connects you with the perfect ride buddy! Just enter your destination, and Sync’s smart algorithm pairs you with students headed the same way. Fast, efficient, and seamless – every trip feels tailor-made for you.",
  },
  {
    question: "What features does the Sync app offer for users?",
    answer:
      "Sync is more than just carpooling! Ride Matching: Find your ideal carpool in seconds. Community Connections: Chat and network with fellow students.Cost Splitting: Share rides, share costs, and save big.Eco Impact Tracker: See how your rides are making a difference for the planet!",
  },
  {
    question: "How can I create an account on Sync?",
    answer:
      "Getting started is a breeze! Download the Sync app. Sign up using your university email. Set up your profile, and you’re ready to roll!",
  },
  {
    question: "Is Sync available outside of university campuses?",
    answer:
      "Currently, Sync is designed exclusively for university students to enhance campus life. Expansion plans are on the roadmap, so stay tuned for when we roll out in your area!",
  },
  {
    question: "How does Sync promote sustainability?",
    answer:
      "Every ride counts! By sharing commutes, Sync reduces carbon emissions, saves fuel, and cuts down on traffic. Plus, our Eco Impact Tracker keeps you inspired by showing the collective environmental benefits of our community. 🌍💚",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h2 className="text-6xl md:text-7xl font-bold">
          What.
          <br />
          The.
          <br />
          <span className="text-[#3B82F6]">FAQ</span>
          <span className="text-black">?</span>
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm overflow-hidden border-t-4 border-b-4 border-transparent"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center"
            >
              <span className="font-medium text-navy-900">{faq.question}</span>
              <span className="text-2xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
