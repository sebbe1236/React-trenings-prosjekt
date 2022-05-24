import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
  username: yup.string().required("fill inn your username"),
  password: yup.string().required("please fill in your passwor"),
});

function Loginform() {
  const [submit, setSubmit] = useState(false);
  const [loginError, setloginError] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmit(true);
    setloginError(null);
    console.log(data);

    try {
      const response = await axios.post(url, data);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginError && <FormError>{loginError}</FormError>}
        <fieldset disabled={submit}>
          <div>
            <input user="username" placeholder="Username" ref={register} />

            {errors.username && <FormError>{errors.username.message}</FormError>}
          </div>

          <div>
            <input name="password" placeholder="Password" ref={register} type="password" />
            {errors.password && <FormError>{errors.password.message}</FormError>}
          </div>
          <button>{submit ? "Loggin in..." : "Login"}</button>
        </fieldset>
      </form>
    </>
  );
}

export default Loginform;
