import SettingsNavbar from "../widgets/SettingsNavbar";

import { Outlet } from "react-router-dom";

const SettingsPage = () => {
  return (
    <div className="p-4">
      <h2 className="font-medium text-4xl">Settings</h2>

      <div className="mt-4 grid grid-cols-[300px_1fr] gap-6">
        <SettingsNavbar />

        <div className="min-h-[600px] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
