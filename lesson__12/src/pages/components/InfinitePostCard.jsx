import React from "react";
import styles from "@/style/InfinitePostsPage.module.scss";

const InfinitePostCard = ({ post }) => (
    <div className={styles.postCard}>
        <div className={styles.postTitle}>
            <b>{post.title}</b>
        </div>
        <div className={styles.postBody}>{post.body}</div>
        <div className={styles.postFooter}>
            Автор: <b>{post.authorId}</b>
        </div>
    </div>
);

export default InfinitePostCard;
