const fetchText = async (theme, nv) => {
  const level = parseInt(nv);
  const responseAPI = await fetch(
    import.meta.env.VITE_API_URL + "/api/generate/text",
    {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        level,
        theme,
      }),
    },
  );
  return await responseAPI.json();
};

export default fetchText;
