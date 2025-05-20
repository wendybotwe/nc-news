import axios from "axios"

const newsApi = axios.create({
  baseURL: "https://nc-news-by-wendy.onrender.com/api"
})

export const getArticles = () => {
  return newsApi.get("/articles").then((res) => {
    return res.data.articles;
  })
}

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`)
    .then((res) => {
    return res.data.article
  })
}

export const getCommentsByArticleId = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`)
    .then((res) => {
    return res.data.comments
  })
}

export const patchArticleVotes = (article_id, voteChange) => {
  return newsApi.patch(`/articles/${article_id}`, { inc_votes: voteChange })
    .then((res) => {
      return res.data.article
    })
}