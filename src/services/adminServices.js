import http from "./httpService";

export function getAllUsers(search, pageSearchParam, limitSearchParam) {
  return http
    .get(`/admin/user/list?search=${search}&limit=20&page=${pageSearchParam}`)
    .then(({ data }) => data.data);
}

export function getAllStudents(search, pageSearchParam, limitSearchParam) {
  return http
    .get(`/admin/student/list?search=${search}&limit=20&page=${pageSearchParam}`)
    .then(({ data }) => data.data);
}

export function getAllPayments(pageSearchParam, limitSearchParam) {
  return http
    .get(`/admin/payment/list?limit=20&page=${pageSearchParam}`)
    .then(({ data }) => data.data);
}

// Static Pages

export function getAllStaticPages(cookies) {
  return http
    .get(`/admin/staticPage/list`, {
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
  return http
    .patch(`/admin/staticPage/update/${id}`, body)
    .then(({ data }) => data.data);
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
  return http
    .patch(`/admin/category/update/${id}`, body)
    .then(({ data }) => data.data);
}

// Product

export function getAllCourses(cookies) {
  return http
    .get(`/admin/product/list?type=course`, {
      headers: {
        Cookie: cookies,
      },
    })
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
  return http
    .patch(`/admin/product/update/${id}`, body)
    .then(({ data }) => data.data);
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
  return http
    .post(`/admin/product/addFAQ/${id}`, body)
    .then(({ data }) => data.data);
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

export function addLesson({ id, value }) {
  return http
    .post(`/admin/product/addLesson/${id}`, value)
    .then(({ data }) => data.data);
}

export function updateLesson({ productID, lessonID, body }) {
  return http
    .put(`/admin/product/editLesson/${productID}/${lessonID}`, body)
    .then(({ data }) => data.data);
}
export function updateLessonsBody({ productID, lessonID, bodyID, body }) {
  return http
    .put(`/admin/product/editLessonBody/${productID}/${lessonID}/${bodyID}`, body)
    .then(({ data }) => data.data);
}

export function removeLesson({ productID, lessonID }) {
  return http
    .delete(`/admin/product/removeLesson/${productID}/${lessonID}`)
    .then(({ data }) => data.data);
}

// Licence

export function addLicense(body) {
  return http.post(`/admin/student/add`, body).then(({ data }) => data.data);
}

export function updateLicense({ id, body }) {
  return http.put(`/admin/student/update/${id}`, body).then(({ data }) => data.data);
}

export function removeLicense(id) {
  return http.delete(`/admin/student/${id}`).then(({ data }) => data.data);
}

export function generateLicense({ userID, productID }) {
  return http
    .post(`/admin/spotPlayer/${userID}/${productID}`)
    .then(({ data }) => data.data);
}

// Statements

export function getStatements() {
  return http.get(`/admin/statement/list`).then(({ data }) => data.data);
}

export function addStatement(values) {
  return http.post(`/admin/statement/add`, values).then(({ data }) => data.data);
}

export function updateStatement({ id, values }) {
  return http
    .put(`/admin/statement/update/${id}`, values)
    .then(({ data }) => data.data);
}

export function removeStatement(id) {
  return http.delete(`/admin/statement/remove/${id}`).then(({ data }) => data.data);
}

// Coupons

export function getAllCoupons() {
  return http.get(`/admin/coupon/list`).then(({ data }) => data.data);
}

export function addNewCoupon(data) {
  return http.post(`/admin/coupon/add`, data).then(({ data }) => data.data);
}

export function updateCoupon({ id, data }) {
  return http
    .patch(`/admin/coupon/update/${id}`, data)
    .then(({ data }) => data.data);
}

export function deleteCoupon(id) {
  return http.delete(`/admin/coupon/remove/${id}`).then(({ data }) => data.data);
}
