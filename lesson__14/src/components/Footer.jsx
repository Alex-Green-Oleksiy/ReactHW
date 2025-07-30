import FooterSection from "@/components/footer/FooterSection";
import FooterLinks from "@/components/footer/FooterLinks";
import FooterContacts from "@/components/footer/FooterContacts";
import {
    FOOTER_QUICK_LINKS,
    FOOTER_SUPPORT_LINKS,
    FOOTER_CONTACTS
} from "@/constants/navigation";
import "@/components/Footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <FooterSection>
                    <h3 className="footer-title">🏥 EMR Система</h3>
                    <p className="footer-description">
                        Електронна медична система для управління пацієнтами,
                        лікарями та записами на прийом.
                    </p>
                </FooterSection>

                <FooterSection title="Швидкі посилання">
                    <FooterLinks links={FOOTER_QUICK_LINKS} />
                </FooterSection>

                <FooterSection title="Контакти">
                    <FooterContacts contacts={FOOTER_CONTACTS} />
                </FooterSection>

                <FooterSection title="Підтримка">
                    <FooterLinks links={FOOTER_SUPPORT_LINKS} />
                </FooterSection>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p className="footer-copyright">
                        © {currentYear} EMR Система. Всі права захищені.
                    </p>
                    <p className="footer-version">Версія 1.0.0</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
