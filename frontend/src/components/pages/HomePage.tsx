const HomePage = () => {
  return (
    <div className="grid grid-cols-[15%_auto] w-full h-screen">
      <div className="bg-gray-100 p-4 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-center">
            <p className="text-3xl font-medium cursor-pointer">BAT</p>
          </div>
          <nav className="flex flex-col gap-10 mt-10">
            <div className="flex flex-col gap-2">
              <p className="tracking-tight">GENERAL</p>
              <div className="flex flex-col gap-8">
                <p>Dashboard</p>
                <p>Transactions</p>
                <p>Accounts</p>
                <p>Analytics</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="tracking-tight">SYSTEM</p>
              <div className="flex flex-col gap-8">
                <p>Settings</p>
                <p>My Account</p>
                <p>Dark Mode</p>
              </div>
            </div>
          </nav>
        </div>

        <div>
          <p className="cursor-pointer">Logout</p>
        </div>
      </div>

      <div className=""></div>
    </div>
  );
};

export default HomePage;
