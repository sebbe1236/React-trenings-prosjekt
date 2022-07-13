import React from "react";
import { useState } from "react";
import { BASE_URL } from "../../../constants/api";
import Header from "../../layout/Heading";
import Carousel from "react-bootstrap/Carousel";
import { useEffect } from "react";
import axios from "axios";

function Slider() {
  const [sliderImage, SetImage] = useState([]);

  const url = `${BASE_URL}/api/products?populate=*`;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        SetImage(response.data);
      } catch (err) {
        console.log(err.message, "BUUUU");
      }
    };
    fetchImage();
  }, []);

  //Få fiksa timer og alt captions på hvert bilde imårra.

  return (
    <>
      <Header heading={"Home"} />
      <Carousel variant="dark">
        {sliderImage.data?.map((slider) => {
          return (
            <Carousel.Item interval={3000} key={slider.id}>
              <img
                className="d-block w-100"
                src={`http://localhost:1337${slider.attributes.image.data.attributes.url}`}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Best Sellers</h3>
                <p>Browse to check out some of our coolest products</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
}

export default Slider;
