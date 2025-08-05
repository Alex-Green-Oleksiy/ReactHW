import { DreamCard } from "@/entities/dream";
import { EditDreamLink, DeleteDreamButton } from "@/features/dream";
import { Pagination } from "@/widgets/DreamListWidget/ui";
import styles from "@/widgets/DreamListWidget/ui/DreamList.module.scss";
export const DreamList = ({ dreams, page, setPage, hasMore, isLoading, totalPages = 1 }) => {
    return (
        <div className={styles.dreamList}>
            {isLoading ? (
                <div className={styles.loadingState}>
                    <div className={styles.loadingSpinner}></div>
                    <p className={styles.loadingText}>Завантаження мрій...</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {dreams.length === 0 ? (
                        <div className={styles.emptyState}>
                            <svg
                                className={styles.emptyIcon}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                            </svg>
                            <h3 className={styles.emptyTitle}>
                                Поки що немає мрій
                            </h3>
                            <p className={styles.emptyText}>
                                Додайте свою першу мрію, щоб почати планувати
                                майбутнє!
                            </p>
                        </div>
                    ) : (
                        dreams.map((dream) => (
                            <DreamCard
                                key={dream.id} // Унікальний ключ для React
                                dream={dream}
                                actions={[
                                    <EditDreamLink
                                        dreamId={dream.id}
                                        key={`edit-${dream.id}`}
                                    />,
                                    <DeleteDreamButton
                                        dreamId={dream.id}
                                        key={`delete-${dream.id}`}
                                    />
                                ]}
                            />
                        ))
                    )}
                </div>
            )}
            {dreams.length > 0 && (
                <div className={styles.paginationContainer}>
                    <Pagination
                        page={page}
                        setPage={setPage}
                        hasMore={hasMore}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </div>
    );
};
