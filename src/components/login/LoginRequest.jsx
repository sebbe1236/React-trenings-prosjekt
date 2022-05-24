import React from "react";
import FormErrorMessage from "../common/FormErrorMessage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import Header from "../heading/Heading";

/**
 * username param returns undefined which makes the form not render
 * @param {username}
 * password param returns undefined which makes the form not render
 * @param {password}
 *
 */

const url = BASE_URL + TOKEN_PATH;
console.log(url);
const schema = yup.object().shape({
  username: yup.string().required("fill inn your username"),
  password: yup.string().required("please fill in your password"),
});

function Loginform() {
  const [sending, setSubmit] = useState(false);
  const [loginError, setloginError] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  async function onSubmit(data) {
    setSubmit(true);
    setloginError(null);
    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log(url);
      console.log("login succesful", response.data);
    } catch (error) {
      console.log("erroor", error);
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
            <input type="text" user="username" placeholder="Username" ref={register} />
            {errors.username && <FormErrorMessage>{errors.username.message}</FormErrorMessage>}
          </div>

          <div>
            <input name="password" placeholder="Password" ref={register} type="password" />
            {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
          </div>
          <button>{sending ? "Loggin in..." : "Login"}</button>
        </fieldset>
      </form>
    </>
  );
}

export default Loginform;
