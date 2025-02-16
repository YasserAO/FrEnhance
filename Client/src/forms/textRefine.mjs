const textRfine = async (title, text, instruction) => {
  const responseAPI = await fetch(
    import.meta.env.VITE_API_URL + "/api/generate/textRefine",
    {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        text,
        title,
        instruction,
      }),
    },
  );
  return await responseAPI.json();
};

export default textRfine;
