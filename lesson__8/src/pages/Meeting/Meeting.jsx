import { useLocation, useNavigate } from "react-router-dom";
import TeacherCard from "../teachers/components/TeacherCard/TeacherCard";
import styles from "../../styles/pages/Meeting/Meeting.module.scss";

function Meeting() {
    const { state } = useLocation();
    const navigate = useNavigate();
    let content;
    if (state?.teachers)
        content = (
            <div>
                {state.teachers.map((teacher) => (
                    <TeacherCard teacher={teacher} hideActions={true} />
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
            </div>
        </div>
    );
}

export default Meeting;
