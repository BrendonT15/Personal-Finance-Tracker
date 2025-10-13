import Navbar from "../widgets/Navbar";
import SettingsNavbar from "../widgets/SettingsNavbar";
import AccountInfoPage from "./settings/AccountInfoPage";
import BankAccountInfoPage from "./settings/BankAccountInfoPage";
import NotificationPage from "./settings/NotificationPage";

import { Outlet } from "react-router-dom";

const SettingsPage = () => {
  return (
    <div>
      <div className="p-4 grid grid-rows-[10%_auto] gap-1">
        <div className="p-1">
          <h2 className="font-medium text-4xl">Settings</h2>
        </div>
        <div className=" p-1 grid grid-cols-[20%_auto]">
          <SettingsNavbar />

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
