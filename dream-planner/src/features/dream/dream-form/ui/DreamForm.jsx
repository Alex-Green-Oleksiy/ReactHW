import styles from "@/features/dream/dream-form/ui/DreamForm.module.css";

// Функція для створення списку років (поточний рік + 20 років вперед)
const generateYears = (count = 20) => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: count }, (_, i) => currentYear + i);
};

// Компонент форми для додавання/редагування мрії
// Отримує всі дані та обробники через props
export const DreamForm = ({
    description,
    onDescriptionChange,
    targetYear,
    onTargetYearChange,
    friend,
    onFriendChange,
    onSubmit,
    isNew,
    isSubmitting
}) => {
    // Генеруємо список років для випадаючого списку
    const years = generateYears();

    return (
        <div className={styles.form}>
            <div className={styles.formContent}>
                <h2 className={styles.title}>
                    {isNew ? "Додати нову мрію" : "Редагувати мрію"}
                </h2>

                {/* Форма з обробником onSubmit */}
                <form onSubmit={onSubmit}>
                    {/* Поле для опису мрії */}
                    <div className={styles.formGroup}>
                        <label htmlFor="description" className={styles.label}>
                            Опис мрії *
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={onDescriptionChange}
                            placeholder="Опишіть свою мрію детально..."
                            className={styles.textarea}
                            rows={4}
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    {/* Випадаючий список для вибору року */}
                    <div className={styles.formGroup}>
                        <label htmlFor="targetYear" className={styles.label}>
                            Цільовий рік *
                        </label>
                        <select
                            id="targetYear"
                            value={targetYear}
                            onChange={onTargetYearChange}
                            className={styles.select}
                            disabled={isSubmitting}
                            required
                        >
                            <option value="">Оберіть рік</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Поле для імені друга (необов'язкове) */}
                    <div className={styles.formGroup}>
                        <label htmlFor="friend" className={styles.label}>
                            Друг для реалізації
                        </label>
                        <input
                            id="friend"
                            type="text"
                            value={friend}
                            onChange={onFriendChange}
                            placeholder="Ім'я друга (необов'язково)"
                            className={styles.input}
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Кнопка відправки форми */}
                    <div className={styles.buttonGroup}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`${styles.submitButton} ${
                                isSubmitting ? styles.loadingButton : ""
                            }`}
                        >
                            {/* Показуємо спінер під час завантаження */}
                            {isSubmitting && (
                                <div className={styles.loadingSpinner}></div>
                            )}
                            {/* Змінюємо текст кнопки залежно від стану */}
                            {isSubmitting
                                ? "Збереження..."
                                : isNew
                                ? "Додати мрію"
                                : "Оновити мрію"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
