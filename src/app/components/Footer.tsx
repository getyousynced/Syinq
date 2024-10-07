'use client'
import React, { useState } from "react";
import emailjs from "emailjs-com";
import Image from "next/image";
import { ImFacebook2 } from "react-icons/im";
import { FaSquareXTwitter, FaSquareVimeo, FaYoutube } from "react-icons/fa6";
import Link from "next/link";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // EmailJS sending method
    emailjs
      .send(
        "your_service_id", // Replace with your EmailJS service ID
        "your_template_id", // Replace with your EmailJS template ID
        { email },
        "your_user_id" // Replace with your EmailJS user ID
      )
      .then(() => {
        console.log("Email successfully sent!");
        setEmail(""); // Clear the email input field
      })
      .catch((error) => {
        console.log("There was an error sending the email:", error);
      });
  };

  //footer links
  const footerLinks: {name: string, href: string}[] = [
    { name: "About us", href: "#" },
    { name: "Contact us", href: "#" },
    { name: "About", href: "#" },
    { name: "Blogs", href: "#" },
  ]

  //social links
  const socialLinks: { icon: React.ReactNode; href: string }[] = [
    { icon: <ImFacebook2 size={28} />, href: "#" },
    { icon: <FaSquareXTwitter size={32} />, href: "#" },
    { icon: <FaSquareVimeo size={32} />, href: "#" },
    { icon: <FaYoutube size={36} />, href: "#" },
  ]

  return (
    <footer className="bg-white text-center text-gray-800 py-6 bottom-0 w-full overflow-hidden relative">
      {/* SVG curve as a background element */}
      <div className="absolute inset-0 top-0 z-0">
        <Image
          src="/Shape.svg"
          width={2400}
          height={2400}
          alt="blue curve"
          priority={true}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 -mt-6 md:mt-0">
        <div className="flex flex-col items-center">
          <div className="border-2 rounded-xl bg-white flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-8 md:py-16 gap-4 mt-8 md:mt-16 shadow-xl w-full max-w-7xl mx-auto">
            <h2 className="text-xl md:text-3xl w-full text-nowrap font-thin">
              Subscribe Newsletters
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row items-center space-y-4 md:space-x-4 max-w-2xl w-full"
            >
              <div className="relative w-full max-w-lg">
                {/* Input field */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full p-4 md:p-6 pr-32 md:pr-60 text-sm md:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Button inside the input field */}
                <button
                  type="submit"
                  className="text-sm md:text-xl absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-2 md:px-8 py-2 md:py-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Subscribe Now
                </button>
              </div>
            </form>
          </div>
          <div className="w-full py-6 md:py-12">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">

              <div className="flex justify-center space-x-10 md:space-x-20 text-[#434341]">
                {footerLinks.map((link, index) => (
                  <Link href={link.href} key={index} className="hover:text-black text-sm text-nowrap md:text-lg">
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex justify-center space-x-6 md:space-x-8 text-[#434341]">
                {socialLinks.map((social, index) => (
                  <Link href={social.href} key={index} className="hover:text-black">
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
