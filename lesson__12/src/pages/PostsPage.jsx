import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "@/store/postsThunks";
import { setCurrentPage, setPostsNumberPerPage } from "@/store/postsSlice";
import { addPostAsync, removePostAsync } from "@/store/postsThunks";
import styles from "@/style/PostsPage.module.scss";
import PostForm from "./components/PostForm";
import PostsList from "./components/PostsList";
import Pagination from "./components/Pagination";
import Loader from "@/components/Loader";

function PostsPage() {
    const {
        postsList,
        currentPageNumber,
        postsNumberPerPage,
        totalPagesNumber,
        status,
        error
    } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [authorId, setAuthorId] = useState("");

    useEffect(() => {
        dispatch(
            fetchPosts({
                pageNumber: currentPageNumber,
                itemsPerPage: postsNumberPerPage
            })
        );
    }, [dispatch, currentPageNumber, postsNumberPerPage]);

    const handleAddPost = (e) => {
        e.preventDefault();
        if (!title.trim() || !body.trim() || !authorId.trim()) return;
        const newPost = {
            id: Date.now(),
            title,
            body,
            likesNumber: 0,
            dislikesNumber: 0,
            authorId
        };
        dispatch(addPostAsync(newPost));
        setTitle("");
        setBody("");
        setAuthorId("");
    };

    const handleDelete = (id) => {
        dispatch(removePostAsync(id));
        if (postsList.length === 1 && currentPageNumber > 1) {
            dispatch(setCurrentPage(currentPageNumber - 1));
            dispatch(
                fetchPosts({
                    pageNumber: currentPageNumber - 1,
                    itemsPerPage: postsNumberPerPage
                })
            );
        }
    };

    const onPageChange = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };

    const handlePostsPerPageChange = (e) => {
        const newPerPage = Number(e.target.value);
        dispatch(setPostsNumberPerPage(newPerPage));
        dispatch(setCurrentPage(1));
        dispatch(
            fetchPosts({
                pageNumber: 1,
                itemsPerPage: newPerPage
            })
        );
    };

    return (
        <div className={styles.postsPage}>
            <h2>Ну, якось так.</h2>
            <PostForm
                title={title}
                setTitle={setTitle}
                body={body}
                setBody={setBody}
                authorId={authorId}
                setAuthorId={setAuthorId}
                onSubmit={handleAddPost}
                postsNumberPerPage={postsNumberPerPage}
                handlePostsPerPageChange={handlePostsPerPageChange}
            />
            {status === "loading" && <Loader />}
            {status === "failed" && <div>{error}</div>}
            <PostsList posts={postsList} onDelete={handleDelete} />
            <Pagination
                currentPage={currentPageNumber}
                totalPages={totalPagesNumber}
                onPageChange={onPageChange}
            />
        </div>
    );
}

export default PostsPage;
