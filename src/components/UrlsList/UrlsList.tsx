import styles from './UlrsList.module.css';
import { Button } from '../Button/Button';
import { useUrlShortenerContext } from '../../context/UrlShortenerContext';
import { useEffect, useState } from 'react';

export const UrlsList = () => {
  const { urlsArray, setUrlsArray } = useUrlShortenerContext();
  const [copiedUrl, setCopiedUrl] = useState<string>('');

  // copying the shortened url

  const handleCopyButtonClick = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      const text = await navigator.clipboard.readText();

      if (text === url) {
        setCopiedUrl(text);
      } else {
        alert('URL was not copied! Check the console');
      }
    } catch (error) {
      console.error('Error while copying the URL:', error);
    }
  };

  // deleting the URL from the urlsArray

  const handleDeleteUrl = (index: number) => {
    const filteredUrls = urlsArray.filter((_url, i) => i !== index);
    setUrlsArray(filteredUrls);
  };

  // loading the urlsArray from the local storage

  useEffect(() => {
    const savedUrls = localStorage.getItem('urlsArray');
    if (savedUrls && savedUrls.length > 0) {
      setUrlsArray(JSON.parse(savedUrls));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {urlsArray.length > 0
        ? urlsArray.map((e, index) => (
            <div key={index} className={styles.shortenedLinkWrapper}>
              <div className={styles.orgUrlWrapper}>
                <p className={styles.orgUrl}>{e.orgUrl}</p>
              </div>
              <div className={styles.shortLinkWrapper}>
                <p className={styles.shortUrl}>{e.shortUrl}</p>
                <button
                  className={
                    copiedUrl === e.shortUrl
                      ? `button-primary ${styles.buttonShortUrl} copied`
                      : `button-primary ${styles.buttonShortUrl}`
                  }
                  onClick={() => handleCopyButtonClick(e.shortUrl)}
                >
                  {copiedUrl === e.shortUrl ? 'Copied!' : 'Copy'}
                </button>
                <Button
                  onClick={() => handleDeleteUrl(index)}
                  className={`button-primary ${styles.buttonDelete}`}
                >
                  X
                </Button>
              </div>
            </div>
          ))
        : null}
    </>
  );
};
