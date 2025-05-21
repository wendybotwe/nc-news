import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getArticleById, getCommentsByArticleId, patchArticleVotes, postCommentByArticleId, deleteCommentbyId } from "../api"


function ArticleCard({ currentUser }) {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [voteChange, setVoteChange] = useState(0);
  const [voteError, setVoteError] = useState(false)
  const [newComment, setNewComment] = useState({ body: "" })
  const [posting, setPosting] = useState(false)
  const [postError, setPostError] = useState("")
  const [deletingCommentIds, setDeletingCommentIds] = useState([])
  const [deleteMessage, setDeleteMessage] = useState("")

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

  const handleVote = (change) => {
    setVoteChange((current) => current + change)
    setVoteError(false)
    patchArticleVotes(article_id, change)
      .catch((err) => {
        console.log(err)
        setVoteChange((current) => current - change)
        setVoteError(true)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setPostError("")

    const { body } = newComment
    
    if (!body) {
      setPostError("Please enter a comment.")
      return
    }
    setPosting(true)

    postCommentByArticleId(article_id, currentUser, body)
      .then((postedComment) => {
        setComments((current) => [postedComment, ...current])
        setNewComment({ body: "" })
        setPosting(false)
      })
      .catch((err) => {
        console.log(err)
        setPostError("Comment has not been posted. Please try again")
        setPosting(false)
      })
  }

  const handleDeleteComment = (comment_id) => {
    if (deletingCommentIds.includes(comment_id)) return
      setDeletingCommentIds((previous) => [...previous, comment_id])
      setDeleteMessage("")
      
      deleteCommentbyId(comment_id)
        .then(() => {
          setComments((current) => current.filter((comment) => comment.comment_id !== comment_id)
          )
          setDeleteMessage("Comment is being deleted")
        })
        .catch((err) => {
          console.log(err)
          setDeleteMessage("Sorry, somthing went wrong. Comment has not been deleted.")
        })
        .finally(() => {
          setDeletingCommentIds((current) =>
            current.filter((id) => id !== comment_id)
          )
        })
    }

    return (
      <div className="article-card">
        <img src={article.article_img_url} alt={`Image for ${article.title}`} className="article-card-image" />
        <h2>{article.title}</h2>
        <p><strong>Author:</strong>{article.author}</p>
        <p><strong>Topic:</strong>{article.topic}</p>
        <p><strong>Published:</strong>{new Date(article.created_at).toLocaleDateString()}</p>
        <article>{article.body}</article>
        <h4>Votes {article.votes + voteChange}</h4>
        <button onClick={() => handleVote(1)}
          disabled={voteChange === 1}>
          ⬆️ Upvote
        </button>
        <button onClick={() => handleVote(-1)}
          disabled={voteChange === -1}>
          ⬇️ Downvote
        </button>
        {voteError && (<p style={{ color: 'red' }}> Vote failed to register. Please try again later.</p>)}
        <h3>Comments</h3>
        {comments.length === 0 ? (<p>No comments yet</p>) : (<ul className="comments-list">
          {comments.map((comment) => {
            if (!comment || !comment.comment_id) return null
        
            return (
              <li key={comment.comment_id}>
                <p>On {comment.created_at ? new Date(comment.created_at).toLocaleDateString() : "just now"}, {comment.author} said</p>
                <p>{comment.body}</p>
                {comment.author === currentUser && (
                  <button onClick={() => handleDeleteComment(comment.comment_id)}
                    disabled={deletingCommentIds.includes(comment.comment_id)}>
                    {deletingCommentIds.includes(comment.comment_id) ? "Deleting in progress" : "🗑️ Delete"}
                  </button>
                )}
              </li>
            )
          })}
        </ul>)}
        <h3>Post your comment</h3>
        {posting && <p style={{ colour: "green" }}>Your comment is being posted!</p>}
        <form onSubmit={handleSubmit} className="comment-form">
          <p>Commenting as {currentUser}</p>
          <textarea
            placeholder="Your comment"
            value={newComment.body}
            onChange={(event) => setNewComment({ ...newComment, body: event.target.value })
            }
            required
          />
          <button type="submit" disabled={posting}>
            {posting ? "posting your comment..." : "Submit"}
          </button>
          {postError && <p style={{ color: "red" }}>{postError}</p>}
        </form>
      </div>
    )
  }


export default ArticleCard