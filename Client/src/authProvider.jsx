import { createContext, useState, useEffect, useMemo } from "react";
import { statusForm } from "./forms/statusForm.mjs";
import PropTypes from "prop-types";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "messi@gmail.com",
    id: "66eef74903ad9cd2630547f1",
    Avatar: "",
  });
  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
    // Fetch user status only on initial load
    const fetchUserStatus = async () => {
      const data = await statusForm();
      if (data.status === 200) {
        setUserForm(data.User);
        setIsLogged(data.isAuthenticated);
      } else {
        setIsLogged(false);
      }
    };

    fetchUserStatus();
  }, []); // Empty dependency array ensures this runs only once

  const contextValue = useMemo(
    () => ({
      userForm,
      isLogged,
    }),
    [userForm, isLogged],
  );

  useEffect(() => {}, [userForm]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
