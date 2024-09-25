export const textSaveSchema = {
  title: {
    notEmpty: true,
    errorMessage: "A title is Required",
  },
  text: {
    isLength: {
      options: { min: 200 },
      errorMessage: "text must at least has 200 letters",
    },
  },
};
