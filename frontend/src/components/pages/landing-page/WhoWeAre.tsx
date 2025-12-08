import TransactionImage from "../../../assets/transaction.png";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";

import AccountImage from "../../../assets/Acounts.png";
import AnalyticsImage from "../../../assets/Analytics.png";

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const leftImageRef = useRef<HTMLImageElement>(null);
  const rightImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.set(imageRef.current, {
      x: -200,
      opacity: 0,
    });

    gsap.to(imageRef.current, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none none",
        scrub: true,
      },
    });

    gsap.set(leftImageRef.current, {
      x: -200,
      opacity: 0,
    });

    gsap.to(leftImageRef.current, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: leftImageRef.current,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none none",
        scrub: true,
      },
    });

    gsap.set(rightImageRef.current, {
      x: 200,
      opacity: 0,
    });

    gsap.to(rightImageRef.current, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: rightImageRef.current,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none none",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="w-full h-full p-8 flex flex-col gap-8 items-center justify-between overflow-x-hidden">
      <div className="flex flex-col items-center gap-5">
        <p className="uppercase font-light text-xl">What is BAT?</p>
        <h1 className="text-4xl font-medium">
          Your home base for money clarity
        </h1>
        <p className="text-3xl w-1/2 text-center">
          BAT simplifies finances by bringing all your accounts together into
          one clear view. Always know where your money is and where it's going,
          achieve your goals quicker, and collaborate with your partner or
          professional at no extra cost.
        </p>
      </div>

      <img
        ref={imageRef}
        src={TransactionImage}
        className="w-2/3 border border-gray-200 rounded-md"
      />

      <div className="flex flex-col items-center gap-5">
        <h1 className="text-4xl font-medium">
          Your home base for money clarity
        </h1>
        <p className="text-3xl w-1/2 text-center">
          Connect all your bank accounts, credit cards, and investments. See
          your complete financial picture at a glance with real-time balances
          and updates.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-full">
        <img
          ref={leftImageRef}
          src={AccountImage}
          className="w-full h-full object-cover border border-gray-200 rounded-md"
        />
        <img
          ref={rightImageRef}
          src={AnalyticsImage}
          className="w-full h-full object-cover border border-gray-200 rounded-md"
        />
      </div>
    </div>
  );
};

export default WhoWeAre;