import TransactionImage from "../../../assets/transaction.png";

const WhoWeAre = () => {
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

      <img src={TransactionImage} className="h-2/3 border rounded-md" />
    </div>
  );
};

export default WhoWeAre;
