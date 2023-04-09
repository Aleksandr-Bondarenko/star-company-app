import { useEffect, useState } from "react";
import { generateAgesList, validateEmail } from "../../js/utility";
import styles from "./InputContainer.module.css";

const stepsData = [
  {
    step: 1,
    type: "select",
    label: "Who are you?",
    options: [
      "Engineer",
      "Business Development Executive",
      "Office Manager/PA",
      "Accountant",
      "VR Designer",
    ],
    fieldName: "role",
  },
  {
    step: 2,
    type: "select",
    label: "What is your age?",
    options: generateAgesList(18, 35),
    fieldName: "age",
  },
  {
    step: 3,
    type: "text",
    label: "I am from",
    placeholder: "New Roads, 70760",
    fieldName: "location",
  },
  {
    step: 4,
    type: "email",
    label: "Your email address",
    placeholder: "Input your email",
    fieldName: "email",
  },
  {
    step: 5,
    type: "password",
    label: "Create your password",
    placeholder: "* * * * * * * * * * * *",
    fieldName: "password",
  },
];

const InputContainer = ({
  currentStep,
  updateData,
  data,
  setIsEmailValid,
  resetError,
}) => {
  const [isDropdownShow, setIsDropdownShow] = useState(false);
  const dataForRender = stepsData.find((item) => item.step === currentStep);
  const { type, label, placeholder, options, fieldName } = dataForRender;

  useEffect(() => {
    const clickHandler = (evt) =>
      evt.currentTarget === evt.target && setIsDropdownShow(false);

    const appEl = document.querySelector(".App");
    appEl.addEventListener("click", clickHandler);

    return () => appEl.removeEventListener("click", clickHandler);
  }, []);

  useEffect(() => {
    setIsDropdownShow(false);

    if (fieldName === "role" || fieldName === "age") {
      const inputEl = document.querySelector(`[name = ${fieldName}]`);
      updateData(fieldName, inputEl.value);
    }
  }, [currentStep, fieldName]);

  const dropDownShowHandler = () =>
    setIsDropdownShow((prevState) => !prevState);

  const selectOptionHandler = (evt) => {
    if (evt.target === evt.currentTarget) return;
    updateData(fieldName, evt.target.textContent);
    resetError();
    dropDownShowHandler();
  };

  const onChangeInputHandler = (evt) => {
    const { name, value } = evt.currentTarget;
    updateData(name, value);
    resetError();
  };

  const handleValidEmail = () =>
    fieldName === "email" && setIsEmailValid(validateEmail(data.email));

  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>

      <div className={styles.inputWrapper}>
        {type === "select" ? (
          <>
            <input
              className={styles.input}
              type="text"
              value={data[fieldName] === "" ? options[0] : data[fieldName]}
              name={fieldName}
              onClick={dropDownShowHandler}
              readOnly
            />
            <div
              className={`${styles.dropdownIcon} ${
                isDropdownShow && styles.revert
              }`}
              onClick={dropDownShowHandler}
            />
          </>
        ) : (
          <input
            className={`${styles.input} ${
              fieldName === "password" ? styles.password : ""
            }`}
            type={type}
            value={data[fieldName]}
            name={fieldName}
            placeholder={placeholder}
            onChange={onChangeInputHandler}
            onBlur={handleValidEmail}
          />
        )}

        {isDropdownShow && (
          <ul className={styles.dropdown} onClick={selectOptionHandler}>
            {options?.map((item) => (
              <li className={styles.option} key={item}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InputContainer;
