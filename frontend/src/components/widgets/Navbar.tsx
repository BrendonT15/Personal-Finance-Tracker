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

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import useDarkReader from "../../hooks/useDarkReader";

const Navbar = () => {
  const navigate = useNavigate();

  // ---- DARK MODE STATE ----
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("darkmode") === "true"
  );

  useDarkReader(isDark);

  const toggleDarkMode = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("darkmode", String(next));
  };

  // ---- LOGOUT ----
  const handleLogout = async () => {
    try {
      const sessionString = localStorage.getItem("session");
      const session = sessionString ? JSON.parse(sessionString) : null;
      const token = session?.access_token;

      await axios.post(
        "http://localhost:8000/auth/signout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      localStorage.clear();
      navigate("/signin", { replace: true });
      window.location.reload();
    } catch (err) {
      console.error("Logout failed:", err);
      localStorage.clear();
      navigate("/signin", { replace: true });
      window.location.reload();
    }
  };

  const navItemClasses =
    "flex items-center gap-1 cursor-pointer hover:bg-purple-100 hover:text-purple-700 hover:rounded-md py-2 px-3 transition-colors duration-200 ease-in-out";

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

              <Link to="/accounts" className={navItemClasses}>
                <PeopleAltOutlinedIcon fontSize="inherit" />
                Accounts
              </Link>

              <Link to="/analytics" className={navItemClasses}>
                <AnalyticsOutlinedIcon fontSize="inherit" />
                Analytics
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

              {/* ---- DARK MODE BUTTON ---- */}
              <p className={navItemClasses} onClick={toggleDarkMode}>
                <DarkModeOutlinedIcon fontSize="inherit" />
                {isDark ? "Light Mode" : "Dark Mode"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto text-sm text-gray-500">
          <p className={navItemClasses} onClick={handleLogout}>
            <LogoutOutlinedIcon fontSize="inherit" /> Logout
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
