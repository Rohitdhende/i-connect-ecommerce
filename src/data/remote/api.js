import { productList } from "../local/products";
const base_url = "https://fakestoreapi.com";

export const getProducts = async () => {
  try {
    const res = await fetch(`${base_url}/products`);
    const data = await res.json();
    return data;
  } catch (error) {
    return productList;
  }
};

export const getProduct = async (id) => {
  try {
    const res = await fetch(`${base_url}/products/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return [];
  }
};
