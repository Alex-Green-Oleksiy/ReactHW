import React from "react";
import InfinitePostCard from "@/pages/components/InfinitePostCard";
import styles from "@/style/InfinitePostsPage.module.scss";

const InfinitePostsList = ({ posts }) => (
    <div className={styles.postsList}>
        {posts.map((post) => (
            <InfinitePostCard key={post.id} post={post} />
        ))}
    </div>
);

export default InfinitePostsList;
