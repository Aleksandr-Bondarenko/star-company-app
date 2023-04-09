import styles from "./NoticeContainer.module.css";

const NoticeContainer = ({ currentStep, error, isEmailValid }) => {
  return (
    <div className={styles.descContainer}>
      {currentStep === 3 && (
        <p className={styles.description}>
          E.g.: New Roads or 70760 <br />
          We don’t use postal addresses to contact members directly!
        </p>
      )}

      {currentStep === 5 && (
        <p className={styles.description}>
          By clicking the button above you agree to our{" "}
          <a className={styles.link} href="">
            Terms of Use
          </a>{" "}
          <br />
          and{" "}
          <a className={styles.link} href="">
            Privacy Policy
          </a>{" "}
          including use of cookies and to receive newsletters, <br />
          account updates and offers sent by StarCompany.
        </p>
      )}

      {error && <p className={styles.errorMsg}>{error.message}</p>}

      {currentStep === 4 && !isEmailValid && (
        <p className={styles.errorMsg}>Please enter a valid email address</p>
      )}
    </div>
  );
};

export default NoticeContainer;
