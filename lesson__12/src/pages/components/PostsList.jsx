import React from "react";
import PostCard from "./PostCard";
import styles from "@/style/PostsPage.module.scss";

const PostsList = ({ posts, onDelete }) => (
    <ul className={styles.postsList}>
        {posts.map((post) => (
            <PostCard key={post.id} post={post} onDelete={onDelete} />
        ))}
    </ul>
);

export default PostsList;
