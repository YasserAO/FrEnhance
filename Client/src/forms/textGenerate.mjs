const fetchText = async (theme, level) => {
  const responseAPI = await fetch("/api/generate/text", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      level,
      theme,
    }),
  });
  return await responseAPI.json();
};

export default fetchText;
