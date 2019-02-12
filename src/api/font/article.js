import fetch from '../fetch'

// get list
export function fontGetArticle({
  page,
  pageSize
}) {
  return fetch({
    url: '/api/font',
    method: 'get',
    params: {
      page,
      pageSize
    }
  })
}