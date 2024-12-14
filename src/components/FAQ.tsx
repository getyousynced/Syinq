'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'How does ride matching work in Sync?',
    answer: 'Sync uses advanced algorithms to match riders going in the same direction...'
  },
  {
    question: 'What features does the Sync app offer for users?',
    answer: 'Sync offers real-time tracking, secure payments, and ride scheduling...'
  },
  {
    question: 'How can I create an account on Sync?',
    answer: 'Download the app from your app store and follow the simple registration process...'
  },
  {
    question: 'Is Sync available outside of university campuses?',
    answer: 'Currently, Sync is focused on serving university communities...'
  },
  {
    question: 'How does Sync promote sustainability?',
    answer: 'By encouraging ride-sharing, Sync helps reduce carbon emissions...'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
              <span className="text-2xl">{openIndex === index ? '−' : '+'}</span>
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
  )
}

