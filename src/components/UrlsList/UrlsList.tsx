import styles from './UlrsList.module.css';
import { Button } from '../Button/Button';
import { useUrlShortenerContext } from '../../context/UrlShortenerContext';
import { useEffect, useState, ChangeEvent } from 'react';
import { shortenerDomain, domain } from '../../utils/config';
import {
  handleCopyButtonClick,
  handleDeleteUrl,
  handleSaveEditClick,
} from '../../utils/utils';

export const UrlsList = () => {
  const {
    urlsArray,
    setUrlsArray,
    loggedUser,
    isLogged,
    deletedUrl,
    setDeletedUrl,
  } = useUrlShortenerContext();
  const [copiedUrl, setCopiedUrl] = useState<string>('');
  const [editingIndices, setEditingIndices] = useState<number[]>([]);
  const [newShortUrl, setNewShortUrl] = useState<string>('');
  const [editedUrl, setEditedUrl] = useState<string>('');
  const [shortUrlError, setShortUrlError] = useState<string>('');

  const handleEditClick = (index: number) => {
    setEditingIndices([index]);
  };

  const handleCancelEditClick = () => {
    setEditingIndices([]);
    setNewShortUrl('');
    setShortUrlError('');
  };

  // loading the urlsArray from the local storage

  useEffect(() => {
    if (loggedUser) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${domain}/get-url-list?username=${loggedUser}`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );
          const data = await response.json();
          setUrlsArray(data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    } else {
      const savedUrls = localStorage.getItem('urlsArray');
      if (savedUrls && savedUrls.length > 0) {
        setUrlsArray(JSON.parse(savedUrls));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedUrl, editedUrl, loggedUser]);

  useEffect(() => {
    setShortUrlError('');
  }, [newShortUrl]);

  const handleUpdateShortUrl = (e: ChangeEvent<HTMLInputElement>) =>
    setNewShortUrl(e.target.value);

  return (
    <>
      {urlsArray.length > 0
        ? urlsArray.map((e, index) => (
            <div key={index} className={styles.shortenedLinkWrapper}>
              <div className={styles.orgUrlWrapper}>
                <p className={styles.orgUrl}>{e.orgUrl}</p>
              </div>
              <div className={styles.shortLinkWrapper}>
                {!editingIndices.includes(index) ? (
                  <>
                    <p
                      className={styles.shortUrl}
                    >{`${shortenerDomain}/${e.shortUrl}`}</p>
                    <Button
                      className={
                        copiedUrl === e.shortUrl
                          ? `button-primary ${styles.buttonShortUrl} copied`
                          : `button-primary ${styles.buttonShortUrl}`
                      }
                      onClick={() =>
                        handleCopyButtonClick(
                          `${shortenerDomain}/${e.shortUrl}`,
                          setCopiedUrl
                        )
                      }
                    >
                      {copiedUrl === `${shortenerDomain}/${e.shortUrl}`
                        ? 'Copied!'
                        : 'Copy'}
                    </Button>
                    {isLogged ? (
                      <Button
                        onClick={() => handleEditClick(index)}
                        className={`button-primary ${styles.buttonEdit}`}
                      >
                        <img
                          className={styles.penIcon}
                          src="./icons/pen-icon.svg"
                          alt="pen icon"
                        />
                      </Button>
                    ) : null}
                    <Button
                      onClick={() =>
                        handleDeleteUrl(
                          e,
                          index,
                          loggedUser,
                          urlsArray,
                          setUrlsArray,
                          setDeletedUrl
                        )
                      }
                      className={`button-primary ${styles.buttonDelete}`}
                    >
                      X
                    </Button>
                  </>
                ) : (
                  <>
                    <div className={styles.shortUrlInputAndErrorWrapper}>
                      <div className={styles.shortUrlInputWrapper}>
                        <p
                          className={styles.shortUrl}
                        >{`${shortenerDomain}/`}</p>
                        <input
                          className={styles.shortUrlInput}
                          type="text"
                          placeholder={e.shortUrl}
                          value={newShortUrl}
                          onChange={handleUpdateShortUrl}
                        />
                      </div>
                      <p className={styles.error}>{shortUrlError}</p>
                    </div>
                    <Button
                      onClick={() =>
                        handleSaveEditClick(
                          e,
                          newShortUrl,
                          setEditedUrl,
                          setShortUrlError,
                          setNewShortUrl,
                          setEditingIndices
                        )
                      }
                      className={`button-primary ${styles.buttonSave}`}
                    >
                      <img
                        className={styles.floppyIcon}
                        src="./icons/save-icon.png"
                        alt="icon of a floppy disk"
                      />
                    </Button>
                    <Button
                      onClick={handleCancelEditClick}
                      className={`button-primary ${styles.buttonDelete}`}
                    >
                      X
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))
        : null}
    </>
  );
};
