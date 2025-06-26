const TASKS_DATA = [
    {
        key: "task1",
        label: "Задача 1: useMemo + React.memo",
        description:
            "Оптимізація вибіркового рендеру з useMemo та React.memo. Створіть компонент-калькулятор з двома полями (A, B) і окремим компонентом ResultDisplay (React.memo), який показує A+B. Використайте useMemo для обчислення суми. Додайте незалежний лічильник у батьківському компоненті.",
        component: "task1"
    },
    {
        key: "task2",
        label: "Задача 2: DataGrid з фільтрацією",
        description:
            "Таблиця з фільтрацією та сортуванням, чутлива до UI. DataGrid (батьківський) та GridRow (React.memo). Фільтрація, сортування, useDeferredValue для пошуку/сортування, useMemo для обчислень, useCallback для обробників. Великий масив даних.",
        component: "task2"
    },
    {
        key: "task3",
        label: "Задача 3: useWindowSize",
        description:
            "useWindowSize – розмір вікна браузера. Кастомний хук, який повертає ширину і висоту вікна. Компонент показує розміри і іконку пристрою (монітор, планшет, телефон).",
        component: "task3"
    },
    {
        key: "task4",
        label: "Задача 4: useDebounce",
        description:
            "useDebounce – відкладений виклик функції. Кастомний хук, який повертає 'відкладене' значення через затримку. Поле пошуку, результати оновлюються з затримкою (500мс) після зупинки введення.",
        component: "task4"
    }
];

export default TASKS_DATA;
