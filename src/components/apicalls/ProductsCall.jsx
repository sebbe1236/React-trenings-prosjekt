import React from "react";
import { BASE_URL } from "../../constants/api";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteProduct from "../adminfunctions/DeleteProduct";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Header from "../layout/Heading";

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

  //
  //source map: https://stackoverflow.com/questions/72124042/how-to-map-strapi-api-data-in-react-js
  return (
    <>
      <Container fluid>
        <Header>Browse Products</Header>
        <Row xs={1} md={4} lg={6} className="blogs_container">
          {products.data?.map((product) => {
            return (
              <Col key={product.id}>
                <Card className="text-center text-md-right">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={`http://localhost:1337${product.attributes.image.data.attributes.url}`}
                      alt={"wheels"}
                    ></img>
                    <Card.Title>{product.attributes.name}</Card.Title>
                    <Button>View</Button>
                  </Link>
                  {auth ? (
                    <>
                      <Link to={`/editproduct/${product.id}`}>
                        <Button variant="info m-3">Edit product</Button>
                      </Link>
                      <DeleteProduct id={product.id} />
                    </>
                  ) : (
                    <p>${product.attributes.price}</p>
                  )}
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Products;
