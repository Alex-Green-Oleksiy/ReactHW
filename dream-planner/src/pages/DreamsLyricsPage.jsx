import React from "react";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";
import styles from "./DreamsLyricsPage.module.scss";
const DreamsLyricsPage = () => {
    return (
        <div className={styles.container}>
           
            <div className={styles.content}>
                <h1 className={styles.title}>Dream On</h1>
                <div className={styles.lyrics}>
                    <p>
                        Кожен раз, коли в дзеркало дивлюся Мої зморшки чіткіші
                        здаються
                    </p>
                    <p>Минуле геть йде Наче від ночі до схід сонця час мине</p>
                    <p>
                        І чи не це є той шлях Кожен з нас платить по своїх
                        боргах
                    </p>
                    <p>Я знаю, на світі все має початок і кінець.</p>
                    <p>Знаю я і знаєш ти, програти вмій, щоби перемогти.</p>
                    <p>
                        Я все життя провів за книжками, в них мудрість просіяна
                        віками.
                    </p>
                    <p>Ти знаєш, авжеж, що посієш те і пожнеш.</p>
                    <p>Ти мрій, просто мрій, доки мрія прийде,</p>
                    <p>мрій, доки збудеться все.</p>
                    <p>
                        Підспівуй, просто співай, співай коли радість, чи в
                        серці печаль,
                    </p>
                    <p>підспівуй, співай від душі,</p>
                    <p>хто знає, як довго ходити тобі по землі.</p>
                </div>
                <div className={styles.artist}>Aerosmith</div>
            </div>
        </div>
    );
};
export default DreamsLyricsPage;
