import { useLocation, useNavigate } from "react-router-dom";
import TeacherCard from "@/pages/teachers/components/TeacherCard/TeacherCard";
import styles from "@/styles/pages/Meeting/Meeting.module.scss";
import { useState, useEffect } from "react";

const STORAGE_KEY = "meeting_teachers";

function Meeting() {
    const { state } = useLocation();
    const navigate = useNavigate();

    // 1. Ініціалізація зі state або localStorage
    const initialTeachers =
        state?.teachers ||
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const [teachers, setTeachers] = useState(initialTeachers);

    // 2. Зберігати у localStorage при зміні teachers
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(teachers));
    }, [teachers]);

    let content;
    if (teachers && teachers.length > 0)
        content = (
            <div>
                {teachers.map((teacher) => (
                    <TeacherCard
                        key={teacher.id}
                        teacher={teacher}
                        hideActions={true}
                    />
                ))}
            </div>
        );
    else content = <h2>No teachers</h2>;

    return (
        <div className={styles.meetingContainer}>
            <div className={styles.meetingTitle}>Meeting</div>
            {content}
            <div className={styles.meetingBackBtnWrapper}>
                <button
                    className={styles.meetingBackBtn}
                    onClick={() => navigate("/teachers")}
                >
                    Повернутися до вчителів
                </button>
                <button
                    className={styles.meetingBackBtn}
                    onClick={() => {
                        setTeachers([]);
                        localStorage.removeItem(STORAGE_KEY);
                    }}
                    style={{ marginLeft: 12 }}
                    disabled={teachers.length === 0}
                >
                    Очистити
                </button>
            </div>
        </div>
    );
}

export default Meeting;
