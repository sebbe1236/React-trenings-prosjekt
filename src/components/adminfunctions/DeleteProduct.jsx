import { BASE_URL } from "../../constants/api";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { Button } from "react-bootstrap";

function DeleteProduct({ id }) {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const url = `${BASE_URL}/api/products/${id}`;

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };

  async function handleDelete() {
    const confirmDelete = window.confirm("Delete this product?");
    if (confirmDelete)
      try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log("Hello woorld");
        console.log(json);
        console.log("test");
        navigate("/");
      } catch (err) {
        console.log(err.message, "shieet");
      }
  }

  return (
    <>
      <Button onClick={handleDelete}>Delete product</Button>
    </>
  );

  // artikkel potensiell: https://www.positronx.io/react-axios-send-asynchronous-http-delete-request-tutorial/
}

export default DeleteProduct;
