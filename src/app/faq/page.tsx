"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  useEffect(() => {
    // Update document title
    document.title = "FAQ - Syinq";

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="pt-24 flex-grow">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="inline-block bg-syinq-blue/10 p-3 rounded-2xl">
                <HelpCircle className="h-6 w-6 text-syinq-blue" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Frequently Asked{" "}
                <span className="text-syinq-blue">Questions</span>
              </h1>
            </div>
            <p className="text-lg text-syinq-gray max-w-2xl mx-auto">
              Find answers to common questions about Syinq and how it works.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium text-left">
                  What is Syinq?
                </AccordionTrigger>
                <AccordionContent className="text-syinq-gray">
                  Syinq is an all-in-one campus app designed exclusively for
                  university students. It combines carpooling, marketplace, and
                  community features to help students connect, buy and sell
                  items, and find rides more easily within their campus
                  community.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium text-left">
                  How do I sign up for Syinq?
                </AccordionTrigger>
                <AccordionContent className="text-syinq-gray">
                  Syinq is currently in development and available through our
                  waitlist. You can join the waitlist to be notified when we
                  launch at your campus. When we launch, you&apos;ll need a
                  valid university email address to sign up.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium text-left">
                  Is Syinq available at my university?
                </AccordionTrigger>
                <AccordionContent className="text-syinq-gray">
                  We&apos;re rolling out to select universities first. Join our
                  waitlist and we&apos;ll notify you when Syinq becomes
                  available at your campus. We&apos;re expanding rapidly and aim
                  to be available at most major universities soon.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium text-left">
                  How does the carpooling feature work?
                </AccordionTrigger>
                <AccordionContent className="text-syinq-gray">
                  Our carpooling feature connects drivers and passengers headed
                  in the same direction. Drivers can post their routes and
                  available seats, while passengers can search for rides that
                  match their needs. All users are verified students, making it
                  a safe alternative to public rides.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-medium text-left">
                  Is the marketplace feature free to use?
                </AccordionTrigger>
                <AccordionContent className="text-syinq-gray">
                  Yes! The marketplace feature has no listing fees or
                  commissions. You can buy, sell, or rent items to other
                  verified students without any additional charges. We&apos;re
                  committed to keeping the platform student-friendly and
                  affordable.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-medium text-left">
                  How does Syinq verify students?
                </AccordionTrigger>
                <AccordionContent className="text-syinq-gray">
                  We verify students through their university email addresses.
                  In some cases, we may require additional verification such as
                  a student ID to ensure the security and integrity of our
                  platform.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-lg font-medium text-left">
                  What can I sell on the Syinq marketplace?
                </AccordionTrigger>
                <AccordionContent className="text-syinq-gray">
                  You can sell textbooks, electronics, dormitory items,
                  clothing, and other items that may be useful to fellow
                  students. Prohibited items include illegal goods, weapons,
                  alcohol, certain services, and any items that violate our
                  terms of service or university policies.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-lg font-medium text-left">
                  How do I report suspicious activity?
                </AccordionTrigger>
                <AccordionContent className="text-syinq-gray">
                  Your safety is important to us. If you notice suspicious
                  activity, you can use the in-app reporting feature to flag
                  users, listings, or messages. Our support team reviews all
                  reports and takes appropriate action to maintain a safe
                  environment.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="bg-syinq-blue/5 rounded-xl p-8 md:p-12 mb-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-syinq-gray mb-6 max-w-xl mx-auto">
                If you couldn&apos;t find the answer you were looking for, our
                support team is here to help.
              </p>
              <Button asChild className="bg-syinq-blue hover:bg-syinq-blue/90">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to join Syinq?</h2>
            <p className="text-syinq-gray mb-6 max-w-xl mx-auto">
              Be the first to experience the benefits of Syinq when we launch at
              your campus.
            </p>
            <Button asChild className="bg-syinq-green hover:bg-syinq-green/90">
              <Link href="/waitlist">Join Waitlist</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
