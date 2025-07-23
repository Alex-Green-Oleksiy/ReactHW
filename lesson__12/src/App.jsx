import MainLayout from "@/layouts/MainLayout";
import AppRouter from "@/router/AppRouter";
import styles from "@/style/App.module.scss";

function App() {
    return (
        <MainLayout>
            <div className={styles.mainContent}>
                <AppRouter />
            </div>
        </MainLayout>
    );
}

export default App;
