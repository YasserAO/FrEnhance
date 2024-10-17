export const logoutForm = async (username, password) => {
  try {
    const LogoutResponse = await fetch(
      import.meta.env.VITE_API_URL + "/api/user/auth/logout",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      },
    );
    const Resp = LogoutResponse.json();
    return Resp;
  } catch (err) {
    console.log(err);
  }
};
