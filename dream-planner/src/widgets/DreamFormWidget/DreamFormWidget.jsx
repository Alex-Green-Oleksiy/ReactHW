import { DreamForm, useDreamForm } from "@/features/dream";
import { useAddDream, useEditDream } from "@/features/dream";
import styles from "@/widgets/DreamFormWidget/DreamFormWidget.module.css";
export const DreamFormWidget = ({ dreamId }) => {
    const isNew = !dreamId;
    const {
        description: editDescription,
        setDescription: setEditDescription,
        targetYear: editTargetYear,
        setTargetYear: setEditTargetYear,
        friend: editFriend,
        setFriend: setEditFriend,
        isLoadingDream,
        isUpdating,
        editDream
    } = useEditDream(dreamId);
    const {
        description: addDescription,
        setDescription: setAddDescription,
        targetYear: addTargetYear,
        setTargetYear: setAddTargetYear,
        friend: addFriend,
        setFriend: setAddFriend
    } = useDreamForm();
    const { addDream, isLoading: isAdding } = useAddDream();
    const formData = isNew 
        ? {
            description: addDescription,
            setDescription: setAddDescription,
            targetYear: addTargetYear,
            setTargetYear: setAddTargetYear,
            friend: addFriend,
            setFriend: setAddFriend,
            isLoading: isAdding
        }
        : {
            description: editDescription,
            setDescription: setEditDescription,
            targetYear: editTargetYear,
            setTargetYear: setEditTargetYear,
            friend: editFriend,
            setFriend: setEditFriend,
            isLoading: isUpdating || isLoadingDream
        };
    const handleSubmit = async (e) => {
        e.preventDefault(); // Запобігаємо перезавантаженню сторінки
        if (isNew) {
            await addDream({
                description: formData.description,
                targetYear: +formData.targetYear, // + перетворює рядок в число
                friend: formData.friend
            });
        } else {
            await editDream();
        }
    };
    if (!isNew && isLoadingDream) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingContent}>
                    <div className={styles.spinner}></div>
                    <p className={styles.loadingText}>
                        Завантаження даних мрії...
                    </p>
                </div>
            </div>
        );
    }
    return (
        <DreamForm
            isNew={isNew}
            description={formData.description}
            onDescriptionChange={(e) => formData.setDescription(e.target.value)}
            targetYear={formData.targetYear}
            onTargetYearChange={(e) => formData.setTargetYear(e.target.value)}
            friend={formData.friend}
            onFriendChange={(e) => formData.setFriend(e.target.value)}
            onSubmit={handleSubmit}
            isSubmitting={formData.isLoading}
        />
    );
};
