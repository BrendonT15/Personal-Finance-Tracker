import Navbar from "../widgets/Navbar";
import { Outlet } from "react-router-dom";

const HomePageLayout = () => {
  return (
    <div className="grid grid-cols-[15%_auto] w-full h-screen">
      <div className="bg-gray-100 p-4">
        <Navbar />
      </div>

      <main className="overflow-y-scroll scrollbar-gutter stable">
        <Outlet />
      </main>
    </div>
  );
};

export default HomePageLayout;
