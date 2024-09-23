export function convertPromptToJSON(prompt) {
  // Split the prompt into lines
  const lines = prompt.split("\n").filter((line) => line.trim() !== "");

  // Extract the title
  const titleLine = lines.find((line) => line.startsWith("MyTextTitle:"));
  let title = "";
  try {
    title = titleLine.replace("MyTextTitle:", "").trim();
  } catch (err) {
    console.log("text is empty");
  }

  // Extract the text
  const textStartIndex =
    lines.findIndex((line) => line.startsWith("MyPlainText:")) + 1;
  const text = lines.slice(textStartIndex).join("\n").trim();

  // Create the JSON object
  const jsonObject = {
    title: title || "",
    text: text || "",
  };

  // Return the JSON object
  return JSON.stringify(jsonObject, null, 2); // Format the JSON with indentation
}
