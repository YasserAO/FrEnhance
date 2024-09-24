const fetchText = async (theme, nv) => {
  const level = parseInt(nv);
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
