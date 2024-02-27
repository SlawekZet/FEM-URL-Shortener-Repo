import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import styles from './LoginRegisterForm.module.css';
import { useState } from 'react';
import { useUrlShortenerContext } from '../../context/UrlShortenerContext';
import { loginUser, registerUser } from '../../utils/utils';

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
  const { error, setError, setIsLogged, setLoggedUser } =
    useUrlShortenerContext();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [response, setResponse] = useState<string>();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError('');
    setResponse('');
    if (inputs.length === 3) {
      await registerUser(
        username,
        email,
        password,
        setResponse,
        setUsername,
        setPassword,
        setEmail,
        setError
      );
    } else if (inputs.length === 2) {
      await loginUser(
        username,
        password,
        setResponse,
        setIsLogged,
        setUsername,
        setPassword,
        setLoggedUser,
        setError,
        navigate
      );
    }
  };

  const handleNavigate = () => {
    navigate(linkTarget);
    setError('');
    setResponse('');
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
                  type={e.id === 'password' ? 'password' : e.type}
                  placeholder={e.placeholder}
                  className={styles.input}
                  value={
                    e.id === 'username'
                      ? username
                      : e.id === 'email'
                      ? email
                      : password
                  }
                  onChange={handleInputChange}
                />
              </div>
            );
          })}

          <Button onClick={handleClick} className={styles.button}>
            {buttonName}
          </Button>
          <a onClick={handleNavigate} className={styles.signupLink}>
            {linkName}
          </a>
          <div className={styles.serverResponse}>
            <p>{response}</p>
          </div>
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        </form>
      </div>
    </>
  );
};
