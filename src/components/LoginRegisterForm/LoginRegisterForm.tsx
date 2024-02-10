import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import styles from './LoginRegisterForm.module.css';
import { useState } from 'react';

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
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [response, setResponse] = useState<string>();

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
    if (inputs.length === 3) {
      try {
        const response = await fetch(
          'https://render-shooort.onrender.com/auth/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
            }),
          }
        );
        if (!response.ok) {
          throw new Error('Failed to register a user');
        }
        const result = await response.json();
        setResponse(result.message);
        console.log(result.message);
        setUsername('');
        setPassword('');
        setEmail('');
      } catch (error) {
        console.log('An error has occured', error);
      }
    } else if (inputs.length === 2) {
      try {
        const response = await fetch(
          'https://render-shooort.onrender.com/auth/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          }
        );
        if (!response.ok) {
          throw new Error('Failed to login');
        }

        const result = await response.json();
        const token = result.token;
        const loginResponse = await fetch(
          'https://render-shooort.onrender.com/user/profile',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!loginResponse.ok) {
          throw new Error('Failed to login');
        }
        const loginResult = await loginResponse.json();
        setResponse(loginResult.message);
        console.log(loginResult.message);
        setUsername('');
        setPassword('');
      } catch (error) {
        console.log('An error has occured', error);
      }
    }
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
