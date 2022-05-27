import React from "react";
import { BASE_URL } from "../../constants/api";
import Header from "../heading/Heading";
import LogInform from "./LoginRequest";
function Login() {
  return (
    <>
      <Header heading={"Login"} />
      <LogInform />
    </>
  );
}

export default Login;
