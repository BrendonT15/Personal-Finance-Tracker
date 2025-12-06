import ReviewWidget from "./ReviewWidget";
import reviews from "../../../data/reviews";
import WSJLogo from "../../../assets/The-Wall-Street-Journal-Symbol.png";
import NYTLogo from "../../../assets/The_New_York_Times_logo.png";
import ForbesLogo from "../../../assets/forbes-logos-black-png-download-7.png";
import YahooLogo from "../../../assets/Yahoo!_Finance_logo_2021.png";
import BloombergLogo from "../../../assets/Bloomberg-Logo.png";
import CNBCLogo from "../../../assets/CNBC_logo.svg.png";

const Reviews = () => {
  return (
    <div className="w-full h-screen bg-gray-700 p-8 text-white grid grid-cols-2 gap-20">
      <div className="flex flex-col gap-6">
        <p className="font-thin uppercase">What Our Members Say</p>

        <h1 className="text-6xl font-medium">
          Trusted By Users Around The Globe
        </h1>
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <p className="text-6xl font-medium">4.9 </p>
            <p className="text-sm font-light">Average Rating</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-6xl font-medium">50K+ </p>
            <p className="text-sm font-light">Downloads</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-6xl font-medium">500K+ </p>
            <p className="text-sm font-light">Transactions Tracked</p>
          </div>
        </div>

        <div className="h-full grid grid-cols-3 grid-rows-2 gap-4 items-center">
          <img src={WSJLogo} className="w-full h-12 object-contain" />
          <img src={NYTLogo} className="w-full h-16 object-contain" />
          <img src={ForbesLogo} className="w-full h-10 object-contain" />
          <img src={YahooLogo} className="w-full h-16 object-contain" />
          <img src={BloombergLogo} className="w-full h-32 object-contain" />
          <img src={CNBCLogo} className="w-full h-20 object-contain" />
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-3  gap-2 p-1">
        {reviews.map((review) => (
          <ReviewWidget key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
