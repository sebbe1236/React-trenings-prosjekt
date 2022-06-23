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

    const url = `${BASE_URL}/api/products?populate=*`;

    const formData = new FormData();

    const dataApp = JSON.stringify({ name: data.name, description: data.description, price: data.price });

    formData.append("files.image", data.image[0]);
    formData.append("data", dataApp);
    //det man legger inn som property etter "files.image" må være det samme som er i (register....(image) i formen)
    //Hvis register i formen har het file f example så har det blitt ("files.file", data.file[0])
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
            <input type="text" {...register("name", { required: true })} placeholder="name" />
            <span>{errors.title?.message}</span>
          </div>
          <div>
            <input type="text" {...register("price", { required: true })} placeholder="price" />
            <span>{errors.title?.message}</span>
          </div>
          <div>
            <input type="file" {...register("image", { required: true })} placeholder="file" />
            <span>{errors.title?.message}</span>
          </div>
          <div>
            <input type="text" {...register("description", { required: true })} placeholder="description" />
            <span>{errors.excerpt?.message}</span>
          </div>
          <button type="submit">Send</button>
        </fieldset>
      </form>
    </>
  );
}

export default AddBlog;
