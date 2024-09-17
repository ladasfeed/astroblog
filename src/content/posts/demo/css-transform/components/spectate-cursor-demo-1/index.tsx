import { Box } from "../../helpers";
import React from "react";

type ModeType = "raw" | "normalized" | "moved";

const MODES_ORDERED: Array<ModeType> = ["raw", "normalized", "moved"];

export default () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [rawCoords, setRawCoords] = React.useState([0, 0]);
  const [normalizedCoords, setNormalizedCoords] = React.useState([0, 0]);
  const [movedCoords, setMovedCoords] = React.useState([0, 0]);
  const [mode, setMode] = React.useState<ModeType>("raw");

  React.useEffect(() => {
    containerRef.current!.addEventListener("mousemove", (e) => {
      const {
        x: xOffset, // this is an element position from the left screen side
        top: yOffset, // this is an element position from the top screen side
        width,
        height,
      } = containerRef.current!.getBoundingClientRect();

      const x = e.clientX - xOffset; // e.clientX - mouse x coordinate within the screen
      const y = e.clientY - yOffset; // e.clientY - mouse y coordinate within the screen

      const xMoved = e.clientX - xOffset - width / 2;
      const yMoved = e.clientY - yOffset - height / 2;

      setNormalizedCoords([x, y]);
      setRawCoords([e.clientX, e.clientY]);
      setMovedCoords([xMoved, yMoved]);
    });
  }, []);

  const getCodeSnippet = () => {
    switch (mode) {
      case "raw":
        return `const x = e.clientX; //${rawCoords[0]}
const y = e.clientY; //${rawCoords[1]}
`;
      case "normalized":
        return `const {
  width,
  height,
} = containerRef.current!.getBoundingClientRect();

const x = e.clientX - xOffset; //${normalizedCoords[0]}
const y = e.clientY - yOffset; //${normalizedCoords[1]}
`;
      case "moved":
        return `const {
  x: xOffset, // this is an element position from the left screen side
  top: yOffset, // this is an element position from the top screen side
  width,
  height,
} = containerRef.current!.getBoundingClientRect();

const x = e.clientX - xOffset - width / 2; //${movedCoords[0]}
const y = e.clientY - yOffset - height / 2;  //${movedCoords[1]}
`;
    }
  };

  return (
    <div className="demo-container">
      <div
        ref={containerRef}
        className="container-inner flex flex-col items-center justify-center gap-[12px] text-white"
      >
        Move cursor here
      </div>
      <pre>{getCodeSnippet()}</pre>

      <button onClick={() => setMode("raw")} className="action">
        Raw coords - e.clientX, e.clientY
      </button>
      <button onClick={() => setMode("normalized")} className="action">
        Coords inside the box
      </button>
      <button onClick={() => setMode("moved")} className="action">
        Coords inside the box, moved to center
      </button>
    </div>
  );
};
