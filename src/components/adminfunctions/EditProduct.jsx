import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/api";

function EditProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [urlField, setUrlField] = useState("");

  const { id } = useParams();
  const url = BASE_URL;
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(url + `/api/products/${id}?populate=*`);
        const json = await response.json();
        console.log(json);
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

  return (
    <>
      <form>
        <div>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div>
          <input type="file" placeholder="file" />
        </div>
        <div>
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default EditProduct;
