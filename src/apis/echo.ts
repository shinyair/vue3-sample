import client from "@/apis/client";

export const hello = async (message: string) => {
  const response = await client.get(`/echo?message=${message}`);
  return response.data;
};

export const record = async (message: string) => {
  const response = await client.post("/echo", {
    message: message,
  });
  return response.data;
};
