import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState, useEffect } from "react";

const AccountInfoPage = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2">
          <p className="text-xl font-medium">Name</p>
          <div className="flex items-center gap-10">
            <div className="">
              <p className="text-sm">First Name</p>
              <p>Tyler</p>
            </div>
            <div className="">
              <p className="text-sm">Last Name</p>
              <p>Wong</p>
            </div>
          </div>
        </div>

        <div className=" border-b border-gray-300"></div>
        <div className="grid grid-cols-2">
          <p className="text-xl font-medium">Email</p>
          <div className="flex items-center gap-10">
            <div className="">
              <p className="text-sm">Email Address </p>
              <p>tyler.wong.k@gmail.</p>
            </div>
          </div>
        </div>
        <div className=" border-b border-gray-300"></div>
      </div>
    </div>
  );
};

export default AccountInfoPage;
