import { Link } from "react-router";
import styles from "@/features/dream/edit-dream/ui/EditDreamLink.module.scss";
export const EditDreamLink = ({ dreamId }) => (
    <Link to={`/dreams/edit/${dreamId}`} className={styles.editLink}>
        <svg
            className={styles.editIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
        </svg>
        Редагувати
    </Link>
);
