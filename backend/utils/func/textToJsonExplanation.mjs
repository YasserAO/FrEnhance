export const textToJsonExplanation = (input) => {
  const sections = input.split("\n\n");
  const result = {
    explanation: "",
    examples: [],
  };

  sections.forEach((section) => {
    if (section.startsWith("Exp")) {
      result.explanation = section.replace("Exp :", "").trim();
    } else if (section.startsWith("Eg")) {
      result.examples = section
        .replace("Eg :", "")
        .trim()
        .split("\n")
        .map((example) => example.replace(/^- /, "").trim());
    }
  });

  return result;
};
