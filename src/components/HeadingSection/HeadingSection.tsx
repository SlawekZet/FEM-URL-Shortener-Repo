import styles from './HeadingSection.module.css';

export const HeadingSection = () => {
  return (
    <div className={styles.header}>
      <h2 className={styles.headerText}>Advanced Statistics</h2>
      <p className={styles.headerParagraph}>
        Track how your links are performing across the web with our advanced
        statistics dashboard.
      </p>
    </div>
  );
};
