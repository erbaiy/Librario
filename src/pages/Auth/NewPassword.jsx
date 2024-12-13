import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmSignIn } from 'aws-amplify/auth';
import { Eye, EyeOff } from "lucide-react";

function NewPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const newPasswordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const newPassword = newPasswordRef.current.value;
      
      const result = await confirmSignIn({
        challengeResponse: newPassword
      });

      if (result.isSignedIn) {
        console.log('Password change successful');
        navigate('/home');
      } else {
        setError('Failed to update password. Please try again.');
      }
    } catch (error) {
      console.error('Password change error:', error);
      setError(error.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6">
      <h2 className="text-2xl font-bold mb-6">Set New Password</h2>
      <p className="mb-4">Please set a new password for your account.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            ref={newPasswordRef}
            className="w-full p-2 border rounded"
            placeholder="New Password"
            required
            minLength={8}
          />
          <button
            type="button"
            className="absolute right-2 top-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Set New Password"}
        </button>
      </form>
    </div>
  );
}

export default NewPassword;