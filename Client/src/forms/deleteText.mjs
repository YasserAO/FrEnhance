export const textForm = async () => {
  try {
    const statusRequest = await fetch("/api/text/delete", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const Resp = statusRequest.json();
    return Resp;
  } catch (err) {
    console.log(err);
  }
};
