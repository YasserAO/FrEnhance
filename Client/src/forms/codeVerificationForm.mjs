export const codeVerification = async (code) => {
  try {
    const statusRequest = await fetch(
      import.meta.env.VITE_API_URL + "/api/user/email-verification",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      },
    );
    const Resp = statusRequest.json();
    return Resp;
  } catch (err) {
    console.log(err);
  }
};
