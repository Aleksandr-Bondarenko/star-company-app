import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { registerUser } from "../../js/api";
import InputContainer from "../InputContainer/InputContainer";
import NoticeContainer from "../NoticeContainer/NoticeContainer";
import StepperIndicator from "../StepperIndicator/StepperIndicator";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
  const initialState = {
    role: "",
    age: "",
    location: "",
    email: "",
    password: "",
  };
  const [data, setData] = useState(initialState);
  const { age, location, email, password } = data;
  const [currentStep, setCurrentStep] = useState(1);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [error, setError] = useState(null);
  const prevBtnEl = useRef(null);
  const nextBtnEl = useRef(null);

  const matches = useMediaQuery({ query: "(min-width: 498px)" });

  const changeStepHandler = (evt) => {
    const { action } = evt.currentTarget.dataset;

    if (action === "prev" && currentStep > 1 && isEmailValid && !error) {
      setCurrentStep((prevStep) => (prevStep -= 1));
    }

    if (action === "next" && currentStep < 5 && isEmailValid && !error) {
      setCurrentStep((prevStep) => (prevStep += 1));
    }

    if (currentStep === 5 && action === "next" && !error) {
      const dataToSend = {
        age,
        location,
        email,
        password,
      };

      registerUser({ userInfo: dataToSend, setError, toStep: setCurrentStep });
    }
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
  };

  const updateData = (field, value) => {
    setData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const mouseOverHandler = (action) => {
    if (prevBtnEl.current.disabled && action === "prev") {
      prevBtnEl.current.style.borderColor = "var(--prev-btn-border-color)";
      prevBtnEl.current.firstChild.style.borderColor =
        "var(--prev-btn-border-color)";
      return;
    }

    if (action === "prev" && !error) {
      prevBtnEl.current.style.borderColor = "#ffffff";
      prevBtnEl.current.firstChild.style.borderColor = "#ffffff";
    }

    if (action === "next" && !error) {
      currentStep === 5
        ? (nextBtnEl.current.style.boxShadow =
            "0px 1px 8.5px var(--start-btn-hover)")
        : (nextBtnEl.current.style.boxShadow =
            "0px 1px 8.5px var(--next-btn-hover)");
    }
  };

  const mouseOutHandler = (action) => {
    if (prevBtnEl.current.disabled && action === "prev") {
      prevBtnEl.current.style.borderColor = "var(--prev-btn-border-color)";
      prevBtnEl.current.firstChild.style.borderColor =
        "var(--prev-btn-border-color)";
      return;
    }

    if (action === "prev") {
      prevBtnEl.current.style.borderColor = "var(--prev-btn-border-color)";
      prevBtnEl.current.firstChild.style.borderColor =
        "var(--prev-btn-border-color)";
    }

    if (action === "next") {
      nextBtnEl.current.style.boxShadow = "none";
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={submitHandler}>
        <button
          ref={prevBtnEl}
          className={`${styles.button} ${
            currentStep === 1 ? styles.disabled : ""
          }`}
          type="button"
          data-action="prev"
          disabled={currentStep === 1}
          onClick={changeStepHandler}
          onMouseOver={() => mouseOverHandler("prev")}
          onMouseOut={() => mouseOutHandler("prev")}
        >
          <span className={styles.prevBtnIcon} />
        </button>
        <InputContainer
          currentStep={currentStep}
          updateData={updateData}
          data={data}
          setIsEmailValid={setIsEmailValid}
          resetError={() => setError(null)}
        />
        <button
          ref={nextBtnEl}
          className={`${styles.button} ${
            currentStep === 5 ? styles.startBtn : ""
          }`}
          type="button"
          data-action="next"
          onClick={changeStepHandler}
          onMouseOver={() => mouseOverHandler("next")}
          onMouseOut={() => mouseOutHandler("next")}
        >
          {matches && (
            <span className={styles.nextBtnLabel}>
              {currentStep === 5 ? "Start now" : "Next step"}
            </span>
          )}
          <span
            className={`${
              currentStep === 5 ? styles.startBtnIcon : styles.nextBtnIcon
            }`}
          />
        </button>
      </form>

      <NoticeContainer
        currentStep={currentStep}
        error={error}
        isEmailValid={isEmailValid}
      />

      <StepperIndicator currentStep={currentStep} />
    </>
  );
};

export default RegisterForm;
