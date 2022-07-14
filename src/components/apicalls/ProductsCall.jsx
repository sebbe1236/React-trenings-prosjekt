import React from "react";
import { BASE_URL } from "../../constants/api";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteProduct from "../adminfunctions/DeleteProduct";
import axios from "axios";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

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
                <Card className="text-center text-md-right">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={`http://localhost:1337${product.attributes.image.data.attributes.url}`}
                      alt={"wheeelss"}
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
