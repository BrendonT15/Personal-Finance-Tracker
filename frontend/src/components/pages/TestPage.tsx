import Navbar from "../widgets/Navbar";

const TestPage = () => {
  return (
    <div className="grid grid-cols-[15%_auto] w-full h-screen">
      <div className="bg-gray-100 p-4">
        <Navbar/>
      </div>
      <div className=""></div>
    </div>
  );
};

export default TestPage;
