export const emailSchema = {
  email: {
    isEmail: true,
    errorMessage: "Invalid email address",
  },
};

export const newPassword = {
  password: {
    isLength: {
      options: { min: 12 },
      errorMessage: "Password must be at Least 12 Characters",
    },
  },
  Token: {
    in: ["body"], // Validate this field in the request body
    matches: {
      options: [/^[a-f0-9]{64}$/i], // Regular expression to match exactly 64 hex characters
      errorMessage: "Token must be a 64-character hexadecimal string", // Custom error message
    },
    isLength: {
      options: { min: 64, max: 64 },
      errorMessage: "Token must be exactly 64 characters long", // Ensure it's the correct length
    },
  },
};

export const TokenSchema = {
  Token: {
    in: ["body"], // Validate this field in the request body
    matches: {
      options: [/^[a-f0-9]{64}$/i], // Regular expression to match exactly 64 hex characters
      errorMessage: "Token must be a 64-character hexadecimal string", // Custom error message
    },
    isLength: {
      options: { min: 64, max: 64 },
      errorMessage: "Token must be exactly 64 characters long", // Ensure it's the correct length
    },
  },
};
