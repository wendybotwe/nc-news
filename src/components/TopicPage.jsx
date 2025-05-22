import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticlesByTopic } from "../api"
import { Link } from "react-router-dom"

function TopicPage() {
  const { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true)
    getArticlesByTopic(topic_slug)
      .then((data) => {
        setArticles(data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        setLoading(false)
    })
  }, [topic_slug])

  if (loading) return <p>Loading articles for {topic_slug}</p>
  if (error) return <p>Sorry, unable to load articles.</p>

  return (
    <div className="topic-page">
      <h2>Articles about {topic_slug}</h2>
      {articles.map((article) => (
        <div key={article.article_id} className="article-card">
          <h3>{article.title}</h3>
          <p className="article-meta"><strong>Author</strong> {article.author}</p>
          <Link to={`/articles/${article.article_id}`}>Read article</Link>
          </div>
      ))}
    </div>
  )
}

export default TopicPage