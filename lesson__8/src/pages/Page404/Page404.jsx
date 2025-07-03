import styles from "../../styles/pages/Page404/Page404.module.scss";

function Page404() {
    return (
        <div className={styles.page404Container}>
            <span className={styles.bg404}>404</span>
            <div className={styles.loaderWrapper}>
                <div className={styles.rainbowLoader}></div>
            </div>
            <h2>Сторінку не знайдено!</h2>
            <p>Куди ти залізло, чудо?</p>
        </div>
    );
}

export default Page404;
