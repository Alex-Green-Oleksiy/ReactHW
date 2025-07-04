import styles from "@/styles/pages/AboutDev/AboutDev.module.scss";

function AboutDev() {
    return (
        <div className={styles.aboutDevContainer}>
            <h2>Про розробників :</h2>
            <p>
                Ми фірма солідна, но бідна. Студенти курсу React. Практикуєм
                сучасні підходи до розробки SPA, любимо{" "}
                <mark>порочний код</mark> і цікаві UI-рішення. Якщо маєте
                питання — звертайтесь!
            </p>
        </div>
    );
}

export default AboutDev;
