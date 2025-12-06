import Header from "./landing-page/Header";
import Footer from "./landing-page/Footer";
import HeroSection from "./landing-page/HeroSection";
import WhoWeAre from "./landing-page/WhoWeAre";
import OurPhilosphy from "./landing-page/OurPhilosophy";
import Demo from "./landing-page/Demo";
import Reviews from "./landing-page/Reviews";

const LandingPage = () => {
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
