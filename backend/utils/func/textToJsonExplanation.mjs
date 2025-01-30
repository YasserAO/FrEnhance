export const textToJsonExplanation = (input) => {
  const sections = input.split("\n");
  const result = {
    explanation: "",
    examples: [],
  };

  sections.forEach((section, index) => {
    if (section.startsWith("Exp")) {
      result.explanation = section.replace("Exp:", "").trim();
    } else if (section.startsWith("Eg")) {
      result.examples = section
        .replace("Eg:", "")
        .trim()
        .split(";")
        .map((example) => example.replace(/^- /, "").trim());
    }
  });

  return result;
};
