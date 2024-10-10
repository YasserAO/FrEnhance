export const loginForm = async (username, password) => {
  try {
    const LoginRequest = await fetch(
      import.meta.env.VITE_API_URL + "/api/user/auth",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      },
    );
    const Resp = LoginRequest.json();
    return Resp;
  } catch (err) {
    console.log(err);
  }
};
