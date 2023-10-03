import http from "./httpService";

export function getAllUsers(cookies, queryString) {
  return http
    .get(`/admin/user/list?${queryString}`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
}

export function getAllStudents(cookies, queryString) {
  return http
    .get(`/admin/student/list?${queryString}`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
}
