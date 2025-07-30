import "@/components/footer/FooterSection.css";

const FooterSection = ({ title, children, className = "" }) => {
    return (
        <div className={`footer-section ${className}`}>
            {title && <h4 className="footer-subtitle">{title}</h4>}
            {children}
        </div>
    );
};

export default FooterSection;
