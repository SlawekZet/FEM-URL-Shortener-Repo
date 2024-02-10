import { Footer } from '../Footer/Footer';
import { LoginRegisterForm } from '../LoginRegisterForm/LoginRegisterForm';

import { Navbar } from '../Navbar/Navbar';
import styles from './RegisterPage.module.css';

const inputs = [
  {
    id: 'email',
    type: 'text',
    placeholder: 'Enter email',
  },
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

export const RegisterPage = () => {
  return (
    <section className={styles.wrapper}>
      <Navbar />
      <LoginRegisterForm
        header="Register"
        linkName="Login"
        linkTarget="/login"
        buttonName="Register"
        inputs={inputs}
      />
      <Footer />
    </section>
  );
};
