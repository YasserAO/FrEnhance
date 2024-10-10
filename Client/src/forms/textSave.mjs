export const textSaveForm = async (title, text) => {
  const responseAPI = await fetch(
    import.meta.env.VITE_API_URL + "/api/save/text",
    {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        text,
      }),
    },
  );
  return await responseAPI.json();
};
