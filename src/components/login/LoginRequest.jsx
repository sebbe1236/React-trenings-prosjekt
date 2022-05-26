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
 * solved with:
 *
 * https://stackoverflow.com/questions/66927051/getting-uncaught-typeerror-path-split-is-not-a-function-in-react
 */

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
  username: yup.string().required("fill inn your username"),
  password: yup.string().required("please fill in your password"),
});

function Loginform() {
  const [sending, setSubmit] = useState(false);
  const [loginError, setloginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmit(true);
    setloginError(null);
    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log(url);
      console.log("login succesful", response.data);
    } catch (error) {
      console.log("error, invalid inputs", error);
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
            <input {...register("username", { required: true })} />
            {errors.username && <FormErrorMessage>{errors.username.message}</FormErrorMessage>}
          </div>

          <div>
            <input {...register("password", { required: true })} />
            {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
          </div>
          <button>{sending ? "Loggin in..." : "Login"}</button>
        </fieldset>
      </form>
    </>
  );
}

export default Loginform;
