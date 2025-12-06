import Header from "./Header";
import test from "../../../assets/1.jpg";
import ImageLiquidDistortion from "../../../animations/ImageLiquidDistortion";

const HeroSection = () => {
  return (
    <div className="w-full h-screen relative">
      <ImageLiquidDistortion imageSrc={test} className="w-full h-full" />

      <div className="absolute top-0 left-0 w-full p-8">
        <Header />
      </div>
    </div>
  );
};

export default HeroSection;
