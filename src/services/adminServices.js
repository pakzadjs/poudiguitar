import http from "./httpService";

export function getAllUsers({ queryKey }) {
  console.log(queryKey);
  return http.get(`/admin/user/list?search=${queryKey[1]}`).then(({ data }) => data.data);
}

export function getAllStudents({ queryKey }) {
  return http
    .get(`/admin/student/list?search=${queryKey[1]}&product=${queryKey[2]}`)
    .then(({ data }) => data.data);
}

export function getAllPayments() {
  return http.get(`/admin/payment/list`).then(({ data }) => data.data);
}

// Static Pages

export function getAllStaticPages() {
  return http.get(`/admin/staticPage/list`).then(({ data }) => data.data);
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

export function getAllCategories() {
  return http.get("/category/list").then(({ data }) => data.data);
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

export function getAllCourses(queryString) {
  return http
    .get(`/admin/product/list?${queryString}&type=course`)
    .then(({ data }) => data.data);
}

export function getAllDownloadables(queryString) {
  return http
    .get(`/admin/product/list?${queryString}&type=downloadable`)
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

export function uploadFile({ file, id }) {
  return http
    .post(`/admin/product/upload-file/${id}`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data.data);
}

// FAQ

export function addFAQ({ id, body }) {
  return http.post(`/admin/product/addFAQ/${id}`, body).then(({ data }) => data.data);
}

export function updateFAQ({ productID, FAQID, body }) {
  return http
    .put(`/admin/product/editFAQ/${productID}/${FAQID}`, body)
    .then(({ data }) => data.data);
}

export function removeFAQ({ productID, FAQID }) {
  return http
    .delete(`/admin/product/removeFAQ/${productID}/${FAQID}`)
    .then(({ data }) => data.data);
}

// Lessons

export function addLesson({ id, data }) {
  return http.post(`/admin/product/addLesson/${id}`, data).then(({ data }) => data.data);
}

export function updateLesson({ productID, lessonID, body }) {
  return http
    .put(`/admin/product/editLesson/${productID}/${lessonID}`, body)
    .then(({ data }) => data.data);
}

export function removeLesson({ productID, lessonID }) {
  return http
    .delete(`/admin/product/removeLesson/${productID}/${lessonID}`)
    .then(({ data }) => data.data);
}
