import { useState } from "react";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [showInputsFields, setShowInputsFields] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [isDataValid, setIsDataValid] = useState(true);

  const emailRegexp =
    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

  const errorMessage =
    data.password === "" || data.email === ""
      ? "All fields are required"
      : "Please enter a valid email address";

  const resetForm = () => setData({ email: "", password: "" });

  const onClickBtnHandler = (evt) => {
    evt.preventDefault();
    const { email, password } = data;
    const emailIsValid = emailRegexp.test(email);

    if (evt.currentTarget.type === "button") {
      setShowInputsFields(true);
      return;
    }

    if (!emailIsValid || email === "" || password === "") {
      setIsDataValid(false);
      return;
    }

    if (evt.currentTarget.type === "submit" && isDataValid) {
      alert(
        `This message is solely to verify that the data entered in the fields is actually being processed.
        Your data:
        - email: ${email}
        - password: ${password}`
      );
      resetForm();
    }
  };

  const inputChangeHandler = (evt) => {
    const { name, value } = evt.currentTarget;
    setData((prevState) => ({ ...prevState, [name]: value }));
    setIsDataValid(true);
  };

  return (
    <div>
      <form className={styles.form} noValidate>
        {showInputsFields && (
          <div className={styles.wrapper}>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={inputChangeHandler}
            />

            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={inputChangeHandler}
            />
          </div>
        )}

        <button
          type={showInputsFields ? "submit" : "button"}
          className={`${styles.button} ${showInputsFields && styles.submitBtn}`}
          onClick={onClickBtnHandler}
        >
          Log in
        </button>
      </form>

      <div className={styles.wrapper}>
        {!isDataValid && <p className={styles.errorMsg}>{errorMessage}</p>}
        {showInputsFields && (
          <a className={styles.link} href="https://www.google.com/">
            Forgot your password?
          </a>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
