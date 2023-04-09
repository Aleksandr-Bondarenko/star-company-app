import styles from "./StepperIndicator.module.css";

const StepperIndicator = ({ currentStep }) => {
  const stepGenerator = (count) => {
    const allIndicators = [];
    for (let i = 0; i <= count - 1; i += 1) {
      allIndicators.push(
        <div
          key={i}
          className={`${styles.step} ${
            currentStep >= i + 1 ? styles.active : ""
          }`}
        />
      );
    }
    return allIndicators;
  };

  return <div className={styles.container}>{stepGenerator(5)}</div>;
};

export default StepperIndicator;
