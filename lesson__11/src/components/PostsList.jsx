import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/redux/slices/postsSlice";
import styles from "@/styles/PostsList.module.scss";
import Loader from "@/components/Loader";

// Компонент для відображення списку постів з API
const PostsList = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div>
            <h2 className={styles.title}>Список постів</h2>
            {loading && <Loader />}
            {error && <p className={styles.error}>Помилка: {error}</p>}
            <ul className={styles.list}>
                {items.map((post) => (
                    <li key={post.id} className={styles.item}>
                        {post.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsList;
