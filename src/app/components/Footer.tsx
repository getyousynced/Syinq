"use client";
import React, { useState } from "react";
import { sendMail } from "../helpers/mailer";
// import Image from "next/image";
import { FaSquareXTwitter, FaLinkedin, FaSquareInstagram  } from "react-icons/fa6";
import Link from "next/link";
import toast from "react-hot-toast";
import { BackgroundBeams } from "./ui/background-beams";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailInput = e.currentTarget.elements.namedItem(
      "user_email"
    ) as HTMLInputElement;
    const user_email = emailInput.value.trim();

    if (user_email === "") {
      toast.error("Please fill in your email.");
      return;
    }

    try {
      await sendMail({ email: user_email });
      setEmail("");
      toast.success("Subscription successful!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Failed to subscribe: ${error.message}`);
      } else {
        toast.error("Failed to subscribe due to an unexpected error.");
      }
    }
  };

  //footer links
  // Footer links with actual blog URL
const footerLinks: { name: string; href: string }[] = [
  { name: "About us", href: "#" },
  { name: "Contact us", href: "#" },
  { name: "Blogs", href: "https://www.linkedin.com/pulse/stuck-traffic-your-commute-hurting-more-than-just-patience-rasync-m5qrc/?trackingId=%2BTlQh%2BmM96tysez7BKGCLw%3D%3D" }, // Update with your blog URL
];

// Social links with actual profiles
const socialLinks: { icon: React.ReactNode; href: string }[] = [
  { 
    icon: <FaSquareInstagram size={32} />, 
    href: "https://www.instagram.com/sync.india_/" 
  },
  { 
    icon: <FaSquareXTwitter size={32} />, 
    href: "https://x.com/getyou_synced" 
  },
  { 
    icon: <FaLinkedin size={32} />, 
    href: "https://www.linkedin.com/company/rasync/" 
  },
];

  return (
    <footer className=" text-center text-gray-800 py-6 bottom-0 w-full overflow-hidden relative">
      {/* SVG curve as a background element */}
      <div className="absolute inset-0 top-0 z-0">
        {/* <Image
          src="/Shape.svg"
          width={2400}
          height={2400}
          alt="blue curve"
          priority={true}
        /> */}
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 -mt-6 md:mt-0">
        <div className="flex flex-col items-center">
          <div className="border-2 rounded-xl flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-8 md:py-16 gap-4 mt-8 md:mt-16 shadow-xl w-full max-w-7xl mx-auto relative overflow-hidden">
            {/* Added relative and overflow-hidden */}
            <h2 className="text-xl md:text-4xl w-full text-nowrap font-thin z-20 dark:text-white">
              Join The Waitlist
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row items-center space-y-4 md:space-x-4 max-w-2xl w-full z-20"
            >
              <div className="relative w-full max-w-lg">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="user_email"
                  required
                  placeholder="Enter your email"
                  className="w-full p-4 md:p-6 pr-32 md:pr-60 text-sm md:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="text-sm md:text-xl absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-2 md:px-8 py-2 md:py-4 rounded-md hover:bg-blue-600 transition duration-300 z-30"
                >
                  Subscribe Now
                </button>
              </div>
            </form>
            <BackgroundBeams className="!absolute" />
            {/* Added !absolute to ensure it stays in container */}
          </div>

          <div className="w-full py-6 md:py-12">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
              <div className="flex justify-center space-x-10 md:space-x-20 text-[#434341]">
                {footerLinks.map((link, index) => (
                  <Link
                    href={link.href}
                    key={index}
                    className="hover:text-black text-sm text-nowrap md:text-lg"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex justify-center space-x-6 md:space-x-8 text-[#434341]">
                {socialLinks.map((social, index) => (
                  <Link
                    href={social.href}
                    key={index}
                    className="hover:text-black"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border w-full rounded-2xl bg-[#2B3D51] my-2 md:my-4"></div>

          <div className="text-gray-500 mt-6 md:mt-12 flex flex-col md:flex-row justify-between items-center w-full">
            <p className="text-sm md:text-base">
              © 2024 SYNC | All Rights Reserved
            </p>
            <div className="flex justify-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:underline text-sm">
                Terms of Service
              </a>
              <a href="#" className="hover:underline text-sm">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
