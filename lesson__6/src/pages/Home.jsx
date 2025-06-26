import React, { useState } from "react";
import Task1Calculator from "../task1";
import DataGridTask2 from "../task2";
import WindowSizeTask3 from "../task3/WindowSize";
import DebounceTask4 from "../task4/Debounce";
import styles from "./Home.module.css";
import TASKS_DATA from "./tasksData";

const COMPONENTS = {
    task1: <Task1Calculator />,
    task2: <DataGridTask2 />,
    task3: <WindowSizeTask3 />,
    task4: <DebounceTask4 />
};

const TASKS = TASKS_DATA.map((t) => ({
    ...t,
    component: COMPONENTS[t.component],
    description: (
        <>
            <span className={styles.taskNum}>{t.label.split(":")[0]}.</span>{" "}
            {t.description}
        </>
    )
}));

export default function Home() {
    const [selected, setSelected] = useState(null);
    const [hovered, setHovered] = useState(null);

    return (
        <div className={styles.appLayout}>
            <main className={styles.main}>
                <h1>Lesson 6</h1>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {TASKS.map((task) => (
                            <li
                                key={task.key}
                                className={styles.navItem}
                                style={{ position: "relative" }}
                            >
                                <button
                                    className={
                                        styles.navBtn +
                                        (selected === task.key
                                            ? " " + styles.active
                                            : "")
                                    }
                                    onClick={() => setSelected(task.key)}
                                    onMouseEnter={() => setHovered(task.key)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    {task.label}
                                </button>
                                {hovered === task.key && (
                                    <div className={styles.taskTooltip}>
                                        {task.description}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
                <div>
                    {selected ? (
                        TASKS.find((t) => t.key === selected)?.component
                    ) : (
                        <div className={styles.emptyState}></div>
                    )}
                </div>
            </main>
        </div>
    );
}
