import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getArticleById, getCommentsByArticleId } from "../api"

function ArticleCard() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getArticleById(article_id),
      getCommentsByArticleId(article_id)
    ])
      .then(([articleData, commentsData]) => {
        setArticle(articleData);
        setComments(commentsData)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setError(true);
        setLoading(false)
      })
  }, [article_id]);

  if (loading) return <p>Loading an excellent article for you...</p>
  if (error) return <p>Sorry, article or comments could not be loaded.</p>
  if (!article) return null;

  return (
    <div className="article-card">
      <img src={article.article_img_url} alt={`Image for ${article.title}`} className="article-card-image" />
      <h2>{article.title}</h2>
      <p><strong>Author:</strong>{article.author}</p>
      <p><strong>Topic:</strong>{article.topic}</p>
      <p><strong>Published:</strong>{new Date(article.created_at).toLocaleDateString()}</p>
      <article>{article.body}</article>
      <h3>Comments</h3>
      {comments.length === 0 ? (<p>No comments yet</p>) : (<ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <p>On {new Date(article.created_at).toLocaleDateString()},<strong> {comment.author}</strong> said</p>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>)}
    </div>
  )
}

export default ArticleCard