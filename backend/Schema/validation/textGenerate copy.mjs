export const textSaveSchema = {
  id: {
    notEmpty: true,
    errorMessage: "id is required",
  },
  title: {
    notEmpty: true,
    errorMessage: "A title is Required",
  },
  text: {
    isArray: {
      errorMessage: "Text must be an array",
    },
  },
  savebutton: {
    isBoolean: {
      errorMessage: "SaveButton must be a boolean value",
    },
  },
};
