import styles from './Content.module.css';

import { ReactNode } from 'react';

interface ContentProps {
  children: ReactNode;
}

export const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <section className={styles.content}>
      <div className={`${styles.wrapper} horizontal-padding`}>{children}</div>
    </section>
  );
};
