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
-JSON Format response
-no intro before the content
-promt must start with "{" and finish with "}"
- just output the plain text
-no additional info
-french only
-family friendly

`,
    user: `please generate  a text with a title in french language 
content: 
-theme : ${theme}
-title : anything related to ${theme}
-level : ${niveau[level - 1].nv}
-type : text
-length : ${niveau[level - 1].words}
response formt : 
{
  title:<titre>,
  text:<text>
}
`,
  };
};

export default textOnlyTemplate;
