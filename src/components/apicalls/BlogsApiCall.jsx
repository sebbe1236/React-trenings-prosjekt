import React from "react";
import Header from "../layout/heading/Heading";
import { BASE_URL } from "../../constants/api";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

const url = BASE_URL + "/api/products?populate=*";

function Blogs() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
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
  //Når man map`er i strapi så må man kjøre en nnullchheck på data propertynn.
  //kilde: https://stackoverflow.com/questions/72124042/how-to-map-strapi-api-data-in-react-js
  return (
    <>
      <Container fluid>
        <Row xs={1} md={4} lg={6} className="blogs_container">
          {products.data?.map((product) => {
            return (
              <Col key={product.id}>
                <Link to={`/blog/${product.id}`}>
                  <h1>{product.attributes.name}</h1>
                  <img
                    src={`http://localhost:1337${product.attributes.image.data.attributes.url}`}
                    alt={"wheeelss"}
                  ></img>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Blogs;
