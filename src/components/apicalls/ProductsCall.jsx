import React from "react";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../../constants/api";
import DeleteProduct from "../adminfunctions/DeleteProduct";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";

const url = BASE_URL + "/api/products?populate=*";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [auth] = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;

        setProducts(data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <p>Something went wrong</p>;
  }

  //https://www.youtube.com/watch?v=8YsQmvJ9UZE&ab_channel=Cybernatico link til video som er fulgt
  //SearchFilter returner et tomt array. Hvis jeg fjerner data? så sier den at searchData is not a function

  //Når man map`er i strapi så må man kjøre en nnullchheck på data propertynn.
  //kilde: https://stackoverflow.com/questions/72124042/how-to-map-strapi-api-data-in-react-js
  return (
    <>
      <Container fluid>
        <Row xs={1} md={4} lg={6} className="blogs_container">
          {products.data?.map((product) => {
            return (
              <Col key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <h1>{product.attributes.name}</h1>
                  <img
                    src={`http://localhost:1337${product.attributes.image.data.attributes.url}`}
                    alt={"wheeelss"}
                  ></img>
                </Link>
                {auth ? (
                  <>
                    <Link to={`/editproduct/${product.id}`}>
                      <Button variant="info m-3">Edit product</Button>
                    </Link>
                    <Button variant="danger m-3" onClick={DeleteProduct}>
                      Delete product
                    </Button>
                  </>
                ) : (
                  <p>${product.attributes.price}</p>
                )}
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Products;
