import { useState } from "react";
import styles from "./Task5.module.css";
import SearchResult from "./components/SearchResult/SearchResult";
import { searchData } from "./constants/searchData";

function Task5() {
    const [searchResults] = useState(searchData);

    return (
        <div className={styles.container}>
            <h2>Результати пошуку</h2>
            <div className={styles.results}>
                {searchResults.map((item, index) => (
                    <SearchResult key={index} item={item} />
                ))}
            </div>
        </div>
    );
}

export default Task5;
