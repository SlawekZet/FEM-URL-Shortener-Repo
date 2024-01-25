import styles from "./RedirectPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const RedirectPage = () => {
  const { shortPath } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://render-shooort.onrender.com/get-org-url?shortenedUrlPath=${shortPath}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const orgUrl = data.originalUrl;
          window.location.replace(orgUrl);
        } else {
          console.error("Error fetching original URL:", response.statusText);
          navigate("/404");
        }
      } catch (error) {
        console.error("Error fetching original URL:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortPath]);

  return loading ? (
    <div className={styles.loading}>Loading...</div>
  ) : (
    <div className={styles.redirect}>Redirecting...</div>
  );
};
