import { Fragment, useEffect } from "react";
import { useGetPostsInfiniteQuery } from "@/api/postsApi";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";

const PostsInfinitePage = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        isSuccess,
        isError,
        error
    } = useGetPostsInfiniteQuery();

    const isBottom = useScrollToBottom();

    useEffect(() => {
        if (
            isBottom &&
            hasNextPage &&
            !isLoading &&
            !isFetchingNextPage &&
            isSuccess
        ) {
            fetchNextPage();
        }
    }, [
        isBottom,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        isSuccess,
        fetchNextPage
    ]);

    if (isLoading) {
        return <LoadingSpinner message="Завантаження постів..." />;
    }

    if (isError) {
        return (
            <ErrorMessage
                title="Помилка завантаження постів"
                message="Не вдалося завантажити пости"
                error={error}
                onRetry={() => window.location.reload()}
            />
        );
    }

    if (!isSuccess || !data || !data.pages || data.pages.length === 0) {
        return (
            <div className="card post-card--empty">
                <h3>Пости не знайдено</h3>
                <p>Немає доступних постів для відображення</p>
            </div>
        );
    }

    const totalPosts = data.pages.reduce(
        (total, page) => total + page.items.length,
        0
    );

    return (
        <div>
            <h2>Нескінченне завантаження постів</h2>
            <p style={{ marginBottom: 16, opacity: 0.8 }}>
                Завантажено: {totalPosts} постів
            </p>

            <div className="post-list">
                {data.pages.map((page, i) => (
                    <Fragment key={i}>
                        {page.items.map((post) => (
                            <div className="post-list__item" key={post.id}>
                                <div className="post-list__title">
                                    {post.title}
                                </div>
                                <div className="post-list__actions">
                                    <span className="post-list__likes">
                                        👍 {post.likesNumber}
                                    </span>
                                    <span className="post-list__dislikes">
                                        👎 {post.dislikesNumber}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </Fragment>
                ))}
            </div>

            {isFetchingNextPage && (
                <LoadingSpinner
                    message="Завантаження наступної сторінки..."
                    size="small"
                />
            )}

            {!hasNextPage && totalPosts > 0 && (
                <div
                    className="card post-card--empty"
                    style={{ textAlign: "center" }}
                >
                    <p>Більше постів немає</p>
                    <p style={{ fontSize: "0.9em", opacity: 0.7 }}>
                        Всього завантажено: {totalPosts} постів
                    </p>
                </div>
            )}
        </div>
    );
};

export default PostsInfinitePage;
