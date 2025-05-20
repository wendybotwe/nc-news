import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getArticleById } from "../api"

function ArticleCard() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getArticleById(article_id)
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setError(true);
        setLoading(false)
      })
  }, [article_id]);

  if (loading) return <p>Loading an excellent article for you...</p>
  if (error) return <p>Sorry, article could not be loaded.</p>
  if (!article) return null;

  return (
    <div className="article-card">
      <img src={article.article_img_url} alt={`Image for ${article.title}`} className="article-card-image" />
      <h2>{article.title}</h2>
      <p><strong>Author:</strong>{article.author}</p>
      <p><strong>Topic:</strong>{article.topic}</p>
      <p><strong>Published:</strong>{new Date(article.created_at).toLocaleDateString()}</p>
      <article>{article.body}</article>
    </div>
  )
}

export default ArticleCard