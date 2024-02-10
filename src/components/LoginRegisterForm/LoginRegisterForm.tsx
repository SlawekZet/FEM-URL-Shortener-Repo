import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import styles from './LoginRegisterForm.module.css';

interface LoginRegisterFormProps {
  header: string;
  buttonName: string;
  linkName: string;
  linkTarget: string;
  inputs: { id: string; type: string; placeholder: string }[];
}

export const LoginRegisterForm: React.FC<LoginRegisterFormProps> = ({
  header,
  buttonName,
  linkName,
  linkTarget,
  inputs,
}) => {
  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('set up login logic');
  };

  return (
    <>
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <h2 className={styles.header}>{header}</h2>
          {inputs.map((e, index) => {
            return (
              <div className={styles.inputWrapper} key={index}>
                <input
                  id={e.id}
                  type={e.type}
                  placeholder={e.placeholder}
                  className={styles.input}
                />
              </div>
            );
          })}

          <Button onClick={handleLoginClick} className={styles.button}>
            {buttonName}
          </Button>
          <div className={styles.signupLink}>
            <Link to={linkTarget}>
              <p>{linkName}</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
