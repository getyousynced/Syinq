'use client'

import Landing from "./components/Landing";
import AboutSync from "./components/AboutSync";
import Slider from "./components/Slider";
import EffortlessCarpooling from "./components/EffortlessCarpooling";

export default function Home() {
  return (
    <>
      <Landing />
      <Slider/>
      <EffortlessCarpooling />
      <AboutSync/>
    </>
  );
}
