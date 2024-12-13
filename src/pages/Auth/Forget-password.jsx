import React, { useRef, useState } from 'react';
import { cn } from "@/lib/utils"; 
import { validateEmail } from './../../utils/validation';
import { sendData } from '../../hooks/sendData';

function ForgetPassword() {
    const [errors,setErrors]=useState({});
    const emailRef=useRef();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const { isValid, errors: validationErrors } = validateEmail(email);
        if (!isValid) {
          setErrors(validationErrors);
          return;
        }
        setErrors({});
        setIsLoading(true);
        try {
          const response = await sendData("/auth/forget-password", { email });
          if (response.status === 200) {
            alert("Please check your email to reset your password");
          } else {
            throw new Error("Unexpected error occurred");
          }
        } catch (error) {
          console.error("Forget password failed:", error);
          setErrors({ email: error.message || "Forget password failed" });
        } finally {
          setIsLoading(false);
        }
  
    }
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
            <h1 className="text-2xl font-semibold tracking-tight">Forget password</h1>
            <p className="text-sm text-muted-foreground"> Please enter your email </p>
          </div>
          <form onSubmit={handleSubmit} className={cn("grid gap-6")}>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                className={`border p-2 rounded-md ${errors.email ? "border-red-500" : ""}`}
                placeholder="Email"
                ref={emailRef}
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}

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

     
    </div>
    );
}
export default ForgetPassword;