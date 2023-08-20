import http from "./httpService";

export function getProducts(queryString) {
  return http.get(`/product/list?${queryString}`).then(({ data }) => data.data);
}
