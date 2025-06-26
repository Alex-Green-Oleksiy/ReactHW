import React from "react";
import styles from "../styles/GridRow.module.css";
import { GRID_COLUMNS } from "../data";

const GridRow = React.memo(function GridRow({ row, onClick }) {
    return (
        <tr className={styles.row} onClick={() => onClick(row)}>
            {GRID_COLUMNS.map((col) => (
                <td
                    key={col.key}
                    className={styles.cell}
                    data-label={col.label}
                >
                    {row[col.key]}
                </td>
            ))}
        </tr>
    );
});

export default GridRow;
