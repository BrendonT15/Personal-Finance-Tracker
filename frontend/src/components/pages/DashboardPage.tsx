import Navbar from "../widgets/Navbar";
import StatWidget from "../widgets/StatWidget";

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-[15%_auto] w-full h-screen">
      <div className="bg-gray-100 p-4">
        <Navbar />
      </div>
      <div className="p-4 col gap-4">
        <h2 className="text-4xl font-medium">Dashboard</h2>

        <div className="flex items-center gap-2">
          <StatWidget />
          <StatWidget />
          <StatWidget />
          <StatWidget />
          <StatWidget />
        </div>

        <div className="border border-gray-200 rounded-md h-full p-4">
          Chart 1
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="border border-gray-200 rounded-md h-full p-4 w-full">
            Chart 1
          </div>
          <div className="border border-gray-200 rounded-md h-full p-4 w-full">
            Chart 1
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
