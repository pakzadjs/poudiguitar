import http from "./httpService";

export function getCategories() {
  return http.get("/category/list?type=course").then(({ data }) => data.data);
}

export function getDownloadsCategories() {
  return http.get("/category/list?type=downloadable").then(({ data }) => data.data);
}
