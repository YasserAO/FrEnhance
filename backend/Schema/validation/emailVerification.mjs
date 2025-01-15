export const emailVerificationCodeSchema = {
  code: {
    in: ["body"], // Validate this field in the request body
    matches: {
      options: [/^\d{6}$/], // Regular expression to match exactly 6 digits
      errorMessage: "Code must be exactly 6 digits", // Custom error message
    },
    // Alternatively, ensure it's 6 characters and a number
    isLength: {
      options: { min: 6, max: 6 },
      errorMessage: "Code must be 6 characters long",
    },
    isNumeric: {
      errorMessage: "Code must contain only numbers",
    },
  },
};

export const emailVerificationUrlSchema = {
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
