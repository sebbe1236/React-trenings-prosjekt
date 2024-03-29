import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const url = BASE_URL;

function Product() {
  const [singleProduct, SetSingleProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const singleFetch = async () => {
      try {
        const response = await axios.get(url + `/api/products/${id}?populate=*`);
        const data = response.data;

        SetSingleProduct(data);
      } catch (error) {
        console.log("shit");
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    singleFetch();
  }, []);
  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Some error happened</div>;
  }

  return (
    <>
      <Container>
        <Row>
          <h3>{singleProduct.data.attributes.publishedAt}</h3>
          <img
            src={`http://localhost:1337${singleProduct.data.attributes.image.data.attributes.url}`}
            alt={"wheels"}
          ></img>
        </Row>
      </Container>
    </>
  );
}

export default Product;
