import React from "react";
import { Link } from "react-router-dom";

function Home({ articles }) {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Wendy's NC News App</h1>
        <p className="landing-description">The best news site in the World!</p>
        <h2>Hot articles</h2>
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
