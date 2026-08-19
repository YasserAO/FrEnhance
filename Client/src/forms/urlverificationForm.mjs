const urlVerificationForm = async (id) => {
  const responseAPI = await fetch(
    (import.meta.env.VITE_API_URL || "") + "/api/user/email-verificationURL",
    {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        Token: id,
      }),
    },
  );
  return await responseAPI.json();
};

export default urlVerificationForm;

