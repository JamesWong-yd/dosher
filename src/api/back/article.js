import fetch from '../fetch'

export function getArticleList({
  page,
  pageSize,
  title,
  startDate,
  endDate
}) {
  return fetch({
    url: '/article',
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