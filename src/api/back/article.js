import fetch from '../fetch'

// get list
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

// find one
export function getArticle(id) {
  return fetch({
    url: `/api/article/${id}`,
    method: 'get'
  })
}

// created one
export function createArticle({
  title,
  content,
  flag,
  totop
}) {
  return fetch({
    url: '/api/article',
    method: 'post',
    data: {
      title,
      content,
      flag,
      totop
    }
  })
}

// updated
export function updateArticle({
  _id,
  title,
  content,
  flag,
  totop
}) {
  return fetch({
    url: `/api/article/${_id}`,
    method: 'put',
    data: {
      _id,
      title,
      content,
      flag,
      totop
    }
  })
}

// update flag
export function updateArticleFlag({
  _id,
  flag
}) {
  return fetch({
    url: `/api/article/${_id}/flag`,
    method: 'patch',
    data: {
      flag
    }
  })
}

// update totop
export function updateArticleTotop({
  _id,
  totop
}) {
  return fetch({
    url: `/api/article/${_id}/totop`,
    method: 'patch',
    data: {
      totop
    }
  })
}

// delete
export function deleteArticle(id) {
  return fetch({
    url: `/api/article/${id}`,
    method: 'delete'
  })
}