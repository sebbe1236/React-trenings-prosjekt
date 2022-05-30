import React from "react";
import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;
function useAxios() {
  const [auth] = useAuth();

  const apiClient = axios.create({
    baseURL: url,
  });

  apiClient.interceptors.request.use((config) => {
    const token = auth.token;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return apiClient;
}

export default useAxios;
