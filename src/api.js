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