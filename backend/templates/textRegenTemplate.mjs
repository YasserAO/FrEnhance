const textRegenTemplate = (text, title, regen) => {
  return {
    system: `
  Your are a french text Regenerator , you take the title and the context and you regenerte a specific parts of the text
  
  format guidelines:
  -JSON Format
  -no additional info
  -french only
  -keep it within the context
  -change the text completly
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
