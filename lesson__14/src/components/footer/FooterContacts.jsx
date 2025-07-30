import "@/components/footer/FooterContacts.css";

const FooterContacts = ({ contacts }) => {
    return (
        <ul className="footer-contacts">
            {contacts.map((contact, index) => (
                <li key={index}>{contact}</li>
            ))}
        </ul>
    );
};

export default FooterContacts;
