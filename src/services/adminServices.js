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

// Static Pages

export function getAllStaticPages(cookies, queryString) {
  return http
    .get(`/admin/staticPage/list?${queryString}`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
}

export function createStaticPage(body) {
  return http.post("/admin/staticPage/add", body).then(({ data }) => data.data);
}

export function removeStaticPage(id) {
  return http.delete(`/admin/staticPage/remove/${id}`).then(({ data }) => data.data);
}

export function updateStaticPage({ body, id }) {
  return http.patch(`/admin/staticPage/update/${id}`, body).then(({ data }) => data.data);
}
