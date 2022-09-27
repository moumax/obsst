import axios from "axios";

let baseUrl = "http://localhost:5000";
if (import.meta.env.VITE_BACKEND_URL)
  baseUrl = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default instance;
