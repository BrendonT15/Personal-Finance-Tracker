import Footer from "./landing-page/Footer";
import HeroSection from "./landing-page/HeroSection";
import WhoWeAre from "./landing-page/WhoWeAre";
import OurPhilosphy from "./landing-page/OurPhilosophy";
import { useEffect } from "react";
import Lenis from "lenis";

import Reviews from "./landing-page/Reviews";

const LandingPage = () => {

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
  return (
    <div className=" ">
      <HeroSection />
      <WhoWeAre />
      <Reviews />
      <OurPhilosphy />
      <Footer />
    </div>
  );
};

export default LandingPage;
