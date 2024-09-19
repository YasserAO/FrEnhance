export const statusForm = async () => {
  try {
    const statusRequest = await fetch("/api/user/auth/status", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const Resp = statusRequest.json();
    return Resp;
  } catch (err) {
    console.log(err);
  }
};
