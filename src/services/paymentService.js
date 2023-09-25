import http from "./httpService";

export function createPayment(productId) {
  return http.post("/payment/create", { productId }).then(({ data }) => data.data);
}

export function getOnePayment(id) {
  return http.get(`/payment/${id}`).then(({ data }) => data.data);
}
