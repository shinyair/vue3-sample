import { AxiosRequestConfig } from "axios";
import { Shop } from "@/apis/content/interface";

import { client } from "@/apis/client";

const CONTEXT = "shops";
export const getShop = async (id: string, config?: AxiosRequestConfig) => {
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
  return response.data as Shop;
};

export const getAllowedShops = async (config?: AxiosRequestConfig) => {
  const response = await client.get(`/${CONTEXT}/permissions/me`, config);
  return response.data as Shop[];
};
