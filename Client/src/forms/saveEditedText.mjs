export const SaveEditedText = async (title, text, savebutton) => {
  try {
    const editedResponse = await fetch(
      import.meta.env.VITE_API_URL + "/api/save/editedtext",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title, text,savebutton }),
      },
    );
    const Resp = editedResponse.json();
    return Resp;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
