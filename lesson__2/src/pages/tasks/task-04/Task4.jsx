import { useState } from "react";
import styles from "./Task4.module.css";
import Worker from "./components/Worker/Worker";
import { workers } from "./constants/workers";

function Task4() {
    const [workersList] = useState(workers);

    const formatSalary = (salary) => salary.toLocaleString("uk-UA");

    return (
        <div className={styles.container}>
            <ul className={styles.workersList}>
                {workersList.map((worker) => (
                    <Worker
                        key={worker.id}
                        worker={worker}
                        formatSalary={formatSalary}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Task4;
