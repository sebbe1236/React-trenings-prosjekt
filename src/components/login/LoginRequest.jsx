import React from "react";
import FormErrorMessage from "../common/FormErrorMessage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import { useAuth } from "../context/AuthContext";
import Header from "../heading/Heading";

/**
 * Prøv å restart app når du endrer endpoints tilbake til strapi
 * username param returns undefined which makes the form not render
 * @param {username}
 * password param returns undefined which makes the form not render
 * @param {password}
 * solved with:
 *
 * https://stackoverflow.com/questions/66927051/getting-uncaught-typeerror-path-split-is-not-a-function-in-react
 */

//const url = BASE_URL + TOKEN_PATH;
//const url = BASE_URL + "/api/auth/local";

const url = "http://localhost:1337/api/auth/local";
console.log(url);
const schema = yup.object().shape({
  username: yup.string().required("fill inn your username"),
  password: yup.string().required("please fill in your password"),
});

function LoginForm() {
  const [sending, setSubmit] = useState(false);
  const [loginError, setloginError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useAuth();

  async function onSubmit(data, username, password) {
    setSubmit(true);
    setloginError(null);
    console.log(data);

    try {
      const response = await axios.post(url, {
        identifier: username,
        password: password,
      });
      setAuth(response.data.jwt);
      console.log(data);
      console.log(url);
      console.log("login succesful", response.data);

      navigate("/blogs");
    } catch (error) {
      console.log("error, invalid inputs", error.message);
      setloginError(error.toString());
    } finally {
      setSubmit(false);
    }
  }

  return (
    <>
      <Header heading={"Fill in the form below to log in"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginError && <FormErrorMessage>{loginError}</FormErrorMessage>}
        <fieldset disabled={sending}>
          <div>
            <input type="text" {...register("username", { required: true })} />
            <span>{errors.username?.message}</span>
          </div>

          <div>
            <input type="text" {...register("password", { required: true })} />
            <span>{errors.password?.message}</span>
          </div>
          <button>{sending ? "Loggin in..." : "Login"}</button>
        </fieldset>
      </form>
    </>
  );
}

export default LoginForm;
