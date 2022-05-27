import React, { useState } from "react";

const Authcontext = React.createContext([null, () => {}]);

function Authentication(props) {
  const [auth, setAuth] = useState(null);
  return <Authcontext.Provider value={[auth, setAuth]}>{props.children}</Authcontext.Provider>;
}

export default Authentication;
