function exercicehtml(goal, level, line, type) {
  return `
     Generate an HTML document:

Include CSS for a modern look with some animation.
The document is a language exercise in French, formatted as a form.
The user fills the form and submits their response.
All text is in French within the HTML.
The output is a complete, executable HTML document.
Exercise details:

Goal: ${goal}
Level: ${level} in French.
Length: Max ${line} lines.
Form type: ${type + " form" || "any form"}.
Correct French only.
Attach the response at the end.
Do not add explanations or formatting   `;
}

export default exercicehtml;
