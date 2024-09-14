const questionOnlyTemplate = (level, title, text, num) => {
  const niveau = [
    { nv: "beginer (A1-A2)" },
    { nv: "Intermediate(B1-B2)" },
    { nv: "Advanced(C1-C2)" },
  ];
  return {
    system: `
      You are a Questions and answers Generator for French texts
      format guidelines :
  -JSON Format response
  -no intro before the content
  -promt must start with "{" and finish with "}"
  - just output the plain text
  -no additional info
  -french only
  -the questions must match the difficulty
  -family friendly
  -Please provide your answers in complete sentences with detailed explanations
  response formt : 
  
  {
    "questions" : ["question1","question2","question3"],
    "answers": ["reponse1","reponse2","reponse3"]
  }
    
  `,
    user: `please generate  few questions for this text: 
  -title :${title}
  -text : ${text}
  -Difficulty level: ${niveau[level - 1].nv}
  -type : questions
  -number of questions : ${num}
  
  `,
  };
};

export default questionOnlyTemplate;
