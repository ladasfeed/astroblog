import { Box } from "../../helpers";
import React from "react";

const ROTATION = 60;
const ROTATION_RAD = Math.PI / 3;
const TRANSLATION = 100;

export default () => {
  const [boxTransform, setBoxTransform] = React.useState("rotateZ(60deg)");
  const [isTranslated, setIsTranlsated] = React.useState(false);

  const toggleTranslate = () => {
    if (isTranslated) {
      setBoxTransform("rotateZ(60deg)");
    } else {
      const x = Math.ceil(Math.cos(ROTATION_RAD) * TRANSLATION);
      const y = Math.ceil(-Math.sin(ROTATION_RAD) * TRANSLATION);

      setBoxTransform(`rotateZ(60deg) translateX(${x}px) translateY(${y}px)`);
    }

    setIsTranlsated((p) => !p);
  };

  return (
    <div className="demo-container">
      <div className="container-inner">
        <Box pos={{ x: 50, y: 0 }} style={{ transform: boxTransform }} />
      </div>
      <code>transform: {boxTransform}</code>
      <button onClick={toggleTranslate} className="action">
        Translate!
      </button>
    </div>
  );
};
