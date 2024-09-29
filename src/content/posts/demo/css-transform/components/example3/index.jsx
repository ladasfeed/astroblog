import React from 'react';
import styles from './styles.module.css';
import { Axes, Box } from '../../helpers';

const transformOriginOptions = ['bottom left', 'center center', 'bottom right'];

export default () => {
  const [step, setStep] = React.useState(0);
  const [transformOrigin, setTransformOrigin] = React.useState(
    transformOriginOptions[1]
  );


  const nextStepHandler = () => {
    setStep((prev) => (prev + 1) % 2);
  };

  const getBoxTransform = () => {
    switch (step) {
      case 0:
        return 'rotateZ(0deg)';
      case 1:
        return 'rotateZ(45deg)';
    }
  };

  const currentTransform = getBoxTransform();

  const onTransformOriginChange = (e) => {
    setTransformOrigin(e.target.value);
  };

  const getPositionOfTransformOrigin = () => {
    switch (transformOrigin) {
      case transformOriginOptions[0]:
        return { top: '100%', left: 0 };
      case transformOriginOptions[1]:
        return { top: '50%', left: '50%' };
      case transformOriginOptions[2]:
        return { top: '100%', left: '100%' };
    }
  };

  return (
    <div className="demo-container">
      <div className="container-inner">
        <Axes pos={{ y: 150, x: 50 }} />
        <Box
          style={{
            transform: getBoxTransform(),
            transformOrigin: transformOrigin,
          }}
          pos={{ y: 50, x: 50 }}
        >
          <div
            style={{ ...getPositionOfTransformOrigin() }}
            className={styles['cube__transform-origin-mark']}
          ></div>
        </Box>
      </div>
      <code>transform: {currentTransform}</code>
      <div className="check-input-group">
        <span className="check-input-group__title">transform-origin: </span>
        <div className="check-input-group__list">
          {transformOriginOptions.map((item) => {
            return (
              <label htmlFor={`example3_${item}`} className="check-input">
                <input
                  type="radio"
                  id={`example3_${item}`}
                  value={item}
                  onChange={onTransformOriginChange}
                  checked={item === transformOrigin}
                  name="transform-origin"
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      <button onClick={nextStepHandler} className="action">
        Rotate the element
      </button>
    </div>
  );
};
