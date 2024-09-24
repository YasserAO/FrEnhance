export const textGenSchema = {
  level: {
    isInt: {
      options: { min: 1, max: 3 },
      errorMessage: "Difficulty must be between 1 and 3",
    },
  },
  theme: {
    notEmpty: {
      errorMessage: "Theme must not be empty",
    },
    trim: true,
    custom: {
      options: (value) => {
        if (value.trim().length < 10) {
          throw new Error("Theme must be at least 10 characters long");
        }
        if (value.trim().length > 100) {
          throw new Error("Theme must be less than 30 characters");
        }
        return true; // Indicates successful validation
      },
    },
  },
};
