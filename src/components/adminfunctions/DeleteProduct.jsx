import { BASE_URL } from "../../constants/api";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "react-bootstrap";

/**
 *
 * @param {id} is passed through props which is the id of the object that is going too be deleted.
 * the props is passed from the DeleteProduct is assigned the import in ProductsCall then which adds the id to be deleted there.
 * @returns
 */

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

        console.log(json);
        console.log("test");
        navigate("/");
      } catch (err) {
        console.log(err.message, "shit");
      }
  }

  return (
    <>
      <Button onClick={handleDelete} variant="danger">
        Delete product
      </Button>
    </>
  );
}

export default DeleteProduct;
