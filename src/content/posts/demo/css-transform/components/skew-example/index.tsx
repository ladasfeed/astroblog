import { Axes, Box } from "../../helpers";
import React from "react";
import styles from "./styles.module.css";

export default () => {
  const [boxTransform, setBoxTransform] = React.useState("unset");
  const [step, setStep] = React.useState(0);

  const getButtonData = () => {
    switch (step) {
      case 0:
        return {
          text: "skew(45deg)",
          action: () => setBoxTransform("skewY(-45deg)"),
        };
      case 1:
        return {
          text: "translate(50px)",
          action: () => setBoxTransform("skewY(-45deg) translateX(50px)"),
        };
      case 2:
        return {
          text: "reset",
          action: () => setBoxTransform("unset"),
        };
      default:
        return {
          text: "",
          action: () => {},
        };
    }
  };

  const { text, action } = getButtonData();

  const nextStep = () => {
    action();
    setStep((p) => (p + 1) % 3);
  };

  return (
    <div className="demo-container">
      <div className="container-inner">
        <Box
          size={50}
          pos={{ x: 50, y: 100 }}
          style={{ transform: boxTransform }}
        />
        <Axes
          pos={{ x: 50, y: 150 }}
          className={`${styles.axes} ${
            step != 0 ? styles["axes--rotated"] : ""
          }`}
        />
      </div>
      <code>transform: {boxTransform}</code>
      <button onClick={nextStep} className="action">
        {text}
      </button>
    </div>
  );
};
