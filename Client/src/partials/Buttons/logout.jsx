import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const logoutAPI = await fetch(
        import.meta.env.VITE_API_URL + "/api/user/auth/logout",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
        },
      );
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
      className={`rounded-md bg-red-500 px-3 py-2 text-white transition-all duration-150 hover:bg-red-600 active:bg-red-900 disabled:bg-red-200`}
    >
      <IoIosLogOut />
    </button>
  );
}
