import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { newPasswordValidation } from "../../utils/validation";
import { sendData } from "../../hooks/sendData";

function ResetPassword() {
  const { token } = useParams(); // Retrieve token from URL path
  const newPasswordRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const[formData, setFormData] = useState({});
  const [notSuccess, setNotSuccess] = useState(false);
  const [backendError, setBackendError] = useState("");

  const navigate = useNavigate(); // For redirection after success

  useEffect(() => {
    if (!token) {
      setBackendError("Token is missing from the URL.");
      setNotSuccess(true);
    }
    if (notSuccess) {
        const timer = setTimeout(() => setNotSuccess(false), 2000);
        return () => clearTimeout(timer); // Cleanup the timer on component unmount or when notSuccess changes
      }
  }, [token,notSuccess]);


  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(prev => !prev);
  };

  const clearForm = () => {
    passwordRef.current.value = '';
    newPasswordRef.current.value = '';
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = newPasswordRef.current.value;
    const password = passwordRef.current.value;

    const { isValid, errors } = newPasswordValidation(password, newPassword);
    setErrors(errors);

    if (!isValid) {
      return;
    }

    setFormData({"newPassword": newPassword});

    setIsLoading(true);

    try {
      const response = await sendData(`http://localhost:3500/auth/reset-password/${token}`, formData);

      if (response.status === 200) {
        setSuccess(true);
        clearForm();
        setTimeout(() => navigate("/login"), 2000); 
      } else {
        throw new Error('Password reset failed');
      }
    } catch (error) {
      console.error("Password reset failed:", error.response?.data || error.message);
      setBackendError(error.response?.data );
      setNotSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
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
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Change password</h1>
            <p className="text-sm text-muted-foreground"> Please enter the new password</p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`border p-2 rounded-md w-full ${errors.password ? "border-red-500" : ""}`}
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500">{errors.password}</p>}

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className={`border p-2 rounded-md w-full ${errors.newPassword ? "border-red-500" : ""}`}
                  placeholder="Confirm Password"
                  ref={newPasswordRef}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2"
                  onClick={toggleNewPasswordVisibility}
                >
                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.newPassword && <p className="text-red-500">{errors.newPassword}</p>}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {/* Success and error modals */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-semibold">Password Reset Successful!</h2>
            <p className="mt-2">Redirecting to the login page...</p>
          </div>
        </div>
      )}

      {notSuccess &&   (
       <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
       <div className="bg-white p-4 rounded-md w-1/2"> {/* Set width to 50% */}
         <h2 className="text-lg font-semibold">Password Reset Failed!</h2>
         <p className="mt-2 text-red-500">{backendError}</p>
         <button
           onClick={() => setNotSuccess(false)}
           className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
         >
           Close
         </button>
       </div>
     </div>
     
      )}
    </div>
  );
}
export default ResetPassword;
