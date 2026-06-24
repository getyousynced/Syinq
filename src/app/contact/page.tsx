"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Send, Building2, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { Container } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import { StoreButtons } from "@/components/site/buttons";
import Lottie from "@/components/site/Lottie";
import { toast } from "@/components/ui/sonner";

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const inputClass =
  "min-h-[44px] border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-brand-400 focus-visible:ring-offset-0";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonText, setButtonText] = useState("Send Message");

  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues, e?: React.BaseSyntheticEvent) => {
    try {
      // Prevent default form submission behavior
      if (e) e.preventDefault();

      setIsSubmitting(true);
      setButtonText("Sending...");

      // Explicitly create the form data object to ensure all fields are included
      const formData = {
        name: data.name || "",
        email: data.email || "",
        subject: data.subject || "",
        message: data.message || "",
      };

      // Make API call to SheetBest with explicit content type
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_CONTACTUS!,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response exists and has a status code in the 200 range
      if (response && response.status >= 200 && response.status < 300) {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you as soon as possible.",
        });
        form.reset();
      } else {
        throw new Error("Failed to submit form");
      }
    } catch {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
      setButtonText("Send Message");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Page hero */}
      <section className="relative overflow-hidden bg-brand-soft">
        <div className="pointer-events-none absolute -right-32 -top-28 h-[380px] w-[380px] rounded-full bg-brand-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-[280px] w-[280px] rounded-full bg-brand-100/50 blur-3xl" />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Contact</span>
            <h1 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Get in touch
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Reach the Syinq team for member support, feedback, or campus, club and
              ambassador partnerships. Email{" "}
              <a
                href="mailto:support@syinq.com"
                className="font-medium text-brand-600 hover:text-brand-700"
              >
                support@syinq.com
              </a>{" "}
              or send a message below — we read everything and reply as soon as we can.
            </p>
          </Reveal>

          <div className="pointer-events-none absolute right-0 top-1/2 hidden h-52 w-52 -translate-y-1/2 lg:block xl:h-60 xl:w-60">
            <Lottie
              src="/revamp/lottie/map-search-gps.lottie"
              label="Animated map search locating campus pickup points"
              className="h-full w-full"
            />
          </div>
        </Container>
      </section>

      {/* Form + side panel */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Side panel */}
            <div className="flex flex-col gap-5 lg:col-span-2">
              <Reveal className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Mail size={22} />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">Email us</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  For support, questions and feedback. We typically reply within a
                  business day.
                </p>
                <a
                  href="mailto:support@syinq.com"
                  className="mt-3 inline-flex items-center gap-1.5 font-medium text-brand-600 hover:text-brand-700"
                >
                  support@syinq.com
                  <ArrowRight size={16} />
                </a>
              </Reveal>

              <Reveal
                delay={70}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Building2 size={22} />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">
                  Partnering a campus?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Bringing Syinq to your campus, club, or running it as an ambassador?
                  See how campus partnerships work and start a conversation.
                </p>
                <Link
                  href="/for-campuses"
                  className="mt-3 inline-flex items-center gap-1.5 font-medium text-brand-600 hover:text-brand-700"
                >
                  See /for-campuses
                  <ArrowRight size={16} />
                </Link>
              </Reveal>

              <Reveal
                delay={140}
                className="rounded-2xl border border-slate-200 bg-brand-soft p-6 shadow-sm"
              >
                <h2 className="text-lg font-semibold text-slate-900">Get the app</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Syinq is live on iOS and Android — verified campus rides, all in one
                  app.
                </p>
                <StoreButtons className="mt-4" />
              </Reveal>
            </div>

            {/* Form */}
            <Reveal className="lg:col-span-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-bold text-slate-900">Send us a message</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Fill out the form and our team will get back to you.
                </p>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-6 space-y-5"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              className={inputClass}
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              className={inputClass}
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700">Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="What is this regarding?"
                              className={inputClass}
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="How can we help you?"
                              className="min-h-[140px] border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-brand-400 focus-visible:ring-offset-0"
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <button
                      type="submit"
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-fab transition-all duration-200 hover:brightness-[1.04] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span>Sending</span>
                          <svg
                            className="h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>{buttonText}</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                </Form>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Contact;
