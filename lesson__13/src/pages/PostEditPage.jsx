import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
    useGetPostByIdQuery,
    useAddPostMutation,
    useEditPostMutation
} from "@/api/postsApi";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";

const PostEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    // Для редагування — отримати дані поста
    const { 
        data: post, 
        isLoading, 
        isError, 
        error 
    } = useGetPostByIdQuery(id, {
        skip: !isEdit
    });
    
    const [addPost, { isLoading: isAdding }] = useAddPostMutation();
    const [editPost, { isLoading: isEditing }] = useEditPostMutation();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        if (isEdit && post) {
            setTitle(post.title || "");
            setContent(post.content || "");
        }
        if (!isEdit) {
            setTitle("");
            setContent("");
        }
    }, [isEdit, post]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        // Валідація
        if (!title.trim()) {
            setSubmitError("Заголовок не може бути порожнім");
            return;
        }

        if (!content.trim()) {
            setSubmitError("Контент не може бути порожнім");
            return;
        }

        try {
            if (isEdit) {
                await editPost({ 
                    id, 
                    title: title.trim(), 
                    content: content.trim() 
                }).unwrap();
            } else {
                await addPost({ 
                    title: title.trim(), 
                    content: content.trim() 
                }).unwrap();
            }
            navigate("/posts");
        } catch (err) {
            console.error("Помилка збереження поста:", err);
            setSubmitError(
                err.data?.message || 
                "Помилка збереження поста. Спробуйте ще раз."
            );
        }
    };

    // Обробка помилок завантаження
    if (isEdit && isLoading) {
        return <LoadingSpinner message="Завантаження поста..." />;
    }

    if (isEdit && isError) {
        return (
            <ErrorMessage
                title="Помилка завантаження поста"
                message="Не вдалося завантажити пост"
                error={error}
                onRetry={() => window.location.reload()}
                onClose={() => navigate("/posts")}
            />
        );
    }

    if (isEdit && !post) {
        return (
            <ErrorMessage
                title="Пост не знайдено"
                message="Запитаний пост не існує або був видалений"
                onClose={() => navigate("/posts")}
            />
        );
    }

    const isSubmitting = isAdding || isEditing;

    return (
        <div className="card" style={{ maxWidth: 500, margin: "0 auto" }}>
            <h2>{isEdit ? "Редагувати пост" : "Додати новий пост"}</h2>
            
            {submitError && (
                <ErrorMessage
                    title="Помилка збереження"
                    message={submitError}
                    onClose={() => setSubmitError("")}
                />
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Заголовок:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            disabled={isSubmitting}
                            style={{ 
                                width: "100%", 
                                padding: 8, 
                                marginTop: 4,
                                opacity: isSubmitting ? 0.7 : 1
                            }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Опис:
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={5}
                            required
                            disabled={isSubmitting}
                            style={{ 
                                width: "100%", 
                                padding: 8, 
                                marginTop: 4,
                                opacity: isSubmitting ? 0.7 : 1
                            }}
                        />
                    </label>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        style={{ 
                            padding: "8px 16px",
                            opacity: isSubmitting ? 0.7 : 1
                        }}
                    >
                        {isSubmitting 
                            ? (isEdit ? "Збереження..." : "Додавання...") 
                            : (isEdit ? "Зберегти зміни" : "Додати пост")
                        }
                    </button>
                    <button
                        type="button"
                        disabled={isSubmitting}
                        style={{ 
                            padding: "8px 16px",
                            opacity: isSubmitting ? 0.7 : 1
                        }}
                        onClick={() => navigate("/posts")}
                    >
                        Скасувати
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostEditPage;
