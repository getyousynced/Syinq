'use client'

import Landing from "./components/Landing";
import EffortlessCarpooling from "./components/EffortlessCarpooling";
import AboutSync from "./components/AboutSync";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Landing />
      <EffortlessCarpooling/>
      <AboutSync/>
      <Footer/>
    </div>
  );
}
