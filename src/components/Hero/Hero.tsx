import styles from "./Hero.module.css";
import { handlePlaceholderClick } from "../../utils/utils";
import { Button } from "../Button/Button";

export const Hero = () => {
  return (
    <>
      <section className={`${styles.wrapper} horizontal-padding`}>
        <div className={styles.content}>
          <h1 className={styles.text}>More than just shorter links</h1>
          <p className={styles.paragraph}>
            Build your brand’s recognition and get detailed insights on how your
            links are performing.
          </p>
          <Button
            onClick={handlePlaceholderClick}
            className={`${styles.button} button-primary`}
          >
            Get Started
          </Button>
        </div>
        <img
          src="./illustration-working.svg"
          alt="person working at a computer"
          className={styles.img}
        />
      </section>
    </>
  );
};
