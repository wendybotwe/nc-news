import React from "react";
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { getArticles } from "../api"

function Home() {

  const [articles, setArticles] = useState([])
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("created_at")
  const [order, setOrder] = useState("desc")


  useEffect(() => {
    setLoading(true)
    getArticles(undefined, sortBy, order).then((articles) => {
      setArticles(articles);
      setLoading(false)
    })
      .catch((err) => {
        console.log(err)
        setError(true)
        setLoading(false)
    })
  }, [sortBy, order])

  if (loading) return <p>Loading some amazing articles for you!</p>
  if (error) return <p>Oh dear, we have a slight problem.</p>

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="sort-controls">
          <label>
            Sort by:{" "}
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="created_at">Date</option>
              <option value="comment_count">Comments</option>
              <option value="votes">Votes</option>
            </select>
          </label>
          <label>
            Order:{" "}
            <select value={order} onChange={(event) => setOrder(event.target.value)}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </label>
        </div>
        <div className="articles-grid">{articles.map((article) => (<div key={article.article_id} className="article-card">
          <h3 className="article-title">{article.title}</h3>
          <p className="article-meta"><strong>Author</strong> {article.author} | <strong>Topic</strong> {article.topic}</p>
          <Link to={`/articles/${article.article_id}`}>Read article</Link>
        </div>
        ))}
        </div>
      </div>
    </div>
  )
}
      
export default Home
