export const textToJsonExplanation = (input) => {
  if (!input) {
    return { explanation: "", examples: [] };
  }

  // 1. If already an object
  if (typeof input === "object") {
    return {
      explanation: input.explanation || input.Explanation || "",
      examples: Array.isArray(input.examples)
        ? input.examples
        : Array.isArray(input.Examples)
        ? input.Examples
        : [],
    };
  }

  // 2. Try JSON parse
  try {
    const parsed = JSON.parse(input);
    if (parsed && typeof parsed === "object") {
      return {
        explanation: parsed.explanation || parsed.Explanation || "",
        examples: Array.isArray(parsed.examples)
          ? parsed.examples
          : Array.isArray(parsed.Examples)
          ? parsed.Examples
          : [],
      };
    }
  } catch (_) {
    // Fall back to line-by-line regex parsing
  }

  // 3. Fallback text parsing
  const result = {
    explanation: "",
    examples: [],
  };

  const lines = input.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    const cleanLine = trimmed.replace(/^[-*•\s]+/, "");

    if (/^exp(lanation)?\s*:/i.test(cleanLine)) {
      result.explanation = cleanLine
        .replace(/^exp(lanation)?\s*:\s*/i, "")
        .replace(/^["'`]|["'`]$/g, "")
        .trim();
    } else if (/^(eg|examples?|exemples?)\s*:/i.test(cleanLine)) {
      const examplesPart = cleanLine.replace(/^(eg|examples?|exemples?)\s*:\s*/i, "");
      result.examples = examplesPart
        .split(/;\s*|"\s*,\s*"|"\s*;\s*"/)
        .map((ex) => ex.replace(/^["'`]|["'`]$/g, "").replace(/^[-*•\s]+/, "").trim())
        .filter(Boolean);
    }
  }

  return result;
};
