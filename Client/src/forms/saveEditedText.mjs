export const SaveEditedText = async (id, title, text, savebutton) => {
  try {
    const editedResponse = await fetch(
      (import.meta.env.VITE_API_URL || "") + "/api/save/editedtext",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id, title, text, savebutton }),
      },
    );
    const Resp = await editedResponse.json();
    return Resp;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

