import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import { Container, Row, Col } from "react-bootstrap";

const url = BASE_URL;
//const url = BASE_URL + "/api/products?populate=*";
//bilde blir ikke med over så må eventuelt gjøre noe med urln

function Blog() {
  const [singelBlog, SetSingleBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const singelFetch = async () => {
      try {
        const response = await axios.get(url + `/api/products/${id}?populate=*`);
        const data = response.data;
        console.log(data);
        SetSingleBlog(data);
      } catch (error) {
        console.log("BUUUUUUUUU");
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    singelFetch();
  }, []);
  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Some error occured</div>;
  }
  //Endre alt til produkt istedet for blog seneeree.
  return (
    <>
      <Container>
        <Row>
          <h3>{singelBlog.data.attributes.publishedAt}</h3>
          <img
            src={`http://localhost:1337${singelBlog.data.attributes.image.data.attributes.url}`}
            alt={"wheeelss"}
          ></img>
        </Row>
      </Container>
    </>
  );
}

export default Blog;
