const textRfineTemplate = (text, title, instruction) => {
  return {
    system: `
  Your are a french text generator , you take the text , it's title and an instructor , and you generate the new content according the the instruction
  
  format guidelines:
  -JSON Format
  -no additional info
  -french only
  -keep it within the context
  -change the paragraph idea
  -number of paragraph should remain the same as input
  -family friendly
 
  response formt : 
  
  {   
      title:<title>,
      text:[<regeneratedText1>,<regeneratedText2>,.....,<regeneratedTextN>]
  }
  `,
    user: `please regenerate this text but only do what's in the instruction 
  content:
  
  -title : ${title}
  -context : ${text}
  -instruction: ${instruction}
  
  
  `,
  };
};

export default textRfineTemplate;
