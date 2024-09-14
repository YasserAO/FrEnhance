const textTemplate = (level, subject, answers) => {
  return `
generate a french exercice to enhance my skills in french

guideline Formating : 
-no text outside the {}

- the Exercice is entirely in French language
- the response is a JSON format
-don't provide aditional text before and after the JSON
-the answers must be full answers
context : 
- the skill to enhance : Written Comprehension
-Difficulty: ${level}
-type : Text + 5 questions
-text length [beginer : 50 words , intermediate : 100 words , advanced : 200 words]
-theme :${subject}
-answers : ${answers ? `Yes` : `No`}
-document sources
response format : 
{
"title":"<title>",
"text":"<the Text>",
"questions" : [{question1,answer1},{questions2,answer2},...etc],
"sources":"<sources>",


}
`;
};

export default textTemplate;
