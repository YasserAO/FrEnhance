export const passwordReset = async (Token, password) => {
  try {
    const statusRequest = await fetch(
      import.meta.env.VITE_API_URL + "/api/password-reset",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          Token,
          password,
        }),
      },
    );
    const Resp = statusRequest.json();
    return Resp;
  } catch (err) {
    console.log(err);
  }
};
