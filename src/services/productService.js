import http from "./httpService";

export function getCourses(queryString) {
  return http.get(`/product/list?${queryString}&type=course`).then(({ data }) => data.data);

  // return fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/list?${queryString}`, {
  //   cache: "no-store",
  // })
  //   .then((res) => res.json())
  //   .then(({ data }) => data);
}

export function getDownloadables(queryString) {
  return http
    .get(`/product/list?${queryString}&type=downloadable`)
    .then(({ data }) => data.data);

  // return fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/list?${queryString}`, {
  //   cache: "no-store",
  // })
  //   .then((res) => res.json())
  //   .then(({ data }) => data);
}

export function getOneProductBySlug(slug) {
  return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}
