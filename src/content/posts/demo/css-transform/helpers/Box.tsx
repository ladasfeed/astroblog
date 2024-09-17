import type { HTMLAttributes } from 'react';

type PropsType = {
  pos?: {
    x: number;
    y: number;
  };
  size?: number;
} & HTMLAttributes<HTMLDivElement>;

export const Box = ({
  pos = { x: 0, y: 0 },
  size = 100,
  ...props
}: PropsType) => {
  return (
    <div
      className="box"
      {...props}
      style={{
        ...props.style,
        top: pos.y,
        left: pos.x,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {props.children}
    </div>
  );
};
