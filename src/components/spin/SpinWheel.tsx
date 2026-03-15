"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface WheelSegment {
  label: string;
  icon: string;
  color: string;
}

const SEGMENTS: WheelSegment[] = [
  { label: "Free Coffee", icon: "coffee", color: "#147EFB" },
  { label: "Free Cold Coffee", icon: "cold-coffee", color: "#FFFFFF" },
  { label: "Uber Voucher", icon: "car", color: "#147EFB" },
  { label: "Early Access Badge", icon: "badge", color: "#FFFFFF" },
  { label: "Surprise Reward", icon: "gift", color: "#147EFB" },
  { label: "Fuel Saver Badge", icon: "fuel", color: "#FFFFFF" },
  { label: "Ride Priority Pass", icon: "ticket", color: "#147EFB" },
  { label: "Campus Influencer", icon: "star", color: "#FFFFFF" },
  { label: "Try Again", icon: "retry", color: "#E5E7EB" },
];

const FUNNY_MESSAGES: Record<string, string> = {
  "Free Coffee": "Caffeine loading... You earned it!",
  "Free Cold Coffee": "Stay cool, coffee lover!",
  "Uber Voucher": "Your next ride is on us... kinda!",
  "Early Access Badge": "Welcome to the cool kids club!",
  "Surprise Reward": "Ooh mystery vibes! Check at the booth!",
  "Fuel Saver Badge": "Planet Earth sends its thanks!",
  "Ride Priority Pass": "VIP status unlocked!",
  "Campus Influencer": "Time to flex on your followers!",
  "Try Again": "The wheel said 'nope'... but hey, try again!",
};

const SegmentIcon = ({ type, className }: { type: string; className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    coffee: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M2 21h18v-2H2M20 8h-2V5h2m0-2H4v10a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-3h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
      </svg>
    ),
    "cold-coffee": (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3 2l2 19h12l2-19H3zm5 2h6v2H8V4zm-1 4h8l-1 11H8L7 8z" />
        <path d="M12 10c0 1-1 2-1 3s.5 2 1 2 1-1 1-2-1-2-1-3z" />
      </svg>
    ),
    car: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5m-11 0A1.5 1.5 0 0 1 5 14.5 1.5 1.5 0 0 1 6.5 13 1.5 1.5 0 0 1 8 14.5 1.5 1.5 0 0 1 6.5 16M18.92 6c-.2-.58-.76-1-1.42-1h-11c-.66 0-1.22.42-1.42 1L3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8l-2.08-6Z" />
      </svg>
    ),
    badge: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2m-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z" />
      </svg>
    ),
    gift: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22 12v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2h3.17A3 3 0 0 1 6 5a3 3 0 0 1 3-3c1 0 1.88.5 2.43 1.24L12 4l.57-.76A3 3 0 0 1 15 2a3 3 0 0 1 3 3 3 3 0 0 1-.17 1H21a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1M4 20h7v-8H4v8m16 0v-8h-7v8h7M9 4a1 1 0 0 0-1 1 1 1 0 0 0 1 1h2.42a3 3 0 0 0-.42-1.5A1 1 0 0 0 9 4m6 0a1 1 0 0 0-1 1.5A3 3 0 0 0 13.58 6H15a1 1 0 0 0 1-1 1 1 0 0 0-1-1Z" />
      </svg>
    ),
    fuel: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18 10a1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1m-6 0H6V5h6m7.77 2.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11C16.17 7 15.5 7.93 15.5 9a2.5 2.5 0 0 0 2.5 2.5c.36 0 .69-.08 1-.21v7.21a1.5 1.5 0 0 1-1.5 1.5 1.5 1.5 0 0 1-1.5-1.5V14a2 2 0 0 0-2-2h-1V5a2 2 0 0 0-2-2H6c-1.11 0-2 .89-2 2v16h10v-7.5h1.5v5a3 3 0 0 0 3 3 3 3 0 0 0 3-3V9c0-.69-.28-1.32-.73-1.77Z" />
      </svg>
    ),
    ticket: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M4 4a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2 2 2 0 0 1-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 1-2-2 2 2 0 0 1 2-2V6a2 2 0 0 0-2-2H4m0 2h16v2.54c-1.24.71-2 2.03-2 3.46s.76 2.75 2 3.46V18H4v-2.54c1.24-.71 2-2.03 2-3.46s-.76-2.75-2-3.46V6Z" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27Z" />
      </svg>
    ),
    retry: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4a8 8 0 0 0-8 8 8 8 0 0 0 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18a6 6 0 0 1-6-6 6 6 0 0 1 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35Z" />
      </svg>
    ),
  };

  return <>{icons[type] || icons.gift}</>;
};

const Confetti = () => {
  const colors = ["#147EFB", "#FFFFFF", "#0A5BC4", "#93C5FD", "#1D1D1F"];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    scale: 0.5 + Math.random() * 0.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: piece.left,
            top: "-20px",
            backgroundColor: piece.color,
            transform: `scale(${piece.scale})`,
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: "100vh",
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: piece.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
};

