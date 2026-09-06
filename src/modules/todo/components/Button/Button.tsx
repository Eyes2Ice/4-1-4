import classnames from "classnames";
import { MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  title: string;
  icon?: ReactNode;
  outline?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({
  title,
  icon,
  outline,
  disabled,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classnames(styles.button, {
        [styles.outline]: outline,
        [styles.disabled]: disabled,
      })}
      {...rest}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {title}
    </button>
  );
};
