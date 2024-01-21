import styles from "./Shortener.module.css";
import { useEffect } from "react";
import { Button } from "../Button/Button";
import { useUrlShortenerContext } from "../../context/UrlShortenerContext";

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
  } = useUrlShortenerContext();

  // This function checks for errors in the user's input and errors thrown by
  // the API. Then it renders them on the view.

  const errorChecker = () => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

    if (!originalUrl && originalUrl.length === 0) {
      setError("Please provide a URL to shorten");
      return true;
    } else if (originalUrl.includes(" ")) {
      setError(
        "Please remove any spaces from the URL or encode them to %20 or +"
      );
      return true;
    } else if (
      !originalUrl.includes("http://") &&
      !originalUrl.includes("https://")
    ) {
      setError("Please add a protocol http:// or https:// to your URL");
      return true;
    } else if (!urlRegex.test(originalUrl)) {
      setError("Please provide a correct URL");
      return true;
    } else if (urlsArray.some((e) => e.orgUrl === originalUrl)) {
      setError("This url is already shortened and on your list");
      return true;
    } else if (originalUrl.includes("shooort.eu")) {
      setError("You cannot shorten already shortened URL");
      return true;
    }
    setError("");
    return false;
  };

  // This async function asks an express server based on Netlify to ask
  // the shortening API to shorten the link provided by the user. I'm using
  // a proxy here, because doing it directly in the development phase resul-
  // ted in the CORS issue. Most probably will ask the original API in the
  // prduction version.

  const handleShortenUrl = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!errorChecker()) {
      try {
        setLoading(true);
        const response = await fetch(
          "https://render-shooort.onrender.com/shorten",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ originalUrl: originalUrl }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to shorten URL");
        }
        const result = await response.json();
        setShortenedUrl(result.shortenedUrl);
        setLoading(false);
      } catch (error) {
        setError(`An error has occured while shortening URL`);
        setLoading(false);
      }
    }
  };

  // This useEffect function produces the array based on the original URL
  // and shortened URL. Next, it is used to render the list of shortened
  // URLs on the view

  useEffect(() => {
    if (shortenedUrl && shortenedUrl.length > 0) {
      setUrlsArray((prevUrlsArray) => [
        ...prevUrlsArray,
        {
          orgUrl: originalUrl,
          shortUrl: shortenedUrl,
        },
      ]);
      setOriginalUrl("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortenedUrl]);

  // saving the urlsArray to the localStorage

  useEffect(() => {
    if (urlsArray && urlsArray.length > 0) {
      localStorage.setItem("urlsArray", JSON.stringify(urlsArray));
    }
  }, [urlsArray]);

  useEffect(() => {
    setError("");
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
              onClick={handleShortenUrl}
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
