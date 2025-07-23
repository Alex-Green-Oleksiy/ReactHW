import React from "react";
import styles from "@/style/PostsPage.module.scss";

const PostCard = ({ post, onDelete }) => (
    <li className={styles.postCard}>
        <div className={styles.postTitle}>
            <b>{post.title}</b>
        </div>
        <div className={styles.postBody}>{post.body}</div>
        <div className={styles.postStats}>
            <span>
                Лайків: <b>{post.likesNumber}</b>
            </span>
            <span>
                Дизлайків: <b>{post.dislikesNumber}</b>
            </span>
        </div>
        <div className={styles.postFooter}>
            <span>
                Автор: <b>{post.authorId}</b>
            </span>
            <button
                onClick={() => onDelete(post.id)}
                className={styles.deleteBtn}
            >
                Видалити
            </button>
        </div>
    </li>
);

export default PostCard;