export default function SpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const wheelRef = useRef<SVGSVGElement>(null);

  const segmentAngle = 360 / SEGMENTS.length;

  const spin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowConfetti(false);

    // Random number of full rotations (5-8) + random segment
    const randomSegmentIndex = Math.floor(Math.random() * SEGMENTS.length);
    const extraRotations = 5 + Math.floor(Math.random() * 4);
    const targetAngle = extraRotations * 360 + (360 - randomSegmentIndex * segmentAngle - segmentAngle / 2);
    
    const newRotation = rotation + targetAngle;
    setRotation(newRotation);

    // After spin completes
    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);
      const result = SEGMENTS[randomSegmentIndex];
      
      if (result.label !== "Try Again") {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }

      toast(FUNNY_MESSAGES[result.label] || "Woohoo!", {
        description: `You won: ${result.label}`,
        duration: 5000,
      });
    }, 4000);
  }, [isSpinning, rotation, segmentAngle]);

  const createWheelSegments = () => {
    return SEGMENTS.map((segment, index) => {
      const startAngle = index * segmentAngle - 90;
      const endAngle = startAngle + segmentAngle;
      
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      const x1 = 150 + 140 * Math.cos(startRad);
      const y1 = 150 + 140 * Math.sin(startRad);
      const x2 = 150 + 140 * Math.cos(endRad);
      const y2 = 150 + 140 * Math.sin(endRad);
      
      const largeArc = segmentAngle > 180 ? 1 : 0;
      
      const pathD = `M 150 150 L ${x1} ${y1} A 140 140 0 ${largeArc} 1 ${x2} ${y2} Z`;
      
      // Calculate center of segment for icon placement
      const midAngle = ((startAngle + endAngle) / 2) * Math.PI / 180;
      const iconX = 150 + 85 * Math.cos(midAngle);
      const iconY = 150 + 85 * Math.sin(midAngle);
      const textX = 150 + 110 * Math.cos(midAngle);
      const textY = 150 + 110 * Math.sin(midAngle);
      const textRotation = (startAngle + endAngle) / 2 + 90;

      return (
        <g key={index}>
          <path
            d={pathD}
            fill={segment.color}
            stroke="#FFF"
            strokeWidth="2"
            className="transition-all duration-200"
          />
          <g transform={`translate(${iconX}, ${iconY})`}>
            <foreignObject x="-12" y="-12" width="24" height="24">
              <div className={`w-6 h-6 ${segment.color === "#147EFB" ? "text-white" : "text-[#147EFB]"}`}>
                <SegmentIcon type={segment.icon} className="w-full h-full" />
              </div>
            </foreignObject>
          </g>
          <text
            x={textX}
            y={textY}
            fill={segment.color === "#147EFB" ? "#FFFFFF" : "#147EFB"}
            fontSize="7"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${textRotation}, ${textX}, ${textY})`}
          >
            {segment.label}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      {/* Pointer Arrow */}
      <div className="absolute -top-2 z-10 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[28px] border-t-[#147EFB] drop-shadow-lg" />

      {/* Glow Effect */}
      <motion.div
        className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(20,126,251,0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: isSpinning ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          repeat: isSpinning ? Infinity : 0,
        }}
      />

      {/* The Wheel */}
      <motion.div
        className="relative"
        animate={{ rotate: rotation }}
        transition={{
          duration: 4,
          ease: [0.32, 0, 0.07, 1],
        }}
      >
        <svg
          ref={wheelRef}
          width="320"
          height="320"
          viewBox="0 0 300 300"
          className="md:w-[400px] md:h-[400px] drop-shadow-2xl"
        >
          {/* Outer ring */}
          <circle cx="150" cy="150" r="148" fill="none" stroke="#147EFB" strokeWidth="4" />
          <circle cx="150" cy="150" r="144" fill="none" stroke="#1D1D1F" strokeWidth="2" />
          
          {/* Segments */}
          {createWheelSegments()}
          
          {/* Inner circle for logo */}
          <circle cx="150" cy="150" r="48" fill="#1D1D1F" stroke="#147EFB" strokeWidth="3" />
          
          {/* Logo will be overlaid via foreignObject */}
          <foreignObject x="110" y="110" width="80" height="80">
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src="/images/spin/syinq-logo.png" 
                alt="Syinq" 
                className="w-16 h-16 object-contain"
              />
            </div>
          </foreignObject>
        </svg>
      </motion.div>

      {/* Center Spin Button */}
      <motion.button
        onClick={spin}
        disabled={isSpinning}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#147EFB] text-white font-bold text-lg md:text-xl shadow-xl border-4 border-white hover:bg-[#0A5BC4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors z-10"
        whileHover={{ scale: isSpinning ? 1 : 1.05 }}
        whileTap={{ scale: isSpinning ? 1 : 0.95 }}
      >
        {isSpinning ? "..." : "SPIN"}
      </motion.button>

      {hasSpun && !isSpinning && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-sm text-gray-600"
        >
          Show this screen at the Syinq booth to claim your reward!
        </motion.p>
      )}
    </div>
  );
}
