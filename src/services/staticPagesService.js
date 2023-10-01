import http from "./httpService";

export function getStaticPageBySlug(slug) {
  return http.get(`/staticPage/${slug}`).then(({ data }) => data.data);
}
