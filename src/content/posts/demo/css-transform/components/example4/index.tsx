import React from "react";
import { Box } from "../../helpers/Box.tsx";
import { Axes } from "../../helpers/Axes.tsx";

const transformOriginOptions = ["bottom left", "center center", "bottom right"];

export default () => {
  const [step, setStep] = React.useState(0);
  const [transformOrigin, setTransformOrigin] = React.useState(
    transformOriginOptions[1]
  );

  const nextStepHandler = () => {
    setStep((prev) => (prev + 1) % 3);
  };

  const getBoxTransform = () => {
    switch (step) {
      case 0:
        return "rotateZ(0deg)";
      case 1:
        return "rotateZ(45deg)";
      case 2:
        return "rotateZ(45deg) translateX(25px)";
    }
  };

  const currentTransform = getBoxTransform();

  const onTransformOriginChange = (e) => {
    setTransformOrigin(e.target.value);
  };

  const getAxesPos = () => {
    switch (transformOrigin) {
      case transformOriginOptions[0]:
        return { y: 100, x: 0 };
      case transformOriginOptions[1]:
        return { y: 50, x: 50 };
      case transformOriginOptions[2]:
        return { y: 100, x: 100 };
    }
  };

  const getButtonText = () => {
    switch (step) {
      case 0:
        return "Rotate the element";
      case 1:
        return "Move it by X axis!";
      case 2:
        return "Reset";
    }
  };

  return (
    <div className="demo-container">
      <div className="container-inner">
        <Box
          style={{
            transform: currentTransform,
            transformOrigin: transformOrigin,
            zIndex: 5,
          }}
          pos={{ x: 50, y: 80 }}
        >
          <Axes pos={getAxesPos()} />
        </Box>
      </div>
      <code>transform: {currentTransform}</code>
      <div className="check-input-group">
        <span className="check-input-group__title">transform-origin: </span>
        <div className="check-input-group__list">
          {transformOriginOptions.map((item) => {
            return (
              <label htmlFor={`example4_${item}`} className="check-input">
                <input
                  type="radio"
                  id={`example4_${item}`}
                  value={item}
                  onChange={onTransformOriginChange}
                  checked={item === transformOrigin}
                  name="example4_transform-origin"
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      <button onClick={nextStepHandler} className="action">
        {getButtonText()}
      </button>
    </div>
  );
};
