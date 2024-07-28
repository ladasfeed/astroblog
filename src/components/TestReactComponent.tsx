import { useState } from "react";

export const Test = () => {
  const [state, setState] = useState(0);

  const increaseState = () => {
    setState((p) => p + 1);
  };

  return <div onClick={increaseState}>{state}</div>;
};
