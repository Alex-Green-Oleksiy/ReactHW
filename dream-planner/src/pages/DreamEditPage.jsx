import React from "react";
import { useParams } from "react-router";
import { DreamFormWidget } from "@/widgets";
import styles from "@/pages/DreamEditPage.module.css";

export default function DreamEditPage() {
    const { id } = useParams();

    return (
        <div className={styles.container}>
            <DreamFormWidget dreamId={id} />
        </div>
    );
}
