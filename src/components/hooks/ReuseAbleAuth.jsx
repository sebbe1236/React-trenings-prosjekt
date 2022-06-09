import React from "react";
import axios from "axios";
// //Funksjon for reuseable authentization, sånnn at token i storage ikke blir sletta i page reload
const url = process.env.REACT_APP_BASE_URL;
export function useAxios() {
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
