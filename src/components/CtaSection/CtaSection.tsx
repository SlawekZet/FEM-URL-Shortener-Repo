import { Button } from '../Button/Button';
import styles from './CtaSection.module.css';
import { handlePlaceholderClick } from '../../utils/utils';

export const CtaSection = () => {
  return (
    <div className={styles.ctaWrapper}>
      <div className={styles.cta}>
        <h2 className={`${styles.ctaText} ${styles.headerText}`}>
          Boost your links today
        </h2>
        <Button
          className={`button-primary ${styles.buttonCta}`}
          onClick={handlePlaceholderClick}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};
