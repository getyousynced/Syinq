import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/sonner";
import Footer from "@/components/Footer";
import axios from "axios";

interface WaitlistFormValues {
  email: string;
  name: string;
  university: string;
}

const Waitlist = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<WaitlistFormValues>({
    defaultValues: {
      email: "",
      name: "",
      university: "",
    },
  });

  const onSubmit = async (data: WaitlistFormValues, e: any) => {
    try {
      if (e) e.preventDefault();

      const formData = {
        name: data.name || "",
        email: data.email || "",
        university: data.university || "",
      };

      const response = await axios.post(
        process.env.VITE_API_WAITLIST,
        formData
      );

      if (response && response.status >= 200 && response.status < 300) {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you as soon as possible.",
        });
        form.reset();
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="pt-24 flex-grow">
        <div className="section-container max-w-3xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <div className="inline-block bg-syinq-blue/10 p-3 rounded-2xl mb-4">
              <Mail className="h-6 w-6 text-syinq-blue" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Join the <span className="text-syinq-blue">Waitlist</span>
            </h1>
            <p className="text-lg text-syinq-gray">
              Be among the first to experience Syinq when we launch at your
              campus. We'll notify you as soon as we're ready!
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
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
                  name="university"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>University/Campus</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your university or campus"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-syinq-blue hover:bg-syinq-blue/90 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Submitting</span>
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
                        <span>Join Waitlist</span>
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className="mt-8 text-center">
            <p className="text-syinq-gray mb-4">
              Already joined or want to learn more?
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild variant="outline">
                <Link to="/">Back to Home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Waitlist;
