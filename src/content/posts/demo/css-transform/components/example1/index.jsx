import React from 'react';
import { Box } from '../../helpers/Box.tsx';

const SIZE = 400;
const STEP = 20;

export default () => {
  const [step, setStep] = React.useState(0);

  const nextStepHandler = () => {
    setStep((prev) => (prev + 1) % 4);
  };

  const getBoxTransform = () => {
    switch (step) {
      case 0:
        return 'unset';
      case 1:
        return 'translateX(100px)';
      case 2:
        return 'scale(1.5)';
      case 3:
        return 'rotateZ(45deg)';
    }
  };

  const currentTransform = getBoxTransform();

  return (
    <div className="demo-container">
      <div className="container-inner">
        <div className="axes"></div>
        <Box
          pos={{ y: 50, x: 50 }}
          style={{ transform: currentTransform, transformOrigin: 'center' }}
        />
      </div>
      <code>transform: {currentTransform}</code>
      <button onClick={nextStepHandler} className="action">
        Update transform!
      </button>
    </div>
  );
};
