import type { ChangeEventHandler, ReactNode } from "react";
import styles from "./styles.module.scss";

type TagPropsType = {
  children: ReactNode;
};

export const Tag = ({ children }: TagPropsType) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{children}</span>
    </div>
  );
};

type TagCheckboxPropsType = {
  onChange: ChangeEventHandler<any>;
  value: string;
  checked?: boolean;
  name: string;
};

export const TagCheckbox = ({
  onChange,
  value,
  checked,
  name,
}: TagCheckboxPropsType) => {
  return (
    <label className={styles.container}>
      <input
        className={styles.input}
        name={name}
        onChange={onChange}
        type="checkbox"
        value={value}
        checked={checked}
      ></input>
      <span className={styles.label}>{value}</span>
    </label>
  );
};
