import { useRef, useState, useEffect } from "react";
import { validateEmail } from "../../js/utility";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [showInputsFields, setShowInputsFields] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [isDataValid, setIsDataValid] = useState(true);

  useEffect(() => {
    const clickHandler = (evt) => {
      if (evt.currentTarget === evt.target) {
        setShowInputsFields(false);
        setIsDataValid(true);
      }
    };

    const appEl = document.querySelector(".App");
    appEl.addEventListener("click", clickHandler);

    return () => appEl.removeEventListener("click", clickHandler);
  }, []);

  const btnEl = useRef(null);

  const errorMessage =
    data.password === "" || data.email === ""
      ? "All fields are required"
      : "Please enter a valid email address";

  const resetForm = () => setData({ email: "", password: "" });

  const onClickBtnHandler = (evt) => {
    evt.preventDefault();
    const { email, password } = data;
    const { type } = evt.currentTarget;

    if (type === "button") {
      setShowInputsFields(true);
      return;
    }

    if (!validateEmail(email) || email === "" || password === "") {
      setIsDataValid(false);
      return;
    }

    if (type === "submit" && isDataValid) {
      alert(
        `This message is solely to verify that the data entered in the fields is actually being processed.
        Your login data:
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

  const mouseOverHandler = () => {
    if (!showInputsFields) {
      btnEl.current.style.backgroundImage = "var(--login-btn-active-gradient)";
      btnEl.current.style.border = "none";
    } else {
      btnEl.current.style.boxShadow = "0px 1px 8.5px var(--login-btn-hover)";
    }
  };

  const mouseOutHandler = () => {
    if (!showInputsFields) {
      btnEl.current.style.backgroundImage = "none";
      btnEl.current.style.boxShadow = "none";
      btnEl.current.style.border = "1px solid #ffffff";
    } else {
      btnEl.current.style.boxShadow = "none";
    }
  };

  useEffect(() => {
    !showInputsFields && mouseOutHandler();
    showInputsFields && mouseOverHandler();
  }, [showInputsFields]);

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
          ref={btnEl}
          type={showInputsFields ? "submit" : "button"}
          className={`${styles.button} ${showInputsFields && styles.submitBtn}`}
          onClick={onClickBtnHandler}
          onMouseOver={mouseOverHandler}
          onMouseOut={mouseOutHandler}
        >
          Log in
        </button>
      </form>

      <div className={styles.wrapper}>
        {!isDataValid && showInputsFields && (
          <p className={styles.errorMsg}>{errorMessage}</p>
        )}
        {showInputsFields && (
          <a className={styles.link} href="">
            Forgot your password?
          </a>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
