import styles from "@/styles/pages/AboutApp/AboutApp.module.scss";

function AboutApp() {
    return (
        <div className={styles.aboutAppContainer}>
            <h2>Про додаток</h2>
            <p>
                Цей додаток дозволяє керувати списком вчителів, додавати,
                редагувати, видаляти їх, а також формувати список для зборів.
            </p>
        </div>
    );
}

export default AboutApp;
