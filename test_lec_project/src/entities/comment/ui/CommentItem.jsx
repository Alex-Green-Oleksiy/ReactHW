import React from 'react'
import './CommentItem.css'

export function CommentItem({ comment, deleteButton }) {
  return (
    <div className="comment-item">
      <div className="comment-content">
        <span className="comment-author">{comment.authorName}</span>
        <span className="comment-text">: {comment.text}</span>
      </div>
      {deleteButton}
    </div>
  )
}
