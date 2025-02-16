const textRegenTemplate = (text, title, regen) => {
  return {
    system: `
  Your are a french text generator , you take the text and you recreate a specific parts of the text
  
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
      text:[<regeneratedText1>,<regeneratedText2>,.....,<regeneratedTextN>]
  }
  `,
    user: `please regenerate this ${regen.length} paragraph${regen.length > 1 && `s`} within the provided text in french language 
  content: 
  -title : ${title}
  -context : ${text}
  -Target Texts: ${regen.map((text) => text + "\n")}
  
  
  `,
  };
};

export default textRegenTemplate;
