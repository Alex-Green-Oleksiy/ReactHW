import { useNavigate } from "react-router-dom";
import styles from "../../styles/pages/Home/Home.module.scss";

function Home() {
    const navigate = useNavigate();
    return (
        <div className={styles.homeContainer}>
            <div className={styles.homeCard}>
                <h1 className={styles.homeTitle}>
                    Ласкаво просимо до додатку "Вчителі"
                </h1>
                <p className={styles.homeDesc}>
                    Цей додаток допоможе вам керувати інформацією про вчителів,
                    викликати їх та дізнаватися про розробника.
                </p>
                <div className={styles.homeActions}>
                    <button
                        className={styles.homeBtn}
                        onClick={() => navigate("/teachers")}
                    >
                        Переглянути вчителів
                    </button>
                    <button
                        className={`${styles.homeBtn} ${styles.homeBtnYellow}`}
                        onClick={() => navigate("/meeting")}
                    >
                        Переглянути список для зборів
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
