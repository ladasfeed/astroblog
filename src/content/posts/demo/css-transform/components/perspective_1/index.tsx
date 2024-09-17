import React from "react";

export default () => {
  const [range, setRange] = React.useState(300);
  const [transformStyle, setTransformStyle] = React.useState("preserve3d");

  const onRangeChangeHandler = (event) => {
    setRange(+event.target.value);
  };

  const toggleTransformStyle = () => {
    setTransformStyle(transformStyle === "preserve3d" ? "flat" : "preserve3d");
  };

  return (
    <div className="demo-container">
      <div
        style={{
          // transformStyle: transformStyle,
          perspective: range == 300 ? "unset" : `${range}px`,
          maxWidth: "300px",
          height: "200px",
          borderRadius: "12px",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          padding: 0,
        }}
        className="container-inner"
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            background: "#6ca9b4",
            transform: "rotateY(50deg)",
          }}
        />
      </div>
      {/* <code>transform-style: {transformStyle}</code> */}
      <code>perspective: {range == 300 ? "unset" : `${range}px`}</code>
      <div className="flex justify-center gap-[12px] items-center">
        <span>Perspective:</span>
        <input
          min="0"
          max="300"
          defaultValue={range}
          onChange={onRangeChangeHandler}
          value={range}
          type="range"
          step="1"
        />
      </div>
      {/* <button onClick={toggleTransformStyle} className="action">
        Toggle transform-style
      </button> */}
    </div>
  );
};
