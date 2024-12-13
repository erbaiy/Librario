// import { useState } from 'react';
// import { signUp } from 'aws-amplify/auth';

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     name: '',
//     phone_number: ''
//   });
//   const [error, setError] = useState(null);

//   const handleCustomSignUp = async (signUpData) => {
//     try {
//       // Ensure phone number is in the correct format (E.164)
//       const formattedPhoneNumber = signUpData.phone_number.startsWith('+')
//         ? signUpData.phone_number
//         : `+${signUpData.phone_number}`;

//       const { isSignUpComplete, userId, nextStep } = await signUp({
//         username: signUpData.email,
//         password: signUpData.password,
//         options: {
//           userAttributes: {
//             email: signUpData.email,
//             name: signUpData.name,
//             phone_number: formattedPhoneNumber,
//           },
//         },
//       });

//       if (isSignUpComplete) {
//         return { success: true, userId };
//       } else {
//         return { success: false, nextStep };
//       }
//     } catch (error) {
//       console.error('Error signing up:', error);
//       throw error;
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const result = await handleCustomSignUp(formData);
      
//       if (result.success) {
//         console.log('Registration successful', result.userId);
//         // Navigate to verification page or show verification form
//       } else {
//         console.log('Additional steps required:', result.nextStep);
//       }
//     } catch (err) {
//       setError(err.message || 'Registration failed');
//     }
//   };

//   return (

    
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="email" className="block mb-1">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <div>
//         <label htmlFor="name" className="block mb-1">
//           Name
//         </label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <div>
//         <label htmlFor="phone_number" className="block mb-1">
//           Phone Number
//         </label>
//         <input
//           type="tel"
//           id="phone_number"
//           name="phone_number"
//           value={formData.phone_number}
//           onChange={handleChange}
//           placeholder="+1234567890"
//           required
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <div>
//         <label htmlFor="password" className="block mb-1">
//           Password
//         </label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       {error && (
//         <div className="text-red-500">
//           {error}
//         </div>
//       )}

//       <button
//         type="submit"
//         className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Register
//       </button>
//     </form>
//   );
// };

// // Verification component
// const VerificationForm = ({ email }) => {
//   const [code, setCode] = useState('');
//   const [error, setError] = useState(null);

//   const handleVerification = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       await confirmSignUp({
//         username: email,
//         confirmationCode: code
//       });
//       // Handle successful verification (e.g., redirect to login)
//     } catch (err) {
//       setError(err.message || 'Verification failed');
//     }
//   };

//   return (
//     <form onSubmit={handleVerification} className="space-y-4">
//       <div>
//         <label htmlFor="code" className="block mb-1">
//           Verification Code
//         </label>
//         <input
//           type="text"
//           id="code"
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       {error && (
//         <div className="text-red-500">
//           {error}
//         </div>
//       )}

//       <button
//         type="submit"
//         className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Verify
//       </button>
//     </form>
//   );
// };

// export default RegisterForm;








import { useState, useRef } from 'react';
import { signUp,confirmSignUp } from 'aws-amplify/auth';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';


const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const navigate = useNavigate();

  const handleCustomSignUp = async () => {
    try {
      const formattedPhoneNumber = phoneRef.current.value.startsWith('+') 
        ? phoneRef.current.value 
        : `+${phoneRef.current.value}`;

      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: emailRef.current.value,
        password: passwordRef.current.value,
        options: {
          userAttributes: {
            email: emailRef.current.value,
            name: usernameRef.current.value,
            phone_number: formattedPhoneNumber,
          },
        },
      });

      return { isSignUpComplete, userId, nextStep };
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await handleCustomSignUp();
      
      if (result.isSignUpComplete) {
        setShowSuccessPopup(true);
        // Navigate to login after success
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setShowVerificationForm(true);
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left Panel */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <h1 className="text-4xl font-bold">
          Libr<span className="text-blue-700">a</span>rio
          </h1>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">Your app's tagline or welcome message</p>
          </blockquote>
        </div>
      </div>

      {/* Right Panel */}
      <div className="lg:p-8 pt-44 m-[30px]">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
            <p className="text-sm text-muted-foreground">Create your account</p>
          </div>

          {!showVerificationForm ? (
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  className="border p-2 rounded-md"
                  placeholder="Username"
                  ref={usernameRef}
                  required
                />

                <input
                  type="email"
                  className="border p-2 rounded-md"
                  placeholder="Email"
                  ref={emailRef}
                  required
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border p-2 rounded-md w-full"
                    placeholder="Password"
                    ref={passwordRef}
                    required
                  />
                  <button 
                    type="button" 
                    className="absolute right-2 top-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <input
                  type="tel"
                  className="border p-2 rounded-md"
                  placeholder="Phone Number (+1234567890)"
                  ref={phoneRef}
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Register"}
              </button>
            </form>
          ) : (
            <VerificationForm email={emailRef.current?.value} onSuccess={() => {
              setShowSuccessPopup(true);
              setTimeout(() => navigate('/login'), 2000);
            }} />
          )}

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold text-green-600 mb-2">Success!</h2>
            <p>Your account has been created successfully.</p>
            <p className="text-sm text-gray-500 mt-2">Redirecting to login...</p>
          </div>
        </div>
      )}
    </div>
  );
};

const VerificationForm = ({ email, onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code
      });
      onSuccess();
    } catch (err) {
      setError(err.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleVerification} className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold">Verify Your Account</h2>
        <p className="text-sm text-gray-600">Please enter the verification code sent to your email</p>
      </div>

      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter verification code"
        className="w-full p-2 border rounded-md"
        required
      />

      {error && (
        <div className="text-red-500 text-sm text-center">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Verifying..." : "Verify Account"}
      </button>
    </form>
  );
};

export default RegisterForm;