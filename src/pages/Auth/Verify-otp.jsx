import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { login2FAValidation } from "../../utils/validation";
import { sendData } from "../../hooks/sendData";
import { AuthContext } from "../../context/context";
import { cn } from "@/lib/utils";

function VerifyOtp() {

   
  const navigate = useNavigate(); // Initialize useNavigate
  const emailRef = useRef();
  const otpRef = useRef();
  const [showOtp, setShowOtp] = useState(false);
  const [errors, setErrors] = useState({});
  const [loadingState, setLoadingState] = useState({ isLoading: false, success: false, notSuccess: false, backendError: "" });

  const { setAuthState } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setShowOtp((prev) => !prev);
  };

  const clearForm = () => {
    emailRef.current.value = "";
    otpRef.current.value = "";
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const otp = otpRef.current.value;
    const { isValid, errors: validationErrors } = login2FAValidation(email, otp);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoadingState({ ...loadingState, isLoading: true });

    try {
      const response = await sendData("/auth/verify-otp", { email, otp });

      if (response.status !== 200) {
        setLoadingState({ ...loadingState, backendError: response.data.error, notSuccess: true });
        return;
      }

      localStorage.setItem("token", response.data.accessToken);
      setAuthState({ isAuthenticated: true });
      localStorage.setItem("isAuthenticated", true);
      setLoadingState({ ...loadingState, success: true });
      clearForm();
      navigate("/");
      
    } catch (error) {

      setLoadingState({ ...loadingState, backendError: "An unexpected error occurred", notSuccess: true });
      throw error;
    } finally {
      setLoadingState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="container h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <h1 className="text-4xl font-bold">All<span className="text-blue-700">o</span>Media</h1>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">&ldquo;M3a AloMedia Hna kan 3ndk kl 7aga&rdquo;</p>
          </blockquote>
        </div>
      </div>

      <div className="lg:p-8 pt-44 m-[30px]">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">Sign In 2FA</h1>
            <p className="text-sm text-muted-foreground">Enter your email & OTP</p>
          </div>

          <form onSubmit={handleSubmit} className={cn("grid gap-6")}>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                className={cn("border p-2 rounded-md", errors.email ? "border-red-500" : "")}
                placeholder="Email"
                ref={emailRef}
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}

              <div className="relative">
                <input
                  type={showOtp ? "text" : "password"}
                  className={cn("border p-2 rounded-md w-full", errors.otp ? "border-red-500" : "")}
                  placeholder="Otp"
                  ref={otpRef}
                  required
                />
                <button type="button" className="absolute right-2 top-2" onClick={togglePasswordVisibility}>
                  {showOtp ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.otp && <p className="text-red-500">{errors.otp}</p>}
            </div>

            {errors.submit && <p className="text-red-500">{errors.submit}</p>}

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              disabled={loadingState.isLoading}
            >
              {loadingState.isLoading ? "Loading..." : "Login"}
            </button>
          </form>

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-primary">Terms of Service</Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      {loadingState.success && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-semibold">Login Successful!</h2>
            <p className="mt-2">You have logged in successfully. Please check your email for verification of your OTP.</p>
            <button onClick={() => setLoadingState((prev) => ({ ...prev, success: false }))} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
              Close
            </button>
          </div>
        </div>
      )}

      {loadingState.notSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-semibold">Login Failed!</h2>
            <p className="mt-2">{loadingState.backendError}.</p>
            <button onClick={() => setLoadingState((prev) => ({ ...prev, notSuccess: false }))} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyOtp;
