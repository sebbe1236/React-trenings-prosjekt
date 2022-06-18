import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/api";

const url = BASE_URL;

function Blog() {
  const [singelBlog, SetSingleBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const singelFetch = async () => {
      try {
        const response = await axios.get(url + `/api/products/${id}`);
        console.log(response.data);
      } catch (error) {
        console.log("BUUUUUUUUU");
      } finally {
        setLoading(false);
      }
    };
    singelFetch();
  }, []);
}

export default Blog;
