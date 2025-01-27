export const passwordCheck = async (Token) => {
  try {
    const statusRequest = await fetch(
      import.meta.env.VITE_API_URL + "/api/password-check",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          Token,
        }),
      },
    );
    const Resp = statusRequest.json();
    return Resp;
  } catch (err) {
    console.log(err);
  }
};
