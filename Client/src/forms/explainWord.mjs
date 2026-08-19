const fetchExplain = async (words, context) => {
  const responseAPI = await fetch(
    (import.meta.env.VITE_API_URL || "") + "/api/generate/explain",
    {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        words: words,
        context: context,
      }),
    },
  );
  return await responseAPI.json();
};

export default fetchExplain;

