import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/constants/env";

const REQUEST_TIMEOUT = 30000;
export const client = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

client.interceptors.request.use((config) => {
  return config;
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject(error);
  },
);
