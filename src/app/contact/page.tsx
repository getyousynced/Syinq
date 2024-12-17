import { NavBar } from "@/components/nav-bar";
import { ContactForm } from "@/components/contact-form";
import Footer from "@/components/footer";
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative h-48">
        <div className="absolute inset-0 overflow-hidden bg-white">
        </div>
        <NavBar />
        <div className="container mx-auto px-4 pt-36 relative z-10">
          <div className="text-center text-black">
            <h1 className="text-4xl font-bold">
              Got questions or <span className="text-teal-600">feedback?</span>
            </h1>
            <p className="text-lg">
              <span className="text-teal-600">We'd love to hear </span>
              from you! Reach out to us for support, suggestions, <span className="text-teal-600">or</span> inquiries.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 pb-72 relative">
        <div className="h-full  bg-[url('/back.jpg')] bg-cover absolute top-8 bottom-0 left-0 right-0 -z-10 rounded-lg shadow-lg">
        </div>
        <div className="w-full relative z-10">
          <ContactForm />
        </div>
        <div className="flex flex-col items-center justify-center top-80 py-2">
          <Image 
            src="/Love.jpg"
            alt="Made by students for students"
            width={200}
            height={80}
            className="opacity-60"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <img src="/shape1.png" alt="decorative shape" className="w-full" />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
