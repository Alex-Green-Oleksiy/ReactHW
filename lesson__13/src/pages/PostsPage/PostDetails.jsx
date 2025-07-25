import React from "react";
import { useGetPostByIdQuery } from "../../api/postsApi";

const PostDetails = ({ postId }) => {
    const {
        data: post,
        isLoading,
        isError
    } = useGetPostByIdQuery(postId, {
        skip: !postId
    });

    if (!postId)
        return (
            <p className="post-card post-card--empty">
                Оберіть пост, щоб побачити деталі.
            </p>
        );
    if (isLoading)
        return (
            <div className="post-card post-card--loading">
                Завантаження деталей...
            </div>
        );
    if (isError)
        return (
            <div className="post-card post-card--error">
                Помилка завантаження деталей.
            </div>
        );

    return (
        <div className="post-card">
            <h3 className="post-card__title">{post.title}</h3>
            <div className="post-card__meta">
                <span>ID: {post.id}</span>
                <span>
                    Дата: {new Date(post.publicationDate).toLocaleString()}
                </span>
            </div>
            <div className="post-card__stats">
                <span className="post-card__likes">👍 {post.likesNumber}</span>
                <span className="post-card__dislikes">
                    👎 {post.dislikesNumber}
                </span>
            </div>
            <div className="post-card__content">
                {post.content || "Без опису"}
            </div>
        </div>
    );
};

export default PostDetails;
