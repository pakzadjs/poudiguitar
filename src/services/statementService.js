import http from "./httpService";

export function getClientStatement() {
  return http.get("/statement/list").then(({ data }) => data.data);
}
