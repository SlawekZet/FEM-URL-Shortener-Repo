import { Footer } from '../Footer/Footer';
import { LoginRegisterForm } from '../LoginRegisterForm/LoginRegisterForm';

import { Navbar } from '../Navbar/Navbar';
import styles from './LoginPage.module.css';

const inputs = [
  {
    id: 'username',
    type: 'text',
    placeholder: 'Enter username',
  },
  {
    id: 'password',
    type: 'text',
    placeholder: 'Enter password',
  },
];

export const LoginPage = () => {
  return (
    <section className={styles.wrapper}>
      <Navbar />
      <LoginRegisterForm
        header="Login"
        linkName="Register"
        linkTarget="/register"
        buttonName="Login"
        inputs={inputs}
      />
      <Footer />
    </section>
  );
};
