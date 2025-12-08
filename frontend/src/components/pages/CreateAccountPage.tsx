import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { authAPI } from "../../services/api";

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      navigate("/home"), { replace: true };
    }
  }, [navigate]);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.verifyPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.signup(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );

      console.log("Signup successful:", response);

      navigate("/signin");

      alert("Account created successfully! Please check your email to verify.");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.response?.data?.error || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-[40%_60%] w-full h-screen">
      <div className="bg-gray-700">
        <div className="">
          <h1 className="text-3xl font-medium text-white p-4">BAT</h1>

        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-full overflow-auto">
        <div className="flex flex-col gap-10 items-center p-2 w-1/2">
          <h2 className="text-4xl font-medium">Create Account</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <p className="text-gray-800">FIRST NAME</p>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="border w-full rounded-md p-2 focus:outline-none border-gray-400"
                  placeholder="John"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-gray-800">LAST NAME</p>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="border w-full rounded-md p-2 focus:outline-none border-gray-400"
                  placeholder="Smith"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-gray-800">EMAIL ADDRESS</p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border w-full rounded-md p-2 focus:outline-none border-gray-400"
                  placeholder="email@email.com"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-gray-800">PASSWORD</p>
                <div className="relative w-full border rounded-md border-gray-400 focus-within:border-gray-700">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="p-2 focus:outline-none w-full"
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
              <div className="flex flex-col">
                <p className="text-gray-800">VERIFY PASSWORD</p>
                <div className="relative w-full border rounded-md border-gray-400 focus-within:border-gray-700">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="verifyPassword"
                    value={formData.verifyPassword}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="p-2 focus:outline-none w-full"
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

            <button
              type="submit"
              disabled={loading}
              className="border border-gray-700 rounded-md bg-gray-700 text-white p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "CREATING ACCOUNT..." : "SIGN UP"}
            </button>

            <p className="text-center text-sm">
              Already have an account?  <Link to="/signin" className="text-blue-600 hover:underline">Sign in</Link>
            </p>
            <div className="flex items-center w-full">
              <div className="flex-grow border-t border-gray-700"></div>
              <p className="text-center text-xs text-gray-700 mx-2">OR</p>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-gray-400 rounded-md p-2 cursor-pointer"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="w-4 h-4"
              />
              CONTINUE WITH GOOGLE
            </button>
          </form>
          <div className="flex items-center justify-between gap-2 text-xs">
            <p className="cursor-pointer">Terms & Conditions </p>
            &#183;
            <p className="cursor-pointer">Private Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
