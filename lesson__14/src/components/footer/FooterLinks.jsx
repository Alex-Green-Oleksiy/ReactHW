import "@/components/footer/FooterLinks.css";

const FooterLinks = ({ links }) => {
    return (
        <ul className="footer-links">
            {links.map((link, index) => (
                <li key={index}>
                    <a href={link.href} className="footer-link">
                        {link.label}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default FooterLinks;
