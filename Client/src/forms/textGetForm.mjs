export const textForm = async () => {
  try {
    const statusRequest = await fetch("/api/text", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const Resp = statusRequest.json();
    return Resp;
  } catch (err) {
    console.log(err);
  }
};
