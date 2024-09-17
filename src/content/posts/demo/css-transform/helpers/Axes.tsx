import type { HTMLAttributes, ReactElement } from 'react';
import React from 'react';

const MARKER_WIDTH = 2;

type PropsType = {
  pos?: {
    x: number;
    y: number;
  };
  size?: number;
  step?: number;
} & HTMLAttributes<HTMLDivElement>;

export const Axes = ({
  pos = { x: 0, y: 0 },
  size = 500,
  step = 25,
  ...props
}: PropsType) => {
  const xAxis = React.useRef<HTMLDivElement | null>(null);
  const yAxis = React.useRef<HTMLDivElement | null>(null);
  const amount = size / step + 1;

  const generateMarkers = () => {
    const res: Array<ReactElement> = [];
    for (let i = 0; i < amount; i++) {
      res.push(<span className="metricUnit"></span>);
    }

    return res;
  };

  return (
    <div
      {...props}
      style={{
        ...props.style,
        position: 'absolute',
        top: `${pos.y}px`,
        left: `${pos.x - size / 2}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div
        className="axis"
        style={{ gap: `${step - MARKER_WIDTH}px` }}
        ref={xAxis}
      >
        {generateMarkers()}
      </div>
      <div
        className="axis"
        style={{
          transform: 'rotateZ(90deg)',
          gap: `${step - MARKER_WIDTH}px`,
        }}
        ref={yAxis}
      >
        {generateMarkers()}
      </div>
    </div>
  );
};
