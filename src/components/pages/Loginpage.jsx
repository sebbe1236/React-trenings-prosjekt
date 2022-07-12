import React from "react";
//import { BASE_URL } from "../../constants/api";
import Header from "../layout/Heading";
import LogInform from "../adminfunctions/login/LoginRequest";
function Login() {
  return (
    <>
      <Header heading={"Login"} />
      <LogInform />
    </>
  );
}

export default Login;
