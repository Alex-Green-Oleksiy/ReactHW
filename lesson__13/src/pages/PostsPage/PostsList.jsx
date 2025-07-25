import React, { useState } from "react";
import {
    useGetPostsPQuery,
    useDeletePostMutation,
    useLikePostMutation,
    useDislikePostMutation
} from "../../api/postsApi";
import { useNavigate } from "react-router";
import styles from "./PostsList.module.css";

const PostsList = ({ onSelect }) => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError, isFetching } = useGetPostsPQuery({
        page,
        limit: 5
    });

    const [deletePost] = useDeletePostMutation();
    const [likePost] = useLikePostMutation();
    const [dislikePost] = useDislikePostMutation();

    const navigate = useNavigate();

    if (isLoading) return <p>Завантаження...</p>;
    if (isError) return <p>Помилка завантаження постів</p>;

    const { items, totalPages, remaining } = data;

    return (
        <div>
            <ul className="post-list">
                {items.map((post) => (
                    <li className="post-list__item" key={post.id}>
                        <div className="post-list__title">{post.title}</div>
                        <div className={styles["post-list__actions"]}>
                            <span className="post-list__likes">
                                {post.likesNumber}
                            </span>
                            <button onClick={() => likePost(post.id)}>
                                👍
                            </button>
                            <span className="post-list__dislikes">
                                {post.dislikesNumber}
                            </span>
                            <button onClick={() => dislikePost(post.id)}>
                                👎
                            </button>
                            <button onClick={() => onSelect(post.id)}>
                                Деталі
                            </button>
                            <button
                                onClick={() =>
                                    navigate(`/posts/edit/${post.id}`)
                                }
                            >
                                Редагувати
                            </button>
                            <button
                                onClick={() => {
                                    if (window.confirm("Видалити пост?"))
                                        deletePost(post.id);
                                }}
                            >
                                Видалити
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {isFetching && <p>Оновлення...</p>}
            <hr />
            <div className={styles.pagination}>
                <button
                    className={styles.paginationBtn}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                >
                    {/* ◀ */}
                    &#x25C0;
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={
                            page === i + 1
                                ? `${styles.paginationBtn} ${styles.active}`
                                : styles.paginationBtn
                        }
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className={styles.paginationBtn}
                    onClick={() => setPage((p) => (remaining > 0 ? p + 1 : p))}
                    disabled={remaining === 0}
                >
                    {/* ▶ */}
                    &#x25B6;
                </button>
            </div>
        </div>
    );
};

export default PostsList;
