import { useState } from "react";

import { Link } from "react-router-dom";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="grid grid-cols-[60%_40%] w-full h-screen">
      <div className="flex flex-col items-center justify-center h-full overflow-auto">
        <div className="flex flex-col gap-10 items-center p-2 w-1/2">
          <h2 className="text-4xl font-medium mb-10"> Welcome Back!</h2>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <p className="text-gray-800">EMAIL ADDRESS</p>
                <input
                  type="text"
                  className="border w-full rounded-md p-2 focus:outline-none border-gray-400"
                  placeholder="email@email.com"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-gray-800">PASSWORD</p>
                <div className="relative w-full border rounded-md border-gray-400 focus-within:border-gray-700">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="p-2 focus:outline-none"
                  />

                  {showPassword ? (
                    <VisibilityOffOutlinedIcon
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    />
                  ) : (
                    <RemoveRedEyeOutlinedIcon
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
            <p className="cursor-pointer text-sm">Forgot password?</p>

            <button className=" border border-gray-700 rounded-md bg-gray-700 text-white p-2 cursor-pointer">
              SIGN IN
            </button>
            <p className="text-center text-sm">
              Don't have an account? Sign
              <Link to="/create-account">up</Link>
            </p>
            <div className="flex items-center w-full">
              <div className="flex-grow border-t border-gray-700"></div>
              <p className="text-center text-xs text-gray-700 mx-2">OR</p>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>
            <button className="flex items-center justify-center gap-2 border border-gray-400 rounded-md p-2 cursor-pointer">
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="w-4 h-4"
              />
              CONTINUE WITH GOOGLE
            </button>
          </div>
          <div className="flex items-center justify-between gap-2 text-xs">
            <p className="cursor-pointer">Terms & Conditions </p>
            &#183;
            <p className="cursor-pointer">Private Policy</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-700">
        <div className="p-4">
          <h1 className="text-end text-white font-medium text-3xl">BAT</h1>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
