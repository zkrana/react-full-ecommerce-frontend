// ThemeProvider.js
import { useState, useEffect } from "react";
import { MyContext } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false); // Assuming initial state is false

  useEffect(() => {
    const is_Login = localStorage.getItem("isLogin");
    setIsLogin(!!is_Login); // Convert to boolean
  }, []);

  const signIn = () => {
    const is_Login = localStorage.getItem("isLogin");
    setIsLogin(!!is_Login); // Convert to boolean
  };

  const signOut = () => {
    localStorage.removeItem("isLogin");
    setIsLogin(false);
  };

  const contextValue = {
    isLogin,
    signIn,
    signOut,
  };

  return (
    <MyContext.Provider value={contextValue} unstable_explicitMode>
      {children}
    </MyContext.Provider>
  );
};

export default ThemeProvider;
