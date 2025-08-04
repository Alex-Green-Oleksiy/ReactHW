import styles from "@/features/dream/dream-form/ui/DreamForm.module.css";
const generateYears = (count = 20) => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: count }, (_, i) => currentYear + i);
};
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
    const years = generateYears();
    return (
        <div className={styles.form}>
            <div className={styles.formContent}>
                <h2 className={styles.title}>
                    {isNew ? "Додати нову мрію" : "Редагувати мрію"}
                </h2>
                <form onSubmit={onSubmit}>
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
                    <div className={styles.buttonGroup}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`${styles.submitButton} ${
                                isSubmitting ? styles.loadingButton : ""
                            }`}
                        >
                            {isSubmitting && (
                                <div className={styles.loadingSpinner}></div>
                            )}
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
