import Image from "next/image";
import Landing from "./components/Landing";
import EffortlessCarpooling from "./components/EffortlessCarpooling";
import AboutSync from "./components/AboutSync";

export default function Home() {
  return (
    <div>
      <Landing />
      <EffortlessCarpooling/>
      <AboutSync/>
    </div>
  );
}
