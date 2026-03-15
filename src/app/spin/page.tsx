"use client"

import SpinWheel from "@/components/spin/SpinWheel"
import { Download, User, QrCode, Gift } from "lucide-react"

const steps = [
  {
    icon: <Download className="w-6 h-6" />,
    title: "Download the Syinq app",
    description: "Available on iOS and Android",
  },
  {
    icon: <User className="w-6 h-6" />,
    title: "Create your profile",
    description: "Quick signup with your campus email",
  },
  {
    icon: <QrCode className="w-6 h-6" />,
    title: "Show your profile at the booth",
    description: "Find us at the campus event",
  },
  {
    icon: <Gift className="w-6 h-6" />,
    title: "Get 1 free spin and win!",
    description: "Prizes waiting for you",
  },
]

export default function WheelSection() {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">

        {/* Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT → Wheel */}
          <div className="flex justify-center">
            <SpinWheel />
          </div>

          {/* RIGHT → Instructions */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              How to Get Your Free Spin
            </h3>

            <div className="space-y-5">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
                >
                  <div className="w-12 h-12 bg-[#147EFB] text-white rounded-xl flex items-center justify-center">
                    {step.icon}
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#147EFB] mb-1">
                      Step {index + 1}
                    </p>
                    <h4 className="font-semibold text-gray-900">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tip Card */}
            <div className="mt-10 p-5 bg-[#147EFB]/10 rounded-2xl border border-[#147EFB]/20">
              <p className="text-sm text-gray-600 italic text-center">
                Pro tip: Your empty car seats deserve better. Fill them with new
                friends who split your fuel costs.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}