"use client";

import Landing from "./components/Landing";
import AboutSync from "./components/AboutSync";
import Slider from "./components/Slider";
import EffortlessCarpooling from "./components/EffortlessCarpooling";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import isHotkey from "is-hotkey";
import { MacbookScrollDemo } from "./components/MacbookScroll";
import VideoComponent from "./components/VideoComponent";

export default function Home() {
  const { setTheme } = useTheme();

  const handlekeyDown = useCallback((event: KeyboardEvent) => {
    if (isHotkey("mod+m", event)) {
      event.preventDefault();
      setTheme("light");
    }
    if (isHotkey("mod+k", event)) {
      event.preventDefault();
      setTheme("dark");
    }
    if (isHotkey("mod+s", event)) {
      event.preventDefault();
      setTheme("system");
    }
  },[]);

  useEffect(() => {
    document.addEventListener("keydown", handlekeyDown);

    // unmount component
    return () => document.removeEventListener("keydown", handlekeyDown);
  }, [handlekeyDown]);
  return (
    <>
      <Landing />
      <Slider />
      <VideoComponent />
      <MacbookScrollDemo />
      <EffortlessCarpooling />
      <AboutSync />
    </>
  );
}
