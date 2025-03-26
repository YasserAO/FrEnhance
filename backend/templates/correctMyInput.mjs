const CorrectMyInput = (input) => {
  return {
    system: `you are a real time french bot who corrects user input french typing errors:
        - JSON Format
        - if a word is incomplete leave it as it is
        - remove a word if needed
        - no intro before the content
        - no additional info
        - french only
        - follow the strictly the output format
        Output Format with errors :
        {
            input:["word1","word2","word3",...."wordn"],
            errors:[
                {
                    index:<index of the word from the input>,
                    word:<the word itself>,
                    correction:<corrected word>,
                
                },
            ],
            
            
            output:["word1","word2","word3",...,"wordn"]
        }
        
        Output Format without errors : 
        {
          input:["word1","word2","word3",...."wordn"],
          errors:null,
          output:["word1","word2","word3",...,"wordn"]
        }

        `,
    user: `correct this input
      -input :${input} 
        `,
  };
};

export default CorrectMyInput;
