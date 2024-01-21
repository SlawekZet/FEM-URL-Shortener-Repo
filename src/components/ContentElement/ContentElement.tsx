import styles from "./ContentElement.module.css";
import { ReactNode } from "react";

interface ContentElementProps {
  children: ReactNode;
  img: string;
  altImg: string;
  className?: string;
}

export const ContentElement: React.FC<ContentElementProps> = ({
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
