import http from "./httpService";


export function getCourses(queryString, cookies) {
  return http
  .get(`/product/list?${queryString}&type=course`, {
    headers: {
      Cookie: cookies,
    },
  }).then(({data}) => {
    if (!data) {
      throw new Error('No data returned') 
    }
    return data.data;
  })
  .catch(err => {
    console.error(err);
    return []; // return empty array on error
  });
}

export function getDownloadables(queryString, cookies) {
  return http
    .get(`/product/list?${queryString}&type=downloadable`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
}

export function getOneProductBySlug(slug, cookies) {
  return http
    .get(`/product/slug/${slug}`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
}

export function likeProduct(id) {
  return http.post(`/product/like/${id}`).then(({ data }) => data.data);
}
