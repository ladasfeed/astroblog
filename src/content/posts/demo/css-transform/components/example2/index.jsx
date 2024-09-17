import React from 'react';
import { Axes, Box } from '../../helpers';

const SIZE = 400;
const STEP = 20;

export default ({ mode = 'translate-scale' }) => {
  const [step, setStep] = React.useState(0);

  const nextStepHandler = () => {
    setStep((prev) => (prev + 1) % 3);
  };

  const getBoxTransform = () => {
    if (mode == 'translate-scale') {
      switch (step) {
        case 0:
          return 'unset';
        case 1:
          return 'translateX(25px)';
        case 2:
          return 'translateX(25px) scale(2)';
      }
    } else if (mode == 'scale-translate') {
      switch (step) {
        case 0:
          return 'unset';
        case 1:
          return 'scale(2)';
        case 2:
          return 'scale(2) translateX(25px)';
      }
    }
  };

  const currentTransform = getBoxTransform();

  return (
    <div className="demo-container">
      <div className="container-inner">
        <Axes pos={{ x: 50, y: 180 }} />
        <Box
          pos={{ x: 50, y: 130 }}
          size={50}
          style={{ transform: currentTransform }}
        />
      </div>
      <code>transform: {currentTransform}</code>
      <button onClick={nextStepHandler} className="action">
        Update transform
      </button>
    </div>
  );
};
