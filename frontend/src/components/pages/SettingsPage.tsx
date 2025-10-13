import Navbar from "../widgets/Navbar";
import SettingsNavbar from "../widgets/SettingsNavbar";
import AccountInfoPage from "./settings/AccountInfoPage";
import BankAccountInfoPage from "./settings/BankAccountInfoPage";
import NotificationPage from "./settings/NotificationPage";

const SettingsPage = () => {
  return (
    <div className="grid grid-cols-[15%_auto] w-full h-screen">
      <div className="bg-gray-100 p-4"></div>
      <div className="p-4 grid grid-rows-[10%_auto] gap-1">
        <div className="p-1">
          <h2 className="font-medium text-4xl">Settings</h2>
        </div>
        <div className=" p-1 grid grid-cols-[20%_auto]">
          <SettingsNavbar />

          {/* Main Settings Content */}
          {/* 
                   <AccountInfoPage/>
                   <BankAccountInfoPage />
*/}
          <NotificationPage/>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
