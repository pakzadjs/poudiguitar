import http from "./httpService";

export function getPaidCourses(cookies) {
  return http
    .get("/student/list", {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
}
