import http from "./httpService";

export function getPaidCourses() {
  return http.get("/student/list").then(({ data }) => data.data);
}
