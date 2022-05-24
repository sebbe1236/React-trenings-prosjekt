import React from "react";
import { BASE_URL } from "../../constants/api";
import Header from "../heading/Heading";
import Loginform from "./Loginform";
function Login() {
  return (
    <>
      <Header heading={"Login"} />
      <Loginform />
    </>
  );
}

export default Login;
