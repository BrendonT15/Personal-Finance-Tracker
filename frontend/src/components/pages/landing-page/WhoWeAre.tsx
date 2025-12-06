import TransactionImage from "../../../assets/transaction.png";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
  const imageRef = useRef<HTMLImageElement>(null);

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
  }, []);

  return (
    <div className="w-full h-screen p-8 flex flex-col items-center justify-between">
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
        className="h-2/3 border rounded-md"
      />
    </div>
  );
};

export default WhoWeAre;
