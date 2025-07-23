import React from "react";
import styles from "@/style/PostsPage.module.scss";

const PostForm = ({
    title,
    setTitle,
    body,
    setBody,
    authorId,
    setAuthorId,
    onSubmit,
    postsNumberPerPage,
    handlePostsPerPageChange
}) => (
    <form onSubmit={onSubmit} className={styles.form}>
        <label>
            Заголовок:
            <input
                type="text"
                placeholder="Заголовок поста"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
            />
        </label>
        <label>
            Текст поста:
            <textarea
                placeholder="Текст поста"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className={styles.textarea}
            />
        </label>
        <label>
            ID Автора:
            <input
                type="text"
                placeholder="ID Автора"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                className={styles.input}
            />
        </label>
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16
            }}
        >
            <label htmlFor="postsPerPage">Постів на сторінці:</label>
            <select
                id="postsPerPage"
                value={postsNumberPerPage}
                onChange={handlePostsPerPageChange}
            >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
            </select>
        </div>
    </form>
);

export default PostForm;
