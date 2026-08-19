export const passwordRequest = async (email) => {
  try {
    const statusRequest = await fetch(
      (import.meta.env.VITE_API_URL || "") + "/api/password-reset-request",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      },
    );
    const Resp = await statusRequest.json();
    return Resp;
  } catch (err) {
    console.log(err);
  }
};

