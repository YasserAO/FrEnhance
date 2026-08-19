export const statusForm = async () => {
  try {
    const statusRequest = await fetch(
      (import.meta.env.VITE_API_URL || "") + "/api/user/auth/status",
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
    console.debug("statusForm connection error:", err);
    return { status: 401, isAuthenticated: false };
  }
};

