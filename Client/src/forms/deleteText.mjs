export const deleteTextForm = async (id) => {
  try {
    const statusRequest = await fetch(
      import.meta.env.VITE_API_URL + "/api/text/delete",
      {
        credentials: "include",
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      },
    );
    const Resp = statusRequest.json();
    return Resp;
  } catch (err) {
    console.error(err);
  }
};
// Comment
