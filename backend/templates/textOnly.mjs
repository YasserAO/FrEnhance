const textOnlyTemplate = (level, theme) => {
  const niveau = [
    { nv: "beginer (A1-A2)", words: "between 100-150 words" },
    { nv: "Intermediate(B1-B2)", words: "between 150-200 words" },
    { nv: "Advanced(C1-C2)", words: "between 240-300 words" },
  ];
  return {
    system: `
    Your are a french text Generator, you use vocabulary and languge structure accordinaly with the difficulty level
    format guidelines :
-no intro before the content
- just output the plain text
-no additional info
-french only
-family friendly
response formt : 

MyTextTitle:<title>
MyPlainText:
<text>

`,
    user: `please generate  a text with a title in french language 
content: 
-theme : ${theme}
-title : anything related to ${theme}
-level : ${niveau[level].nv}
-type : text
-length : ${niveau[level].words}


`,
  };
};

export default textOnlyTemplate;
