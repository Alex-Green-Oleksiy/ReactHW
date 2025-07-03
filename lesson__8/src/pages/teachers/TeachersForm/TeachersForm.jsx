import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useTeachersApi from "../../../hooks/useTeachersApi";
import styles from "../../../styles/pages/teachers/TeachersForm.module.scss";

function TeachersForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const isEdit = Boolean(id);
    const { addTeacher, updateTeacher, getTeacherById, loading } =
        useTeachersApi();

    const [form, setForm] = useState({
        name: "",
        subject: "",
        photo: ""
    });
    const [error, setError] = useState("");

    useEffect(() => {
        if (isEdit) {
            getTeacherById(id).then((teacher) => {
                setForm({
                    name: teacher.name || "",
                    subject: teacher.subject || "",
                    photo: teacher.photo || ""
                });
            });
        }
    }, [isEdit, id, getTeacherById]);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.subject || !form.photo) {
            setError("Всі поля обов'язкові!");
            return;
        }
        try {
            if (isEdit) {
                await updateTeacher(id, form);
            } else {
                await addTeacher(form);
            }
            navigate("/teachers");
        } catch (err) {
            setError("Помилка збереження!");
        }
    };

    const handleCancel = () => {
        navigate("/teachers");
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <h2>{isEdit ? "Редагувати вчителя" : "Додати нового вчителя"}</h2>
            <div className={styles.formGroup}>
                <label htmlFor="name">Ім'я:</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="subject">Предмет:</label>
                <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="photo">Фото (url):</label>
                <input
                    id="photo"
                    type="text"
                    name="photo"
                    value={form.photo}
                    onChange={handleChange}
                />
            </div>
            {error && <div className={styles.errorMsg}>{error}</div>}
            <div className={styles.formActions}>
                <button type="submit" disabled={loading}>
                    {isEdit ? "Оновити" : "Додати"}
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    className={styles.formCancelBtn}
                >
                    Скасувати
                </button>
            </div>
        </form>
    );
}

export default TeachersForm;
