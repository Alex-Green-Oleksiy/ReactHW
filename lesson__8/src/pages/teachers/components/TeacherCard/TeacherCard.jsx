import styles from "@/styles/pages/teachers/TeacherCard.module.scss";
import { useNavigate } from "react-router-dom";
import frontRoutes from "@/routes/frontRoutes";

function TeacherCard({ teacher, onSelect, isSelected, onDelete, hideActions }) {
    const navigate = useNavigate();
    return (
        <div className={styles.cardContainer}>
            <div
                className={
                    isSelected
                        ? `${styles.container} ${styles.selected}`
                        : styles.container
                }
            >
                <div className={styles.content}>
                    <div className={styles.section1}>
                        <img src={teacher.photo} alt="photo" />
                        <div>
                            <div>{teacher.name}</div>
                            <div>Предмет:{teacher.subject}</div>
                        </div>
                    </div>
                    {!hideActions && (
                        <>
                            <div className={styles.section2}>
                                {onSelect ? (
                                    <button
                                        onClick={() => onSelect(teacher.id)}
                                    >
                                        {isSelected ? "Обрано" : "Обрати"}
                                    </button>
                                ) : null}
                            </div>
                        </>
                    )}
                </div>

                {!hideActions && (
                    <div className={styles.actions}>
                        <button
                            className={styles.editBtn}
                            onClick={() =>
                                navigate(
                                    frontRoutes.navigate.teachers.edit(
                                        teacher.id
                                    )
                                )
                            }
                        >
                            Редагувати
                        </button>
                        <button
                            className={styles.deleteBtn}
                            onClick={() => onDelete && onDelete(teacher.id)}
                        >
                            Видалити
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TeacherCard;
