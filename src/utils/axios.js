import axios from "axios";

const baseUrl = "https://cliquetest.onrender.com/api/v1/"

const options = {
  baseURL: baseUrl,
  headers: {
    Accept: "application/json,text/plain,*/*",
    "Content-Type": "application/json",
  },
};

export const getToken = () => {
  return sessionStorage.getItem("cliqueToken");
};

export const http = axios.create(options);

http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);