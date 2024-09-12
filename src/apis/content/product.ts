import { AxiosRequestConfig } from "axios";
import { Product } from "@/apis/content/interface";

import { client } from "@/apis/client";

const CONTEXT = "products";
export const getProduct = async (id: string, config?: AxiosRequestConfig) => {
  const response = await client.get(`/${CONTEXT}/${id}`, config);
  if (!response.data) {
    return;
  }
  if (
    typeof response.data === "object" &&
    Object.keys(response.data).length === 0
  ) {
    return;
  }
  return response.data as Product;
};

export const getAllowedProducts = async (config?: AxiosRequestConfig) => {
  const response = await client.get(`/${CONTEXT}/permissions/me`, config);
  return response.data ? (response.data as Product[]) : [];
};
