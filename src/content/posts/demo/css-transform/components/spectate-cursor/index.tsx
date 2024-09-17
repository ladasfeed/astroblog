import React from "react";
import styles from "./style.module.css";

function pythagorean(sideA, sideB) {
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}

export default () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const boxRef = React.useRef<HTMLDivElement | null>(null);
  const shadowRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    containerRef.current!.addEventListener("mousemove", (e: MouseEvent) => {
      const {
        width,
        height,
        x: xOffset,
        top: yOffset,
      } = containerRef.current!.getBoundingClientRect();

      const x = e.clientX - xOffset - width / 2;
      const y = e.clientY - yOffset - height / 2;
      const yToXProjection = (y / (height / 2)) * (width / 2);

      const angle =
        (pythagorean(x, yToXProjection) / pythagorean(height / 2, height / 2)) *
        45;

      boxRef.current!.style.transform = `rotate3d(${-y}, ${x}, 0, ${angle}deg)`;
      shadowRef.current!.style.transform = `rotate3d(${Math.abs(
        y
      )}, ${x}, 0, ${angle}deg)`;
    });
  }, []);

  return (
    <div className="demo-container w-300 h-200">
      <div
        style={{
          perspective: "100px",
        }}
        ref={containerRef}
        className="container-inner p-0 flex items-center justify-center"
      >
        <div className={styles.platform}></div>
        <div ref={boxRef} className={styles.box}></div>
        <div ref={shadowRef} className={styles.shadow}></div>
      </div>
    </div>
  );
};

// .container {
//   width: 300px;
//   height: 200px;
//   border: 2px solid black;
//   display: grid;
//   place-items: center;
// }

// .box {
//   --rotate: 30deg;
//   --translate: 100px;

//   width: 50px;
//   height: 50px;
//   border: 2px solid black;
//   background: gray;
//   transition: .3s;
//   transform: rotate(var(--rotate));
// }

// .container:hover .box {

//   transform-origin: center center;
//     transform:
//       rotate(var(--rotate))
//       translateX(calc(cos(var(--rotate)) * var(--translate)))
//       translateY(calc(sin(var(--rotate)) * var(--translate) * -1));

// }
