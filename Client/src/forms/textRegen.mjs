const textRegen = async (title, text, regen) => {
  const responseAPI = await fetch(
    import.meta.env.VITE_API_URL + "/api/generate/textRegen",
    {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        text,
        title,
        regen,
      }),
    },
  );
  return await responseAPI.json();
};

export default textRegen;
