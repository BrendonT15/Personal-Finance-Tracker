import {
  DashboardOutlined as DashboardOutlinedIcon,
  ReceiptLongOutlined as ReceiptLongOutlinedIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  AnalyticsOutlined as AnalyticsOutlinedIcon,
  SportsScoreOutlined as SportsScoreOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  Person2Outlined as Person2OutlinedIcon,
  DarkModeOutlined as DarkModeOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

const Navbar = () => {
  const navItemClasses =
    "flex items-center gap-1 cursor-pointer  hover:bg-emerald-100 hover:text-green-700 hover:rounded-md py-2 px-3 transition-colors duration-200 ease-in-out";

  return (
    <div className="col gap-4 h-full">
      <h2 className="text-center font-medium text-4xl cursor-pointer">BAT</h2>

      <nav className="col h-full gap-4 p-4">
        <div className="col gap-4">
          <div className="col-1">
            <h4 className="text-gray-400 tracking-tighter text-xs">GENERAL</h4>

            <div className="col gap-1 text-gray-500 text-sm">
              <Link to="/home" className={navItemClasses}>
                <DashboardOutlinedIcon fontSize="inherit" />
                Dashboard
              </Link>
              <Link to="/transactions" className={navItemClasses}>
                <ReceiptLongOutlinedIcon fontSize="inherit" />
                Transactions
              </Link>
              <p className={navItemClasses}>
                {" "}
                <PeopleAltOutlinedIcon fontSize="inherit" /> Accounts
              </p>
              <Link to="/analytics" className={navItemClasses}>
                <AnalyticsOutlinedIcon fontSize="inherit" /> Analytics
              </Link>
              <Link to="/budget" className={navItemClasses}>
                <SportsScoreOutlinedIcon fontSize="inherit" /> Budget
              </Link>
            </div>
          </div>

          <div className="col-1">
            <h4 className="text-gray-400 tracking-tigher text-xs">SYSTEM</h4>
            <div className="col-1 text-gray-500 text-sm">
              <Link to="settings" className={navItemClasses}>
                <SettingsOutlinedIcon fontSize="inherit" />
                Settings
              </Link>

              <p className={navItemClasses}>
                <DarkModeOutlinedIcon fontSize="inherit" />
                Dark Mode
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto text-sm text-gray-500">
          <p className={navItemClasses}>
            <LogoutOutlinedIcon fontSize="inherit" /> Logout
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
