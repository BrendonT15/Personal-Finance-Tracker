import Header from "./Header";
import test from "../../../assets/1.jpg";
import ImageLiquidDistortion from "../../../animations/ImageLiquidDistortion";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { useRef, useEffect } from "react";

const HeroSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.set([headerRef.current, contentRef.current, scrollTextRef.current], {
      opacity: 0,
      y: 30,
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
    })
      .to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        "-=0.6"
      )
      .to(
        scrollTextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.5"
      );
  }, []);

  return (
    <div className="w-full h-screen relative">
      <ImageLiquidDistortion imageSrc={test} className="w-full z-0 h-full" />

      <div className="absolute top-0 left-0 w-full p-8 z-10 pointer-events-none">
        <div ref={headerRef} className="pointer-events-auto">
          <Header />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-8 z-10 pointer-events-none">
        <div className="flex items-end justify-between">
          <div ref={contentRef} className="flex flex-col items-start gap-4">
            <h1 className="text-white font-medium text-5xl w-1/2">
              BAT stands for Banking App Tracker and it will organize your
              financial life. Track, budget, plan, and do more with your money -
              together
            </h1>
            <button className="rounded-2xl text-white border border-white px-3 py-1 font-light cursor-pointer pointer-events-auto">
              <Link to="/create-account">Get Started</Link>
            </button>
          </div>

          <p
            ref={scrollTextRef}
            className="text-white text-sm font-thin shrink-0"
          >
            [ SCROLL TO EXPLORE ]
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
