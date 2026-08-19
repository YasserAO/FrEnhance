export const coinsForm = async () => {
  try {
    const statusRequest = await fetch(
      (import.meta.env.VITE_API_URL || "") + "/api/user/auth/coins",
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
    console.debug("coinsForm error:", err);
    return { status: 401, msg: "Failed to fetch coins" };
  }
};

