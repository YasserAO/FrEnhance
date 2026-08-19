import { createContext, useState, useEffect, useMemo } from "react";
import { statusForm } from "./forms/statusForm.mjs";
import PropTypes from "prop-types";
import { coinsForm } from "./forms/coinsForm.mjs";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "messi@gmail.com",
    id: "66eef74903ad9cd2630547f1",
    coins: "",
    Avatar: "",
    verified: null,
  });
  const [config, setConfig] = useState({});
  const [coins, setCoins] = useState({});
  const [isLogged, setIsLogged] = useState(null);

  const fetchCoins = async () => {
    try {
      const data = await coinsForm();
      if (data && data.status === 200) {
        setCoins(data.coins);
      }
    } catch (err) {
      console.debug("Coins not fetched (not logged in):", err);
    }
  };

  useEffect(() => {
    // Fetch user status only on initial load
    const fetchUserStatus = async () => {
      try {
        const data = await statusForm();
        if (data && data.status === 200) {
          setUserForm(data.User);
          setConfig(data.config);
          setIsLogged(data.isAuthenticated);
          fetchCoins();
        } else {
          setIsLogged(false);
        }
      } catch (err) {
        setIsLogged(false);
      }
    };

    fetchUserStatus();
  }, []); // Empty dependency array ensures this runs only once

  const contextValue = useMemo(
    () => ({
      userForm,
      isLogged,
      coins,
      fetchCoins,
      config,
    }),
    [userForm, isLogged, fetchCoins, config],
  );

  useEffect(() => {}, [userForm]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
