import { DreamForm, useDreamForm } from "@/features/dream";
import { useAddDream, useEditDream } from "@/features/dream";
import styles from "@/widgets/DreamFormWidget/DreamFormWidget.module.css";

export const DreamFormWidget = ({ dreamId }) => {
    // Якщо dreamId немає - це нова мрія, якщо є - редагуємо існуючу
    const isNew = !dreamId;

    // Отримуємо дані та функції для редагування мрії
    // useEditDream повертає стан форми та функцію для збереження
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

    // Отримуємо дані та функції для додавання нової мрії
    // useDreamForm повертає порожній стан форми
    const {
        description: addDescription,
        setDescription: setAddDescription,
        targetYear: addTargetYear,
        setTargetYear: setAddTargetYear,
        friend: addFriend,
        setFriend: setAddFriend
    } = useDreamForm();

    // Отримуємо функцію для додавання мрії в базу даних
    const { addDream, isLoading: isAdding } = useAddDream();

    // Вибір, які дані та обробники використовувати залежно від режиму
    // Якщо нова мрія - використовуємо add-функції, якщо редагуємо - edit-функції
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

    // Обробник відправки форми
    const handleSubmit = async (e) => {
        e.preventDefault(); // Запобігаємо перезавантаженню сторінки
        
        if (isNew) {
            // Додаємо нову мрію
            await addDream({
                description: formData.description,
                targetYear: +formData.targetYear, // + перетворює рядок в число
                friend: formData.friend
            });
        } else {
            // Оновлюємо існуючу мрію
            await editDream();
        }
    };

    // Показуємо завантаження, поки завантажуємо дані мрії для редагування
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

    // Рендеримо форму з відповідними даними та обробниками
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
