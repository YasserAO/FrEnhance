import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { logoutForm } from "../../forms/logoutForm.mjs";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const Response = await logoutForm();
      const msg = await Response.msg;
      console.log(msg);
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
