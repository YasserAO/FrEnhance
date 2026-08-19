export const sendToken = async () => {
  try {
    const statusRequest = await fetch(
      (import.meta.env.VITE_API_URL || "") + "/api/user/email-verify",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      },
    );
    const Resp = await statusRequest.json();
    return Resp;
  } catch (err) {
    console.log(err);
  }
};

