"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Platform = "android" | "ios" | "desktop";

export default function TripFallbackPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const [platform, setPlatform] = useState<Platform>("desktop");

  useEffect(() => {
    const ua = navigator.userAgent;

    if (/android/i.test(ua)) {
      setPlatform("android");
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      setPlatform("ios");
    } else {
      setPlatform("desktop");
    }
  }, []);

  const openApp = () => {
    window.location.href = `syinq://trip/${tripId}`;
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-900 p-6">
          View Trip in Syinq App
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          This ride was shared with you. Open it in the Syinq app to see full
          trip details.
        </p>

        {/* Trip Preview Placeholder */}
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-xs text-blue-600 font-medium">Trip ID</p>
          <p className="mt-1 text-sm font-semibold text-gray-900">{tripId}</p>

          <p className="mt-2 text-xs text-gray-500">
            Trip preview will appear here soon
          </p>
        </div>

        {/* Open App Button */}
        {platform !== "desktop" && (
          <button
            onClick={openApp}
            className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Open in App
          </button>
        )}

        {/* Store Links */}
        <div className="mt-6 space-y-3">
          <p className="text-xs text-gray-500">Don’t have the app?</p>

          <a
            href="https://play.google.com/store/apps/details?id=com.rasync.sync"
            className="block w-full rounded-lg border border-gray-300 py-2.5 text-sm text-gray-800 transition hover:bg-gray-100"
          >
            Download for Android
          </a>

          <a
            href="https://apps.apple.com/in/app/syinq/id6755780778"
            className="block w-full rounded-lg border border-gray-300 py-2.5 text-sm text-gray-800 transition hover:bg-gray-100"
          >
            Download for iOS
          </a>
        </div>

        {/* Desktop Hint */}
        {platform === "desktop" && (
          <p className="mt-6 text-xs text-gray-500">
            Please open this link on your mobile phone.
          </p>
        )}
      </div>
    </main>
  );
}
