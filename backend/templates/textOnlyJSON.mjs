const textOnlyTemplate = (level, theme) => {
  const niveau = [
    { nv: "beginer (A1-A2)", words: "between 150-200 words" },
    { nv: "Intermediate(B1-B2)", words: "between 200-300 words" },
    { nv: "Advanced(C1-C2)", words: "between 300-500 words" },
  ];
  return {
    system: `
Your are a french text Generator, you use vocabulary and languge structure accordinaly with the difficulty.

format guidelines:
-JSON Format
-no additional info
-french only
-family friendly
-vocabulary level must be respected
response formt : 

{
    title:<title>,
    text:[<paragraph1>,<paragraph2>,<paragraph3>,...,<paragraphN>]
}
`,
    user: `please generate  a text with a title in french language 
content: 
-theme : ${theme}
-title : anything related to ${theme}
-vocabulary : ${niveau[level].nv}
-type : text
-length : ${niveau[level].words}


`,
  };
};

export default textOnlyTemplate;
