// src/hooks/useFormValidation.js
export const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    return re.test(String(email).toLowerCase());
  };
  