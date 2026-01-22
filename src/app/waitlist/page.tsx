"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/appLinks";

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="pt-24 flex-grow">
        <div className="section-container max-w-3xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <div className="inline-block bg-syinq-blue/10 p-3 rounded-2xl mb-4">
              <Download className="h-6 w-6 text-syinq-blue" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Download <span className="text-syinq-blue">Syinq</span>
            </h1>
            <p className="text-lg text-syinq-gray">
              Syinq is live on iOS and Android. Carpooling is available now — Marketplace and Community Forum are coming soon.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button asChild className="w-full bg-syinq-blue hover:bg-syinq-blue/90">
                <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                  Download on App Store
                </a>
              </Button>
              <Button asChild className="w-full bg-syinq-blue hover:bg-syinq-blue/90 text-white">
                <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                  Get it on Play Store
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-syinq-gray mb-4">Need help or want to partner?</p>
            <div className="flex justify-center space-x-4">
              <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
