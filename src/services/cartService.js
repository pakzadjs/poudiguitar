import http from "./httpService";

export function addToCart(productId) {
  return http.post("/cart/add", { productId }).then(({ data }) => data.data);
}

export function removeFromCart(productId) {
  return http.post("/cart/remove", { productId }).then(({ data }) => data.data);
}
