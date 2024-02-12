import styles from './Navbar.module.css';
import { useState, useEffect } from 'react';
import { handlePlaceholderClick } from '../../utils/utils';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { useUrlShortenerContext } from '../../context/UrlShortenerContext';

export const Navbar = () => {
  const { setError } = useUrlShortenerContext();

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  // This useEffect checks the width of the window to declare if it is mobile or desktop

  useEffect(() => {
    const handleResize = () => {
      setIsMenuVisible(window.innerWidth >= 427); // check if it chanes every time the state
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
    setError('');
  };

  const handleSignupClick = () => {
    navigate('/register');
    setError('');
  };

  const handleLogoClick = () => {
    navigate('/');
    setError('');
  };

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className={`${styles.wrapper} horizontal-padding`}>
      <div className={styles.logoButtonWrapper}>
        <a onClick={handleLogoClick} className={styles.logoLink}>
          <img
            src="./logo.svg"
            alt="shortly logotype"
            className={styles.logo}
          />
        </a>
        <Button
          onClick={() => handleMenuClick()}
          className={styles.menuIconButton}
        >
          <img
            src="./menu-icon-mobile.png"
            className={styles.menuIcon}
            alt="hambuger menu icon"
          ></img>
        </Button>
      </div>
      <div
        className={isMenuVisible ? styles.navbar : `${styles.navbar} hidden`}
      >
        <div className={styles.leftWrapper}>
          <div className={styles.leftMenu}>
            <Button onClick={handlePlaceholderClick} className={styles.button}>
              Features
            </Button>
            <Button onClick={handlePlaceholderClick} className={styles.button}>
              Pricing
            </Button>
            <Button onClick={handlePlaceholderClick} className={styles.button}>
              Resources
            </Button>
          </div>
        </div>
        <div className={styles.right}>
          <a className={styles.button} onClick={handleLoginClick}>
            Login
          </a>

          <Button className="button-primary" onClick={handleSignupClick}>
            Signup
          </Button>
        </div>
      </div>
    </div>
  );
};
