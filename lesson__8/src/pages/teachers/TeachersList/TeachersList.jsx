import { useNavigate } from "react-router-dom";
import frontRoutes from "@/routes/frontRoutes";
import useTeachersApi from "@/hooks/useTeachersApi";
import { useEffect, useState } from "react";
import TeacherCard from "@/pages/teachers/components/TeacherCard/TeacherCard";
import styles from "@/styles/pages/teachers/TeachersList.module.scss";

function TeachersList() {
    const navigate = useNavigate();
    const {
        data: teachersListApi,
        loading,
        error,
        fetchTeachers,
        removeTeacher
    } = useTeachersApi();
    const [selectedTeachersId, setSelectedTeachersId] = useState([]);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetchTeachers();
    }, [fetchTeachers]);

    useEffect(() => {
        setTeachers(teachersListApi);
    }, [teachersListApi]);

    function goToMeeting(selected = null) {
        let teachersToSend = selected
            ? teachers.filter((t, idx) => idx < 2)
            : teachers.filter((teacher) =>
                  selectedTeachersId.includes(teacher.id)
              );
        navigate(frontRoutes.navigate.meeting, {
            state: {
                teachers: teachersToSend
            }
        });
    }

    const onSelect = (id) => {
        if (selectedTeachersId.includes(id))
            setSelectedTeachersId((prev) => prev.filter((tId) => tId !== id));
        else setSelectedTeachersId((prev) => [...prev, id]);
    };

    const handleDelete = async (id) => {
        setTeachers((prev) => prev.filter((t) => t.id !== id));
        try {
            await removeTeacher(id);
        } catch {
            fetchTeachers();
        }
    };

    let content;
    if (loading) content = <h2>Loading...</h2>;
    else if (error) content = <h2>Error!</h2>;
    else
        content = (
            <div className={styles.teachersFlex}>
                {teachers.map((teacher) => (
                    <div key={teacher.id} className={styles.teacherWrapper}>
                        <TeacherCard
                            teacher={teacher}
                            onSelect={onSelect}
                            isSelected={selectedTeachersId.includes(teacher.id)}
                            onDelete={handleDelete}
                        />
                    </div>
                ))}
            </div>
        );

    return (
        <div className={styles.teachersListContainer}>
            <h1>Список вчителів</h1>
            <div className={styles.teachersActions}>
                <button
                    onClick={() => navigate(frontRoutes.navigate.teachers.add)}
                >
                    Додати нового вчителя
                </button>
                <button
                    onClick={() => goToMeeting()}
                    disabled={selectedTeachersId.length === 0}
                    className={styles.fixedWidthBtn}
                >
                    Кількість на зборах :
                    <input
                        type="text"
                        value={selectedTeachersId.length}
                        readOnly
                        className={styles.countInput}
                    />
                </button>
            </div>
            {content}
            <div>
                <button
                    className={styles.goToMeetingBtn}
                    onClick={() => goToMeeting()}
                >
                    Go to meeting
                </button>
            </div>
        </div>
    );
}

export default TeachersList;
