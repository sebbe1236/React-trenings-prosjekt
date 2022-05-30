import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
export const AuthContext = React.createContext([null, () => {}]);

export function useAuth() {
  return useContext(AuthContext);
}

function Authentication({ children }) {
  const [auth, setAuth] = useLocalStorage("auth", null);
  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
}

export default Authentication;
