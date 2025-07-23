import { useRef, useCallback, useState, useEffect } from "react";
import postsApi from "@/api/apiClient";
import initialPosts from "@/data/initialPosts";
import InfinitePostsList from "@/pages/components/InfinitePostsList";
import Loader from "@/components/Loader";
import styles from "@/style/InfinitePostsPage.module.scss";

const api = postsApi("posts", 500, initialPosts);

function InfinitePostsPage() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const postsNumberPerPage = 8;
    const loader = useRef(null);

    const loadPosts = async (pageToLoad) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.getPaginated(
                pageToLoad,
                postsNumberPerPage
            );
            setPosts((prev) => {
                const existingIds = new Set(prev.map((p) => p.id));
                const newUnique = response.items.filter(
                    (item) => !existingIds.has(item.id)
                );
                return [...prev, ...newUnique];
            });
            setHasMore(pageToLoad < response.pagination.totalPages);
        } catch (e) {
            setError(e.message || "Помилка завантаження");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts(page);
        // eslint-disable-next-line
    }, [page]);

    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];
            if (target.isIntersecting && hasMore && !loading) {
                setPage((prev) => prev + 1);
            }
        },
        [hasMore, loading]
    );

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };
        const observer = new window.IntersectionObserver(
            handleObserver,
            option
        );
        if (loader.current) observer.observe(loader.current);
        return () => observer.disconnect();
    }, [handleObserver]);

    return (
        <div className={styles.infinitePage}>
            <h2>Infinite Scroll Posts</h2>
            <InfinitePostsList posts={posts} />
            {loading && <Loader />}
            {error && <div>{error}</div>}
            <div ref={loader} />
        </div>
    );
}

export default InfinitePostsPage;
