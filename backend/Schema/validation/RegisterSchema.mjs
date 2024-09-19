export const registrationSchema = {
  firstName: {
    notEmpty: true,
    errorMessage: "First name is required",
  },
  lastName: {
    notEmpty: true,
    errorMessage: "Last name is required",
  },
  email: {
    isEmail: true,
    errorMessage: "Invalid email address",
  },
  password: {
    notEmpty: true,
    isLength: { min: 6 },
    errorMessage: "Password must be at least 6 characters long",
  },
  username: {
    notEmpty: true,
    isLength: { min: 3 },
    errorMessage: "Username must be at least 3 characters long",
  },
  phoneNumber: {
    optional: true,
    isMobilePhone: true,
    errorMessage: "Invalid phone number",
  },
};
