"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Platform = "android" | "ios" | "desktop";

interface RideData {
  id: string;
  originAddress: string;
  destinationAddress: string;
  plannedTime: string;
  seats: number;
  rideType: string;
  user?: {
    name: string;
    profileImage?: string;
  };
}

export default function TripFallbackPage() {
  // ✅ FIXED: Changed from tripId to id to match route parameter
  const { id } = useParams<{ id: string }>();
  const [platform, setPlatform] = useState<Platform>("desktop");
  const [rideData, setRideData] = useState<RideData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Detect platform
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

  // ✅ FIXED: Added backend integration to fetch real ride data
  useEffect(() => {
    const fetchRideDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://stage-api.syinq.com/api/v1/offer/${id}`
        );
        const data = await response.json();

        if (data.success && data.data) {
          setRideData(data.data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch ride details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRideDetails();
  }, [id]);

  // ✅ FIXED: Added fallback logic and correct deeplink format
  const openApp = () => {
    // Use correct deeplink format: syinq://join?id=
    const deepLink = `syinq://join?id=${id}`;
    let appOpened = false;

    // Try to open app
    window.location.href = deepLink;

    // Detect if user left the page (app opened)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        appOpened = true;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Fallback to store after 2.5 seconds if app didn't open
    setTimeout(() => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      if (!appOpened) {
        // App didn't open, redirect to appropriate store
        const storeUrl =
          platform === "ios"
            ? "https://apps.apple.com/in/app/syinq/id6755780778"
            : "https://play.google.com/store/apps/details?id=com.rasync.sync";
        window.location.href = storeUrl;
      }
    }, 2500);
  };

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading ride details...</p>
        </div>
      </main>
    );
  }

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

        {/* Trip Preview with real data */}
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
          {rideData && !error ? (
            <div className="space-y-3 text-left">
              <div>
                <p className="text-xs text-blue-600 font-medium">From</p>
                <p className="text-sm font-semibold text-gray-900">
                  📍 {rideData.originAddress}
                </p>
              </div>
              <div>
                <p className="text-xs text-blue-600 font-medium">To</p>
                <p className="text-sm font-semibold text-gray-900">
                  🎯 {rideData.destinationAddress}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-blue-200">
                <div>
                  <p className="text-xs text-blue-600 font-medium">
                    Date & Time
                  </p>
                  <p className="text-sm text-gray-900">
                    {new Date(rideData.plannedTime).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date(rideData.plannedTime).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-blue-600 font-medium">Seats</p>
                  <p className="text-sm text-gray-900">
                    👥 {rideData.seats} available
                  </p>
                </div>
              </div>
              {rideData.rideType && (
                <div className="pt-2 border-t border-blue-200">
                  <p className="text-xs text-blue-600 font-medium">
                    Vehicle Type
                  </p>
                  <p className="text-sm text-gray-900">
                    🚗 {rideData.rideType}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              <p className="text-xs text-blue-600 font-medium">Trip ID</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">{id}</p>
              <p className="mt-2 text-xs text-gray-500">
                {error
                  ? "Unable to load trip details"
                  : "Loading trip information..."}
              </p>
            </>
          )}
        </div>

        {/* Open App Button */}
        {platform !== "desktop" && (
          <button
            onClick={openApp}
            className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:bg-blue-800"
          >
            Open in App
          </button>
        )}

        {/* Store Links */}
        <div className="mt-6 space-y-3">
          <p className="text-xs text-gray-500">Don&apos;t have the app?</p>

          <a
            href="https://play.google.com/store/apps/details?id=com.rasync.sync"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-lg border border-gray-300 py-2.5 text-sm text-gray-800 transition hover:bg-gray-100"
          >
            Download for Android
          </a>

          <a
            href="https://apps.apple.com/in/app/syinq/id6755780778"
            target="_blank"
            rel="noopener noreferrer"
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

        {/* Fallback Message */}
        {platform !== "desktop" && (
          <p className="mt-4 text-xs text-gray-400">
            If the app doesn&apos;t open, you&apos;ll be redirected to download
            it.
          </p>
        )}
      </div>
    </main>
  );
}
