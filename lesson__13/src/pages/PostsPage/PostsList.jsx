import React, { useState } from "react";
import {
    useGetPostsPQuery,
    useDeletePostMutation,
    useLikePostMutation,
    useDislikePostMutation
} from "../../api/postsApi";
import { useNavigate } from "react-router";
import styles from "./PostsList.module.css";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";

const PostsList = ({ onSelect }) => {
    const [page, setPage] = useState(1);
    const [actionError, setActionError] = useState("");

    const { data, isLoading, isError, error, isFetching } = useGetPostsPQuery({
        page,
        limit: 5
    });

    const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
    const [likePost, { isLoading: isLiking }] = useLikePostMutation();
    const [dislikePost, { isLoading: isDisliking }] = useDislikePostMutation();

    const navigate = useNavigate();

    const handleLike = async (postId) => {
        try {
            setActionError("");
            await likePost(postId).unwrap();
        } catch (err) {
            console.error("Помилка лайку:", err);
            setActionError("Не вдалося поставити лайк");
        }
    };

    const handleDislike = async (postId) => {
        try {
            setActionError("");
            await dislikePost(postId).unwrap();
        } catch (err) {
            console.error("Помилка дизлайку:", err);
            setActionError("Не вдалося поставити дизлайк");
        }
    };

    const handleDelete = async (postId) => {
        if (!window.confirm("Видалити пост?")) return;

        try {
            setActionError("");
            await deletePost(postId).unwrap();
        } catch (err) {
            console.error("Помилка видалення:", err);
            setActionError("Не вдалося видалити пост");
        }
    };

    // Очищення помилки при зміні сторінки
    React.useEffect(() => {
        setActionError("");
    }, [page]);

    if (isLoading) {
        return <LoadingSpinner message="Завантаження постів..." />;
    }

    if (isError) {
        return (
            <ErrorMessage
                title="Помилка завантаження постів"
                message="Не вдалося завантажити список постів"
                error={error}
                onRetry={() => window.location.reload()}
            />
        );
    }

    if (!data || !data.items || data.items.length === 0) {
        return (
            <div className="card post-card--empty">
                <h3>Пости не знайдено</h3>
                <p>На цій сторінці немає постів</p>
            </div>
        );
    }

    const { items, totalPages, remaining } = data;
    const isActionLoading = isLiking || isDisliking || isDeleting;

    return (
        <div>
            {actionError && (
                <ErrorMessage
                    title="Помилка дії"
                    message={actionError}
                    onClose={() => setActionError("")}
                />
            )}

            <ul className="post-list">
                {items.map((post) => (
                    <li className="post-list__item" key={post.id}>
                        <div className="post-list__title">{post.title}</div>
                        <div className={styles["post-list__actions"]}>
                            <span className="post-list__likes">
                                {post.likesNumber}
                            </span>
                            <button
                                onClick={() => handleLike(post.id)}
                                disabled={isActionLoading}
                                style={{ opacity: isActionLoading ? 0.7 : 1 }}
                            >
                                👍
                            </button>
                            <span className="post-list__dislikes">
                                {post.dislikesNumber}
                            </span>
                            <button
                                onClick={() => handleDislike(post.id)}
                                disabled={isActionLoading}
                                style={{ opacity: isActionLoading ? 0.7 : 1 }}
                            >
                                👎
                            </button>
                            <button
                                onClick={() => onSelect(post.id)}
                                disabled={isActionLoading}
                            >
                                Деталі
                            </button>
                            <button
                                onClick={() =>
                                    navigate(`/posts/edit/${post.id}`)
                                }
                                disabled={isActionLoading}
                            >
                                Редагувати
                            </button>
                            <button
                                onClick={() => handleDelete(post.id)}
                                disabled={isActionLoading}
                                style={{
                                    opacity: isActionLoading ? 0.7 : 1,
                                    color: isDeleting
                                        ? "var(--color-accent)"
                                        : "inherit"
                                }}
                            >
                                {isDeleting ? "Видалення..." : "Видалити"}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {isFetching && (
                <LoadingSpinner
                    message="Оновлення..."
                    size="small"
                    showSpinner={false}
                />
            )}

            <hr />
            <div className={styles.pagination}>
                <button
                    className={styles.paginationBtn}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1 || isFetching}
                >
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
                        disabled={isFetching}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className={styles.paginationBtn}
                    onClick={() => setPage((p) => (remaining > 0 ? p + 1 : p))}
                    disabled={remaining === 0 || isFetching}
                >
                    &#x25B6;
                </button>
            </div>
        </div>
    );
};

export default PostsList;
