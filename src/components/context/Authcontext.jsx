import React, { useContext, useState } from "react";

export const AuthContext = React.createContext([null, () => {}]);

export function useAuth() {
  return useContext(AuthContext);
}

function Authentication({ children }) {
  const [auth, setAuth] = useState(null);
  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
}

export default Authentication;
