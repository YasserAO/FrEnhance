export const coinsForm = async () => {
  try {
    const statusRequest = await fetch(
      import.meta.env.VITE_API_URL + "/api/user/auth/coins",
      {
        credentials: "include",
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      },
    );
    const Resp = statusRequest.json();
    return Resp;
  } catch (err) {
    console.log(err);
  }
};
