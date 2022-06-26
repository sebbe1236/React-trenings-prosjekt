import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../constants/api";
import { useAuth } from "../context/AuthContext";

function EditProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [submiting, setSubmit] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const url = BASE_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(url + `/api/products/${id}?populate=*`);
        const json = await response.json();

        setName(json.data.attributes.name);
        setPrice(json.data.attributes.price);
        setDescription(json.data.attributes.description);
      } catch (error) {
        console.log("buuuu");
      }
    };
    fetchProduct();
  }, []);
  //Kan være det samme som du gjorde i POST for put requestn, bare at man må endre post til put i options

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const [auth] = useAuth();
  async function onSubmit(data) {
    setSubmit(true);
    setError(null);

    const formData = new FormData();

    const dataPut = JSON.stringify({ name: data.name, description: data.description, price: data.price });
    formData.append("files.image", data.image[0]);
    formData.append("data", dataPut);

    const options = {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };
    try {
      const response = await fetch(url + `/api/products/${id}?populate=*`, options);
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
        <fieldset disabled={submiting}>
          {error}
          <div>
            <input
              type="text"
              placeholder="name"
              {...register("name", { required: true })}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <span>{errors.title?.message}</span>
          </div>
          <div>
            <input
              type="text"
              {...register("price", { required: true })}
              placeholder="price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <span>{errors.title?.message}</span>
          </div>
          <div>
            <input type="file" placeholder="file" {...register("image", { required: true })} />
          </div>
          <div>
            <input
              type="text"
              {...register("description", { required: true })}
              placeholder="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <span>{errors.title?.message}</span>
          </div>
        </fieldset>
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default EditProduct;
