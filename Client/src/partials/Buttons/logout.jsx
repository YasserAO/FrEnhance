import { useState } from "react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const logoutAPI = await fetch("/api/user/auth/logout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await logoutAPI.json();
      console.log(data.msg);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={() => {
        handleLogout();
      }}
      className={`rounded-md bg-red-500 px-2 py-1 text-white transition-all duration-150 hover:scale-105 active:bg-red-900 disabled:bg-red-100`}
    >
      {loading ? `Loginout...` : `Logout`}
    </button>
  );
}
