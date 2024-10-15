'use client'

import Landing from "./components/Landing";
import EffortlessCarpooling from "./components/EffortlessCarpooling";
import AboutSync from "./components/AboutSync";
import Footer from "./components/Footer";
import Slider from "./components/Slider";

export default function Home() {
  return (
    <div>
      <Landing />
      <Slider/>
      <EffortlessCarpooling/>
      <AboutSync/>
      <Footer/>
    </div>
  );
}
