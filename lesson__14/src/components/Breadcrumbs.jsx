import { Link, useLocation } from "react-router-dom";
import { BREADCRUMB_MAP } from "@/constants/navigation";
import "@/components/Breadcrumbs.css";

function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    const breadcrumbMap = BREADCRUMB_MAP;

    const breadcrumbs = pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbMap[name] || name;

        return isLast ? (
            <span key={name} className="breadcrumb-item active">
                {displayName}
            </span>
        ) : (
            <Link key={name} to={routeTo} className="breadcrumb-item">
                {displayName}
            </Link>
        );
    });

    return (
        <nav className="breadcrumbs">
            <Link to="/" className="breadcrumb-item">
                Головна
            </Link>
            {breadcrumbs.length > 0 && (
                <span className="breadcrumb-separator">/</span>
            )}
            {breadcrumbs}
        </nav>
    );
}

export default Breadcrumbs;
