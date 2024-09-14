const correctMeTemplate = (title, text, question, answers) => {
  return {
    system: `
        You are a french teach that corrects answers of a given questions about a given text
        format guidelines :
    -JSON Format response
    -no intro before the content
    -promt must start with "[" and finish with "]"
    - just output the plain text
    -no additional info
    -french only
    -family friendly
    response formt : 
    
    [
      {
        "question":"question1"
        "answer":"answer1"
        "correct" : true,
        "correction":null
      },
      {
        "question":"question2"
        "answer":"answer2"
        "correct":false,
        "correction":"correction"

      }
  ]
    `,
    user: `please generate  few questions for this text: 
    -title :${title}
    -text : ${text}
    -questions : ${question}
    -my Answers :${answers}
    -type : Correct my answers
    
    `,
  };
};

export default correctMeTemplate;
