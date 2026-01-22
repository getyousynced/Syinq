"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Phone, Mail, MapPin, Send, ExternalLink} from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/appLinks";
interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}
import { toast } from '@/components/ui/sonner';

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

  const onSubmit = async (data: ContactFormValues, e: any) => {
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
    <div className="min-h-screen bg-white flex flex-col">
      <div className=" flex-grow">
        <div className="section-container max-w-6xl mx-auto px-6 py-12">
          <div className=" text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="inline-block bg-syinq-blue/10 p-3 rounded-2xl">
                <Phone className="h-6 w-6 text-syinq-blue" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Get In <span className="text-syinq-blue">Touch</span>
              </h1>
            </div>
            <p className="text-lg text-syinq-gray max-w-2xl mx-auto">
              Have questions about Syinq? Want to partner with us or bring Syinq
              to your campus? We&apos;d love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-syinq-blue/10 rounded-full mb-4">
                <Mail className="h-6 w-6 text-syinq-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-syinq-gray mb-4">
                For general inquiries and support
              </p>
              <a
                href="mailto:support@syinq.com"
                className="text-syinq-blue hover:underline inline-flex items-center"
              >
                support@syinq.com
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-syinq-blue/10 rounded-full mb-4">
                <Phone className="h-6 w-6 text-syinq-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-syinq-gray mb-4">Mon-Fri from 9am to 5pm</p>
              <a
                href="tel:+919876543210"
                className="text-syinq-blue hover:underline inline-flex items-center"
              >
                +91 6284376052
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-syinq-blue/10 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-syinq-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-syinq-gray mb-4">Our headquarters in Noida</p>
              <a
                href="https://maps.app.goo.gl/1mzH44ku5TJx2cro6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-syinq-blue hover:underline inline-flex items-center"
              >
                View on Map
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">Send us a message</h2>
              <p className="text-syinq-gray mb-6">
                Fill out the form and our team will get back to you within 24
                hours.
              </p>

              <div className="bg-syinq-blue/5 rounded-xl p-6 border border-syinq-blue/20">
                <h3 className="text-lg font-medium mb-3">Download Syinq</h3>
                <p className="text-sm text-syinq-gray mb-4">
                  Syinq is live on iOS and Android. Download the app to start carpooling today.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button asChild className="w-full bg-syinq-blue hover:bg-syinq-blue/90 text-white">
                    <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                      App Store
                    </a>
                  </Button>
                  <Button asChild className="w-full bg-syinq-blue hover:bg-syinq-blue/90 text-white">
                    <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                      Play Store
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
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
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
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
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What is this regarding?"
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="How can we help you?"
                            className="min-h-[120px]"
                            {...field}
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-syinq-blue hover:bg-syinq-blue/90 flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2">Sending</span>
                          <svg
                            className="animate-spin h-4 w-4"
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
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
