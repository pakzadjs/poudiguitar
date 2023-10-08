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

// Categories

export function getAllCategories(cookies) {
  return http
    .get("/category/list", {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
}

export function createCategory(body) {
  return http.post("/admin/category/add", body).then(({ data }) => data.data);
}

export function removeCategory(id) {
  return http.delete(`/admin/category/remove/${id}`).then(({ data }) => data.data);
}

export function updateCategory({ body, id }) {
  return http.patch(`/admin/category/update/${id}`, body).then(({ data }) => data.data);
}

// Product

export function getAllCourses(cookies, queryString) {
  return http
    .get(`/admin/product/list?${queryString}&type=course`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
}

export function getAllDownloadables(cookies, queryString) {
  return http
    .get(`/admin/product/list?${queryString}&type=downloadable`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
}

export function createProduct(body) {
  return http.post("/admin/product/add", body).then(({ data }) => data.data);
}

export function removeProduct(id) {
  return http.delete(`/admin/product/remove/${id}`).then(({ data }) => data.data);
}

export function updateProduct({ id, body }) {
  return http.patch(`/admin/product/update/${id}`, body).then(({ data }) => data.data);
}

export function uploadImage({ image, id }) {
  return http
    .post(`/admin/product/upload-image/${id}`, image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data.data);
}

export function uploadVideo({ video, id }) {
  return http
    .post(`/admin/product/upload-video/${id}`, video, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data.data);
}
