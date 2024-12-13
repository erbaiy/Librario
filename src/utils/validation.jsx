// src/utils/validation.js

// Function to validate the registration form
export const validateRegister = ({ username, email, password, roles }) => {
  const errors = {};

  // Validate username
  if (typeof username !== 'string' || username.trim().length < 3) {
    errors.username = "Username must be at least 3 characters long.";
  }

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Validate password
  if (!password || password.length < 6) {
    errors.password =
      "Password must be at least 8 characters long, including an uppercase letter, a lowercase letter, a number, and a special character.";
  }

  // Validate roles
  if (!roles || !Array.isArray(roles) || roles.length === 0 || !["Manager", "Client", "Livreur"].includes(roles[0])) {
    errors.roles = "Please select a valid role.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Function to validate the login form
export const loginValidation = (email, password) => {
  const errors = {};

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Validate password
  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

//  function to validate the login2FA  
export const login2FAValidation = (email, otp) => {
  const errors = {};

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Validate OTP
  if (!otp || otp.length < 6) {
    errors.otp = "OTP  must be at  6 characters .";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};


// Function to validate the verify OTP form
export const verifyOtpValidation = (email, otp) => {
  const errors = {};

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Validate OTP
  if (!otp || otp.length== 6) {
    errors.otp = "OTP must be  6 characters .";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
  

export  const  validateEmail=(email)=>{
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  } 
  return {
    isValid:Object.keys(errors).length === 0,
    errors,
  }


};

export const newPasswordValidation = (password, newPassword) => {
  const errors = {};
  
  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  if (!newPassword || newPassword.length < 6) {
    errors.newPassword = "Password must be at least 6 characters long.";
    if(newPassword != password){
      errors.newPassword = "New password must be different from old password.";
    }
  }



  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
