import styles from './Shortener.module.css';
import { useEffect } from 'react';
import { Button } from '../Button/Button';
import { useUrlShortenerContext } from '../../context/UrlShortenerContext';
import { handleShortenUrl } from '../../utils/utils';

export const Shortener = () => {
  const {
    originalUrl,
    setOriginalUrl,
    shortenedUrl,
    setShortenedUrl,
    urlsArray,
    setUrlsArray,
    setError,
    setLoading,
    error,
    loading,
    loggedUser,
  } = useUrlShortenerContext();

  useEffect(() => {
    if (shortenedUrl && shortenedUrl.length > 0) {
      setUrlsArray((prevUrlsArray) => [
        ...prevUrlsArray,
        {
          orgUrl: originalUrl,
          shortUrl: shortenedUrl,
        },
      ]);
      setOriginalUrl('');
      console.log(urlsArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortenedUrl]);

  // saving the urlsArray to the localStorage

  useEffect(() => {
    if (urlsArray && urlsArray.length > 0 && !loggedUser) {
      localStorage.setItem('urlsArray', JSON.stringify(urlsArray));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlsArray]);

  useEffect(() => {
    setError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalUrl]);

  return (
    <>
      <section className={`${styles.wrapper} horizontal-padding`}>
        <div className={styles.shortener}>
          <form className={styles.form}>
            <input
              name="shortener-input"
              type="text"
              placeholder="Shorten a link here..."
              className={
                error ? `${styles.input} ${styles.borderRed}` : styles.input
              }
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
            {!error && error.length === 0 ? null : (
              <div className={styles.errorLoadingWrapper}>
                <p className={styles.errorMessage}>{error}</p>
              </div>
            )}
            {!loading ? null : (
              <div className={styles.errorLoadingWrapper}>
                <p className={styles.loadingMessage}>Shortening...</p>
              </div>
            )}
            <Button
              onClick={(e) =>
                handleShortenUrl(
                  e,
                  originalUrl,
                  urlsArray,
                  loggedUser,
                  setError,
                  setLoading,
                  setShortenedUrl
                )
              }
              className={`button-primary ${styles.button}`}
            >
              Shorten It!
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};
