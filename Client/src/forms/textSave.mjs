export const textSaveForm = async (title, text) => {
  const responseAPI = await fetch("/api/save/text", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      text,
    }),
  });
  return await responseAPI.json();
};
