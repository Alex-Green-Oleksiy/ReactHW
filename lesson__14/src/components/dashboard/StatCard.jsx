import "@/components/dashboard/StatCard.css";

const StatCard = ({ icon, title, value, className = "" }) => {
    return (
        <div className={`stat-card ${className}`}>
            <div className="stat-icon">{icon}</div>
            <div className="stat-content">
                <h3>{title}</h3>
                <p className="stat-number">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;
