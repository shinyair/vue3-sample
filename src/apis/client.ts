import axios, { AxiosError } from "axios";
import { setJWT, getJWT } from "@/apis/jwt";
import { BASE_URL } from "@/constants/env";

export const RESPONSE_ERROR_CUSTOM_STATUS = 510;

const REQUEST_TIMEOUT = 30000;
export const client = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

client.interceptors.request.use((config) => {
  const jwt = getJWT();
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => {
    const jwt = response.headers["authorization"];
    if (jwt) {
      setJWT(jwt);
    }
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
