import { useNavigate } from "react-router";
import frontRoutes from "../../routes/frontRoutes";
import styles from "../../styles/components/shared/GoHomeButton.module.scss";
function GoHomeButton() {
    const navigate = useNavigate();
    function goHome() {
        navigate(frontRoutes.navigate.home);
    }
    return (
        <button className={styles.goHomeBtn} onClick={goHome}>
            Go home
        </button>
    );
}

export default GoHomeButton;
