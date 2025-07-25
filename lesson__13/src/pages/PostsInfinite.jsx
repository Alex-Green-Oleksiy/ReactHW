import { Fragment, useEffect } from "react";
import { useGetPostsInfiniteQuery } from "@/api/postsApi";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";

const PostsInfinitePage = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        isSuccess
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

    if (isLoading) return <p>Завантаження...</p>;
    if (!isSuccess) return <p>Помилка завантаження.</p>;

    return (
        <div>
            <h2>Нескінченне завантаження постів</h2>
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
            {isFetchingNextPage && <p>Завантаження наступної сторінки...</p>}
            {!hasNextPage && <p>Більше постів немає.</p>}
        </div>
    );
};

export default PostsInfinitePage;
