import { Link } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
import styles from "./NotFound.module.css";

export const NotFound = () => {
  return (
    <section className={styles.wrapper}>
      <Navbar />
      <div className={styles.notFoundWrapper}>
        <div className={styles.notFound}>
          <h1>404 - Not Found</h1>
          <h3>
            The page you are looking for might be unavailable or does not exist.
          </h3>
          <h3>
            Click{" "}
            <Link to="/" className={styles.link}>
              here
            </Link>{" "}
            to return to homepage
          </h3>
        </div>
      </div>
      <Footer />
    </section>
  );
};
