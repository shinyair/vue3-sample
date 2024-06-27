import { STORAGE_JWT_KEY } from "@/constants/localstorage";

export const getJWT = () => {
  return localStorage.getItem(STORAGE_JWT_KEY) || "";
};
export const setJWT = (newValue: string) => {
  localStorage.setItem(STORAGE_JWT_KEY, newValue);
};
export const clearJWT = () => {
  localStorage.removeItem(STORAGE_JWT_KEY);
};
