import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../utils/AuthService";
import { signIn, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';



function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [backendError, setBackendError] = useState("");
  
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const clearForm = () => {
    emailRef.current.value = '';
    passwordRef.current.value = '';
    setErrors({});
  };

  const validateForm = (email, password) => {
    const errors = {};
    
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
    }
    
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const email = emailRef.current.value;
  //   const password = passwordRef.current.value;
    
  //   const { isValid, errors } = validateForm(email, password);
    
  //   if (!isValid) {
  //     return setErrors(errors);
  //   }
    
  //   setErrors({});
  //   setIsLoading(true);
    
  //   try {
  //     const { isSignedIn, nextStep } = await signIn({
  //       username: email,
  //       password
  //     });
  //     // console.log("submit")
  //     console.log(isSignedIn);

  //     if (isSignedIn) {
  //       console.log('login seccess')
  //       setSuccess(true);
  //       clearForm();
  //       localStorage.setItem("token", response.data.accessToken);
  //       localStorage.setItem("isAuthenticated", true);

  //       // Redirect after successful login
  //       setTimeout(() => {
  //         navigate('/home');
  //       }, 1500);
  //     } else if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
  //       // Handle unconfirmed account
  //       console.log('sommething wrong');
  //       navigate('/confirm-signup');
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     let errorMessage = "Login failed";
      
  //     // Handle specific Cognito errors
  //     switch (error.code) {
  //       case 'UserNotFoundException':
  //         errorMessage = "No account found with this email";
  //         break;
  //       case 'NotAuthorizedException':
  //         errorMessage = "Incorrect email or password";
  //         break;
  //       case 'UserNotConfirmedException':
  //         errorMessage = "Please verify your email first";
  //         break;
  //       default:
  //         errorMessage = error.message || "An error occurred during login";
  //     }
      
  //     setBackendError(errorMessage);
  //     setErrors({ email: errorMessage, password: errorMessage });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const email = emailRef.current.value;
//     const password = passwordRef.current.value;
    
//     const { isValid, errors } = validateForm(email, password);
    
//     if (!isValid) {
//       return setErrors(errors);
//     }
    
//     setErrors({});
//     setIsLoading(true);
    
//     try {
//       const { isSignedIn, nextStep } = await signIn({
//         username: email,
//         password
//       });

//       if (isSignedIn) {
//         console.log('login success');
//         setSuccess(true);
//         clearForm();

//         // Get the current authenticated session
//         const session = await getCurrentUser();        
//         console.log("ssesion",session);
//         const { accessToken, idToken } = await getTokens();
//          AuthService.setTokens(accessToken.toString(), idToken.toString());

//         // Redirect after successful login
//         // setTimeout(() => {
//         //   navigate('/home');
//         // }, 1500);
//       } else if (nextStep.signInStep === 'CONFIRM_SIGN_UP'){
//         console.log('Account needs verification');
//         navigate('/confirm-signup');
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       let errorMessage = "Login failed";
      
//       // Handle specific Cognito errors
//       switch (error.code) {
//         case 'UserNotFoundException':
//           errorMessage = "No account found with this email";
//           break;
//         case 'NotAuthorizedException':
//           errorMessage = "Incorrect email or password";
//           break;
//         case 'UserNotConfirmedException':
//           errorMessage = "Please verify your email first";
//           break;
//         default:
//           errorMessage = error.message || "An error occurred during login";
//       }
      
//       setBackendError(errorMessage);
//       setErrors({ email: errorMessage, password: errorMessage });
//     } finally {
//       setIsLoading(false);
//     }
// };
const handleSubmit = async (e) => {
  e.preventDefault();
  const email = emailRef.current.value;
  const password = passwordRef.current.value;
  
  const { isValid, errors } = validateForm(email, password);
  
  if (!isValid) {
      return setErrors(errors);
  }
  
  setErrors({});
  setIsLoading(true);
  
  try {
      const { isSignedIn, nextStep } = await signIn({
          username: email,
          password
      });

      if (isSignedIn) {
          console.log('login success');
          setSuccess(true);
          clearForm();
          
          // Get the current authenticated session
          const session = await getCurrentUser();
          console.log("session", session);

          // Get tokens from the current session using the new API
          try {
              const { tokens } = await fetchAuthSession();
              const { accessToken, idToken } = tokens;
              
              // Store tokens
              AuthService.setTokens(accessToken.toString(), idToken.toString());
              console.log("accessToken", accessToken.toString());
              
              // Optional: Redirect after successful login
              setTimeout(() => {
                navigate('/home');
              }, 1500);
          } catch (sessionError) {
              console.error("Error getting session tokens:", sessionError);
              throw sessionError;
          }
      } else if (nextStep?.signInStep === 'CONFIRM_SIGN_UP') {
          console.log('Account needs verification');
          navigate('/confirm-signup');
      }
  } catch (error) {
      console.error("Login failed:", error);
      let errorMessage = "Login failed";
      
      // Handle specific Cognito errors
      switch (error.code) {
          case 'UserNotFoundException':
              errorMessage = "No account found with this email";
              break;
          case 'NotAuthorizedException':
              errorMessage = "Incorrect email or password";
              break;
          case 'UserNotConfirmedException':
              errorMessage = "Please verify your email first";
              break;
          default:
              errorMessage = error.message || "An error occurred during login";
      }
      
      setBackendError(errorMessage);
      setErrors({ email: errorMessage, password: errorMessage });
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
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">Enter your email & password</p>
          </div>
          <form onSubmit={handleSubmit} className={cn("grid gap-6")}>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                className={`border p-2 rounded-md ${errors.email ? "border-red-500" : ""}`}
                placeholder="Email"
                ref={emailRef}
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}

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
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-semibold">Login Successful!</h2>
            <p className="mt-2">Redirecting to the dashboard...</p>
          </div>
        </div>
      )}

      {backendError && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-semibold">Login Failed!</h2>
            <p className="mt-2">{backendError}</p>
            <button
              onClick={() => setBackendError("")}
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

export default Login;