/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Request } from "miragejs";
import { AnyRegistry, AnyResponse } from "miragejs/-types";
import Schema from "miragejs/orm/schema";

import { sleep } from "@/server/time";

export const DATA_PRODUCTS = [
  {
    id: "product1",
    name: "Product 1",
    creatorId: "abc@dummy.com",
    description:
      " As part of Walmart’s mission to make quality, great tasting food accessible for customers, the retailer announced today its latest private brand innovation, bettergoods: a new elevated experience that delivers quality, unique, chef-inspired food at an incredible value.",
  },
  {
    id: "product2",
    name: "Product 2",
    creatorId: "abc@dummy.com",
    description:
      "Bettergoods marks Walmart’s largest private brand food launch in 20 years and the fastest food private brand Walmart has brought to market, highlighting the speed with which Walmart can bring trend and innovation to market at scale.",
  },
  {
    id: "product3",
    name: "Product 3",
    creatorId: "def@dummy.com",
    description:
      "Bettergoods items range from under $2 to under $15, with most products available for under $5.",
  },
  {
    id: "product4",
    name: "Product 4",
    creatorId: "def@dummy.com",
    description:
      "With bettergoods, Walmart is continuing its mission to democratize access to quality, delicious and innovative foods that customers crave at the Every Day Low Price Walmart delivers.",
  },
];

const productSchemaType = "product";

export const getProduct = async (
  schema: Schema<AnyRegistry>,
  request: Request,
): Promise<AnyResponse> => {
  console.log(request.requestHeaders.Authorization);
  await sleep(1000);
  const productId = request.params.id;
  const product = (schema as any).findBy(productSchemaType, {
    id: productId,
  });
  return product ? product.attrs : "";
};

export const getAllowedProducts = async (
  schema: Schema<AnyRegistry>,
  request: Request,
): Promise<AnyResponse> => {
  console.log(request.requestHeaders.Authorization);
  await sleep(3000);
  const products = (schema as any).all(productSchemaType);
  return products ? products.models : [];
};

export const DATA_SHOPS = [
  {
    id: "shop1",
    name: "Shop Branch 1",
    description: "Bringing associates around the world together.",
  },
  {
    id: "shop2",
    name: "Shop Branch 2",
    description:
      "Shop for electronics, computers, furniture, outdoor living, appliances, jewelry and more.",
  },
];

const shopSchemaType = "shop";

export const getShop = async (
  schema: Schema<AnyRegistry>,
  request: Request,
): Promise<AnyResponse> => {
  console.log(request.requestHeaders.Authorization);
  await sleep(1000);
  const shopId = request.params.id;
  const shop = (schema as any).findBy(shopSchemaType, {
    id: shopId,
  });
  return shop ? shop.attrs : "";
};

export const getAllowedShops = async (
  schema: Schema<AnyRegistry>,
  request: Request,
): Promise<AnyResponse> => {
  console.log(request.requestHeaders.Authorization);
  await sleep(3000);
  const shops = (schema as any).all(shopSchemaType);
  return shops ? shops.models : [];
};
