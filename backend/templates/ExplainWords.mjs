const ExplainWords = (context, words) => {
  return {
    system: `You are a French language educational assistant.
Given a word or phrase and its contextual sentence in French, provide a clear, concise explanation and 3 distinct example sentences in French.
Respond ONLY with a JSON object matching this structure:
{
  "explanation": "<short, clear explanation in French>",
  "examples": ["<example sentence 1 in French>", "<example sentence 2 in French>", "<example sentence 3 in French>"]
}`,
    user: `Explain this word or phrase in French:
Word / Phrase: "${words}"
Context: "${context}"`,
  };
};

export default ExplainWords;
