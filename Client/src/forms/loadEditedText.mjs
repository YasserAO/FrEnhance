export const loadEditedText = async () => {
  try {
    const editedResponse = await fetch(
      (import.meta.env.VITE_API_URL || "") + "/api/text/editedtext",
      {
        credentials: "include",
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      },
    );
    if (!editedResponse.ok) {
      console.error("Wrong URL");
      return null;
    }
    const Resp = await editedResponse.json();
    return Resp;
  } catch (err) {
    console.error(err);
  }
};

