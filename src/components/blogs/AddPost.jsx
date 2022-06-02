import React, { useState } from "react";
import { BASE_URL } from "../../constants/api";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import FormErrorMessage from "../common/FormErrorMessage";
// import Header from "../heading/Heading";
// import useAxios from "../hooks/ReuseAbleAuth";
function AddBlog() {
  const [submiting, setSubmit] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const [auth, setAuth] = useAuth();

  async function onSubmit(data) {
    setSubmit(true);
    setError(null);

    const url = `${BASE_URL}/wp/v2/posts`;

    const formData = new FormData();

    const dataAppend = JSON.stringify({ title: "title", excerpt: "excerpt" });

    formData.append("files.featured_media", featured_media[0]);
    formData.append("data", dataAppend);

    const options = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${auth.token}`,
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
            <input {...register("title", { required: true })} />
            <span>{errors.title?.message}</span>
          </div>
          <div>
            <input type="file" {...register("file", { required: true })} />
            <span>{errors.title?.message}</span>
          </div>
          <div>
            <input {...register("excerpt", { required: true })} />
            <span>{errors.excerpt?.message}</span>
          </div>
          <button type="submit">Send</button>
        </fieldset>
      </form>
    </>
  );
}

export default AddBlog;
