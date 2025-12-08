const AccountInfoPage = () => {
  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="">
        <p className="font-semibold text-2xl">Account Information</p>
        <p className="text-sm">
          Manage your personal details associated with your account. Update your
          information to keep your profile accurate and secure.
        </p>
      </div>

      <div className="border-b border-gray-200"></div>

      <div className="grid grid-cols-2">
        <p className="text-lg font-medium">Name</p>
        <div className="flex items-center gap-10">
          <div className="">
            <p className="text-xs font-medium tracking-tight uppercase">
              First Name
            </p>
            <p>Tyler</p>
          </div>
          <div className="">
            <p className="text-xs font-medium tracking-tight uppercase">
              Last Name
            </p>
            <p>Wong</p>
          </div>
        </div>
      </div>

      <div className=" border-b border-gray-200"></div>

      <div className="grid grid-cols-2">
        <p className="text-lg font-medium">Email</p>
        <div className="flex items-center gap-10">
          <div className="">
            <p className="text-xs font-medium tracking-tight uppercase">
              Email Address
            </p>
            <p>tyler.wong.k@gmail.com</p>
          </div>
        </div>
      </div>
      <div className=" border-b border-gray-200"></div>
    </div>
  );
};

export default AccountInfoPage;
