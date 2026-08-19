export const cooldownForm = async () => {
  try {
    const statusRequest = await fetch(
      (import.meta.env.VITE_API_URL || "") + "/api/user/auth/cool-down",
      {
        credentials: "include",
        method: "GET",
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

