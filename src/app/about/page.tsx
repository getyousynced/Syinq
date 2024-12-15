import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <>
      <div>
        <img
          src="/images/about/Hero and Nav.png"
          alt=""
          className={styles.bgimg}
        />
      </div>
      <div className={styles.aboutTop}>
        <div className={styles.aboutTopContainer}>
          <div className={styles.aboutTopLeft}>
            <div className={styles.aboutR1}>
              <div className={styles.R1sub}>
                <span className={styles.takea}>Take a</span>{" "}
                <span className={styles.look}>Look</span>{" "}
              </div>
              <div className={styles.abouttxt}>
                <img src="/images/about/Ellipse 204.png" alt="" />
                <span className={styles.aboutHeading}>About Us</span>
              </div>
            </div>
            <div className={styles.aboutR2}>
              <img
                src="images/about/Vector-1.png"
                alt=""
                className={styles.quoteimg}
              />
              <p>
                At SYNC, we believe in the power of connection and
                sustainability. Born from the idea of simplifying shared
                journeys, SYNC is a carpooling platform tailored for university
                students. Our mission is to make commuting smarter, more
                affordable, and environmentally friendly.
                <img
                  src="images/about/Vector-1.png"
                  alt=""
                  className={styles.quoteimginline}
                />
              </p>
            </div>
          </div>
          <div className={styles.aboutTopRight}>
            <img
              src="/images/about/Rectangle 34624113.png"
              alt=""
              className={styles.phoneimg}
            />
            <img
              src="/images/about/Rectangle 34624110.png"
              alt=""
              className={styles.phoneBGimg3}
            />
            <img
              src="/images/about/Rectangle 34624111.png"
              alt=""
              className={styles.phoneBGimg1}
            />
            <img
              src="/images/about/Rectangle 34624112.png"
              alt=""
              className={styles.phoneBGimg2}
            />
          </div>
        </div>
        <img
          src="/images/about/Ellipse 526.png"
          alt=""
          className={styles.phoneBGimg4}
        />
        <img
          src="/images/about/Ellipse 527.png"
          alt=""
          className={styles.phoneBGimg5}
        />
      </div>
    </>
  );
}
