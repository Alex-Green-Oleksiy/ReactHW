import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
    useGetPostByIdQuery,
    useAddPostMutation,
    useEditPostMutation
} from "@/api/postsApi";

const PostEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    // Для редагування — отримати дані поста
    const { data: post, isLoading } = useGetPostByIdQuery(id, {
        skip: !isEdit
    });
    const [addPost] = useAddPostMutation();
    const [editPost] = useEditPostMutation();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (isEdit && post) {
            setTitle(post.title || "");
            setContent(post.content || "");
        }
    }, [isEdit, post]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEdit) {
            await editPost({ id, title, content });
        } else {
            await addPost({ title, content });
        }
        navigate("/posts");
    };

    if (isEdit && isLoading) return <div>Завантаження...</div>;

    return (
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
            <h2>{isEdit ? "Редагувати пост" : "Додати новий пост"}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 10 }}>
                    <label>
                        Заголовок:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={{ width: "100%", padding: 8, marginTop: 4 }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 10 }}>
                    <label>
                        Опис:
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={5}
                            style={{ width: "100%", padding: 8, marginTop: 4 }}
                        />
                    </label>
                </div>
                <button type="submit" style={{ padding: "8px 16px" }}>
                    {isEdit ? "Зберегти зміни" : "Додати пост"}
                </button>
                <button
                    type="button"
                    style={{ marginLeft: 10, padding: "8px 16px" }}
                    onClick={() => navigate("/posts")}
                >
                    Скасувати
                </button>
            </form>
        </div>
    );
};

export default PostEditPage;
