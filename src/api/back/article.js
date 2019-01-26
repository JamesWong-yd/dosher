import fetch from '../fetch'

export function getArticleList({
  page,
  pageSize,
  title,
  startDate,
  endDate
}) {
  return fetch({
    url: '/api/article',
    method: 'get',
    params: {
      page,
      pageSize,
      title,
      startDate,
      endDate
    }
  })
}