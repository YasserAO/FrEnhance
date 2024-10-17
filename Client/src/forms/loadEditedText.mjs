export const loadEditedText = async () => {
  try {
    const editedResponse = await fetch(
      import.meta.env.VITE_API_URL + "/api/text/editedtext",
      {
        credentials: "include",
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      },
    );
    const Resp = editedResponse.json();
    return Resp;
  } catch (err) {
    console.error(err);
  }
};
