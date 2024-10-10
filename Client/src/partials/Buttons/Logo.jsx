import { NavLink } from "react-router-dom";
export const Logo = () => {
  return (
    <NavLink
      to="/"
      className="h-fit w-fit cursor-pointer select-none rounded-3xl bg-white px-2 py-1 font-semibold"
    >
      FrenchEnhance
    </NavLink>
  );
};

export const LogoDash = () => {
  return (
    <NavLink
      to="/dashboard"
      className="h-fit w-fit cursor-pointer select-none rounded-3xl bg-white px-2 py-1 font-semibold"
    >
      FrenchEnhance
    </NavLink>
  );
};
