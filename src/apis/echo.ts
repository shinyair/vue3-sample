import client from "./client";

export const hello = async (message: string) => {
  const response = await client.get(
    `https://echo.zuplo.io/?message=${message}`,
  );
  return response.data;
};
