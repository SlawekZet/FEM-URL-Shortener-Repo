import styles from "./Footer.module.css";
import { handlePlaceholderClick } from "../../utils/utils";
import { FooterElement } from "../FooterElement/FooterElement";

export const Footer = () => {
  const features: string[] = ["Link Sharing", "Branded Links", "Analytics"];
  const resources: string[] = ["Blog", "Developers", "Support"];
  const company: string[] = ["About", "Our Team", "Careers", "Contact"];

  return (
    <section className={styles.wrapper}>
      <div className={styles.footer}>
        <div className={styles.logotype}>
          <img src="./logo-white.svg" alt="shortly logotype" />
        </div>
        <div className={styles.menu}>
          <FooterElement>
            <p className={styles.elementHeader}>Features</p>
            <ul>
              {features.map((e, index: number) => (
                <li key={index} className={styles.elementText}>
                  <a href="#">{e}</a>
                </li>
              ))}
            </ul>
          </FooterElement>
          <FooterElement>
            <p className={styles.elementHeader}>Resources</p>
            <ul>
              {resources.map((e, index: number) => (
                <li key={index} className={styles.elementText}>
                  <a href="#">{e}</a>
                </li>
              ))}
            </ul>
          </FooterElement>
          <FooterElement>
            <p className={styles.elementHeader}>Company</p>
            <ul>
              {company.map((e, index: number) => (
                <li key={index} className={styles.elementText}>
                  <a href="#">{e}</a>
                </li>
              ))}
            </ul>
          </FooterElement>
        </div>
        <div className={styles.socials}>
          <img
            src="./icons/icon-facebook.svg"
            alt="facebook logotype"
            className={styles.socialsImg}
            onClick={handlePlaceholderClick}
          />
          <img
            src="./icons/icon-twitter.svg"
            alt="twitter logotype"
            className={styles.socialsImg}
            onClick={handlePlaceholderClick}
          />
          <img
            src="./icons/icon-pinterest.svg"
            alt="pinterest logotype"
            className={styles.socialsImg}
            onClick={handlePlaceholderClick}
          />
          <img
            src="./icons/icon-instagram.svg"
            alt="instagram logotype"
            className={styles.socialsImg}
            onClick={handlePlaceholderClick}
          />
        </div>
      </div>
    </section>
  );
};
