import React, { useState } from "react";
import { BASE_URL } from "../../constants/api";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../common/FormErrorMessage";
import { useAuth } from "../context/AuthContext";

function AddBlog() {
  const [submiting, setSubmit] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const [auth] = useAuth();

  async function onSubmit(data) {
    setSubmit(true);
    setError(null);

    const url = `${BASE_URL}/api/products`;

    const formData = new FormData();

    const dataApp = JSON.stringify({ title: data.title, description: data.description });

    formData.append("files.image", data.image);
    formData.append("data", dataApp);

    const options = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log("error");
      setError(error.toString());
    } finally {
      setSubmit(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        <fieldset disabled={submiting}>
          <div>
            <input type="text" {...register("title", { required: true })} />
            <span>{errors.title?.message}</span>
          </div>
          <div>
            <input type="file" {...register("file", { required: true })} />
            <span>{errors.title?.message}</span>
          </div>
          <div>
            <input type="text" {...register("description", { required: true })} />
            <span>{errors.excerpt?.message}</span>
          </div>
          <button type="submit">Send</button>
        </fieldset>
      </form>
    </>
  );
}

export default AddBlog;
