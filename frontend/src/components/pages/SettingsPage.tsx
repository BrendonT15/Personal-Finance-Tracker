import SettingsNavbar from "../widgets/SettingsNavbar";

import { Outlet } from "react-router-dom";

const SettingsPage = () => {
  return (
    <div>
      <div className="p-4 grid grid-rows-[10%_auto] gap-1">
        <div className="">
          <h2 className="font-medium text-4xl">Settings</h2>
        </div>
        <div className="mt-4 grid grid-cols-[20%_auto] h-full">
          <SettingsNavbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
