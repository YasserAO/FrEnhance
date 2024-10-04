import { NavLink } from "react-router-dom";

export default function SignUp() {
  return (
    <NavLink
      to="/auth/register"
      className={`rounded-md bg-sky-100 px-2 py-1 font-semibold text-gray-600`}
    >
      Register
    </NavLink>
  );
}
