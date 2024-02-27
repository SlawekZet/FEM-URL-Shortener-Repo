import styles from './Navbar.module.css';
import { useState, useEffect } from 'react';
import { handlePlaceholderClick } from '../../utils/utils';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { useUrlShortenerContext } from '../../context/UrlShortenerContext';
import { logout } from '../../utils/utils';
import { domain } from '../../utils/config';

export const Navbar = () => {
  const {
    setError,
    isLogged,
    setIsLogged,
    setLoggedUser,
    setIsRefreshChecked,
    isRefreshChecked,
  } = useUrlShortenerContext();

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

  useEffect(() => {
    if (isRefreshChecked) return console.log('Already checked');
    setIsRefreshChecked(true);

    const token = document.cookie.split('=')[1];
    if (!token) return console.log('No logged user');

    const fetchData = async () => {
      try {
        const response = await fetch(`${domain}/user/profile-refresh`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to login - user not found');
        }
        const data = await response.json();
        setIsLogged(true);
        setLoggedUser(data.loggedUser);
      } catch (error) {
        console.error('An error occured:', error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
    setError('');
  };

  const handleLogoutClick = () => {
    logout(setLoggedUser, setIsLogged);
    window.location.reload();
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
          <a
            className={styles.button}
            onClick={isLogged ? handleLogoutClick : handleLoginClick}
          >
            {!isLogged ? 'Login' : 'Logout'}
          </a>
          {isLogged ? null : (
            <Button className="button-primary" onClick={handleSignupClick}>
              Signup
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
