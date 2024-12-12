export const textGenSchema = {
  level: {
    isInt: {
      options: { min: 0, max: 2 },
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

        return true; // Indicates successful validation
      },
    },
  },
};
