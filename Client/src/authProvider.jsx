import { createContext, useState, useEffect, useMemo } from "react";
import { statusForm } from "./forms/statusForm.mjs";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userForm, setUserForm] = useState(null);
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

  useEffect(() => {
    console.log(userForm);
  }, [userForm]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
