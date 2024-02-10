import styles from './Benefit.module.css';
import { ReactNode } from 'react';

interface BenefitProps {
  children: ReactNode;
  img: string;
  altImg: string;
  className?: string;
}

export const Benefit: React.FC<BenefitProps> = ({
  children,
  img,
  altImg,
  className,
}) => {
  return (
    <div
      className={className ? `${className} ${styles.wrapper}` : styles.wrapper}
    >
      <div className={styles.imgContainer}>
        <img className={styles.img} src={img} alt={altImg} />
      </div>
      {children}
    </div>
  );
};
