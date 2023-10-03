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

export function getAllPayments(cookies, queryString) {
  return http
    .get(`/admin/payment/list?${queryString}`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
}

export function getAllCourses(cookies, queryString) {
  return http
    .get(`/admin/product/list?${queryString}&type=course`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
}
