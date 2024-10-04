import { NavLink } from "react-router-dom";
export default function SignIn() {
  return (
    <NavLink
      to="/auth/login"
      className={`active rounded-md px-2 py-1 font-semibold text-white underline-offset-4 hover:underline active:underline`}
    >
      Login
    </NavLink>
  );
}
