import styles from "./Content.module.css";
import { handlePlaceholderClick } from "../../utils/utils";
import { Button } from "../Button/Button";
import { ContentElement } from "../ContentElement/ContentElement";
import { useUrlShortenerContext } from "../../context/UrlShortenerContext";
import { useEffect, useState } from "react";

export const Content = () => {
  const { urlsArray, setUrlsArray } = useUrlShortenerContext();
  const [copiedUrl, setCopiedUrl] = useState<string>("");

  // copying the shortened url

  const handleCopyButtonClick = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      const text = await navigator.clipboard.readText();

      if (text === url) {
        setCopiedUrl(text);
      } else {
        alert("URL was not copied! Check the console");
      }
    } catch (error) {
      console.error("Error while copying the URL:", error);
    }
  };

  // deleting the URL from the urlsArray

  const handleDeleteUrl = (index: number) => {
    const filteredUrls = urlsArray.filter((_url, i) => i !== index);
    setUrlsArray(filteredUrls);
  };

  // loading the urlsArray from the local storage

  useEffect(() => {
    const savedUrls = localStorage.getItem("urlsArray");
    if (savedUrls && savedUrls.length > 0) {
      setUrlsArray(JSON.parse(savedUrls));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.content}>
      <div className={`${styles.wrapper} horizontal-padding`}>
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
                    {copiedUrl === e.shortUrl ? "Copied!" : "Copy"}
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
        <div className={styles.header}>
          <h2 className={styles.headerText}>Advanced Statistics</h2>
          <p className={styles.headerParagraph}>
            Track how your links are performing across the web with our advanced
            statistics dashboard.
          </p>
        </div>
        <div className={styles.elementsWrapper}>
          <hr className={styles.separator} />
          <div className={styles.elements}>
            <ContentElement
              img={"./icons/icon-brand-recognition.svg"}
              altImg={"chart icon"}
            >
              <h3 className={styles.elementHeader}>Brand Recognition</h3>
              <p className={styles.elementParagraph}>
                Boost your brand recognition with each click. Generic links
                don’t mean a thing. Branded links help instil confidence in your
                content.
              </p>
            </ContentElement>
            <ContentElement
              img={"./icons/icon-detailed-records.svg"}
              altImg={"potentiometer icon"}
              className={styles.elementMargin1}
            >
              <h3 className={styles.elementHeader}>Detailed Records</h3>
              <p className={styles.elementParagraph}>
                Gain insights into who is clicking your links. Knowing when and
                where people engage with your content helps inform better
                decisions.
              </p>
            </ContentElement>
            <ContentElement
              img={"./icons/icon-fully-customizable.svg"}
              altImg={"three brushes"}
              className={styles.elementMargin2}
            >
              <h3 className={styles.elementHeader}>Fully Customizable</h3>
              <p className={styles.elementParagraph}>
                Improve brand awareness and content discoverability through
                customizable links, supercharging audience engagement.
              </p>
            </ContentElement>
          </div>
        </div>
      </div>
      <div className={styles.ctaWrapper}>
        <div className={styles.cta}>
          <h2 className={`${styles.ctaText} ${styles.headerText}`}>
            Boost your links today
          </h2>
          <Button
            className={`button-primary ${styles.buttonCta}`}
            onClick={handlePlaceholderClick}
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};
