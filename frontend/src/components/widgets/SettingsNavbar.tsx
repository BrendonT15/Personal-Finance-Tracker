

import { Link } from "react-router-dom";

const SettingsNavbar = () => {
  const navItemClasses =
    "flex items-center gap-1 cursor-pointer  hover:bg-gray-100 hover:text-gray-700 hover:rounded-md py-2 px-3 transition-colors duration-200 ease-in-out";

  return (
    <div className="col gap-4 h-full">
      <nav className="col h-full gap-4 p-4">
        <div className="col gap-1 text-gray-500 text-sm">
          <Link to="account" className={navItemClasses}>
            Account Information
          </Link>
          <Link to="bank-account" className={navItemClasses}>
            Bank Account Information
          </Link>
          <Link to="notifications" className={navItemClasses}>
            Notifications
          </Link>
          <Link to="/budget" className={navItemClasses}>
            Terms of Service
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default SettingsNavbar;
