import { Benefit } from '../Benefit/Benefit';
import styles from './Benefits.module.css';

export const Benefits = () => {
  return (
    <div className={styles.elementsWrapper}>
      <hr className={styles.separator} />
      <div className={styles.elements}>
        <Benefit
          img={'./icons/icon-brand-recognition.svg'}
          altImg={'chart icon'}
        >
          <h3 className={styles.elementHeader}>Brand Recognition</h3>
          <p className={styles.elementParagraph}>
            Boost your brand recognition with each click. Generic links don’t
            mean a thing. Branded links help instil confidence in your content.
          </p>
        </Benefit>
        <Benefit
          img={'./icons/icon-detailed-records.svg'}
          altImg={'potentiometer icon'}
          className={styles.elementMargin1}
        >
          <h3 className={styles.elementHeader}>Detailed Records</h3>
          <p className={styles.elementParagraph}>
            Gain insights into who is clicking your links. Knowing when and
            where people engage with your content helps inform better decisions.
          </p>
        </Benefit>
        <Benefit
          img={'./icons/icon-fully-customizable.svg'}
          altImg={'three brushes'}
          className={styles.elementMargin2}
        >
          <h3 className={styles.elementHeader}>Fully Customizable</h3>
          <p className={styles.elementParagraph}>
            Improve brand awareness and content discoverability through
            customizable links, supercharging audience engagement.
          </p>
        </Benefit>
      </div>
    </div>
  );
};
