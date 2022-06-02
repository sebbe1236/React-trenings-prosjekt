import React, { useState } from "react";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Header from "../heading/Heading";
import useAxios from "../hooks/ReuseAbleAuth";
function AddBlog() {
  const [submit, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const [auth, setAuth] = useAuth();

  async function addPost() {
    const url = `${BASE_URL}/wp/v2/posts`;

    const formData = new FormData();

    const data = JSON.stringify({ title, excerpt, featured_media });

    formData.append("files.image", featured_media[0]);
    formData.append("data", data);

    const options = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `auth ${auth}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log("error", error.toString());
    }
  }
}

export default AddBlog;
