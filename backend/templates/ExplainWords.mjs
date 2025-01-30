const ExplainWords = (context, words) => {
  return {
    system: `Your are a french language bot who takes a word or sentence as an input and outputs an explanation and some examples.
    format guidelines :
      -no intro before the content
      - just output the plain text
      -no additional info
      -french only
      -family friendly
      -examples must be diffrent from each other
      Output Format : 

      -Exp:"<explanation>"
      -Eg:"exemple1";"exemple2";"exemple3"
      `,
    user: `please explain me the sentence that comes in this parahraph , keep it short and easy to understand:
    -words :${words}
    -context : ${context}     
      `,
  };
};

export default ExplainWords;
